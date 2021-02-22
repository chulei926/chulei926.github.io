# 一、安装JDK

# 二、安装Hadoop

## 1. 将Linux安装文件 `hadoop-2.10.0.tar.gz`上传至 `/mnt/e/bigData/hadoop` 目录

## 2. 将 `hadoop-2.10.0.tar.gz` 文件解压到 `/usr/local` 目录下	
```shell	
sudo tar -xzvf /mnt/e/bigData/hadoop/hadoop-2.10.0.tar.gz -C /usr/local/
```

## 3. 修改环境变量
```shell
vim .bashrc
## HADOOP_HOME
export HADOOP_HOME=/usr/local/hadoop-2.10.0
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```

## 4. 使配置文件生效
```shell
source .bashrc
```

## 5. 验证
```shell
$ hadoop
Usage: hadoop [--config confdir] [COMMAND | CLASSNAME]
  CLASSNAME            run the class named CLASSNAME
 or
  where COMMAND is one of:
  fs                   run a generic filesystem user client
  version              print the version
  jar <jar>            run a jar file
                       note: please use "yarn jar" to launch
                             YARN applications, not this command.
  checknative [-a|-h]  check native hadoop and compression libraries availability
  distcp <srcurl> <desturl> copy file or directories recursively
  archive -archiveName NAME -p <parent path> <src>* <dest> create a hadoop archive
  classpath            prints the class path needed to get the
                       Hadoop jar and the required libraries
  credential           interact with credential providers
  daemonlog            get/set the log level for each daemon
  trace                view and modify Hadoop tracing settings

Most commands print help when invoked w/o parameters.
```

# 三、Hadoop目录结构
```shell
$ ll /usr/local/hadoop-2.10.0/
total 156
drwxr-xr-x 1 leichu leichu    512 Oct 23  2019 ./
drwxr-xr-x 1 root   root      512 Jul  1 21:52 ../
-rw-r--r-- 1 leichu leichu 106210 Oct 23  2019 LICENSE.txt
-rw-r--r-- 1 leichu leichu  15841 Oct 23  2019 NOTICE.txt
-rw-r--r-- 1 leichu leichu   1366 Oct 23  2019 README.txt
drwxr-xr-x 1 leichu leichu    512 Oct 23  2019 bin/
drwxr-xr-x 1 leichu leichu    512 Oct 23  2019 etc/
drwxr-xr-x 1 leichu leichu    512 Oct 23  2019 include/
drwxr-xr-x 1 leichu leichu    512 Oct 23  2019 lib/
drwxr-xr-x 1 leichu leichu    512 Oct 23  2019 libexec/
drwxr-xr-x 1 leichu leichu    512 Oct 23  2019 sbin/
drwxr-xr-x 1 leichu leichu    512 Oct 23  2019 share/
```

1. bin目录：	存放对Hadoop相关服务（HDFS,YARN）进行操作的脚本
2. etc目录：	Hadoop的配置文件目录，存放Hadoop的配置文件
3. lib目录：		存放Hadoop的本地库（对数据进行压缩解压缩功能）
4. sbin目录：	存放启动或停止Hadoop相关服务的脚本
5. share目录：	存放Hadoop的依赖jar包、文档、和官方案例
