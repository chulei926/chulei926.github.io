# nexus私服安装

## 安装包及版本信息

    docker.io/sonatype/nexus3

## 安装

```shell
$ docker run -d --name nexus -p 8081:8081 -e INSTALL4J_ADD_VM_PARAMS="-Xms2g -Xmx2g" -v /mnt/data/nexus:/nexus-data --restart=on-failure:10 docker.io/sonatype/nexus3
```

## 配置

    暂无

## 启动

```shell
$ docker start nexus3
```

## 停止

```shell
$ docker stop nexus3
```

## 重启

```shell
$ docker restart nexus3
```

## 如何自动备份数据文件

```shell
/mnt/data/nexus-data/tmp/scrpt/bk.sh
```

## 如何监控并自动重启

```shell
/home/nexus3Watch
nohup ./nexus3Watch.sh &
```
    

### 其他方式

```shell
$ docker run -d -p 8081:8081 --name nexus -e INSTALL4J_ADD_VM_PARAMS="-Xms2g -Xmx2g -XX:MaxDirectMemorySize=3g  -Djava.util.prefs.userRoot=/some-other-dir" sonatype/nexus3
```


### nexus3 修改admin密码

进入到 安装目录
    
第一步：进入OrientDB控制台
```shell
java -jar ./lib/support/nexus-orient-console.jar
```

第二步：进入数据库
```shell
connect plocal:../sonatype-work/nexus3/db/security admin admin
```
    
第三步：重置密码
```shell
update user SET password="$shiro1$SHA-512$1024$NE+wqQq/TmjZMvfI7ENh/g==$V4yPw8T64UQ6GfJfxYq2hLsVrBY8D1v+bktfOxGdt4b/9BthpWPNUy/CBk6V9iA0nHpzYzJFWO8v/tZFtES8CA==" UPSERT WHERE id="admin"
```
