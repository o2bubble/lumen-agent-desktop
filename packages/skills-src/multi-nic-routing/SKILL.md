---
name: multi-nic-routing
description: 多网卡分流 —— 让公网流量走一张网卡（手机热点 / WiFi）、内网流量走另一张（有线 / 公司网），解决公司网络访问外网断流、下载慢、连不上云端服务的问题。用户抱怨"外网总断""下载卡住""想用热点又怕丢掉内网访问"，或需要把之前改过的路由配置还原时使用。
---

# 多网卡分流

**分流** = 按目标地址把流量分到不同网卡。改的是**路由表**和接口**度量**（metric），
不动网卡本身的 IP 配置。

全程需要**管理员权限**。先验证，否则后面每一步都会失败：

```powershell
([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
```

## 1. 摸底

改之前先看清现状。以下是四条必跑的命令：

```powershell
# 已连接网卡 + 度量（度量小的优先）
Get-NetIPInterface -AddressFamily IPv4 | Where-Object ConnectionState -eq 'Connected' |
  Select-Object InterfaceAlias, ifIndex, InterfaceMetric | Format-Table

# 各网卡 IP
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' } |
  Select-Object InterfaceAlias, IPAddress, PrefixLength | Format-Table

# 默认路由（通常两条，各指向一个网关）
Get-NetRoute -AddressFamily IPv4 -DestinationPrefix '0.0.0.0/0' |
  Select-Object InterfaceAlias, NextHop, RouteMetric, Store | Format-Table

# 内网目标实际会走哪张网卡 —— 决定选哪个方案的关键
Find-NetRoute -RemoteIPAddress <内网目标IP> | Select-Object -First 2 InterfaceAlias, NextHop
```

**完成判据**：能回答这四问，缺一不可 ——

1. 哪张网卡通公网、哪张通内网？（从 IP 段能猜，但**必须向用户确认**）
2. 各自的网关地址是什么？
3. 内网目标地址**当前**走的是哪张卡？
4. **两边现在各自都能连通吗？** 用 `ping <公网IP>` 和 `ping <内网IP>` 各打两包

第 4 问不过就别往下走 —— 如果备用网卡本身不通，切过去等于断网。

## 2. 备份（不可跳过）

用户要求任何时候都能还原。备份必须**同时产出可执行的还原脚本**，
不能只留一份"事后自己看着改"的文本。

```powershell
$ts   = Get-Date -f yyyyMMdd_HHmmss
$dir  = "$env:USERPROFILE\net-split-$ts"
New-Item -ItemType Directory -Force $dir | Out-Null

# 记录每张网卡：是「用户显式设过」还是「自动」，以及当时的有效值
$rows = Get-NetIPInterface -AddressFamily IPv4 | ForEach-Object {
  # ⚠️ 内层也必须带 -AddressFamily IPv4 —— 不带会同时返回 IPv4+IPv6 两条，
  #    变成数组，后面 $explicit 的判断全是错的。
  $p = Get-NetIPInterface -InterfaceIndex $_.ifIndex -AddressFamily IPv4 `
         -PolicyStore PersistentStore -ErrorAction SilentlyContinue
  [pscustomobject]@{
    ifIndex        = $_.ifIndex
    InterfaceAlias = $_.InterfaceAlias
    Explicit       = [bool]($p.InterfaceMetric -gt 0)   # 显式设过（真 bool）
    Metric         = [int]$_.InterfaceMetric            # 备份时 netsh 显示的数
  }
}
$rows | ConvertTo-Json | Set-Content "$dir\metrics.json" -Encoding utf8

# 记录当前完整路由表
Get-NetRoute -AddressFamily IPv4 |
  Select-Object DestinationPrefix, InterfaceAlias, NextHop, RouteMetric, Store |
  ConvertTo-Json | Set-Content "$dir\routes.json" -Encoding utf8

