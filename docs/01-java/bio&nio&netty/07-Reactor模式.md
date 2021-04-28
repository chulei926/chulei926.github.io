# Reactor模式

Reactor 对应的叫法: 1. 反应器模式 2. 分发者模式(Dispatcher) 3. 通知者模式(notifier)

## Reactor的核心思想：
将关注的I/O事件注册到多路复用器上，一旦有I/O事件触发，将事件分发到事件处理器中，执行就绪I/O事件对应的处理函数中。

模型中有三个重要的组件：
- 多路复用器：由操作系统提供接口，Linux提供的I/O复用接口有select、poll、epoll；
- 事件分离器：将多路复用器返回的就绪事件分发到事件处理器中；
- 事件处理器：处理就绪事件处理函数。

## Reactor 结构
![reactor类结构](/images/netty/reactor类结构.png)
![reactor结构](/images/netty/reactor结构.png)

- Reactor：也就是Initiation Dispatcher(初始分发器)，反应器，定义一个接口，实现以下功能：
    - 供应用程序注册和删除关注的事件句柄； 
    - 运行事件处理循环； 
    - 等待的就绪事件触发，分发事件到之前注册的回调函数上处理.
- Handle：句柄或描述符，在Windows下称为句柄，在Linux下称为描述符；
- Event Demultiplexer：执行多路事件分解操作，对操作系统内核实现I/O复用接口的封装；用于阻塞等待发生在句柄集合上的一个或多个事件（如select/poll/epoll）；
- Event Handler：事件处理接口；
- Event Handler A(B)：实现应用程序所提供的特定事件处理逻辑；

## Reactor模式流程
1. 初始化Initiation Dispatcher，然后将若干个Concrete Event Handler注册到Initiation Dispatcher中。当应用向Initiation Dispatcher注册Concrete Event Handler时，会在注册的同时指定感兴趣的事件，即，应用会标识出该事件处理器希望Initiation Dispatcher在某些事件发生时向其发出通知，事件通过Handle来标识，而Concrete Event Handler又持有该Handle。这样，事件 ————> Handle ————> Concrete Event Handler 就关联起来了。
2. Initiation Dispatcher 会要求每个事件处理器向其传递内部的Handle。该Handle向操作系统标识了事件处理器。
3. 当所有的Concrete Event Handler都注册完毕后，应用会调用handle_events方法来启动Initiation Dispatcher的事件循环。这是，Initiation Dispatcher会将每个注册的Concrete Event Handler的Handle合并起来，并使用Synchronous Event Demultiplexer(同步事件分离器)同步阻塞的等待事件的发生。比如说，TCP协议层会使用select同步事件分离器操作来等待客户端发送的数据到达连接的socket handler上。
比如，在Java中通过Selector的select()方法来实现这个同步阻塞等待事件发生的操作。在Linux操作系统下，select()的实现中 a)会将已经注册到Initiation Dispatcher的事件调用epollCtl(epfd, opcode, fd, events)注册到linux系统中，这里fd表示Handle，events表示我们所感兴趣的Handle的事件；b)通过调用epollWait方法同步阻塞的等待已经注册的事件的发生。不同事件源上的事件可能同时发生，一旦有事件被触发了，epollWait方法就会返回；c)最后通过发生的事件找到相关联的SelectorKeyImpl对象，并设置其发生的事件为就绪状态，然后将SelectorKeyImpl放入selectedSet中。这样一来我们就可以通过Selector.selectedKeys()方法得到事件就绪的SelectorKeyImpl集合了。
4. 当与某个事件源对应的Handle变为ready状态时(比如说，TCP socket变为等待读状态时)，Synchronous Event Demultiplexer就会通知Initiation Dispatcher。
5. Initiation Dispatcher会触发事件处理器的回调方法，从而响应这个处于ready状态的Handle。当事件发生时，Initiation Dispatcher会将被事件源激活的Handle作为『key』来寻找并分发恰当的事件处理器回调方法。
6. Initiation Dispatcher会回调事件处理器的handle_event(type)回调方法来执行特定于应用的功能(开发者自己所编写的功能)，从而相应这个事件。所发生的事件类型可以作为该方法参数并被该方法内部使用来执行额外的特定于服务的分离与分发。

# Reactor模式的实现方式

## 1. 单 Reactor 单线程
![单reactor模式](/images/netty/单reactor模式.png)


## 2. 单 Reactor 多线程
![工作线程池](/images/netty/工作线程池.png)


## 3. 主从 Reactor 多线程
![多reactor模式](/images/netty/多reactor模式.png)













