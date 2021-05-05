# 命令

## 1. 格式化 NameNode
```shell
/usr/local/hadoop-2.10.0/bin/hdfs namenode -format
```

## 2. 启动 NameNode
```shell
/usr/local/hadoop-2.10.0/sbin/hadoop-daemon.sh start namenode
```

## 3. 启动 DataNode
```shell
/usr/local/hadoop-2.10.0/sbin/hadoop-daemon.sh start datanode
```

## 4. 在 HDFS 文件系统上创建一个 input 文件夹
```shell
/usr/local/hadoop-2.10.0/bin/hdfs dfs -mkdir -p /user/leichu/input
```

## 5. 将测试内容上传到 HDFS 文件系统上
```shell
/usr/local/hadoop-2.10.0/bin/hdfs dfs -put test/wcinput/wx.txt /user/leichu/input
```

## 6. 运行 MapReduce 程序
```shell
/usr/local/hadoop-2.10.0/bin/hadoop jar /usr/local/hadoop-2.10.0/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.10.0.jar wordcount /user/leichu/input /user/leichu/output
```

## 7. 将测试的结果文件下载到本地
```shell
/usr/local/hadoop-2.10.0/bin/hdfs dfs -get /user/leichu/output/* ./
```

## 8. 删除输出结果
```shell
/usr/local/hadoop-2.10.0/bin/hdfs dfs -rm -r /user/leichu/output
```

## 9. 启动 YARN 集群 (启动前必须保证NameNode和DataNode已经启动)
```shell
/usr/local/hadoop-2.10.0/sbin/yarn-daemon.sh start resourcemanager
/usr/local/hadoop-2.10.0/sbin/yarn-daemon.sh start nodemanager
```

## 10. 启动历史服务
```shell
/usr/local/hadoop-2.10.0/sbin/mr-jobhistory-daemon.sh start historyserver
```