# 还原脚本写成**固定模板**，数据从同目录 metrics.json 读 ——
# 不做字符串插值，就没有转义/类型转换的坑。
@'
$ErrorActionPreference = 'Continue'
$rows = Get-Content "$PSScriptRoot\metrics.json" -Raw | ConvertFrom-Json
foreach ($r in $rows) {
  # ⚠️ 按**名称**重新解析 ifIndex，不直接用备份里的编号 ——
  #    重启/插拔后 Windows 会重新枚举，编号可能整体位移（实测 20→17）。
  #    用旧编号会改到别的网卡上，比不还原更糟。
  $cur = Get-NetIPInterface -AddressFamily IPv4 -ErrorAction SilentlyContinue |
           Where-Object InterfaceAlias -eq $r.InterfaceAlias
  if (-not $cur) {
    Write-Warning "skip $($r.InterfaceAlias) (adapter not present)"
    continue
  }
  $idx = $cur.ifIndex
  try {
    if ($r.Explicit) {
      Set-NetIPInterface -InterfaceIndex $idx -InterfaceMetric $r.Metric -ErrorAction Stop
    } else {
      # 自动度量要两步：AutomaticMetric 只改活动值，持久值会残留旧数字
      Set-NetIPInterface -InterfaceIndex $idx -AutomaticMetric Enabled -ErrorAction Stop
      Set-NetIPInterface -InterfaceIndex $idx -InterfaceMetric 0 -PolicyStore PersistentStore -ErrorAction Stop
    }
  } catch { Write-Warning "skip $($r.InterfaceAlias) (ifIndex $idx): $($_.Exception.Message)" }
}
Write-Output 'restored to backup state'
'@ | Set-Content "$dir\restore.ps1" -Encoding utf8
```

> 用了 **B 方案**（加了路由）的话，还原脚本还要加删除动作 ——
> 把 `routes.json` 里原本不存在的那些网段 `Remove-NetRoute -Confirm:$false`。
> 所以备份必须在**改之前**做，事后补不出来。

**完成判据**：`$dir` 下有 `metrics.json`、`routes.json`、`restore.ps1` 三个文件。
把 **`$dir` 的完整路径念给用户**，让他记下来。

> 还原脚本按 `InterfaceAlias` **重新解析** ifIndex（不盲用备份里的编号）——
> 重启或插拔后 Windows 会重新枚举，编号可能整体位移（实测：WLAN 11→10、
> 以太网 20→17）。网卡不在时脚本会跳过并提示，不会改错别的网卡。

## 3. 选方案

**先分析，再给推荐，不要只甩一张表让用户自己挑。**
用户找你是为了解决问题，不是来做路由决策的。

### 三个方案

| 方案 | 做法 | 适用前提 | 改动量 | 风险 |
|---|---|---|---|---|
| **A 调度量** | 把优先那张卡的 `InterfaceMetric` 调小 | 内网网段**已有具体路由**覆盖 | 1 个值 | 低 |
| **B 加路由** | 对每条内网网段 `New-NetRoute` 加精确路由 | 内网没有覆盖性路由，或只分流部分地址 | 每条网段 1 条 | 中 |
| **C 改默认路由** | 删默认路由再重建 | A、B 都不适用 | 2 条路由 | **高，容易断网** |

### 分析这三件事，得出推荐

1. **摸底第 4 条的结果** —— 内网目标现在走哪张卡？
   如果**已经**指向内网网卡，说明有覆盖性路由 → **A 就够**，不用加路由。
   如果指向公网网卡（或走了默认路由），说明没有 → 要么 B，要么 C。
2. **内网网段有几条** —— 一条 → B 成本低；五六条 → B 要记一串，容易漏，
   这时 A（配一条宽带度的默认走向）反而更稳。
3. **用户是要"分流"还是"临时救急"** —— 临时救急建议加 `-PolicyStore ActiveStore`
   （重启自动失效，连还原都省了）。

### 怎么把推荐说给用户

一句话带结论 + 理由 + 影响，然后问一个是否执行的问题。例如：

> 你的内网目标已经有一条 `/16` 的路由覆盖（探测显示走以太网），
> 所以**只调一个度量值**就够了，不需要加路由，风险最低、还原也最简单。
> 我按 A 方案来，把 WiFi 提到优先，内网不受影响 —— 可以吗？

反例（不要这样）：

> 这里有三个方案，A 是调度量、B 是加路由、C 是改默认路由，你想用哪个？

只有当**两个方案确实都合理、且取舍取决于用户偏好**时才给二选一，
并把推荐放在前面：*"我建议 A，因为 X；如果你更在意 Y，那 B 更合适。"*

### 两个子选项（也带上默认）

- **哪些走公网卡**：默认**全部公网流量**。只给个别服务分流要做反向规则，
  复杂度陡增、收益很小，除非用户明确要求否则不建议。
- **要不要持久化**：默认**写 PersistentStore**（重启仍生效）。
  用户说"先试试""临时用一下"时改 ActiveStore。

## 4. 执行

### A 方案

```powershell
Set-NetIPInterface -InterfaceIndex <要优先的 ifIndex> -InterfaceMetric <比另一张小>
```

度量取绝对值没有意义，只要**比另一张小**即可（常见：优先的 10，另一张保持原值 20~50）。

### B 方案

```powershell
New-NetRoute -DestinationPrefix <内网网段/N> -InterfaceIndex <内网卡 ifIndex> -NextHop <内网网关>
```

网段要**列全** —— 漏一个就有一个内网服务连不上。向用户确认内网网段清单。

## 5. 验证

**完成判据**：下列四条**全部**通过，缺一条就回滚。

```powershell
# ① 公网走对卡
Find-NetRoute -RemoteIPAddress 8.8.8.8 | Select-Object -First 2 InterfaceAlias, NextHop

