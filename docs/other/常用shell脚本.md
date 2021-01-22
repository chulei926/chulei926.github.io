# java 启动脚本
```shell
#!/bin/sh

if [ -z "$1" ]; then
	echo "请在参数中指定进程Id文件的名称！"
	exit 1
fi

CURRENT_DIR=$(pwd)
PROJECT_DIR=$CURRENT_DIR"/.."

# echo $PROJECT_DIR

CLASSPATH=
CLASSPATH=$CLASSPATH:$PROJECT_DIR

for i in "$PROJECT_DIR"/lib/*.jar;do
	CLASSPATH="$CLASSPATH":"$i"
done

# echo $CLASSPATH

APPNAME=com.cosfuture.eiduo.ctb.CTBServerBootstrap

java -Xms${service.mem} -Xmx${service.mem} -classpath $CLASSPATH $APPNAME >/dev/null 2>&1 &

echo $! > "/var/pid/ctb-service-$1.pid"

echo "started"

```


# java 停止脚本
```shell
#!/bin/sh

if [ -z "$1" ]; then
        echo "请在参数中指定进程Id文件的名称！"
        exit 1
fi

kill -9 `cat "/var/pid/ctb-service-$1.pid"`

rm -f "/var/pid/ctb-service-$1.pid" >/dev/null 2>&1

echo "stoped"

```

# 切换到 es 用户启动 elasticsearch

```shell

#!/bin/bash

su - es <<EOF

echo "开始启动 ES1......"
nohup /mnt/es/es1/bin/elasticsearch >/dev/null 2>&1 &
echo "ES1 启动成功......"

sleep 3s

echo "开始启动 ES2......"
nohup /mnt/es/es2/bin/elasticsearch >/dev/null 2>&1 &
echo "ES2 启动成功......"

sleep 3s

echo "开始启动 ES3......"
nohup /mnt/es/es3/bin/elasticsearch >/dev/null 2>&1 &
echo "ES3 启动成功......"

EOF

```

# 批量杀进程脚本
```shell

#!/bin/bash
kill -9 $(ps -ef | grep elasticsearch | grep -v grep | awk '{print $2}')

## 杀指定端口
# kill -9 $(netstat -nlp | grep :9200 | awk '{print $7}' | awk -F"/" '{ print $1 }')

exit 0
```


# 基于docker容器使用Jacoco实现webapp测试覆盖率监控
自行下载jacoco最新版本，主要用到两个jar包：jacocoagent.jar，jacococli.jar
替换JVM参数，把jacoco两个jar包放在tomcat/bin目录，执行定时器设置脚本，auto.sh脚本内容：
### auto.sh
```shell
#!/bin/sh
sed -i 's/server/server -javaagent:jacocoagent.jar=includes=com.*,output=tcpserver,port=6300,address=127.0.0.1/g' /usr/local/tomcat/bin/setenv.sh
cd /usr/local/tomcat/bin && rm -rf jacoco*.jar && wget 192.168.195.93:9999/jacocoagent.jar && wget 192.168.195.93:9999/jacococli.jar
cd /usr/local/tomcat/bin && rm -rf auto_dump.sh && wget 192.168.195.93:9999/auto_dump.sh && chmod +x auto_dump.sh
echo '*/10     *       *       *       *       /usr/local/tomcat/bin/auto_dump.sh' >> /etc/crontabs/root
crond restart
```
每隔10分钟定时导出覆盖率报告，auto_dump.sh脚本内容：
### auto_dump.sh
```shell
#!/bin/sh
cd /usr/local/tomcat/webapps
fn=`basename *.war`
name="${fn%%.*}"
mkdir -p /usr/local/tomcat/webapps/jacoco
java -jar /usr/local/tomcat/bin/jacococli.jar dump --address localhost --port 6300 --destfile /usr/local/tomcat/webapps/jacoco/jacoco.exec
echo 'dump success'
java -jar /usr/local/tomcat/bin/jacococli.jar report /usr/local/tomcat/webapps/jacoco/jacoco.exec --html /usr/local/tomcat/webapps/jacoco --classfiles /usr/local/tomcat/webapps/$name/WEB-INF/classes/
echo 'report generate success'
```
### 每个容器都要执行以下命令:
```shell
RUN echo "cd /usr/local/tomcat/bin && rm -rf auto.sh && wget 192.168.195.93:9999/auto.sh && chmod +x auto.sh" >> /bin/startWeb && echo "/usr/local/tomcat/bin/auto.sh" >> /bin/startWeb
```
