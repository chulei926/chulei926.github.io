# 1、NIO 概述
Java NIO(non-blocking IO)是一个可以替代标准Java IO API的IO API（从Java 1.4开始)，Java NIO提供了与标准IO不同的IO工作方式。

# 2、三大核心
**Channel**(通道)，**Buffer**(缓冲区), **Selector**(选择器) 

![overview-channels-buffers](/images/netty/overview-channels-buffers.png)

## 2.1 channel

Java NIO的通道类似流，但又有些不同：
- 既可以从通道中读取数据，又可以写数据到通道。但流的读写通常是单向的。
- 通道可以异步地读写。
- 通道中的数据总是要先读到一个Buffer，或者总是要从一个Buffer中写入。

### 主要实现类：
- FileChannel：           从文件中读写数据。
- DatagramChannel：       能通过UDP读写网络中的数据。
- SocketChannel：         能通过TCP读写网络中的数据。
- ServerSocketChannel：   可以监听新进来的TCP连接，像Web服务器那样。对每一个新进来的连接都会创建一个SocketChannel。

![Channel](/images/netty/Channel.png)


## 2.2 Buffer 的常用实现
Java NIO中的Buffer用于和NIO通道进行交互。
缓冲区本质上是一块可以写入数据，然后可以从中读取数据的内存。
这块内存被包装成NIO Buffer对象，并提供了一组方法，用来方便的访问该块内存。

### 2.2.1 基本用法
- 写入数据到Buffer
- 调用flip()方法
- 从Buffer中读取数据
- 调用 clear() 方法或者 compact() 方法

当向buffer写入数据时，buffer会记录下写了多少数据。一旦要读取数据，需要通过flip()方法将Buffer从写模式切换到读模式。在读模式下，可以读取之前写入到buffer的所有数据。

一旦读完了所有的数据，就需要清空缓冲区，让它可以再次被写入。有两种方式能清空缓冲区：调用clear()或compact()方法。**clear()方法会清空整个缓冲区**。**compact()方法只会清除已经读过的数据**。任何未读的数据都被移到缓冲区的起始处，新写入的数据将放到缓冲区未读数据的后面。

### 2.2.2 Buffer的capacity、position、limit
缓冲区本质上是一块可以写入数据，然后可以从中读取数据的内存。这块内存被包装成NIO Buffer对象，并提供了一组方法，用来方便的访问该块内存。

position 和 limit 的含义取决于 Buffer 处于读模式还是写模式。
不管 Buffer 处在什么模式， capacity 的含义是一样的。

![buffers-modes](/images/netty/buffers-modes.png)

- capacity：
    - 作为一个内存块，Buffer 的大小有一个固定值，也叫“capacity”。
- position：
    - 当写数据到 Buffer 时，position 表示当前的位置。初始的 position=0。当一个 byte、int 等数据写入到 Buffer 后，position 会向前移动到下一个可插入数据的 Buffer 单元。position 最大可为 capacity-1。
    - 当读取数据时，也是从某个特定位置读取。当将 Buffer 从写模式切换到 读模式时，position 会被重置为0。当从 Buffer 的 position 处读取数据时，position 向后移动到下一个可读的位置。 
- limit
    - 在写模式下， Buffer 的 limit 表示最多能往 Buffer 中写多少数据。写模式下，limit 等于 capacity。
    - 当切换到读模式时，limit 表示你最多能读到多少数据。因此，当切换 Buffer 到读模式时，limit 会被切换成写模式下的 position值。（换句话说，可以读到之前写入的所有数据）

### 2.2.3 主要实现类：
- ByteBuffer
- CharBuffer
- DoubleBuffer
- FloatBuffer
- IntBuffer
- LongBuffer
- ShortBuffer
- MappedByteBuffer

![Buffer](/images/netty/Buffer.png)

## 2.3 Selector
Selector允许单线程处理多个 Channel。如果你的应用打开了多个连接（通道），但每个连接的流量都很低，使用Selector就会很方便。

![overview-selectors](/images/netty/overview-selectors.png)

### 2.3.1 为什么使用 selector ？
仅用单个线程来处理多个 channel 的好处是，只需要更少的线程来处理通道。事实上，可以只用一个线程处理所有的通道。对于操作系统来说，线程之间的上下文切换开销很大，而且每个现场都要占用系统的一些资源（如内存）。因此，使用的线程越少越好。

但是，现代的操作系统和CPU在多任务方面表现的越来越好，所以多线程的开销随着时间的推移，变得越来越小。实际上，如果一个CPU有多个内核，不使用多任务可能是在浪费CPU能力。

### 2.3.2 selector 的使用

```java
// Selector的创建

Selector selector = Selector.open();


// 与Selector一起使用时，Channel必须处于非阻塞模式下。
// 这意味着不能将FileChannel与Selector一起使用，因为FileChannel不能切换到非阻塞模式。而套接字通道都可以。

channel.configureBlocking(false);

// 向Selector注册通道

SelectionKey key = channel.register(selector, Selectionkey.OP_READ);

/**
 * 注意register()方法的第二个参数。这是一个“ interest 集合 ”，意思是在通过Selector监听Channel时对什么事件感兴趣。
 * 可以监听四种不同类型的事件：
 * 
 * 1. SelectionKey.OP_CONNECT
 * 2. SelectionKey.OP_ACCEPT
 * 3. SelectionKey.OP_READ
 * 4. SelectionKey.OP_WRITE
 *
 */
 
 // 如果对不止一种事件感兴趣，那么可以用“位或”操作符将常量连接起来，如下：
 int interestSet = SelectionKey.OP_READ | SelectionKey.OP_WRITE;

```

### 2.3.3 SelectionKey

在将 channel 注册到 selector时, register()方法返回了 selectionKey。```SelectionKey key = channel.register(selector, Selectionkey.OP_READ);```

