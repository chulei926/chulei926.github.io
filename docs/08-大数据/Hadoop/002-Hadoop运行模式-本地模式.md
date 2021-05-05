# 运行模式-本地模式

## Standalone Operation（本地模式）
运行官网grep样例：
```shell
leichu@leichu:~/test$ mkdir input
leichu@leichu:~/test$ cp /usr/local/hadoop-2.10.0/etc/hadoop/*.xml input/
leichu@leichu:~/test$ hadoop jar /usr/local/hadoop-2.10.0/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.10.0.jar grep input output 'dfs[a-z.]+'

leichu@leichu:~/test$ ll output/
total 0
drwxrwxrwx 1 leichu leichu 512 Jul  1 22:32 ./
drwxrwxrwx 1 leichu leichu 512 Jul  1 22:31 ../
-rw-r--r-- 1 leichu leichu   8 Jul  1 22:31 ._SUCCESS.crc
-rw-r--r-- 1 leichu leichu  12 Jul  1 22:31 .part-r-00000.crc
-rw-r--r-- 1 leichu leichu   0 Jul  1 22:31 _SUCCESS
-rw-r--r-- 1 leichu leichu  11 Jul  1 22:31 part-r-00000
leichu@leichu:~/test$ cat output/*
1       dfsadmin
leichu@leichu:~/test$
```

运行官网WordCount样例：
```shell
leichu@leichu:~/test$ mkdir wcinput
leichu@leichu:~/test$ cd wcinput/
leichu@leichu:~/test/wcinput$ vim wc.txt
## 输入以下内容
hello world
hello kitty
hello
hello hadoop
hello hadoop
hello hdfs
hello spark
```

```shell
leichu@leichu:~/test$ hadoop jar /usr/local/hadoop-2.10.0/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.10.0.jar wordcount wcinput wcoutput
```

```shell
leichu@leichu:~/test$ cat wcoutput/*
hadoop  2
hdfs    1
hello   7
kitty   1
spark   1
world   1
```



