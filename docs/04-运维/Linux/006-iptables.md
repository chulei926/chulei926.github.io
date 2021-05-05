# iptables

CentOS 7.0默认使用的是firewall作为防火墙，使用iptables必须重新设置一下

## 1.直接关闭防火墙

```shell
systemctl stop firewalld        # 停止firewall
systemctl disable firewalld     # 禁止firewall开机启动
```
## 2.设置 iptables service

```shell
yum -y install iptables-services
```

## 3. 修改规则

```shell
## 如果要修改防火墙配置，如增加防火墙端口3306
vi /etc/sysconfig/iptables 
## 增加规则
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT
## 保存退出后
systemctl restart iptables.service  # 重启防火墙使配置生效
systemctl enable iptables.service   # 设置防火墙开机启动
## 最后重启系统使设置生效即可。
reboot
```

## 端口开放规则

- 单个端口
    - -A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT
    - -A INPUT -m state --state NEW -m tcp -p tcp --dport 27017 -j ACCEPT

- 批量端口
    - 5000:10000  表示 5000 到 10000 之间的所有端口
    - :10000   表示 10000 及以下所有端口
    - 5000:   表示 5000 及以上所有端口

```
-A INPUT -m state --state NEW -m tcp -p tcp --dport 5000:10000 -j ACCEPT
```
    
