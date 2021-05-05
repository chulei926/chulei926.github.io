# Dockerfile各种构建

## Dockerfile 构建 centos
### Dockerfile

```shell
FROM centos:7
MAINTAINER leichu "chulei926@126.com"

RUN yum -y -q install net-tools
RUN yum -y install vim*
```

### build.sh
```shell
#!/usr/bin/env bash
docker build -t leichu-centos .
```
### 修改tag，推送到 私服
```shell
$ docker tag leichu-centos 127.0.0.1:5000/leichu-centos
$ docker push 127.0.0.1:5000/leichu-centos
```

## Dockerfile 构建 jdk

### Dockerfile

```shell
FROM 127.0.0.1:5000/leichu-centos
MAINTAINER leichu "chulei926@126.com"

## 通过 yum 方式安装 
## yum 命令参数 ： -y（当安装过程提示选择全部为"yes"），-q（不显示安装的过程）
RUN yum -y -q install java-1.8.0-openjdk

## 通过 下载安装包 方式安装 
## ADD jdk-8u231-linux-x64.tar.gz /usr/local/java/
## ENV JAVA_HOME /usr/local/java/jdk1.8.0_231
## ENV CLASSPATH .:${JAVA_HOME}/lib:${JRE_HOME}/lib
## ENV PATH ${JAVA_HOME}/bin:$PATH
```

### build.sh

```shell
#!/usr/bin/env bash
docker build -t jdk8 .
```

### build4openjdk.sh

```shell
#!/usr/bin/env bash
docker build -t openjdk8 .
```

### 修改tag，推送到 私服

```shell
docker tag jdk8 127.0.0.1:5000/leichu-jdk
docker push 127.0.0.1:5000/leichu-jdk
```

## Dockerfile 构建 tomcat

### Dockerfile
```shell
FROM 192.168.2.4:5000/leichu-jdk
MAINTAINER leichu "chulei926@126.com"

## 通过 下载安装包 方式安装 
ADD apache-tomcat-8.5.49.tar.gz /
RUN cd / && mv apache-tomcat-8.5.49 tomcat && echo "#!/bin/bash" >> /bin/startTomcat && echo "sh /tomcat/bin/catalina.sh run" >> /bin/startTomcat && chmod +x /bin/startTomcat
EXPOSE 8080
WORKDIR /tomcat
CMD ["startTomcat"]
```

### build.sh
```shell
#!/usr/bin/env bash
docker build -t 192.168.2.4:5000/leichu-tomcat .
```
### 修改tag，推送到 私服
```shell
$ docker push 192.168.2.4:5000/leichu-tomcat
```
### 启动测试
```shell
## -p 9999:8080 将docker内部的8080端口映射成外部的9999端口
$ docker run -itd -p 9999:8080  9a7475d438ee 

## 浏览器访问 http://180.76.183.170:9999/
```

## Dockerfile 构建 elasticsearch 集群

**基于 安装包 构建**

### Dockerfile
```shell
FROM 127.0.0.1:5000/leichu-jdk
MAINTAINER leichu "chulei926@126.com"

## elasticsearch 默认不能使用root用户启动
RUN groupadd -r elasticsearch && useradd -r -g elasticsearch elasticsearch

## 创建 data 和 log 目录
RUN mkdir -p /mnt/elasticsearch/data
RUN mkdir -p /mnt/elasticsearch/logs

## data 和 log 目录的所有者改为 elasticsearch 用户
RUN chown -R elasticsearch. /mnt/*

ADD elasticsearch-7.5.0-linux-x86_64.tar.gz /elasticsearch
RUN cd / && mv elasticsearch-7.5.0 elasticsearch 
RUN chmod +x /elasticsearch/bin/*

RUN ln -s /elasticsearch/bin/elasticsearch /usr/bin/elasticsearch

## /elasticsearch 目录的所有者改为 elasticsearch 用户
RUN chown -R elasticsearch. /elasticsearch

VOLUME /mnt/elasticsearch

EXPOSE 9200
EXPOSE 9300

ENV ES_HOME /elasticsearch
ENV PATH ${ES_HOME}/bin:$PATH

WORKDIR /elasticsearch

USER elasticsearch
RUN [ "elasticsearch" ]
```

### build.sh

```shell
#!/usr/bin/env bash
docker build -t 127.0.0.1:5000/leichu-es .
```

### 启动测试

```shell
## 因为测试机内存太小，故上面执行 build.sh 时，会抛出 Cannot allocate memory 错误！
docker run --name es1 -p 9201:9200 -p 9301:9300 -v "$PWD/start/node1/elasticsearch.yml":/elasticsearch/config/elasticsearch.yml -v "/mnt/node1/data":/elasticsearch/data/ -v "/mnt/node1/logs":/elasticsearch/logs/ --ulimit nofile=65536:131072 -d elasticsearch
docker run --name es2 -p 9202:9200 -p 9302:9300 -v "$PWD/start/node2/elasticsearch.yml":/elasticsearch/config/elasticsearch.yml -v "/mnt/node2/data":/elasticsearch/data/ -v "/mnt/node2/logs":/elasticsearch/logs/ --ulimit nofile=65536:131072 -d elasticsearch
docker run --name es3 -p 9203:9200 -p 9303:9300 -v "$PWD/start/node3/elasticsearch.yml":/elasticsearch/config/elasticsearch.yml -v "/mnt/node3/data":/elasticsearch/data/ -v "/mnt/node3/logs":/elasticsearch/logs/ --ulimit nofile=65536:131072 -d elasticsearch
```

**基于 docker-compose 构建**
```shell
## TODO  内存不够，暂不考虑，docker-compose.yml 参考官网

```