通过 SelectionKey 可以反向获取到 selector 和 channel，一些感兴趣的属性，以及一些附加对象。比如：

- interest集合：interest集合是你所选择的感兴趣的事件集合。可以通过SelectionKey读写interest集合。
```java
int interestSet = selectionKey.interestOps();

boolean isInterestedInAccept  = (interestSet & SelectionKey.OP_ACCEPT) == SelectionKey.OP_ACCEPT；
boolean isInterestedInConnect = interestSet & SelectionKey.OP_CONNECT;
boolean isInterestedInRead    = interestSet & SelectionKey.OP_READ;
boolean isInterestedInWrite   = interestSet & SelectionKey.OP_WRITE;

// 可以看到，用“位与”操作interest 集合和给定的SelectionKey常量，可以确定某个确定的事件是否在interest 集合中。

```
- ready集合：ready 集合是通道已经准备就绪的操作的集合。在一次选择(Selection)之后，你会首先访问这个ready set。
```java
int readySet = selectionKey.readyOps();

// 可以用像检测interest集合那样的方法，来检测channel中什么事件或操作已经就绪。
// 但是，也可以使用以下四个方法，它们都会返回一个布尔类型：

selectionKey.isAcceptable();
selectionKey.isConnectable();
selectionKey.isReadable();
selectionKey.isWritable();
```
- 附加对象：可以将一个对象或者更多信息附着到SelectionKey上，这样就能方便的识别某个给定的通道。例如，可以附加与通道一起使用的Buffer，或是包含聚集数据的某个对象。使用方法如下：
```java
selectionKey.attach(theObject);
Object attachedObj = selectionKey.attachment();

// 还可以在用register()方法向Selector注册Channel的时候附加对象。如：
SelectionKey key = channel.register(selector, SelectionKey.OP_READ, theObject);

```

### 2.3.4 通过 Selector 选择通道

一旦向 selector 注册了一个或多个通道，就可以调用几个重载的 select() 方法，返回感兴趣的事件（如：连接、接收、读、写）已经准备就绪的哪些通道。

换句话说，如果对“读就绪”的通道感兴趣， select() 方法 会返回读事件已经就绪的那些通道。
```java
/**
 * 阻塞到至少有一个通道在你注册的事件上就绪了。
 * 返回值表示 有多少个通道已经就绪。也表示 从上次调用 select() 方法之后 有多少 通道变成了就绪状态。
 */
int select()

/**
 * 和 select() 方法一样，除了最长会阻塞 timeout 毫秒。
 */
int select(long timeout)

/**
 * 不会阻塞，不管什么通道就绪都理解返回。
 */
int selectNow()
```

### 2.3.5 selectedKeys()

一旦调用了 select() 方法，并且返回值表明有一个或多个通道就绪，然后可以通过调用 selector 的 selectedKeys() 方法，访问 “已选择键集” 中的就绪通道。

```java
Set selectedKeys = selector.selectedKeys();
```

当向 selector 注册到 channel 时，Channel.register()方法会返回一个SelectionKey 对象。
这个对象代表了注册到该 Selector 的通道。可以通过SelectionKey的selectedKeySet()方法访问这些对象。

```java
// 可以遍历这个已选择的键集合来访问就绪的通道。如下：
Set selectedKeys = selector.selectedKeys();
Iterator keyIterator = selectedKeys.iterator();
while(keyIterator.hasNext()) {
    SelectionKey key = keyIterator.next();
    if(key.isAcceptable()) {
        // a connection was accepted by a ServerSocketChannel.
    } else if (key.isConnectable()) {
        // a connection was established with a remote server.
    } else if (key.isReadable()) {
        // a channel is ready for reading
    } else if (key.isWritable()) {
        // a channel is ready for writing
    }
    keyIterator.remove();
}
```

这个循环遍历已选择键集中的每个键，并检测各个键所对应的通道就绪事件。

注意每次迭代默认的 ` keyIterator.remove();`调用，Selector不会自己从已选择键集中移除SelectionKey实例。必须在处理完通道时自己移除。下次该通道变成就绪时，Selector会再次将其放入已选择键集中。

SelectionKey.channel()方法返回的通道需要转型成你要处理的类型，如ServerSocketChannel或SocketChannel等。

### 2.3.6 wakeUp()

某个线程调用select()方法后阻塞了，即使没有通道已经就绪，也有办法让其从select()方法返回。只要让其它线程在第一个线程调用select()方法的那个对象上调用Selector.wakeup()方法即可。阻塞在select()方法上的线程会立马返回。

如果有其它线程调用了wakeup()方法，但当前没有线程阻塞在 select() 方法上，下个调用 select() 方法的线程会立即 醒来（wake up）。

### 2.3.7 close()

用完 Selector 后调用其 close() 方法会关闭该 Selector，且使注册到该 Selector 上的所有 SelectionKey 实例无效。通道本身并不会关闭。

### 2.3.8 完整实例
```java
Selector selector = Selector.open();
channel.configureBlocking(false);
SelectionKey key = channel.register(selector, SelectionKey.OP_READ);
while(true) {
  int readyChannels = selector.select();
  if(readyChannels == 0) continue;
  Set selectedKeys = selector.selectedKeys();
  Iterator keyIterator = selectedKeys.iterator();
  while(keyIterator.hasNext()) {
    SelectionKey key = keyIterator.next();
    if(key.isAcceptable()) {
        // a connection was accepted by a ServerSocketChannel.
    } else if (key.isConnectable()) {
        // a connection was established with a remote server.
    } else if (key.isReadable()) {
        // a channel is ready for reading
    } else if (key.isWritable()) {
        // a channel is ready for writing
    }
    keyIterator.remove();
  }
}
```
















































