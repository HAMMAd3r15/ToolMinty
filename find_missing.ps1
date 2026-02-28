$files = Get-ChildItem -Recurse -Path "src\app" -Filter "*.tsx"
$missing = @()
foreach ($f in $files) {
    if ($f.Name -eq "layout.tsx" -or $f.Name -eq "loading.tsx" -or $f.Name -eq "error.tsx") { continue }
    $content = Get-Content $f.FullName -Raw
    if ($content -notmatch "EliteSEOCards") {
        $missing += $f.FullName
    }
}
$missing | Out-File missing_seo.txt
Write-Host "Done. Found $($missing.Count) files missing EliteSEOCards."
