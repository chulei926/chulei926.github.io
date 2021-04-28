# Scatter&Gather

Java NIO 开始支持 **Scatter**/**Gather**，Scatter/Gather 用于**描述从 channel 中读取或写入到 channel 的操作**。

分散（scatter）从 channel 中读取是指在读操作时将读取的数据写入到多个 buffer 中。因此，channel 将从 channel 中读取的数据分散（scatter）到多个 buffer 中。

聚集（gather）写入 channel 是指在写操作时将多个buffer 的数据写入到同一个 channel，因此 channel 将多个 buffer 中的数据聚集（gather）后发送到 channel。

scatter/gather 经常用于需要将传输的数据分开处理的场合，例如，传输一个由 消息头 和 消息体 组成的信息，你可能会将消息体和消息头分散在不同的 buffer 中，这样可以方便的处理 消息头 和 消息体。

## Scattering Reads

Scattering Reads是指数据从一个channel读取到多个buffer中。如下图描述：

![scatter](/images/netty/scatter.png)

代码示例如下：

```java
ByteBuffer header = ByteBuffer.allocate(128);
ByteBuffer body   = ByteBuffer.allocate(1024);

ByteBuffer[] bufferArray = { header, body };

channel.read(bufferArray);
```
注意：buffer 首先被插入到数组，然后再将数组作为 channel.read()的输入参数。read()方法按照buffer在数组中的顺序将从 channel 中读取数据写入到 buffer，当一个 buffer 被写满后，channel 紧接着向另一个 buffer 中写。

Scattering Reads 在移动下一个 buffer 钱，必须填满当前的 buffer，这也意味着它不适用于动态消息。（换句话说，如果存在消息体 和 消息头，消息头必须完成填充），Scattering Reads 才能正常工作。

## Gathering Writes

Gathering Writes是指数据从多个buffer写入到同一个channel。如下图描述：

![gather](/images/netty/gather.png)

代码示例如下：
```java
ByteBuffer header = ByteBuffer.allocate(128);
ByteBuffer body   = ByteBuffer.allocate(1024);

//write data into buffers

ByteBuffer[] bufferArray = { header, body };

channel.write(bufferArray);
```

buffers数组是write()方法的入参，write()方法会按照buffer在数组中的顺序，将数据写入到channel，注意只有position和limit之间的数据才会被写入。

因此，如果一个buffer的容量为128byte，但是仅仅包含58byte的数据，那么这58byte的数据将被写入到channel中。因此与Scattering Reads相反，Gathering Writes能较好的处理动态消息。