# ② 内网走对卡
Find-NetRoute -RemoteIPAddress <内网目标IP> | Select-Object -First 2 InterfaceAlias, NextHop

# ③ 两者都真能通（路由选对了但网不通一样是失败）
Test-NetConnection <内网目标IP> -Port <内网服务端口> -InformationLevel Quiet
curl.exe -s --max-time 15 --noproxy '*' -o NUL -w "%{http_code}`n" https://www.baidu.com

# ④ 长连接也稳（短请求通不代表流式不断）
#    让用户实测：视频/大文件/流式接口连续用几分钟
```

第 ④ 条最容易被跳过，但**恰恰最容易出问题** —— 短请求对链路抖动不敏感，
而流式传输中断才是用户最初报的症状。别只看 ①②③ 通过就宣布完成。

### 日常自检（一行版）

以后怀疑"又漂了"时，跑这一行就够：

```powershell
"公网 -> " + (Find-NetRoute -RemoteIPAddress 8.8.8.8 | Select-Object -First 2)[1].InterfaceAlias
"内网 -> " + (Find-NetRoute -RemoteIPAddress <内网IP> | Select-Object -First 2)[1].InterfaceAlias
```

输出应分别是「公网卡名」「内网卡名」。不对就回到「配置漂移了怎么办」。

## 还原（用户要撤销时）

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\net-split-<时间戳>\restore.ps1"
```

**完成判据**：`netsh interface ipv4 show interfaces` 里的 `Met` 列与备份时一致，
且第 5 步的走向验证回到原始状态。

核对时有 `skip ifIndex N (adapter gone?)` 的警告可以忽略 —— 那是网卡不在了
（常见于 WSL / 虚拟机虚拟网卡），不影响。

若还原后走向不对，查 `InterfaceMetric` 的持久值：
`Get-NetIPInterface -InterfaceIndex N -AddressFamily IPv4 -PolicyStore PersistentStore`
—— 该为空的却是数字，说明是个显式值，用 `-InterfaceMetric 0 -PolicyStore PersistentStore` 清掉。

## 配置漂移了怎么办（重启后复发的典型）

**症状**：之前配好了，重启电脑（或插拔网卡、切换 WiFi）后又变回走错网卡。

**先别急着复盘上次的配置 —— ifIndex 会变。** Windows 重新枚举网卡时编号可能
整体位移（实测：WLAN 11→10，以太网 20→17）。上次按 `-InterfaceIndex 20`
设的度量，重启后可能落到了别的网卡上。

### 第 1 步：只看现状，不看历史

```powershell
# 用「名称」定位，不要用记得的 ifIndex
Get-NetIPInterface -AddressFamily IPv4 |
  Where-Object { $_.InterfaceAlias -in @('<公网卡名>','<内网卡名>') } |
  Select-Object InterfaceAlias, ifIndex, InterfaceMetric, AutomaticMetric

# 真正生效的值（InterfaceMetric 列可能为空 = 自动）
netsh interface ipv4 show interfaces

# 公网实际走哪张
(Find-NetRoute -RemoteIPAddress 8.8.8.8 | Select-Object -First 2)[1].InterfaceAlias
```

### 第 2 步：判断是「度量错了」还是「路由没了」

