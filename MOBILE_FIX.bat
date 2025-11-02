@echo off
setlocal enabledelayedexpansion
echo 🔧 Kisan Setu - Mobile Access Fix
echo.

REM Get all available IP addresses
echo 🔍 Available IP addresses:
ipconfig | findstr "IPv4"
echo.

REM Get primary network IP
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4" ^| findstr -v "127.0.0.1" ^| findstr -v "169.254"') do (
    set ip=%%i
    set ip=!ip: =!
    if not "!ip!"=="" (
        echo 📍 Using IP: !ip!
        echo ✅ Frontend will auto-detect backend at !ip!:8001
        echo 📱 Access from any device: http://!ip!:5173
        echo.
        
        REM Generate QR code
        echo 📱 QR Code: https://api.qrserver.com/v1/create-qr-code/?size=200x200^&data=http://!ip!:5173
        start "QR Code" "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://!ip!:5173"
        
        goto :found
    )
)

echo ❌ Could not detect IP address
echo 💡 Frontend will use localhost - only works on same device
echo 📱 For mobile access, connect to same WiFi network

:found
echo.
pause