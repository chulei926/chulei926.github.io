# curl

curl是一个非常实用的、用来与服务器之间传输数据的工具；支持的协议包括 (DICT, FILE, FTP, FTPS, GOPHER, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, POP3, POP3S, RTMP, RTSP, SCP, SFTP, SMTP, SMTPS, TELNET and TFTP)，curl设计为无用户交互下完成工作；

curl提供了一大堆非常有用的功能，包括代理访问、用户认证、ftp上传下载、HTTP POST、SSL连接、cookie支持、断点续传...。
 
## curl命令语法：
```shell
curl [options] [URL...]
```

## curl get
```shell
# with JSON
curl -i -H "Accept: application/json" -H "Content-Type: application/json" https://proxy.mimvp.com/ip.php

# with XML
curl -H "Accept: application/xml" -H "Content-Type: application/xml" -X GET https://proxy.mimvp.com/ip.php
```

## curl post

```shell
# For posting data
curl --data "param1=value1&param2=value2" https://proxy.mimvp.com/ip.php

# For file upload
curl --form "fileupload=@filename.txt" https://proxy.mimvp.com/ip.php
```

## curl HTTP Header

```shell
curl  -v  https://www.baidu.com     # 返回 request header   request body   response header   response body
curl -i  https://www.baidu.com      # 返回 response header 和 response body
curl -I www.baidu.com               # 返回 response header
```


对于"User-Agent", "Cookie", "Host"这类标准的HTTP头部字段，通常会有另外一种设置方法。

curl命令提供了特定的选项来对这些头部字段进行设置：

-A (or --user-agent): 设置 "User-Agent" 字段.
-b (or --cookie): 设置 "Cookie" 字段.
-e (or --referer): 设置 "Referer" 字段.

以下两个命令是等效的。这两个命令同样都对HTTP头的"User-Agent"字符串进行了更改。

```shell
$ curl -H "User-Agent: my browser" "https://proxy.mimvp.com/demo/"
$ curl -A "my browser" "https://proxy.mimvp.com/demo/"
```


## curl代理

###  curl命令设置http代理：
```shell
# 指定http代理IP和端口
curl -x 113.185.19.192:80 http://aiezu.com/test.php
curl --proxy 113.185.19.192:80 http://aiezu.com/test.php
 
#指定为http代理
curl -x http_proxy://113.185.19.192:80 http://aiezu.com/test.php
 
#指定为https代理
curl -x HTTPS_PROXY://113.185.19.192:80 http://aiezu.com/test.php
 
#指定代理用户名和密码，basic认证方式
curl -x aiezu:123456@113.185.19.192:80 http://aiezu.com/test.php
curl -x 113.185.19.192:80 -U aiezu:123456 http://aiezu.com/test.php
curl -x 113.185.19.192:80 --proxy-user aiezu:123456 http://aiezu.com/test.php
 
#指定代理用户名和密码，ntlm认证方式
curl -x 113.185.19.192:80 -U aiezu:123456 --proxy-ntlm http://aiezu.com/test.php
 
#指定代理协议、用户名和密码，basic认证方式
curl -x http_proxy://aiezu:123456@113.185.19.192:80 http://aiezu.com/test.php
```

###  curl命令设置socks代理：

```shell
#使用socks4代理，无需认证方式
curl --socks4 122.192.32.76:7280 http://aiezu.com/test.php
curl -x socks4://122.192.32.76:7280 http://aiezu.com/test.php
 
#使用socks4a代理，无需认证方式
curl --socks4a 122.192.32.76:7280 http://aiezu.com/test.php
curl -x socks4a://122.192.32.76:7280 http://aiezu.com/test.php
 
#使用socks5代理，basic认证方式
curl --socks5 122.192.32.76:7280 -U aiezu:123456 http://aiezu.com/test.php
curl -x socks5://aiezu:123456@122.192.32.76:7280 http://aiezu.com/test.php
 
#使用socks5代理，basic认证方式，ntlm认证方式
curl -x socks5://aiezu:123456@122.192.32.76:7280 --proxy-ntlm http://aiezu.com/test.php
```