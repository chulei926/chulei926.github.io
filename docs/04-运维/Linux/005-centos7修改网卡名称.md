# centos7修改网卡名称

## 1. 编辑/etc/sysconfig/network-scripts/ifcfg-ens33，将里面的NAME和DEVICE项修改为eth0
```shell
vim  /etc/sysconfig/network-scripts/ifcfg-ens33

TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
IPADDR=192.168.159.130
NETMASK=255.255.255.0
GATEWAY=192.168.159.2
DNS1=114.114.114.114
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=eth0
UUID=38d0f48b-1ea4-4a31-96cb-a8942310f892
DEVICE=eth0
ONBOOT=yes
IPV6_PRIVACY=no
```

## 2. 重命名网卡配置文件ifcfg-ens33为ifcfg-eth0
```shell
mv /etc/sysconfig/network-scripts/ifcfg-ens33 /etc/sysconfig/network-scripts/ifcfg-eth0
```

## 3. 编辑/etc/default/grub并加入“net.ifnames=0 biosdevname=0 ”到GRUBCMDLINELINUX变量
```shell
vim /etc/default/grub

GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="$(sed 's, release .*$,,g' /etc/system-release)"
GRUB_DEFAULT=saved
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="crashkernel=auto net.ifnames=0 biosdevname=0 rd.lvm.lv=centos/root rd.lvm.lv=centos/swap rhgb quiet"
GRUB_DISABLE_RECOVERY="true" 
```

## 4. 运行命令grub2-mkconfig -o /boot/grub2/grub.cfg 来重新生成GRUB配置并更新内核参数
```shell
grub2-mkconfig -o /boot/grub2/grub.cfg
```

## 5. 重启系统
```shell
reboot
```