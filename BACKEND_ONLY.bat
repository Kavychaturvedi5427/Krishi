@echo off
echo 🚀 Kisan Setu - Backend Only
echo.

echo 🔍 Checking Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found! Please install Python 3.8+
    pause
    exit
)

echo ✅ Python found
echo.

echo 📦 Installing dependencies...
cd /d "%~dp0backend"
pip install fastapi uvicorn motor pymongo python-dotenv bcrypt python-jose[cryptography] python-multipart

echo.
echo 🚀 Starting Backend Server...
echo 🌐 Backend will run at: http://localhost:8001
echo 📚 API docs at: http://localhost:8001/docs
echo.

python -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload

pause