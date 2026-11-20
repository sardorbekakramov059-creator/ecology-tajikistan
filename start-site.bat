@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 goto usepy
where python >nul 2>nul
if %errorlevel%==0 goto usepython
echo Python o'rnatilmagan. ZIP faylni avval Extract All orqali oching.
echo Keyin index.html faylini ikki marta bosing yoki VS Code Live Server ishlating.
pause
exit /b 1
:usepy
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:8000'"
py -m http.server 8000
exit /b 0
:usepython
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:8000'"
python -m http.server 8000
exit /b 0
