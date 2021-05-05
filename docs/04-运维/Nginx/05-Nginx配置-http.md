# 配置-http


```nginx
#设定http服务器，利用它的反向代理功能提供负载均衡支持
http{
    # 文件扩展名与文件类型映射表
    include mime.types;
    
    # 默认文件类型：二进制
    default_type application/octet-stream;
    
    # 默认编码
    charset utf-8;
    
    # 服务器名字的 hash表 大小
    # 保存服务器名字的hash表是由指令 server_names_hash_max_size 和 server_names_hash_bucket_size 所控制的。
    # 参数hash bucket size总是等于hash表的大小，并且是一路处理器缓存大小的倍数。在减少了在内存中的存取次数后，使在处理器中加速查找hash表键值成为可能。
    # 如果hash bucket size等于一路处理器缓存的大小，那么在查找键的时候，最坏的情况下在内存中查找的次数为2。
    # 第一次是确定存储单元的地址，第二次是在存储单元中查找键 值。
    # 因此，如果Nginx给出需要增大hash max size 或 hash bucket size的提示，那么首要的是增大前一个参数的大小.
    server_names_hash_bucket_size 128;
    
    # 客户端请求头部的缓冲区大小。
    # 这个可以根据你的系统分页大小来设置，一般一个请求的头部大小不会超过1k，
    # 不过由于一般系统分页都要大于1k，所以这里设置为分页大小。
    # 分页大小可以用命令getconf PAGESIZE取得。
    client_header_buffer_size 32k;
    
    # 客户请求头缓冲大小。
    # nginx默认会用 client_header_buffer_size 这个buffer来读取header值，如果header过大，它会使用large_client_header_buffers来读取。
    large_client_header_buffers 4 64k;
    
    # 设定通过nginx上传文件的大小
    client_max_body_size 8m;
    
    # 开启高效文件传输模式
    # sendfile指令指定nginx是否调用sendfile函数（zero copy 方式）来输出文件，对于普通应用设为 on，
    # 如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。
    # 注意：如果图片显示不正常把这个改成off。
    sendfile on;
    
    # 开启目录列表访问，合适下载服务器，默认关闭。
    autoindex on;
    
    # 此选项允许或禁止使用socke的 TCP_CORK 的选项，此选项仅在使用sendfile的时候使用
    tcp_nopush on;
     
    tcp_nodelay on;
    
    # 长连接超时时间，单位是秒
    keepalive_timeout 120;
    
    # FastCGI相关参数是为了改善网站的性能：减少资源占用，提高访问速度。下面参数看字面意思都能理解。
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 128M;
    fastcgi_buffers 12 64M;
    fastcgi_busy_buffers_size 128M;
    fastcgi_temp_file_write_size 256M;
    
    # gzip模块设置
    gzip on; # 开启gzip压缩输出
    gzip_min_length 1k;    # 最小压缩文件大小
    gzip_buffers 4 16k;    # 压缩缓冲区
    gzip_http_version 1.0; # 压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
    gzip_comp_level 2;     # 压缩等级
    gzip_types text/plain application/x-javascript text/css application/xml;    # 压缩类型，默认就已经包含textml，所以下面就不用再写了，写上去也不会有问题，但是会有一个warn。
    gzip_vary on;
    
    # nginx 限制连接模块
    limit_zone crawler $binary_remote_addr 10m;
    limit_req_zone $binary_remote_addr zone=allips:15m rate=1300r/s;
    
    
    #负载均衡配置
    upstream piao.jd.com {
        
    }
    #虚拟主机的配置
    server {
        
    }
}

```

### 1 mime.types

#### 1.1 MIME-type 和 Content-Type 的关系？

当web服务器收到静态的资源文件请求时，依据请求文件的后缀名在服务器的MIME配置文件中找到对应的MIME Type，再根据MIME Type设置HTTP Response的Content-Type，然后浏览器根据Content-Type的值处理文件。

#### 1.2 原理

