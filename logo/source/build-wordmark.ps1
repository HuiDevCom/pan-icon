Add-Type -AssemblyName System.Drawing
$taskFamily = New-Object System.Drawing.FontFamily('Microsoft YaHei')
$taskPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$taskPath.AddString('风绘云盘', $taskFamily, [int][System.Drawing.FontStyle]::Bold, 160, (New-Object System.Drawing.PointF(0,0)), [System.Drawing.StringFormat]::GenericTypographic)
$taskPoints=$taskPath.PathPoints
$taskTypes=$taskPath.PathTypes
$taskParts=New-Object System.Collections.Generic.List[string]
$taskCI=[System.Globalization.CultureInfo]::InvariantCulture
function Task-Coord($p) { return $p.X.ToString('0.###',$taskCI)+','+$p.Y.ToString('0.###',$taskCI) }
for($i=0;$i -lt $taskPoints.Length;$i++) {
 $taskType=$taskTypes[$i] -band 7
 if($taskType -eq 0) { $taskParts.Add('M'+(Task-Coord $taskPoints[$i])) }
 elseif($taskType -eq 1) { $taskParts.Add('L'+(Task-Coord $taskPoints[$i])) }
 elseif($taskType -eq 3) { $taskParts.Add('C'+(Task-Coord $taskPoints[$i])+' '+(Task-Coord $taskPoints[$i+1])+' '+(Task-Coord $taskPoints[$i+2])); $i+=2 }
 if(($taskTypes[$i] -band 128) -ne 0) {$taskParts.Add('Z')}
}
$taskBounds=$taskPath.GetBounds()
@{path=($taskParts -join '');bounds=@{x=$taskBounds.X;y=$taskBounds.Y;width=$taskBounds.Width;height=$taskBounds.Height};font=$taskFamily.Name} | ConvertTo-Json -Depth 3 -Compress | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'wordmark-path.json') -Encoding utf8
$taskPath.Dispose()
