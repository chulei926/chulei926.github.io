# 运行模式-伪集群

## Pseudo-Distributed Operation（伪分布式模式）

## 1. 配置集群
### 1.1 修改Hadoop配置文件(hadoop-env.sh)
```shell
[leichu@localhost ~]$ vim /usr/local/hadoop-2.10.0/etc/hadoop/hadoop-env.sh
export JAVA_HOME=/usr/local/jdk1.8.0_231
```

### 1.2 修改Hadoop配置文件(core-site.xml)
```xml
<!-- 官网文档说明：https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/core-default.xml -->
<!-- 指定HDFS中NameNode的地址 -->
<property>
    <name>fs.defaultFS</name>
    <value>hdfs://localhost:9000</value>
</property>
<!-- 指定Hadoop运行时产生文件的存储目录 -->
<property>
	<name>hadoop.tmp.dir</name>
	<value>/mnt/tmp/hadoop/data/tmp</value>
</property>
```

### 1.3 修改Hadoop配置文件(hdfs-site.xml)
```xml
<!-- 官网文档说明：https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml -->
<!-- 指定HDFS副本的数量 -->
<property>
	<name>dfs.replication</name>
	<value>1</value>
</property>
```

## 2. 启动集群
```shell
## 格式化 NameNode (第一次启动时格式化，以后就不要总格式化)
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/bin/hdfs namenode -format

## 启动 NameNode
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/sbin/hadoop-daemon.sh start namenode

## 启动 DataNode
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/sbin/hadoop-daemon.sh start datanode
```

## 3. 查看集群
```shell
## 查看是否启动成功 (jps是JDK中的命令，不是Linux命令。不安装JDK不能使用jps)
[leichu@localhost ~]$ jps
3360 NameNode
3557 Jps
3463 DataNode
```

## 4. web端 查看 HDFS 文件系统
```shell
## 浏览器访问(本地host文件修改 192.168.2.8 big001)
http://big001:50070
```


## 5. 查看日志
```shell
[leichu@localhost ~]$ ll /usr/local/hadoop-2.10.0/logs/
总用量 76
-rw-rw-r--. 1 leichu leichu 29052 7月   4 16:27 hadoop-leichu-datanode-localhost.localdomain.log
-rw-rw-r--. 1 leichu leichu   716 7月   4 16:27 hadoop-leichu-datanode-localhost.localdomain.out
-rw-rw-r--. 1 leichu leichu 33321 7月   4 16:27 hadoop-leichu-namenode-localhost.localdomain.log
-rw-rw-r--. 1 leichu leichu   716 7月   4 16:26 hadoop-leichu-namenode-localhost.localdomain.out
-rw-rw-r--. 1 leichu leichu     0 7月   4 16:26 SecurityAuth-leichu.audit
```

## 6. 操作集群
### 6.1 在 HDFS 文件系统上创建一个 input 文件夹
```shell
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/bin/hdfs dfs -mkdir -p /user/leichu/input
```

### 6.2 将测试内容上传到 HDFS 文件系统上
```shell
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/bin/hdfs dfs -put test/wcinput/wx.txt /user/leichu/input
```

### 6.3 查看 上传的文件是否正确
```shell
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/bin/hdfs dfs -ls /user/leichu/input
Found 1 items
-rw-r--r--   1 leichu supergroup         79 2020-07-04 16:41 /user/leichu/input/wx.txt
[leichu@localhost ~]$ 
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/bin/hdfs dfs -cat /user/leichu/input/wx.txt
hello world
hello kitty
hello
hello hadoop
hello hadoop
hello hdfs
hello spark
```

### 6.4 运行 MapReduce 程序
```shell
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/bin/hadoop jar /usr/local/hadoop-2.10.0/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.10.0.jar wordcount /user/leichu/input /user/leichu/output
```

### 6.5 查看输出结果
```shell
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/bin/hdfs dfs -cat /user/leichu/output/*
hadoop	2
hdfs	1
hello	7
kitty	1
spark	1
world	1
```

### 6.6 将测试的结果文件下载到本地
```shell
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/bin/hdfs dfs -get /user/leichu/output/* ./
[leichu@localhost ~]$ 
[leichu@localhost ~]$ ll
总用量 8
-rw-r--r--. 1 leichu leichu   48 7月   4 16:54 part-r-00000
-rw-r--r--. 1 leichu leichu    0 7月   4 16:54 _SUCCESS
```

### 6.7 删除输出结果
```shell
[leichu@localhost ~]$ /usr/local/hadoop-2.10.0/bin/hdfs dfs -rm -r /user/leichu/output
Deleted /user/leichu/output
```

## 7. 启动 YARN 并运行 MapReduce 程序
```shell
[leichu@big001 ~]$ cd /usr/local/hadoop-2.10.0/etc/hadoop/
```

