# 下载镜像registry

```shell
$ docker pull registry
```

# 启动容器

```shell
$ docker run -d -p 5000:5000 --restart=always --name=registry-srv -v /mnt/dockerRegistry:/var/lib/registry registry

#    -d：后台运行
#    -p：将容器的5000端口映射到宿主机的5000端口
#    --restart：docker服务重启后总是重启此容器
#    --name：容器的名称
#    -v：将容器内的/var/lib/registry映射到宿主机的/mnt/dockerRegistry目录

```


---

# 搭建WEB服务

### 下载镜像registry

```shell
$ docker pull hyper/docker-registry-web
```

### 启动容器

```shell
$ docker run -it -d -p 8080:8080 --restart=always --name registry-web --link registry-srv -e REGISTRY_URL=http://registry-srv:5000/v2 -e REGISTRY_NAME=localhost:5000 hyper/docker-registry-web
```

    -it: 以交互模式运行
    --link：链接其它容器(registry-srv)，在此容器中，使用registry-srv等同于registry-srv容器的局域网地址
    -e：设置环境变量


---
### 在另一台机器上配置 docker 仓库

```shell
# 编辑 /etc/docker/daemon.json
$ vim /etc/docker/daemon.json

{
  "registry-mirror": [
    "https://registry.docker-cn.com"
  ],
  "insecure-registries": [
    "[私有仓库 ip:port]"
  ]
}
# 重启 docker 服务
$ systemctl restart docker

```

