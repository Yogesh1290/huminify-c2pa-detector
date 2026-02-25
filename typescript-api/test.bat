@echo off
REM Simple test script for TypeScript API

if "%1"=="" (
    echo Usage: test.bat ^<image-file^>
    echo.
    echo Examples:
    echo   test.bat ..\examples\ChatGPT_Image.png
    echo   test.bat ..\examples\test2.png
    echo.
    exit /b 1
)

node test.js %1
