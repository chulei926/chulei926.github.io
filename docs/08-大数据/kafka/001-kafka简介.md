# 简介

## 1. 定义
Kafka 是一个**分布式**的基于**发布/订阅模式**的消息队列（Message Queue） ， 主要应用于**大数据实时处理**领域。

## 2. 消息队列
### 2.1 好处
- 解耦
- 异步
- 缓冲
- 削峰

### 2.2 消息队列的两种模式
#### a. 点对点模式（一对一，消费者主动拉取数据，消息收到后消息清除）
消息生产者发送消息到 Quaua 中，然后消息消费者从 Quaua 中取出并消费消息。消息被消费以后，Quaua 中不再存储，所以消息消费者不可能消费到已经被消费的消息。Quaua 支持存在多个消费者，但是对一个消息而言，只有一个消费者可以消费。<br>
![点对点消息](/images/bigData/kafka/点对点消息.png)

#### b. 发布/订阅模式（一对多，消费者消费数据之后不会清除消息）
消息生产者（发布）将消息发布到 topic 中，同时有多个消费者（订阅）消费消息。和点对点方式不同，发布到 topic 的消息会被所有的订阅者消费。<br>
![发布订阅](/images/bigData/kafka/发布订阅.png)


## kafka架构

![架构](/images/bigData/kafka/架构.png)

1. Producer：生产者，就是向 kafka broker 发送消息的客户端
2. Consumer：消费者，从 kafka broker 拉取消息的客户端
3. Consumer Group：消费者组，由多个 consumer 组成。**组内的每个消费者负责消费不同分区的消息，一个分区只能由一个组内的消费者消费。消费者组之间互不影响**。所有的消费者都属于某个消费者组，即**消费者组是逻辑上的一个订阅者**
4. Broker：一个kafka部署节点（机器）就是一个 broker。一个集群由多个 broker 组成。一个 broker 可以容纳多个 topic 
5. Topic：一个队列，生产者和消费者面向的都是一个 topic
6. Partition：为了实现扩展性，一个非常大的 topic 可以分布在多个 broker 上，**一个 topic 可以分为多个 partition**，**每个 partition 是一个有序的队列**
7. Replica：副本。为保证集群中某个节点发生故障时，该节点上的 partition 数据不丢失，且 kafka 能够继续工作，kafka 提供了副本机制，**一个 topic 的每个分区都有若干个副本**，一个 leader 和 若干个 follower
8. leader：每个分区多个**副本的主节点**，生产者发送数据的对象，以及消费者消费数据的对象 都是 leader
9. follower：每个分区多个**副本中的从节点**，实时的从 leader 中同步数据，保持和 leader 数据的同步。leader 发生故障时，某个 follower 会成为新的 leader