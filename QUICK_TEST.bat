@echo off
echo 🧪 Quick Registration Test
echo.

echo 📡 Testing backend health...
curl -s http://localhost:8001/health
if %errorlevel% neq 0 (
    echo ❌ Backend not running! Start with START.bat first
    pause
    exit
)

echo.
echo ✅ Backend is healthy
echo.

echo 🧪 Testing registration...
curl -X POST http://localhost:8001/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser123\",\"email\":\"test123@example.com\",\"full_name\":\"Test User\",\"user_type\":\"farmer\",\"password\":\"password123\",\"phone\":\"1234567890\"}" ^
  -w "\nStatus: %%{http_code}\n"

echo.
echo 🧪 Testing login...
curl -X POST http://localhost:8001/auth/login ^
  -H "Content-Type: application/x-www-form-urlencoded" ^
  -d "username=testuser123&password=password123" ^
  -w "\nStatus: %%{http_code}\n"

echo.
pause