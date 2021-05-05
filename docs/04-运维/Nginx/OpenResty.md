# OpenResty

OpenResty® 是一个基于 Nginx 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。

## 安装
```shell
#!/bin/sh

##### 安装 nginx 相关依赖
yum install readline-devel pcre-devel openssl-devel gcc curl

wget https://openresty.org/download/openresty-1.11.2.5.tar.gz

tar -xzvf  openresty-1.11.2.5.tar.gz

rm -f openresty-1.11.2.5.tar.gz

cd openresty-1.11.2.5

./configure --prefix=/usr/local/eiduo/ --conf-path=/etc/nginx/conf/nginx.conf --user=www --group=www --with-luajit --with-stream

make
make install

echo 'openresty install success!'
```

