# java-war包部署

## 构建 war 包
```shell
$ maven clean package
```

## Dockerfile
```shell
FROM 192.168.2.4:5000/leichu-tomcat
MAINTAINER leichu "chulei926@126.com"

COPY common-web.war /tomcat/webapps/
RUN echo "#!/bin/bash" >> /bin/startTomcat && echo "sh /tomcat/bin/catalina.sh run" >> /bin/startTomcat && chmod +x /bin/startTomcat
EXPOSE 8080
WORKDIR /tomcat
CMD ["startTomcat"]

```

## build.sh
```shell
#!/usr/bin/env bash
docker build -t 192.168.2.4:5000/leichu-web-test:v1 .
```

## 启动测试
```shell
$ docker run -itd --name webtest -p 8080:8080 84bb918f2c56

## 浏览器访问 http://180.76.183.170:9999/
```


