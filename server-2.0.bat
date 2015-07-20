@ECHO OFF
CLS
ECHO Choose your server to start
ECHO 1. Php server
ECHO 2. Python2 server
ECHO 3. Python3 server
ECHO.

CHOICE /C 123 /M "Enter your choice:"

:: Note - list ERRORLEVELS in decreasing order
IF ERRORLEVEL 3 GOTO PYTHON3
IF ERRORLEVEL 2 GOTO PYTHON2
IF ERRORLEVEL 1 GOTO PHP

:PHP
ECHO Starting php server for this folder on port 8080
php -S localhost:8080 -t .
GOTO End


:PYTHON2
ECHO Starting simple python server for this folder on port 8080
py -2 -m SimpleHTTPServer 8080
GOTO End

:PYTHON3
ECHO Starting simple python server for this folder on port 8080
py -3 -m http.server 8080
GOTO End


:End
