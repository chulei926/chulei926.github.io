# Kafka Eagle
给kafka配一个web版的管理页面或仪表盘，管理起来更加方便

- [官网](https://www.kafka-eagle.org/)
- [下载](http://download.kafka-eagle.org/)

## 安装
### 1. 下载安装包，解压到`/usr/local/soft/kafka-eagle-web-2.0.5`
### 2. 修改配置文件`/usr/local/soft/kafka-eagle-web-2.0.5/conf/system-config.properties`

```shell
######################################
# multi zookeeper & kafka cluster list
######################################
kafka.eagle.zk.cluster.alias=cluster1
cluster1.zk.list=big002:2181,big003:2181,big004:2181/kafka # 注意此处后面的 /kafka，如果kafka集群的zk地址后面不带 /kafka，此处也不要带。
######################################
# kafka eagle webui port
######################################
kafka.eagle.webui.port=8048
######################################
# kafka sqlite jdbc driver address
######################################
kafka.eagle.driver=org.sqlite.JDBC
kafka.eagle.url=jdbc:sqlite:/usr/local/soft/kafka-eagle-web-2.0.5/db/ke.db # kafka eagle 默认使用 sqlite 数据库，此处只用配置 sqlite 数据库的地址就行
kafka.eagle.username=root
kafka.eagle.password=www.kafka-eagle.org
```
### 3. 启动
```shell
$ cd /usr/local/soft/kafka-eagle-web-2.0.5
$ bin/ke.sh start
```
如果出现如下提示说明安装启动成功
```log
[2021-06-05 15:36:20] INFO: Port Progress: [##################################################] | 100%
[2021-06-05 15:36:23] INFO: Config Progress: [##################################################] | 100%
[2021-06-05 15:36:27] INFO: Startup Progress: [##################################################] | 100%
[2021-06-05 15:36:16] INFO: Status Code[0]
[2021-06-05 15:36:16] INFO: [Job done!]
Welcome to
    __ __    ___     ____    __ __    ___            ______    ___    ______    __     ______
   / //_/   /   |   / __/   / //_/   /   |          / ____/   /   |  / ____/   / /    / ____/
  / ,<     / /| |  / /_    / ,<     / /| |         / __/     / /| | / / __    / /    / __/   
 / /| |   / ___ | / __/   / /| |   / ___ |        / /___    / ___ |/ /_/ /   / /___ / /___   
/_/ |_|  /_/  |_|/_/     /_/ |_|  /_/  |_|       /_____/   /_/  |_|\____/   /_____//_____/   
                                                                                             

Version 2.0.5 -- Copyright 2016-2021
*******************************************************************
* Kafka Eagle Service has started success.
* Welcome, Now you can visit 'http://192.168.2.10:8048'
* Account:admin ,Password:123456
*******************************************************************
* <Usage> ke.sh [start|status|stop|restart|stats] </Usage>
* <Usage> https://www.kafka-eagle.org/ </Usage>
*******************************************************************
```

### 4. 访问 
浏览器打开 `http://192.168.2.10:8048/`
![eagle-home](/images/bigData/kafka/eagle-home.png)

![eagle-zk-kafka](/images/bigData/kafka/eagle-zk-kafka.png)

![eagle-topic](/images/bigData/kafka/eagle-topic.png)

