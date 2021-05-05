# 用户&组

## 用户

### 添加用户
```shell
## 默认情况下，添加用户操作也会相应的增加一个同名的组，用户属于同名组
useradd username        # 创建用户，它不会为用户 username 创建名为 username 的目录作为家目录
useradd -m username     # 该命令为用户创建相应的帐号和用户目录/home/username
passwd username         # 为用户添加设置密码
```

### 删除用户
```shell
userdel username        # 删除用户,但用户的家目录将仍会在/home目录下
userdel -r username     # 完全的删除用户信息，包含用户的家目录
```


## 组

### 查看组
```shell
groups              # 查看当前用户所属的组
more /etc/passwd    # 查看所有用户及权限
more /etc/group     # 查看所有的用户组及权限
```


## 用户和组
```shell
## 将用户加入到组
usermod -G groupNmame username
## 变更用户所属的根组
usermod -g groupName username       # 将用户加入到新的组，并从原有的组中除去
```

## Centos7 普通用户加入sudo组
```shell
## 1. 切换到root用户
su root

## 2. 编辑 /etc/sudoers
vim /etc/sudoers

## 添加下面的内容
leichu ALL=(ALL) NOPASSWD: ALL

################################# 配置说明 ###################################
## youuser ALL=(ALL) ALL
## %youuser ALL=(ALL) ALL
## youuser ALL=(ALL) NOPASSWD: ALL
## %youuser ALL=(ALL) NOPASSWD: ALL
## 
## 第一行:允许用户youuser执行sudo命令(需要输入密码).
## 第二行:允许用户组youuser里面的用户执行sudo命令(需要输入密码).
## 第三行:允许用户youuser执行sudo命令,并且在执行的时候不输入密码.
## 第四行:允许用户组youuser里面的用户执行sudo命令,并且在执行的时候不输入密码.
```

