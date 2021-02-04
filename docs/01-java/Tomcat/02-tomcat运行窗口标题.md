# 通常在Tomcat bin目录下用`startup.bat`启动Tomcat ，启动窗口显示的Title是Tomcat 

如果遇到一个服务器上多个Tomcat的话就会容易混淆。更改方法如下：

+   在bin目录下找到`catalina.bat` ，用记事本打开
+   找到  `if "%TITLE%" == "" set TITLE=Tomcat`   这句
+   把 `set TITLE=Tomcat`  更改为 `set TITLE=XXX`


![title](/images/tomcat/title.png)