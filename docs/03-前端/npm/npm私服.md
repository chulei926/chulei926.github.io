# 环境准备
1. Linux（Centos7）一台
2. nexus安装包（nexus-3.25.1-02-unix.tar.gz）

# 安装
注意：以下所有操作都在 leichu 用户下完成

### 1. 上传 nexus 安装包 到Linux服务器的 /usr/local 下

### 2. 创建 nexus 目录，修改所有者
```shell
sudo mkdir nexus
sudo chown -R leichu. nexus
```

### 3. 解压安装包 到 nexus 目录
```shell
# 解压
tar -xzvf nexus-3.25.1-02-unix.tar.gz -C ./nexus
# 查看
ll nexus
drwxrwxr-x. 9 leichu leichu 188 7月  31 12:50 nexus-3.25.1-02
drwxrwxr-x. 3 leichu leichu  20 7月  31 12:43 sonatype-work
```

### 4. 启动
```shell
/usr/local/nexus/nexus-3.25.1-02/bin/nexus start
 ```

### 5. 浏览器 访问查看
```
http://192.168.2.14:8081/
or
http://study:8081/
```


# npm 配置
![配置](/images/npm/配置.png)

### 1. 创建 Blob Stores（npm-stores）
![npm-stores](/images/npm/npm-stores.png)

### 2. 创建 Repositories

#### 2.1 创建 npm-hosted
![npm-hosted](/images/npm/npm-hosted.png)

#### 2.2 创建 npm-proxy
![npm-proxy](/images/npm/npm-proxy.png)

#### 2.3 创建 npm-group
![npm-group](/images/npm/npm-group.png)

### 3. 配置 Realms
![Realms](/images/npm/Realms.png)

### 4. 创建角色 nx-deploy
![nx-deploy](/images/npm/nx-deploy.png)

### 5. 创建用户 deployer（密码：deployer）
![deployer](/images/npm/deployer.png)




