# 配置文件

```nginx
# 运行用户，默认是nginx，可以不进行设置
#user  nobody;

# Nginx进程，一般设置和cpu核数一样
worker_processes  1;

# 错误日志存放位置
# 日志级别 debug | info | notice | warn | error | crit | alert | emerg
error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

# 进程pid存放位置
#pid        logs/nginx.pid;


events {
    # 单个后台进程的最大并发数 
    worker_connections  1024;
}

http {

    # 文件扩展名和类型映射表
    include       mime.types;
    # 默认的文件类型
    default_type  application/octet-stream;
    
    # 设置日志模式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    # nginx 访问日志的存放位置
    access_log  logs/access.log  main;
    
    # 是否开启高效传输模式 on开启 off关闭
    sendfile        on;
    
    # 减少网络报文段的数量
    tcp_nopush     on;
    
    # 保持连接的时间，也叫超时时间
    #keepalive_timeout  0;
    keepalive_timeout  65;
    
    # 开启gzip压缩模式
    gzip  on;
    
    # 包含的子配置项的位置和文件
    include /etc/nginx/conf.d/*.conf;
    
    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    server {
       listen       80;
       server_name  www.leichu.com;

        resolver 1.2.4.8;

       location /su {
           
       }

       
    }


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```
