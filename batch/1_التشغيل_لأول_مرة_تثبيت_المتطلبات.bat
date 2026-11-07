@echo off
chcp 65001 >nul
title Google AI Pro (5 TB) - Free Zoot (@Free_Zoot_Dis) - تثبيت المتطلبات والتشغيل
cd /d "%~dp0"
echo ======================================================================
echo   Free Zoot - قناة التليجرام: https://t.me/Free_Zoot_Dis
echo   جاري تثبيت متطلبات ومكتبات بايثون (fastapi, uvicorn, playwright)...
echo ======================================================================
python -m pip install -r requirements.txt
echo.
echo ======================================================================
echo   جاري تشغيل لوحة التحكم (http://127.0.0.1:8765) ...
echo   انضم إلينا على تليجرام: https://t.me/Free_Zoot_Dis
echo ======================================================================
start "" "https://t.me/Free_Zoot_Dis"
start "" "http://127.0.0.1:8765"
python app.py
pause
