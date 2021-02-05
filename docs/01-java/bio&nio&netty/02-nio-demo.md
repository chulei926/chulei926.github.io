# NioServer
```java
package com.leichu.study.nio;

import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;

public class NioServer {

	public static void main(String[] args) throws Exception {
		// 创建 ServerSocketChannel
		ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
		// 绑定一个端口 6666
		serverSocketChannel.socket().bind(new InetSocketAddress(6666));
		// 设置 非阻塞
		serverSocketChannel.configureBlocking(false);

		// 得到一个 selector
		Selector selector = Selector.open();
		// 把 serverSocketChannel 注册到 selector
		serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

		// 等待客户端连接
		while (true) {
			if (selector.select(1000) == 0) {// 无事件发生
				System.out.println("服务器等待中，当前无连接......");
				continue;
			}

			Set<SelectionKey> selectionKeys = selector.selectedKeys();
			Iterator<SelectionKey> iterator = selectionKeys.iterator();
			while (iterator.hasNext()) {
				SelectionKey key = iterator.next();

				if (key.isAcceptable()) {
					SocketChannel socketChannel = serverSocketChannel.accept();
					socketChannel.configureBlocking(false);
					System.out.println("接收到新的客户端连接... " + socketChannel.hashCode());
					socketChannel.register(selector, SelectionKey.OP_READ, ByteBuffer.allocate(1024));
				}
				if (key.isReadable()) {
					SocketChannel socketChannel = (SocketChannel) key.channel();
					ByteBuffer buffer = (ByteBuffer) key.attachment();
					socketChannel.read(buffer);
					System.out.println("接收到客户端消息... " + new String(buffer.array()));
				}

				iterator.remove();
			}
		}
	}
}
```

# NioClient
```java
package com.leichu.study.nio;

import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;

public class NioClient {

	public static void main(String[] args) throws Exception {

		// 开启一个 socketChannel
		SocketChannel socketChannel = SocketChannel.open();
		// 配置为 非阻塞
		socketChannel.configureBlocking(false);
		InetSocketAddress socketAddress = new InetSocketAddress("127.0.0.1", 6666);
		// 开始连接
		if (!socketChannel.connect(socketAddress)) {
			try {
				while (!socketChannel.finishConnect()) {
					System.out.println("连接需要时间，客户端不会阻塞...");
					Thread.sleep(1000);
				}
			} catch (Exception e) {
				System.err.println(e);
			}
		}

		// 连接成功，开始发送数据
		String msg = "Hello World。。。";
		ByteBuffer buffer = ByteBuffer.wrap(msg.getBytes());
		socketChannel.write(buffer);
		System.in.read();
	}
}
```