在浏览器中显示的内容有 HTML、有 XML、有 GIF、还有 Flash ... 浏览器是如何区分它们，决定什么内容用什么形式来显示呢？答案是 MIME Type，也就是该资源的媒体类型。<br>
媒体类型通常是通过 HTTP 协议，由 Web 服务器告知浏览器的，更准确地说，是通过 Content-Type 来表示的。例如:<br>
**Content-Type: text/HTML**  表示内容是 text/HTML 类型，也就是超文本文件。<br>
为什么是“text/HTML”而不是“HTML/text”或者别的什么？MIME Type 不是个人指定的，是经过 ietf 组织协商，以 RFC 的形式作为建议的标准发布在网上的，大多数的 Web 服务器和用户代理都会支持这个规范 (顺便说一句，Email 附件的类型也是通过 MIME Type 指定的)。<br>
通常只有一些在互联网上获得广泛应用的格式才会获得一个 MIME Type，如果是某个客户端自己定义的格式，一般只能以 application/x- 开头。<br>
XHTML 正是一个获得广泛应用的格式，因此，在 RFC 3236 中，说明了 XHTML 格式文件的 MIME Type 应该是 application/xHTML+XML。<br>
当然，处理本地的文件，在没有人告诉浏览器某个文件的 MIME Type 的情况下，浏览器也会做一些默认的处理，这可能和你在操作系统中给文件配置的 MIME Type 有关。比如在 Windows下，打开注册表的`HKEY_LOCAL_MACHINESOFTWAREClassesMIMEDatabaseContent Type`主键，你可以看到所有 MIME Type 的配置信息。

### 2 HTTP限制连接模块
[ngx_http_limit_conn_module](https://nginx.org/en/docs/http/ngx_http_limit_conn_module.html#limit_conn_zone)

#### 2.1 limit_conn_zone（ngx_http_limit_conn_module） 限制一个客户端的并发连接数
> 语法：limit_conn_zone key zone=name:size;

##### 原理：

```nginx
http {
    # 定义了一个 myconn 缓冲区（容器）
    limit_conn_zone $binary_remote_addr zone=myconn:10m;
    server {
        listen  70;
        location / {
            # 每个 IP 只允许一个连接
            limit_conn myconn 1;
            # 限制传输速度（如果有N个并发连接，则是 N * limit_rate）
            limit_rate 1024k;
            proxy_pass http://localhost:7070;
        }
    }
}

# limit_conn_zone 只能配置在 http 范围内；
# $binary_remote_addr 表示客户端请求的IP地址；binary_remote_addr 是一种key，表示基于 remote_addr(客户端IP) 来做限流，binary_ 的目的是压缩内存占用量。
# myconn 自己定义的变量名（缓冲区）；
# limit_rate 限制传输速度
# limit_conn 与 limit_conn_zone 对应，限制网络连接数

```

#### 2.2 limit_req_zone（ngx_http_limit_req_module）  限制 用户的连接频率

> 语法：limit_req_zone key zone=name:size rate=rate;

##### 原理：基于漏桶算法


```nginx
http {
    # 定义了一个 mylimit 缓冲区（容器），请求频率为每秒 1 个请求（nr/s）
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=1r/s;
    server {
        listen  70;
        location / {
            # nodelay 不延迟处理
            # burst 是配置超额处理,可简单理解为队列机制
            # 上面配置同一个 IP 没秒只能发送一次请求（1r/s），这里配置了缓存3个请求，
            # 就意味着同一秒内只能允许 4 个任务响应成功，其它任务请求则失败（503错误）
            limit_req zone=mylimit burst=3 nodelay;
            proxy_pass http://localhost:7070;
        }
    }
}

# limit_req_zone 只能配置在 http 范围内；
# $binary_remote_addr 表示客户端请求的IP地址；
# mylimit 自己定义的变量名；
# rate 请求频率，每秒允许多少请求；
# limit_req 与 limit_req_zone 对应，burst 表示缓存住的请求数，也就是任务队列。

```





#### 2.3 


