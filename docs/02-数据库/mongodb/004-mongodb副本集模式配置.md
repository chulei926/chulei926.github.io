# 概念：
*  MongoDB 副本集（Replica Set）是有自动故障恢复功能的主从集群，有一个Primary节点和一个或多个Secondary节点组成。类似于MySQL的MMM架构。

*  副本集中数据同步过程：Primary节点写入数据，Secondary通过读取Primary的oplog得到复制信息，开始复制数据并且将复制信息写入到自己的oplog。如果某个操作失败，则备份节点停止从当前数据源复制数据。如果某个备份节点由于某些原因挂掉了，当重新启动后，就会自动从oplog的最后一个操作开始同步，同步完成后，将信息写入自己的oplog，由于复制操作是先复制数据，复制完成后再写入oplog，有可能相同的操作会同步两份，不过MongoDB在设计之初就考虑到这个问题，将oplog的同一个操作执行多次，与执行一次的效果是一样的。简单的说就是：

	当Primary节点完成数据操作后，Secondary会做出一系列的动作保证数据的同步：
	1. 检查自己local库的oplog.rs集合找出最近的时间戳。
	2. 检查Primary节点local库oplog.rs集合，找出大于此时间戳的记录。
	3. 将找到的记录插入到自己的oplog.rs集合中，并执行这些操作。


*  副本集的同步和主从同步一样，都是异步同步的过程，不同的是副本集有个自动故障转移的功能。
其原理是：slave端从primary端获取日志，然后在自己身上完全顺序的执行日志所记录的各种操作（该日志是不记录查询操作的），这个日志就是local数据 库中的oplog.rs表，默认在64位机器上这个表是比较大的，占磁盘大小的5%，oplog.rs的大小可以在启动参数中设 定：--oplogSize 1000,单位是M。

	##### 注意：在副本集的环境中，要是所有的Secondary都宕机了，只剩下Primary。最后Primary会变成Secondary，不能提供服务。


# 配置

## 1. 服务器
	192.168.170.129
	192.168.170.130
	192.168.170.131

## 2. 安装mongodb

*  在mongodb的bin目录下创建data/replset和logs/replset.log。
*  创建replset.conf配置文件。

## 3. 创建配置文件replset.conf，内容如下：
```
dbpath=/software/mongodb/data/replset
logpath=/software/mongodb/logs/replset.log
port=27017
fork=true
logappend=true
bind_ip=0.0.0.0
oplogSize=2048
```

## 4. 在3台服务器上启动mongodb
```shell
./mongod -f replset.conf --replSet myreplset
```
## 5. 副本集初始化

*  
```shell
# 登录到其中一台mongo
./mongo 127.0.0.1:27017

# 配置
config={"_id":"myreplset","members":[{"_id":0,"host":"192.168.170.129:27017"},{"_id":1,"host":"192.168.170.130:27017"},{"_id":2,"host":"192.168.170.131:27017"}]};

# 初始化
rs.initiate(config);

# 查看副本集各节点的状态
rs.status();

# 分别登录另外2台mongodb，分别执行
rs.slaveOk()
```

### mongodb默认是从主节点读写数据的，副本节点上不允许读，需要设置副本节点可读。

* 验证


## 6. 杀进程
```shell
./mongo 127.0.0.1:27017
use admin
db.shutdownServer()
```


# windows下安装副本集

```shell
mongod.exe --config E:\mongodb\mongodb\bin\mongo.conf --serviceName MongoDB --install

mongo.exe 127.0.0.1:27017

config={"_id":"tkReplSet","members":[{"_id":0,"host":"10.8.0.54:27017"},{"_id":1,"host":"10.8.0.54:27018"},{"_id":2,"host":"10.8.0.54:27019"}]};    # 多节点

config={"_id":"tkReplSet","members":[{"_id":0,"host":"127.0.0.1:27017"}]};  # 单节点

rs.initiate(config);

rs.status();

rs.slaveOk();
```


# 创建用户
```shell
use admin
db.createUser({user: 'root', pwd: '123456', roles:[{role:"root",db:"admin"}]})
db.auth('root', '123456')

use ei_tk
db.createUser({user: 'tk_read_test', pwd: '123456', roles: [{ role: "read", db: "ei_tk" }]})
db.auth('tk_read_test', '123456')
```

# 登陆数据库
```shell
mongo.exe 127.0.0.1:27017
use admin
db.auth('root', 'eiduo521')
```

# windows下单节点副本集
```shell
dbpath=S:\database\mongodb-4.0.3-win64\data #数据库路径
logpath=S:\database\mongodb-4.0.3-win64\logs\mongodb.log #日志输出文件路径
logappend=true # 错误日志采用追加模式，配置这个选项后 mongodb 的日志会追加到现有的日志文件，而不是从新创建一个新文件
journal=true # 启用日志文件，默认启用
quiet=true # 这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为 false
port=27017 # 端口号 默认为 27017
bind_ip=0.0.0.0
oplogSize=2048
replSet=leichu_ReplSet
auth=true
wiredTigerCacheSizeGB=2
```

	