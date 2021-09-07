# HTTPS 配置

环境说明：
1. 开发环境
2. 使用 Windows10 子系统 Ubuntu
3. 在 **子系统** 中 安装 `openresty` 和 `tomcat8801`、`tomcat8802`、`tomcat8803`。
4. 客户端 `app1` 部署在 `tomcat8801`，访问地址：`https://app1.leichu.top/app1/index`。
4. 客户端 `app1` 部署在 `tomcat8802`，访问地址：`https://app2.leichu.top/app2/index`。
4. 认证服务器 `cas` 部署在 `tomcat8803`，访问地址：`https://sso.leichu.top/cas/login`。

![软件部署](/images/cas/软件部署.png)

由于是本地环境，使用 JDK 和 openssl 生成的证书一直不被浏览器信任，所以直接采用阿里云证书。

## 阿里云申请证书

打开阿里云SSL控制台，使用免费证书。最多可以使用20个，这次测试足够了。
1. 创建证书
2. 填写申请信息

分别申请 `sso.leichu.top`、`app1.leichu.top`、`app2.leichu.top` 这三个域名的证书。由于此处是想尽量模拟生产环境，所以下载 Nginx 证书。
并把证书解压放到 `D:\linux\openresty\conf\ssl` 目录。

![aliyun_ssl_1](/images/cas/aliyun_ssl_1.png)
![aliyun_ssl_2](/images/cas/aliyun_ssl_2.png)

## 修改 Nginx 配置
```nginx
upstream app1Upstream {
    server 127.0.0.1:8801 weight=100 max_fails=3 fail_timeout=10s;
}
upstream app2Upstream {
    server 127.0.0.1:8802 weight=100 max_fails=3 fail_timeout=10s;
}
upstream ssoUpstream {
    server 127.0.0.1:8803 weight=100 max_fails=3 fail_timeout=10s;
}

server {
    listen       443 ssl;
    server_name  sso.leichu.top;

    ssl_certificate      /mnt/d/linux/openresty/conf/ssl/6231068_sso.leichu.top_nginx/6231068_sso.leichu.top.pem;
    ssl_certificate_key  /mnt/d/linux/openresty/conf/ssl/6231068_sso.leichu.top_nginx/6231068_sso.leichu.top.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;   #使用该协议进行配置。
    ssl_prefer_server_ciphers on; 

    location / {
        root   html;
        index  index.html index.htm;
    }

    location /cas {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://ssoUpstream/cas;
    }    
}

server {
    listen       443 ssl;
    server_name  app1.leichu.top;

    ssl_certificate      /mnt/d/linux/openresty/conf/ssl/6231069_app1.leichu.top_nginx/6231069_app1.leichu.top.pem;
    ssl_certificate_key  /mnt/d/linux/openresty/conf/ssl/6231069_app1.leichu.top_nginx/6231069_app1.leichu.top.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;   #使用该协议进行配置。
    ssl_prefer_server_ciphers on; 

    location / {
        root   html;
        index  index.html index.htm;
    }

    location /app1 {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://app1Upstream/app1;
    }
}

server {
    listen       443 ssl;
    server_name  app2.leichu.top;

    ssl_certificate      /mnt/d/linux/openresty/conf/ssl/6231071_app2.leichu.top_nginx/6231071_app2.leichu.top.pem;
    ssl_certificate_key  /mnt/d/linux/openresty/conf/ssl/6231071_app2.leichu.top_nginx/6231071_app2.leichu.top.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;   #使用该协议进行配置。
    ssl_prefer_server_ciphers on; 

    location / {
        root   html;
        index  index.html index.htm;
    }

    location /app2 {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://app2Upstream/app2;
    }
}
```

## 修改 hosts 文件
```
127.0.0.1 sso.leichu.top
127.0.0.1 app1.leichu.top
127.0.0.1 app2.leichu.top
```

至此，HTTPS 环境已搭建完成。