# JDK环境变量

## Windows

- JAVA_HOME

    ```shell
    C:\dev\Java\jdk1.8.0_121
    ```

- CLASSPATH

    ```shell
    .;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar
    ```

- path
    
    ```shell
    %JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;
    ```

## Linux

-  安装目录

    ```shell
    /usr/local/soft/jdk1.8.0_231/bin/java
    ```
    
-  配置

    ```shell
    vim /etc/profile
    
    # JAVA 环境变量配置
    export JAVA_HOME=/usr/local/soft/jdk1.8.0_231
    export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
    export PATH=$PATH:$JAVA_HOME/bin
    ```

- 生效：

    ```shell
    source /etc/profile
    ```

