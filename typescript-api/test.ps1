# Simple PowerShell test script
param(
    [Parameter(Mandatory=$true)]
    [string]$FilePath
)

if (-not (Test-Path $FilePath)) {
    Write-Host "Error: File not found: $FilePath" -ForegroundColor Red
    exit 1
}

Write-Host "`nTesting: $FilePath" -ForegroundColor Cyan
Write-Host "Sending request to API...`n" -ForegroundColor Yellow

try {
    $file = Get-Item $FilePath
    $fileName = $file.Name
    
    # Read file as bytes
    $fileBytes = [System.IO.File]::ReadAllBytes($file.FullName)
    
    # Create boundary
    $boundary = [System.Guid]::NewGuid().ToString()
    
    # Build multipart form data
    $LF = "`r`n"
    $bodyLines = @(
        "--$boundary",
        "Content-Disposition: form-data; name=`"file`"; filename=`"$fileName`"",
        "Content-Type: image/png",
        "",
        ""
    ) -join $LF
    
    $bodyLines += [System.Text.Encoding]::GetEncoding("iso-8859-1").GetString($fileBytes)
    $bodyLines += "$LF--$boundary--$LF"
    
    # Send request
    $result = Invoke-RestMethod -Uri http://localhost:3000/api/detect `
        -Method POST `
        -ContentType "multipart/form-data; boundary=$boundary" `
        -Body ([System.Text.Encoding]::GetEncoding("iso-8859-1").GetBytes($bodyLines))
    
    # Display result
    $result | ConvertTo-Json -Depth 10
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nMake sure the server is running: npm run dev" -ForegroundColor Yellow
}
