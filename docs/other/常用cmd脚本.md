# dos命令备份文件

```bat
title 'Batch Backup'
set date=%Date:~0,4%%Date:~5,2%%Date:~8,2%%Time:~0,2%%Time:~3,2%
xcopy "%~dp0\test-job" "%~dp0\backup\%date%\" /e/y
echo 'Batch Backup Success!'
pause 
```

# cmd启动脚本

```bat
@echo off
title ctb-gen-job
SET CLASSPATH=
SET CURRENT_DIR=%~dp0
SET PROJECT_DIR=%CURRENT_DIR%..

@echo %PROJECT_DIR%

SET CLASSPATH=%CLASSPATH%;%PROJECT_DIR%

SET CLASSPATH=%CLASSPATH%;%PROJECT_DIR%\lib\*

SET APPNAME=com.cosfuture.eiduo.ctb.gen.CTBGenBootstrap

@echo %CLASSPATH%

:java -Xms1g -Xmx1g -Dfile.encoding=GBK -Dsun.stderr.encoding=GBK -Dsun.stdout.encoding=GBK -classpath "%CLASSPATH%" %APPNAME% start
java -Xms1g -Xmx1g -Dfile.encoding=GBK -classpath "%CLASSPATH%" %APPNAME% start
```

# 批量执行.exe

```bat
@echo off
echo Starting eclipse...
start "" "D:\eclipse\jee-neon\eclipse\eclipse.exe"
echo Starting HBuilder...
start "" "D:\HBuilder\HBuilder.exe"
exit
```

# 打开指定网页

```bat
path=%path%; C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
start chrome http://in.zhixue.com/rwgl/dashboard
```

# 批量git

### 批量 clone

url.txt
```
http://gs.mizss.com/cosfuture/EiduoExamination.git
http://gs.mizss.com/cosfuture/mcard-webapp.git
```

clone.bat
```bat
chcp 65001
@echo off

for /f %%i in (url.txt) do git clone %%i

echo 'git clone finish!'
pause
```

### 批量 pull

```bat
chcp 65001
echo off & color 0A

for /d %%f in (D:\www\*) do (
D:
cd %%f
chdir
git pull
)
pause
```



