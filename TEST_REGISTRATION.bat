@echo off
echo 🧪 Kisan Setu - Test Registration
echo.

echo 📡 Testing backend connection...
curl -X GET http://localhost:8001/health 2>nul
if %errorlevel% neq 0 (
    echo ❌ Backend not running! Please start with START.bat first
    pause
    exit
)

echo ✅ Backend is running
echo.

echo 🧪 Testing registration endpoint...
curl -X POST http://localhost:8001/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"full_name\":\"Test User\",\"user_type\":\"farmer\",\"password\":\"testpass123\",\"phone\":\"9876543210\"}"

echo.
echo.
echo 🔍 Check the response above for any errors
echo.
pause