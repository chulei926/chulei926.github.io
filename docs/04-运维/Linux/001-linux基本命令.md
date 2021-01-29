### 端口占用

### 压缩&解压缩
- tar
    ```shell
    # 压缩
    tar czvf filename.tar dirname
    # 解压缩
    tar zxvf filename.tar
    ```
- gz
    ```shell
    # 压缩
    tar zcvf filename.tar.gz dirname
    tar zcvf filename.tar.gz dirname1 dirname2 dirname3.....
    # 解压缩
    tar zxvf filename.tar.gz
    ```
- bz2
    ```shell
    # 压缩
    tar jcvf filename.tar.bz2 dirname
    # 解压缩
    tar jxvf filename.tar.bz2
    ```
- bz
    ```shell
    # 压缩
    tar jcvf filename.tar.bz dirname
    # 解压缩
    tar jxvf filename.tar.bz
    ```
- z
    ```shell
    # 压缩
    tar zcvf filename.tar.z dirname
    # 解压缩
    tar zxvf filename.tar.z
    ```
- zip
    ```shell
    # 压缩
    zip filename.zip dirname
    # 解压缩
    unzip filename.zip
    ```

### vim编辑器

```shell
:w          # 保存文件但不退出vi
:w file     # 将修改另外保存到file中，不退出vi
:w!         # 强制保存，不推出vi
:wq         # 保存文件并退出vi
:wq!        # 强制保存文件，并退出vi
q:          # 不保存文件，退出vi
:q!         # 不保存文件，强制退出vi
:e!         # 放弃所有修改，从上次保存文件开始再编辑
```

### 用户相关
```shell
useradd -d /usr/username -m username       # 增加用户
passwd username                            # 为用户增加密码
groupadd groupname                         # 新建工作组
usermod -G groupname username              # 将用户添加进工作组
userdel username                           # 删除用户
```

### chown
```shell
chown -R userName /test/            # 将根目录下的test文件夹所有者改为userName 
chown -R john:build /tmp/src        # 将目录 /tmp/src 中所有文件的所有者和组更改为用户 john 和组 build
chown -R tom. /foldName             # 将目录 /foldName 中所有文件的所有者和组更改为用户 tom 和组 tom
```

### ls -h
    查看文件大小

### ll -ht
    查看文件详情，文件大小带单位。

### ifconfig eth0 192.168.64.222 netmask 255.255.255.0    
    配置ip

### route
```shell
route -n                            # 查看网关
route add default gw 192.168.5.1    # 配置网关
```

### 查看网关                       
```shell
netstat -rn  
```
    
### 复制文件夹
```shell
cp -rf apache-tomcat-7.0.68 /nginx-tomcat/
# -f   强制覆盖同名文件
# -r   按递归方式保留原目录结构复制文件
```

### 文件重命名
```shell
mv  oldFileName  newFileName     
```   

### 将文件下载到本地 
```shell
sz fileName
```      

### touch [选项]... 文件...
```shell
# touch命令参数可更改文档或目录的日期时间，包括存取时间和更改时间。
-a   或--time=atime或--time=access或--time=use 　只更改存取时间。
-c   或--no-create 　不建立任何文档。
-d 　使用指定的日期时间，而非现在的时间。
-f 　此参数将忽略不予处理，仅负责解决BSD版本touch指令的兼容性问题。
-m   或--time=mtime或--time=modify 　只更改变动时间。
-r 　把指定文档或目录的日期时间，统统设成和参考文档或目录的日期时间相同。
-t 　使用指定的日期时间，而非现在的时间。
```

### sed 
```shell
# 批量替换多个文件中的字符串
# sed -i "s/原字符串/新字符串/g" `grep 原字符串 -rl 所在目录 `
sed -i "s/hello/111/g"  `grep hello -rl leichu.html`
```

### find
    
```shell
# 在目录中搜索含有固定字符串文件
find . -name '*.log' |xargs grep mathjax    # 在当前目录的所有.log文件中查找mathjax字符。
``` 

### io命令
```shell
iostat -dmx 2
iotop
```

### 日志文件切割
```shell
split -l 10000 app.log -d -a 4 mongo2es_log_
```