- `Find-NetRoute` 指向**内网卡**，但公网卡度量更小 → 调度量（回到方案 A）
- 内网目标走了公网卡 → 公司的覆盖性路由丢了（Vpn/零信任客户端重连会重建），
  **等公司网重连**，不要自己加路由
- 两张卡都正常、走向也对 → 不是配置问题，是链路本身

### 第 3 步：修复时按名称算 ifIndex

```powershell
$pub = (Get-NetIPInterface -AddressFamily IPv4 | Where-Object InterfaceAlias -eq '<公网卡名>').ifIndex
$int = (Get-NetIPInterface -AddressFamily IPv4 | Where-Object InterfaceAlias -eq '<内网卡名>').ifIndex
# 确认公网卡度量比内网卡小，然后：
Set-NetIPInterface -InterfaceIndex $pub -InterfaceMetric 10
Set-NetIPInterface -InterfaceIndex $int -AutomaticMetric Enabled
Set-NetIPInterface -InterfaceIndex $int -InterfaceMetric 0 -PolicyStore PersistentStore
```

### 第 4 步：确认是谁改的（可选）

若反复漂移，查零信任 / VPN 客户端（如 `0dcloudCore`）—— 它们重连时会重建路由
和度量。这类客户端改回来的值你无法阻止，**只能验收时多看一眼**。

### 预防：保存时按名称，不按编号

`metrics.json` 里已经记了 `InterfaceAlias`，还原时**优先按名称匹配**：

```powershell
$target = (Get-NetIPInterface -AddressFamily IPv4 |
            Where-Object InterfaceAlias -eq $r.InterfaceAlias).ifIndex
if ($target) { Set-NetIPInterface -InterfaceIndex $target -InterfaceMetric $r.Metric }
```

编号对不上就跳过并提示，**不要盲信 ifIndex**。

## 常见坑（都是实测踩出来的）

- **`-InterfaceMetric 0` 不是"恢复自动"，是真的设成 0** —— 而 0 是**最高优先级**，
  比 10 还优先。想恢复自动必须两步：先 `-AutomaticMetric Enabled`（改活动值），
  再 `-InterfaceMetric 0 -PolicyStore PersistentStore`（清掉残留的持久值）。
  少第二步的话，下次备份会把这个残留数字当成"用户显式设过"记下来。
- **查询内层必须带 `-AddressFamily IPv4`** —— 不带会同时返回 IPv4 和 IPv6 两条，
  变成数组，`InterfaceMetric` 拿到 `[77 77]` 这种值，后面所有判断全错。
- **`Get-NetIPInterface` 默认只看 ActiveStore** —— 那里永远有数字（自动算的），
  看不出"是用户设的还是自动的"。要判断必须查 `-PolicyStore PersistentStore`：
  空 = 自动，有值 = 显式设过。
- **还原脚本别用字符串插值生成** —— 我第一版把数据拼进脚本，结果
  `[bool]` 参数不接受字符串 `"true"`，每条命令都静默失败（只在 stderr 报错）。
  改成固定模板 + 从 `metrics.json` 读数据，一次就对了。
- **重启会让 ifIndex 整体位移** —— 实测一次重启后 WLAN 11→10、以太网 20→17。
  所有命令都该按 `InterfaceAlias` 现算编号，别记死数字。还原脚本已改成按名称匹配。
- **重启也可能让度量"漂"回去** —— 实测：修好后重启，以太网又变成 Met=0
  （比 WLAN 的 10 更优先）→ 公网改走以太网。重新跑一遍技能第 5 步验证即可，
  必要时重做第 4 步。这类复发大概率是零信任/VPN 客户端重连时重建了度量。
- **内网路由是 DHCP 下发的**（`Store` 显示 `ActiveStore`）—— 断开公司网会消失，
  重连会回来。不是故障。
- **度量会持久化**：`Set-NetIPInterface` 默认写 `PersistentStore`，重启仍在；
  想临时试验就显式加 `-PolicyStore ActiveStore`。
- **两边的网关都不能是当前网络**：如果热点没连上就切默认路由，会彻底断网。
  第 1 步「完成判据」的第 4 问就是在防这个。
- **别用 `route add` 老命令**：它写的是兼容层，`Get-NetRoute` 的 Store 会显示
  `ActiveStore`，跟 PowerShell 命令混用容易出现"改了这个那个变了"。
