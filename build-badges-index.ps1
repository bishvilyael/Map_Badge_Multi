$JsonRoot = Join-Path $PSScriptRoot "json"
$OutputFile = Join-Path $JsonRoot "badges.json"

$items = @()

Get-ChildItem -Path $JsonRoot -Directory -Filter "Badge_*" | ForEach-Object {
    $folder = $_.Name
    $badge = $folder -replace "^Badge_", ""
    $dataFile = Join-Path $_.FullName "data.geojson"

    $name = ""

    if (Test-Path $dataFile) {
        $content = Get-Content $dataFile -Raw -Encoding UTF8

        if ($content -match '<b>\s*שם\s*:\s*</b>\s*([^<]+)<br\s*/?>') {
            $name = $matches[1].Trim()
        }
    }

    $items += [PSCustomObject]@{
        badge  = $badge
        folder = $folder
        name   = $name
    }
}

$items |
    Sort-Object { [int]($_.badge -replace "\D.*$", "") } |
    ConvertTo-Json -Depth 5 |
    Set-Content -Path $OutputFile -Encoding UTF8

Write-Host "Created $OutputFile"
Write-Host "Badges found:" $items.Count