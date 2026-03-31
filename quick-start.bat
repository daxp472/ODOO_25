@echo off
REM StackIt - Quick Start Script for Windows

echo.
echo  🚀 StackIt - Quick Start
echo  ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Node.js is not installed
    echo Download from: https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%

REM Setup Backend
echo.
echo 📦 Setting up Backend...
echo.
cd Backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo ✅ Backend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
    echo ✅ .env created
) else (
    echo ✅ .env already exists
)

REM Ask to seed database
set /p SEED="Do you want to seed the database with sample data? (y/n) "
if /i "%SEED%"=="y" (
    echo.
    echo 🌱 Seeding database...
    call node scripts/seedDatabase.js
    if %errorlevel% equ 0 (
        echo ✅ Database seeded successfully
    ) else (
        echo ⚠️  Database seeding failed
    )
)

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
echo.
cd ..\frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo ✅ Frontend dependencies already installed
)

if not exist ".env.local" (
    echo Creating .env.local file...
    (
        echo VITE_API_URL=http://localhost:5000/api
        echo VITE_SOCKET_URL=http://localhost:5000
    ) > .env.local
    echo ✅ .env.local created
) else (
    echo ✅ .env.local already exists
)

REM Summary
echo.
echo ✅ Setup Complete!
echo.
echo 🚀 To start the application:
echo.
echo Terminal 1 (Backend):
echo   cd Backend
echo   npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:5173
echo.
echo 📝 Demo Credentials:
echo   Email: mike@example.com
echo   Password: Password123
echo.
echo 📖 For detailed setup guide, see: SETUP_GUIDE.md
echo.
pause
