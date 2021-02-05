# BioServer
```java
package com.leichu.study.bio;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class BioServer {

	public static void main(String[] args) throws IOException {
		ServerSocket serverSocket = new ServerSocket(6666);
		System.out.println("服务端已启动，等待客户端连接..");
		//侦听并接受到此套接字的连接,返回一个Socket对象
		Socket socket = serverSocket.accept();

		//根据输入输出流和客户端连接
		InputStream inputStream = socket.getInputStream();//得到一个输入流，接收客户端传递的信息
		InputStreamReader inputStreamReader = new InputStreamReader(inputStream);//提高效率，将自己字节流转为字符流
		BufferedReader bufferedReader = new BufferedReader(inputStreamReader);//加入缓冲区
		String temp = null;
		String info = "";
		while ((temp = bufferedReader.readLine()) != null) {
			info += temp;
			System.out.println("已接收到客户端连接");
			System.out.println("服务端接收到客户端信息：" + info + ",当前客户端ip为：" + socket.getInetAddress().getHostAddress());
		}

		OutputStream outputStream = socket.getOutputStream();//获取一个输出流，向服务端发送信息
		PrintWriter printWriter = new PrintWriter(outputStream);//将输出流包装成打印流
		printWriter.print("你好，服务端已接收到您的信息");
		printWriter.flush();
		socket.shutdownOutput();//关闭输出流

		//关闭相对应的资源
		printWriter.close();
		outputStream.close();
		bufferedReader.close();
		inputStream.close();
		socket.close();
	}

}
```

# BioClient
```java
package com.leichu.study.bio;

import java.io.*;
import java.net.Socket;

public class BioClient {

	public static void main(String[] args) throws Exception {
		Socket socket = new Socket("127.0.0.1", 6666);

		//根据输入输出流和服务端连接
		OutputStream outputStream = socket.getOutputStream();//获取一个输出流，向服务端发送信息
		PrintWriter printWriter = new PrintWriter(outputStream);//将输出流包装成打印流
		printWriter.print("服务端你好，我是 Balla_兔子");
		printWriter.flush();
		socket.shutdownOutput();//关闭输出流

		InputStream inputStream = socket.getInputStream();//获取一个输入流，接收服务端的信息
		InputStreamReader inputStreamReader = new InputStreamReader(inputStream);//包装成字符流，提高效率
		BufferedReader bufferedReader = new BufferedReader(inputStreamReader);//缓冲区
		String info = "";
		String temp = null;//临时变量
		while ((temp = bufferedReader.readLine()) != null) {
			info += temp;
			System.out.println("客户端接收服务端发送信息：" + info);
		}

		//关闭相对应的资源
		bufferedReader.close();
		inputStream.close();
		printWriter.close();
		outputStream.close();
		socket.close();
	}
}
```

