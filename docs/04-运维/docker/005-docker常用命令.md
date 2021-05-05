# 常用命令

```shell

$ docker images                                                   # 查看镜像            
$ docker ps                                                       # 查看正在运行的容器
$ docker start name                                               # 启动
$ docker stop name                                                # 停止
$ docker restart name                                             # 重启
$ docker build -t tomcat-test .                                   # 使用当前路径下的Dockerfile创建tomcat镜像，镜像名称tomcat-test
$ docker build -t 192.168.195.95:5000/tk-es-pro .                 # 使用当前路径下的Dockerfile创建ES镜像，镜像名称tk-es-pro
$ docker push  192.168.195.95:5000/tk-es-pro                      # 把镜像tk-es-pro推送到仓库
$ docker rmi tomcat-test                                          # 删除镜像tomcat-test
$ docker exec -it  name  /bin/sh                                  # 进入正在执行的容器
$ docker cp report-gen-job:/cf/logs/report-gen-job/app.log ./     # 将docker容器内的日志文件拷贝到所在机器的指定目录下
$ docker cp base-service:/services/base-service ./
$ docker cp /root/tmp/web/ container-webapp:/webapps/container/   # 
$ docker run --name=kitty -itd tomcat-test                        # 使用tomcat-test镜像 后台方式启动 名称为kitty的docker容器
$ docker run -p 9999:8080 --name=kitty -itd tomcat-test
$ docker run -p 9999:8080 --name=kitty -v /root/work/kitty/logs/demo1:/cf/logs -itd tomcat-kitty
$ docker run -p 9991:8080 --name=kitty1 -v /root/work/kitty/logs/shell1:/cf/logs -itd tomcat-test
$ docker run -p 9992:8080 --name=kitty2 -v /root/work/kitty/logs/shell2:/cf/logs -itd tomcat-test
$ docker run --name=user-service -v /cf/logs/:/cf/logs/ -itd 192.168.195.95:5000/user-service:v1.0.90-test                              # 从仓库拉取镜像并启动
$ docker run --name=user-service --restart=on-failure:10 -v /cf/logs/:/cf/logs/ -itd 192.168.195.95:5000/user-service:v1.0.138          # 从仓库拉取镜像并启动（--restart=on-failure:10 进程退后自动重启）
$ docker run --name=user-service-node1 --restart=on-failure:10 -v /cf/logs/node1:/cf/logs -itd 192.168.195.95:5000/user-service:v1.0.138  # --restart=on-failure:10 进程退后自动重启

```

```shell

$ docker rmi `docker images -q`                             # 直接删除所有镜像

$ docker rm `docker ps -aq`                                 # 直接删除所有容器

$ docker rmi `docker images | grep xxxxx | awk '{print $3}'`# 按条件筛选之后删除镜像

$ docker rm `docker ps -a | grep xxxxx | awk '{print $1}'   # 按条件筛选之后删除容器
```
