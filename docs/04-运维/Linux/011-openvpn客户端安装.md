# openVPN

## 1. 卸载旧版本openVPN客户端
```shell
yum remove openvpn
```

## 2. 安装
```shell
yum -y install openvpn
```

## 3. 上传配置文件
上传配置文件至`/etc/openvpn`目录

```shell
$ cd /etc/openvpn/
$ ll
总用量 0
drwxr-x---. 2 root openvpn  6 4月  25 2020 client
drwxr-xr-x. 2 root root    81 11月 17 16:42 eiduo001
drwxr-x---. 2 root openvpn  6 4月  25 2020 server

$ ll eiduo001/
总用量 20
-rw-r--r--. 1 root root 1164 11月 17 16:42 ca.crt
-rw-r--r--. 1 root root 4426 11月 17 16:42 eiduo001.crt
-rw-r--r--. 1 root root 1704 11月 17 16:42 eiduo001.key
-rw-r--r--. 1 root root  520 11月 17 16:42 eiduo001.ovpn
```

## 4. 启动
```shell
cd /etc/openvpn/eiduo001/ && openvpn --daemon openvpn_client --config eiduo001.ovpn
```
    注意：启动时必须先进入到 .ovpn 配置文件所在的目录，然后再启动。

## 5. 配置开机启动

### 5.1 创建启动脚本 `/root/script/start.sh`

```shell
#!/bin/bash
cd /etc/openvpn/eiduo001/ && openvpn --daemon openvpn_client --config eiduo001.ovpn
exit 0
```
### 5.2 启动脚本可执行权限

```shell
chmod +x /root/script/start.sh
```

### 5.3 加入开机启动
```shell
chmod +x /etc/rc.d/rc.local
vim /etc/rc.d/rc.local

## 在文件结尾处追加一行
/root/script/start.sh
```








