先切换到root权限用户

```shell
cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
wget -P /etc/yum.repos.d/ http://mirrors.aliyun.com/repo/epel-7.repo 
yum clean all  
yum makecache 
```

脚本解释：
```shell
# 备份原始的更新源
cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
```


```shell
# 下载并设置更新源为aliyun
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```


```shell
# 下载并设置EPEL源,此源中包含更多的软件
wget -P /etc/yum.repos.d/ http://mirrors.aliyun.com/repo/epel-7.repo 
```

```shell
# 清理yum缓存
yum clean all  
```


```shell
# 创建yum缓存
yum makecache 
```