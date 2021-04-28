# NIO-Chat-demo

## ChatServer
```java
package com.leichu.study.nio.group_chat;

import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.*;
import java.util.Iterator;

public class ChatServer {

	private Selector selector;
	private ServerSocketChannel serverSocketChannel;
	private static final int PORT = 6666;

	public ChatServer() {
		try {
			selector = Selector.open();
			// 开启 服务端 socket 通道
			serverSocketChannel = ServerSocketChannel.open();
			serverSocketChannel.socket().bind(new InetSocketAddress(PORT));
			serverSocketChannel.configureBlocking(false);
			// 把 serverSocketChannel 注册到 selector
			serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void start() {
		try {
			while (true) {
				int cnt = selector.select();
				if (cnt <= 0) {
					System.out.println("等待...");
					continue;
				}
				Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();
				while (iterator.hasNext()) {
					SelectionKey key = iterator.next();
					// 监听到 连接 事件
					if (key.isAcceptable()) {
						SocketChannel socketChannel = serverSocketChannel.accept();
						socketChannel.configureBlocking(false);
						// 将 socketChannel 注册到 selector
						socketChannel.register(selector, SelectionKey.OP_READ);
						System.out.println(socketChannel.getRemoteAddress() + " 上线了...");
					}
					// 接收数据
					if (key.isReadable()) {
						readMsg(key);
					}
					// 删除当前 key， 防止重复处理
					iterator.remove();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void readMsg(SelectionKey key) {
		SocketChannel socketChannel = null;
		try {
			// 通过 SelectionKey 反向获取 SocketChannel
			socketChannel = (SocketChannel) key.channel();

			ByteBuffer buffer = ByteBuffer.allocate(1024);
			int cnt = socketChannel.read(buffer);
			if (cnt <= 0) {
				return;
			}
			String msg = new String(buffer.array());
			System.out.println("服务器收到客户端 " + socketChannel.getRemoteAddress() + " 消息... " + msg.trim());
			// 消息转发
			send2Other(msg, socketChannel);
		} catch (Exception e) {
			System.err.println(e);
			try {
				System.out.println(socketChannel.getRemoteAddress() + " 离线了...");
				key.cancel();
				socketChannel.close();
			} catch (Exception e1) {
				System.err.println(e1);
			}
		}
	}

	public void send2Other(String msg, SocketChannel self) {
		System.out.println("服务器消息转发中...");
		try {
			// 遍历所有注册到 selector 上的 SocketChannel，并排除 self
			for (SelectionKey key : selector.keys()) {
				Channel target = key.channel();
				// 消息转发的时候，排除自己
				if (target instanceof SocketChannel && target != self) {
					SocketChannel socketChannel = (SocketChannel) target;
					ByteBuffer buffer = ByteBuffer.wrap(msg.trim().getBytes());
					// 将 buffer 的数据 写入 SocketChannel
					socketChannel.write(buffer);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		ChatServer server = new ChatServer();
		server.start();
	}
}
```

## ChatClient
```java
package com.leichu.study.nio.group_chat;

import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Scanner;

public class ChatClient {

	private final String HOST = "127.0.0.1";
	private final int PORT = 6666;
	private Selector selector;
	private SocketChannel socketChannel;
	private String username;

	public ChatClient() {

		try {
			selector = Selector.open();
			socketChannel = SocketChannel.open(new InetSocketAddress(HOST, PORT));
			socketChannel.configureBlocking(false);
			socketChannel.register(selector, SelectionKey.OP_READ);
			username = socketChannel.getLocalAddress().toString();
			System.out.println(username + " is ok");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void send(String msg) {
		try {
			msg = username + " >>>>> " + msg;
			socketChannel.write(ByteBuffer.wrap(msg.getBytes()));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void read() {
		try {
			int cnt = selector.select();
			if (cnt <= 0) {
//				System.out.println("没有可用通道");
				return;
			}
			Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();
			while (iterator.hasNext()) {
				SelectionKey key = iterator.next();
				if (key.isReadable()) {
					SocketChannel socketChannel = (SocketChannel) key.channel();
					ByteBuffer buffer = ByteBuffer.allocate(512);
					socketChannel.read(buffer);
					System.out.println("收到服务器消息：" + new String(buffer.array()).trim());
				}
			}
			iterator.remove();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	public static void main(String[] args) {
		ChatClient client = new ChatClient();
		new Thread(() -> {
			while (true) {
				client.read();
				try {
					Thread.currentThread().sleep(3000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}).start();
		// 读取控制台键盘输入
		Scanner scanner = new Scanner(System.in);
		while (scanner.hasNextLine()) {
			String s = scanner.nextLine();
			client.send(s);
		}
	}

}
```