### 7.1. 修改 YARN 配置文件 (yarn-env.sh)
```shell
[leichu@localhost ~]$ vim yarn-env.sh
export JAVA_HOME=/usr/local/jdk1.8.0_231
```

### 7.2. 修改 YARN 配置文件 (yarn-site.xml)
```shell
[leichu@localhost ~]$ vim yarn-site.xml
```
```xml
<configuration>
    <!-- Reducer获取数据的方式 -->
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <!-- 指定YARN的ResourceManager的地址 -->
    <property>
        <name>yarn.resourcemanager.hostname</name>
        <value>big001</value>
    </property>
</configuration>
```

### 7.3. 修改 MR 配置文件(mapred-env.sh)
```shell
[leichu@big001 ~]$ vim mapred-env.sh 
export JAVA_HOME=/usr/local/jdk1.8.0_231
```

### 7.4. 修改 MR 配置文件(mapred-site.xml，先对mapred-site.xml.template重新命名为mapred-site.xml)
```xml
<configuration>
    <!-- 指定MR运行在YARN上 -->
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```

### 7.5. 启动集群 (启动前必须保证NameNode和DataNode已经启动)
```shell
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/hadoop-daemon.sh start namenode
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/hadoop-daemon.sh start datanode

[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/yarn-daemon.sh start resourcemanager
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/yarn-daemon.sh start nodemanager
```

### 7.6. 集群操作 (执行测试程序)
#### 7.6.1 YARN 的浏览器页面查看，访问 http://big001:8088/cluster
#### 7.6.2 执行测试的 MapReduce 程序
```shell
[leichu@big001 ~]$ hadoop jar /usr/local/hadoop-2.10.0/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.10.0.jar wordcount /user/leichu/input /user/leichu/output
## 注意： 上面命令中的 /user/leichu/input 和 /user/leichu/output 是 HDFS 中的路径。并且，执行前要删除目录 /user/leichu/output
```

#### 7.6.3 从 http://big001:8088/cluster 中打开 当前正在执行的程序 http://big001:8088/cluster/app/application_1593909777898_0001

### 7.7. 配置历史服务(为了查看程序的历史运行情况，需要配置一下历史服务器。具体配置步骤如下)
#### 7.7.1 修改配置文件(mapred-site.xml)，在 mapred-site.xml 中增加下面的配置
```xml
<!-- 历史服务器端地址 -->
<property>
    <name>mapreduce.jobhistory.address</name>
    <value>big001:10020</value>
</property>
<!-- 历史服务器web端地址 -->
<property>
    <name>mapreduce.jobhistory.webapp.address</name>
    <value>big001:19888</value>
</property>
```

#### 7.7.2 启动历史服务
```shell
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/mr-jobhistory-daemon.sh start historyserver
starting historyserver, logging to /usr/local/hadoop-2.10.0/logs/mapred-leichu-historyserver-big001.out
```

#### 7.7.3 查看历史服务器是否启动
```shell
[leichu@big001 ~]$ jps
```

#### 7.7.4 查看 JobHistory：访问 http://big001:19888/jobhistory


## 8. 配置日志聚集
日志聚集概念：应用运行完成以后，将程序运行日志信息上传到 HDFS 系统上。<br>
日志聚集功能好处：可以方便的查看到程序运行详情，方便开发调试。<br>
注意：开启日志聚集功能，需要重新启动 NodeManager 、ResourceManager 和 HistoryManager。<br>


### 8.1 修改 yarn-site.xml，在文件中添加下面的配置项
```shell
[leichu@big001 ~]$ vim /usr/local/hadoop-2.10.0/etc/hadoop/yarn-site.xml 
```
```xml
<!-- 日志聚集功能使能 -->
<property>
    <name>yarn.log-aggregation-enable</name>
    <value>true</value>
</property>

<!-- 日志保留时间设置7天 -->
<property>
    <name>yarn.log-aggregation.retain-seconds</name>
    <value>604800</value>
</property>
 ```   
### 8.2 关闭 NodeManager 、ResourceManager 和 HistoryManager
```shell
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/yarn-daemon.sh stop nodemanager
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/yarn-daemon.sh stop resourcemanager
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/mr-jobhistory-daemon.sh stop historyserver
```

### 8.3 启动 NodeManager 、ResourceManager 和 HistoryManager
```shell
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/yarn-daemon.sh start nodemanager
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/yarn-daemon.sh start resourcemanager
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/sbin/mr-jobhistory-daemon.sh start historyserver
```

### 8.4 删除 HDFS 上已经存在的输出文件目录
```shell
[leichu@big001 ~]$ /usr/local/hadoop-2.10.0/bin/hdfs dfs -rm -R /user/leichu/output
Deleted /user/leichu/output
```

### 8.5 执行测试程序
```shell
[leichu@big001 ~]$ hadoop jar /usr/local/hadoop-2.10.0/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.10.0.jar wordcount /user/leichu/input /user/leichu/output
```

### 8.6 查看日志： 访问 http://big001:19888/jobhistory


