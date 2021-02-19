# maven 依赖
```xml
    <mongo-java-driver.version>2.12.1</mongo-java-driver.version>
    <spring-data-commons.version>1.7.2.RELEASE</spring-data-commons.version>
    <spring-data-mongo.version>1.4.2.RELEASE</spring-data-mongo.version>
    
    <dependency>
        <groupId>org.mongodb</groupId>
        <artifactId>mongo-java-driver</artifactId>
        <version>${mongo-java-driver.version}</version>
    </dependency>
    
    <!-- spring-mongodb begin -->
    <dependency>
        <groupId>org.springframework.data</groupId>
        <artifactId>spring-data-commons</artifactId>
        <version>${spring-data-commons.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.data</groupId>
        <artifactId>spring-data-mongodb</artifactId>
        <version>${spring-data-mongo.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.data</groupId>
        <artifactId>spring-data-mongodb-cross-store</artifactId>
        <version>${spring-data-mongo.version}</version>
    </dependency>
	<!-- spring-mongodb end -->
```

# mongodb.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
	xmlns:mongo="http://www.springframework.org/schema/data/mongo"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.1.xsd  
    http://www.springframework.org/schema/data/mongo http://www.springframework.org/schema/data/mongo/spring-mongo-1.0.xsd">

	<!-- 定义mongo单节点对象 -->
	<!-- <mongo:mongo host="${mongodb.tkms.host}" port="${mongodb.tkms.port}"/> -->

	<!-- 定义mongo集群对象，replica-set设置集群副本的ip地址和端口 -->
	<mongo:mongo id="mongo" replica-set="${mongodb.tkms.addresslist}">
		<mongo:options connections-per-host="100"
			threads-allowed-to-block-for-connection-multiplier="5"
			connect-timeout="30000" 
			max-wait-time="30000" 
			auto-connect-retry="true"
			socket-keep-alive="true" 
			socket-timeout="40000" 
			slave-ok="true"
			write-number="1" 
			write-timeout="0"
			write-fsync="true" />
	</mongo:mongo>

	<!-- 优先从secondary节点进行读取操作，secondary节点不可用时从主节点读取数据 -->
	<bean id="readPreference" class="com.mongodb.TaggableReadPreference$PrimaryPreferredReadPreference" />

	<!-- mongo的工厂，通过它来取得mongo实例,dbname为mongodb的数据库名，没有的话会自动创建 -->
	<bean id="mongoDbFactory" class="org.springframework.data.mongodb.core.SimpleMongoDbFactory">
		<constructor-arg value="${mongodb.tkms.dbname}" />
		<constructor-arg ref="mongo" />
	</bean>

	<bean id="mongoTemplate" class="org.springframework.data.mongodb.core.MongoTemplate">
		<constructor-arg name="mongoDbFactory" ref="mongoDbFactory" />
		<property name="readPreference" ref="readPreference" />
	</bean>

</beans>
```

# 参数
```shell
#对mongo实例来说，每个host允许链接的最大链接数,这些链接空闲时会放入池中,如果链接被耗尽，任何请求链接的操作会被阻塞等待链接可用,推荐配置10
connectionsPerHost=10

#当链接空闲时,空闲线程池中最大链接数
minPoolsSize=5

#此参数跟connectionsPerHost的乘机为一个线程变为可用的最大阻塞数，超过此乘机数之后的所有线程将及时获取一个异常.eg.connectionsPerHost=10 and threadsAllowedToBlockForConnectionMultiplier=5,最多50个线程等级一个链接，推荐配置为5
threadsAllowedToBlockForConnectionMultiplier=5

#一个线程等待链接可用的最大等待毫秒数，0表示不等待，负数表示等待时间不确定，推荐配置120000
maxWaitTime=120000

#链接超时的毫秒数,0表示不超时,此参数只用在新建一个新链接时，推荐配置10,000.
connectTimeout=10000

#此参数表示socket I/O读写超时时间,推荐为不超时，即 0    Socket.setSoTimeout(int)
socketTimeout=0

#该标志用于控制socket保持活动的功能，通过防火墙保持连接活着
socketKeepAlive=false

#true:假如链接不能建立时,驱动将重试相同的server,有最大的重试次数,默认为15次,这样可以避免一些server因为一些阻塞操作零时down而驱动抛出异常,这个对平滑过度到一个新的master,也是很有用的,注意:当集群为复制集时,驱动将在这段时间里,尝试链接到旧的master上,而不会马上链接到新master上
#false 当在进行socket读写时,不会阻止异常抛出,驱动已经有自动重建破坏链接和重试读操作. 推荐配置false
autoConnectRetry=false

#重新打开链接到相同server的最大毫秒数,推荐配置为0，如果 autoConnectRetry=true,表示时间为15s
#com.jd.mongodbclient2.mongo.JDClientMongo.maxAutoConnectRetryTime=false
#表示当没有手动关闭游标时,是否有一个自动释放游标对象的方法,如果你总是很小心的关闭游标,则可以将其设为false 推荐配置true
#com.jd.mongodbclient2.mongo.JDClientMongo.cursorFinalizerEnabled=true

#安全模式
com.jd.mongodbclient2.driver.MongoDBDriver.safe=true

#为true表示读写分离
com.jd.mongodbclient2.driver.MongoDBDriver.slaveOk=false
```

