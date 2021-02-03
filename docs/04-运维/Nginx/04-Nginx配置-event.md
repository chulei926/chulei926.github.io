
```nginx
events {
    # 参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; 
    # epoll模型 是Linux 2.6以上版本内核中的高性能网络I/O模型，linux建议epoll，如果跑在FreeBSD上面，就用kqueue模型。
    use epoll
    
    
    # 单个进程最大连接数（最大连接数=连接数+进程数）
    # 根据硬件调整，和前面工作进程配合起来用，尽量大，但是别把cup跑到100%就行。
    worker_connections  1024;
    
    # keepalive 超时时间
    keepalive_timeout 60;
    
    # 当某一个时刻只有一个网络连接请求服务器时，服务器上有多个睡眠的进程会被同时叫醒，这样会损耗一定的服务器性能。
    # Nginx中的accept_mutex设置为on，将会对多个Nginx进程（worker processer）接收连接时进行序列化，防止多个进程争抢资源。
    # 默认就是on。
    accept_mutex on;
    
    # nginx worker processer 可以做到同时接收多个新到达的网络连接，前提是把该参数设置为on。
    # 默认为off，即每个worker process一次只能接收一个新到达的网络连接。
    # 想要高并发就要把此参数设置成ON!
    multi_accept on;
    
    # 客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，一般一个请求头的大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。
    # 分页大小可以用命令getconf PAGESIZE 取得。
    # [root@web001 ~]# getconf PAGESIZE
    # 但也有client_header_buffer_size超过4k的情况，但是client_header_buffer_size该值必须设置为“系统分页大小”的整倍数。
    client_header_buffer_size 4k;
    
    # 这个将为打开文件指定缓存，默认是没有启用的。
    # max 指定缓存数量，建议和打开文件数一致
    # inactive 是指经过多长时间文件没被请求后删除缓存
    open_file_cache max=65535 inactive=60s;
    
    
    # 这个是指多长时间检查一次缓存的有效信息。
    # 语法:open_file_cache_valid time 默认值:open_file_cache_valid 60 
    # 使用字段:http, server, location 这个指令指定了何时需要检查open_file_cache中缓存项目的有效信息.
    open_file_cache_valid 80s;
    
    
    # open_file_cache 指令中的inactive参数时间内文件的最少使用次数，如果超过这个数字，文件描述符一直是在缓存中打开的，如上例，如果有一个文件在inactive时间内一次没被使用，它将被移除。
    # 语法:open_file_cache_min_uses number 默认值:open_file_cache_min_uses 1 
    # 使用字段:http, server, location  这个指令指定了在open_file_cache指令无效的参数中一定的时间范围内可以使用的最小文件数,如果使用更大的值,文件描述符在cache中总是打开状态.
    open_file_cache_min_uses 1;
    
    # 语法:open_file_cache_errors on | off 默认值:open_file_cache_errors off 
    # 使用字段:http, server, location 这个指令指定是否在搜索一个文件是记录cache错误.
    open_file_cache_errors on;
}

```

# 补充说明：
### 与apache相类，nginx针对不同的操作系统，有不同的事件模型
#### A）标准事件模型

select、poll属于标准事件模型，如果当前系统不存在更有效的方法，nginx会选择select或poll
- select：只能在Windows下使用，这个事件模型不建议在高负载的系统使用
- poll：Nginx默认首选，但不是在所有系统下都可用

#### B）高效事件模型
- kqueue：使用于FreeBSD 4.1+, OpenBSD 2.9+, NetBSD 2.0 和 MacOS X.使用双处理器的MacOS X系统使用kqueue可能会造成内核崩溃。
- **epoll**：**使用于Linux内核2.6版本及以后的系统**。
- /dev/poll：使用于Solaris 7 11/99+，HP/UX 11.22+ (eventport)，IRIX 6.5.15+ 和 Tru64 UNIX 5.1A+。
- eventport：使用于Solaris 10。 为了防止出现内核崩溃的问题， 有必要安装安全补丁。

### 为什么Nginx总体性能比Apache高？
1. **Nginx使用 epoll和kqueue(freebsd) 异步网络I/O模型**
2. **apache使用传统的 select模型**


指标 | select | epoll
---|---|---
性能 | 随着连接数的增加性能急剧下降。处理成千上万并发连接数，性能很差。 | 随着连接数的增加，性能基本没有下降。处理成千上万并发连接数，性能很好。
连接数 | 连接数有限制，处理的最大连接数不超过1024，如果超过1024，则需要修改FD_SETSIZE宏，并重新编译。 | 连接数无限制
内在处理机制 | 线性轮训 | 回调callback
开发复杂度 | 低 | 中

![epoll&select](/images/nginx/epoll&select.png)
