# spring架构
![spring架构图](/images/spring/spring.jpg)

## 核心容器：
> 包括Core、Beans、Context、EL模块。

- **Core** : 封装了框架依赖的最底层部分，包括资源访问、类型转换及一些常用工具类。
- **Beans** : 提供了框架的基础部分，包括反转控制和依赖注入。其中Bean Factory是容器核心，本质是“工厂设计模式”的实现，而且无需编程实现“单例设计模式”，单例完全由容器控制，而且提倡面向接口编程，而非面向实现编程；所有应用程序对象及对象间关系由框架管理，从而真正把你从程序逻辑中把维护对象之间的依赖关系提取出来，所有这些依赖关系都由BeanFactory来维护。
- **Context** : 以Core和Beans为基础，集成Beans模块功能并添加资源绑定、数据验证、国际化、Java EE支持、容器生命周期、事件传播等；核心接口是ApplicationContext。
- **EL** : 提供强大的表达式语言支持，支持访问和修改属性值，方法调用，支持访问及修改数组、容器和索引器，命名变量，支持算数和逻辑运算，支持从Spring 容器获取Bean，它也支持列表投影、选择和一般的列表聚合等。

## AOP、Aspects模块
- **AOP** : Spring AOP模块提供了符合 AOP Alliance规范的面向方面的编程（aspect-oriented programming）实现，提供比如日志记录、权限控制、性能统计等通用功能和业务逻辑分离的技术，并且能动态的把这些功能添加到需要的代码中；这样各专其职，降低业务逻辑和通用功能的耦合。
- **Aspects** : 提供了对AspectJ的集成，AspectJ提供了比Spring ASP更强大的功能。

## 数据访问/集成模块
> 该模块包括了JDBC、ORM、OXM、JMS和事务管理。

- **事务** : 该模块用于Spring管理事务，只要是Spring管理对象都能得到Spring管理事务的好处，无需在代码中进行事务控制了，而且支持编程和声明性的事务管理。
- **JDBC** ： 提供了一个JBDC的样例模板，使用这些模板能消除传统冗长的JDBC编码还有必须的事务控制，而且能享受到Spring管理事务的好处。
- **ORM** ： 提供与流行的“对象-关系”映射框架的无缝集成，包括Hibernate、JPA、Ibatiss等。而且可以使用Spring事务管理，无需额外控制事务。
- **OXM** ： 提供了一个对Object/XML映射实现，将java对象映射成XML数据，或者将XML数据映射成java对象，Object/XML映射实现包括JAXB、Castor、XMLBeans和XStream。
- **JMS** ： 用于JMS(Java Messaging Service)，提供一套 “消息生产者、消息消费者”模板用于更加简单的使用JMS，JMS用于用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信。
- **Web** ： 提供了基础的web功能。例如多文件上传、集成IoC容器、远程过程访问（RMI、Hessian、Burlap）以及Web Service支持，并提供一个RestTemplate类来提供方便的Restful services访问。


---

# 给 spring 中 注册组件：
1. 包扫描 + 组件标注注解（@Controller @Service @Respository @Component）
2. @Bean
3. @Import
    1. @Import(要导入到容器中的组件)：容器中就会自动注册这个组件，id 默认是全类名。
    2. ImportSelector: 返回值就是要导入到容器中的组件的全类名
    3. ImportBeanDefinitionRegistrar：手动注册
4. FactoryBean（工厂bean）
    1. 通过 applicationContext.getBean()获取到是工厂bean创建的对象，而不是 工厂 bean 本身.
    2. 如果要获取 工厂bean 本身，需要在id之前加上 & 符号，比如 applicationContext.getBean("&userFactoryBean")

# bean的生命周期：
> bean 创建 ---> 初始化 ---> 销毁

