@echo off
echo 🌾 Kisan Setu - Starting Application...
echo.

REM Check MongoDB
echo 🔍 Checking MongoDB...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is running
) else (
    echo ⚠️ MongoDB not running - Backend will use mock database
    echo 📝 Note: Registration will work but data won't persist
)

echo.
echo 🚀 Starting Backend...
start "Backend" cmd /k "cd /d %~dp0backend && python -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload"

echo 🎨 Starting Frontend...
timeout /t 3 >NUL
start "Frontend" cmd /k "cd /d %~dp0react-frontend && npm run dev -- --host 0.0.0.0"

echo.
echo ✅ Kisan Setu is starting!
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:8001
echo 📚 API Docs: http://localhost:8001/docs
echo.
echo 🔑 Demo Login: admin / password
echo 📝 Registration: Works with any valid data
echo.
timeout /t 5 >NUL
start http://localhost:5173

pause