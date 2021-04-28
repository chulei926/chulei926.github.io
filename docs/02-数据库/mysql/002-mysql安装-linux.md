# 安装-linux

## 源码安装

https://www.jianshu.com/p/554eeacb2a2e

https://juejin.im/post/6844903988370866189

### 下载 
```shell
## 下载 mysql 源码
$ wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.20.tar.gz
## 下载 boost
$ wget https://gigenet.dl.sourceforge.net/project/boost/boost/1.59.0/boost_1_59_0.tar.gz
```

### 安装依赖
```shell
$ yum -y install make cmake gcc gcc-c++ perl perl-devel bison ncurses ncurses-devel
```

### 安装
```shell
## 当前目录
$ pwd

/mnt/mysql

$ ll

总用量 132280
-rw-r--r--.  1 root root  83709983 11月 18 15:01 boost_1_59_0.tar.gz
-rw-r--r--.  1 root root  51725558 11月 18 15:00 mysql-5.7.20.tar.gz

## 创建 安装目录
$ mkdir -p /usr/local/soft/mysql

## 创建 配置文件目录
$ mkdir -p /etc/mysql/

## 创建 数据保存目录
$ mkdir -p /mnt/mysql/data

## 解压
$ tar -xzvf boost_1_59_0.tar.gz
$ tar -xzvf mysql-5.7.20.tar.gz

## 执行
cmake . -DCMAKE_INSTALL_PREFIX=/usr/local/soft/mysql \
-DMYSQL_UNIX_ADDR=/usr/local/soft/mysql/mysql.sock \
-DMYSQL_DATADIR=/mnt/mysql/data \
-DDOWNLOAD_BOOST=1 \
-DWITH_BOOST=/mnt/mysql/boost_1_59_0 \
-DSYSCONFDIR=/etc/mysql \
-DWITH_INNOBASE_STORAGE_ENGINE=1 \
-DWITH_PARTITION_STORAGE_ENGINE=1 \
-DWITH_FEDERATED_STORAGE_ENGINE=1 \
-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
-DWITH_MYISAM_STORAGE_ENGINE=1 \
-DENABLED_LOCAL_INFILE=1 \
-DENABLE_DTRACE=0 \
-DDEFAULT_CHARSET=utf8 \
-DDEFAULT_COLLATION=utf8_general_ci \
-DWITH_EMBEDDED_SERVER=1

## 编译 && 安装
## -j参数表示根据CPU核数指定编译时的线程数，可以加快编译速度。默认为1个线程编译，经测试单核CPU，1G的内存，编译完需要将近1个小时。
$ make -j `grep processor /proc/cpuinfo | wc -l`
$ make install
```

### 配置
```shell
## 初始化
$ cd /usr/local/soft/mysql/
$ ./bin/mysqld --initialize-insecure --user=root --basedir=/usr/local/soft/mysql --datadir=/mnt/mysql/data
```








