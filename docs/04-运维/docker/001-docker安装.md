# 安装

## 1. 卸载系统原有 docker 相关的包

```shell
$ yum remove docker \
                    docker-client \
                    docker-client-latest \
                    docker-common \
                    docker-latest \
                    docker-latest-logrotate \
                    docker-logrotate \
                    docker-engine
```

## 2. 安装依赖包
```shell
$ yum install -y yum-utils device-mapper-persistent-data lvm2 
```

## 3. 设置阿里云镜像源
```shell
$ yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo 
```

## 4. 安装 Docker-CE
```shell
$ yum install docker-ce
```

## 5. 启动docker
```shell
## 开机自启
$ systemctl enable docker 
## 启动docker服务  
$ systemctl start docker
```

---
## 配置阿里镜像加速器

> 可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器

```shell
$ mkdir -p /etc/docker
$ tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": ["https://hd8lc7de.mirror.aliyuncs.com"]
}
EOF

$ systemctl daemon-reload
$ systemctl restart docker
```

---

## GUI管理
- 推荐使用 Portainer 作为容器的 GUI 管理方案。
- 官方地址：```https://portainer.io/install.html```
- 安装命令：

```shell
$ docker volume create portainer_data
$ docker run -d -p 8000:8000 -p 9000:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

访问 ```IP:9000``` 即可进入容器管理页面


# Ubuntu 安装
https://www.jianshu.com/p/c2d7aba34056
```shell
sudo apt install docker.io
```