
```nginx
# 运行用户，默认是nginx，可以不进行设置
user www;

# 是否以守护进程的方式运行nginx，守护进程是指脱离终端并且在后头运行的进程，关闭守护进程执行的方式可以让我们方便调试nginx。
# 取值： on|off
daemon on;

# Nginx进程，一般设置和cpu核数一样
worker_processes  8;
worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000;

# 错误日志存放位置
# 日志级别 debug | info | notice | warn | error | crit | alert | emerg
error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

# 进程pid存放位置
pid        logs/nginx.pid;

# 配置Nginx worker进程最大打开文件数
worker_rlimit_nofile 65535;

```

### worker_rlimit_nofile
这个指令是指当一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（ulimit -n）与nginx进程数相除，但是nginx分配请求并不是那么均匀，所以最好与ulimit -n 的值保持一致。
这是因为nginx调度时分配请求到进程并不是那么的均衡，所以假如填写10240，总并发量达到3-4万时就有进程可能超过10240了，这时会返回502错误。

### worker_cpu_affinity
绑定worker进程到指定的cpu内核,每一个worker进程都独享一个CPU，可以在内核的调度策略上实现完全的并发。

配置nginx多核cpu，worker_cpu_affinity使用方法和范例：

> 2核是 01，四核是0001，8核是00000001，有多少个核，就有几位数，1表示该内核开启，0表示该内核关闭。

- 2核cpu，开启2个进程
```nginx
worker_processes     2;
# 01表示启用第一个CPU内核,10表示启用第二个CPU内核
# worker_cpu_affinity 01 10;表示开启两个进程，第一个进程对应着第一个CPU内核，第二个进程对应着第二个CPU内核。
worker_cpu_affinity 01 10;
```

- 2核cpu，开启4个进程
```nginx
worker_processes     4;
# 开启了四个进程，它们分别对应着开启2个CPU内核
worker_cpu_affinity 01 10 01 10;
```

- 4个cpu，开启4个进程
```nginx
worker_processes     4;
# 0001表示启用第一个CPU内核，0010表示启用第二个CPU内核，依此类推
worker_cpu_affinity 0001 0010 0100 1000;
```

- 4核cpu，开启2个进程
```nginx
worker_processes     2;
# 0101 表示开启第一个和第三个内核，1010 表示开启第二个和第四个内核
# 2个进程对应着四个内核
worker_cpu_affinity 0101 1010;
```

- 8核cpu，开启8个进程
```nginx
worker_processes     8;
# 0001表示启用第一个CPU内核，0010表示启用第二个CPU内核，依此类推；
# worker_processes最多开启8个，8个以上性能提升不会再提升了，而且稳定性变得更低，所以8个进程够用了。
worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000;
```
