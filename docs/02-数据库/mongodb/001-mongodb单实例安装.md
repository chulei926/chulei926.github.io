# 准备mongo linux安装包
```shell
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.4.7.tgz
```

# 解压文件
```shell
tar -xzvf mongodb-linux-x86_64-3.4.7.tgz
```
# 重命名文件夹名称
```shell
mv mongodb-linux-x86_64-3.4.7 mongodb
```
# 进入mongodb目录，创建data/db和logs/mongodb.log
```shell
cd mongo
mkdir data
cd data
mkdir db
cd ../
mkdir logs
cd logs
echo '' > mongodb.log
```

# 进入bin目录，创建mongodb.conf
```shell
cd bin
vim mongodb.conf

dbpath=/software/mongodb/data/db
logpath=/software/mongodb/logs/mongodb.log
port=27017
fork=true
logappend=true
bind_ip=0.0.0.0 
```

# 启动mongodb
```shell
cd bin
./mongod -f mongodb.conf 
```

# 连接mongodb
```shell
./mongo 127.0.0.1:27017
```

# 给MongoDB配置用户名密码
```shell
use admin
db.createUser({user: 'root', pwd: '123456', roles: ['root']})
use dbName
db.createUser({user:'kitty',pwd:'kitty521',roles: [{role:'readWrite',db:'dbName'}]})

db.auth('root', '123456')

./mongod --fork --auth --config /mnt/data/mongodb/mongodb-linux-x86_64-4.0.3/conf/mongodb.conf
```



		