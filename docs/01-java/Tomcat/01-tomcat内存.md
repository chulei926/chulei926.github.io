# Windows
在`tomcat_home/bin`目录下找到`catalina.bat`，加上下面一行：

```batch
set JAVA_OPTS= -Xms1024M -Xmx1024M -XX:PermSize=256M -XX:MaxNewSize=256M -XX:MaxPermSize=256M

: -Xms1024M：初始化堆内存大小（注意，不加M的话单位是KB）
: -Xmx1029M：最大堆内存大小
: -XX:PermSize=256M：初始化类加载内存池大小
: -XX:MaxPermSize=256M：最大类加载内存池大小
```

    
    
    
# Linux
```shell
# -server:一定要作为第一个参数，在多个CPU时性能佳

# -Xms：初始Heap大小，使用的最小内存,cpu性能高时此值应设的大一些
# -Xmx：java heap最大值，使用的最大内存
# 上面两个值是分配JVM的最小和最大内存，取决于硬件物理内存的大小，建议均设为物理内存的一半。
    
# -XX:PermSize:设定内存的永久保存区域
# -XX:MaxPermSize:设定最大内存的永久保存区域
# -XX:MaxNewSize:
# -Xss 15120 这使得JBoss每增加一个线程（thread)就会立即消耗15M内存，而最佳值应该是128K,默认值好像是512k.
# +XX:AggressiveHeap 会使得 Xms没有意义。这个参数让jvm忽略Xmx参数,疯狂地吃完一个G物理内存,再吃尽一个G的swap。
# -Xss：每个线程的Stack大小
# -verbose:gc 现实垃圾收集信息
# -Xloggc:gc.log 指定垃圾收集日志文件
# -Xmn：young generation的heap大小，一般设置为Xmx的3、4分之一
# -XX:+UseParNewGC ：缩短minor收集的时间
# -XX:+UseConcMarkSweepGC ：缩短major收集的时间
# 提示：此选项在Heap Size 比较大而且Major收集时间较长的情况下使用更合适。

JAVA_OPTS="-server -Xms512m -Xmx4096m -XX:PermSize=256m -XX:MaxPermSize=512m"
```
