$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    username = "ffm.ly"
    password = "Ahmed20053021"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/login" -Method Post -Headers $headers -Body $body
    Write-Host "Response Status:" $response.StatusCode
    Write-Host "Response Content:" $response.Content
} catch {
    Write-Host "Error:" $_.Exception.Message
} 