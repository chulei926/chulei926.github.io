# Spring Bean生命周期

![bean的生命周期](/images/spring/bean的生命周期.png)

## 分为4个阶段：实例化 -> 属性赋值 -> 初始化 -> 销毁
1. 实例化 Instantiation
2. 属性赋值 Populate
3. 初始化 Initialization
4. 销毁 Destruction

## 源码分析 准备
![spring-learn](/images/spring/spring-learn.png)

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>com.leichu</groupId>
	<artifactId>spring-learn</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>spring-learn</name>
	<url>http://maven.apache.org</url>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>5.2.2.RELEASE</version>
		</dependency>

		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
				</configuration>
			</plugin>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-surefire-plugin</artifactId>
				<version>2.18.1</version>
				<configuration>
					<skipTests>true</skipTests>
				</configuration>
			</plugin>
		</plugins>
	</build>

</project>
```

```java
public class User implements BeanNameAware, BeanFactoryAware, ApplicationContextAware, InitializingBean, DisposableBean {

	public User() {
		System.out.println("User ---------> 无参 构造器执行       实例化bean");
	}

	public User(String name, int age) {
		System.out.println("User ---------> 有参 构造器执行       实例化bean");
		this.name = name;
		this.age = age;
	}
	
	@PostConstruct
	public void afterConstruct() {
		this.name = "李四";
		this.age = 30;
		System.out.println("User ---------> afterConstruct 执行 ---------> @PostConstruct");
	}

	private String name;
	private int age;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		System.out.println("User ---------> 初始化bean -------> setName 执行");
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		System.out.println("User ---------> 初始化bean -------> setAge 执行");
		this.age = age;
	}

	public void say() {
		System.out.println("User ---------> 自定义方法  say 执行");
	}

	public void myInit() {
		System.out.println("User ---------> 初始化bean -------> myInit 执行");
	}

	public void myDestroy() {
		System.out.println("User ---------> 销毁bean -------> myDestroy 执行");
	}

	@Override
	public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
		System.out.println("User ---------> Aware接口 ---------> BeanFactoryAware ---------> setBeanFactory 执行");
	}

	@Override
	public void setBeanName(String name) {
		System.out.println("User ---------> Aware接口 ---------> BeanNameAware ---------> setBeanName 执行");
	}

	@Override
	public void destroy() throws Exception {
		System.out.println("User ---------> 销毁bean -------> DisposableBean ---------> destroy 执行");
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		System.out.println("User ---------> 初始化bean -------> InitializingBean ---------> afterPropertiesSet 执行");
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		System.out.println("User ---------> Aware接口 ---------> ApplicationContextAware ---------> setApplicationContext 执行");
	}
	
	@Override
	public String toString() {
		return "User [name=" + name + ", age=" + age + "]";
	}
}
```


```java
public class MyBeanPostProcessor implements BeanPostProcessor {

	public MyBeanPostProcessor() {
		System.out.println("+++++++++++++++ MyBeanPostProcessor 构造器执行，实例化完成 +++++++++++++++");
	}

	@Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		if ("user".equals(beanName)) {
			System.out.println("User ---------> BeanPostProcessor ---------> postProcessBeforeInitialization 执行   ---------> 所有初始化方法调用之前执行");
		}
		return bean;
	}

	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		if ("user".equals(beanName)) {
			System.out.println("User ---------> BeanPostProcessor ---------> postProcessAfterInitialization 执行  ---------> 所有初始化方法调用之后执行");
		}
		return bean;
	}
}
```


```java
@Configuration
@ComponentScan("com.leichu.spring.learn.bean.model")
public class BeanConfig {

	@Bean
	public BeanPostProcessor myBeanPostProcessor() {
		return new MyBeanPostProcessor();
	}

	@Bean(initMethod = "myInit", destroyMethod = "myDestroy")
	@Scope
	public User user() {
		User user = new User();
		user.setName("张三");
		user.setAge(20);
		return user;
	}
}
```

```java
// 测试入口类
public class BeanTest {

	public static void main(String[] args) {
		ApplicationContext ctx = new AnnotationConfigApplicationContext(BeanConfig.class);
		User user = ctx.getBean(User.class);
		System.out.println(user);
		((AnnotationConfigApplicationContext) ctx).close();
	}
	
}
```

### 执行结果
```java
+++++++++++++++ MyBeanPostProcessor 构造器执行，实例化完成 +++++++++++++++
User ---------> 无参 构造器执行       实例化bean
User ---------> 初始化bean -------> setName 执行
User ---------> 初始化bean -------> setAge 执行
User ---------> Aware接口 ---------> BeanNameAware ---------> setBeanName 执行
User ---------> Aware接口 ---------> BeanFactoryAware ---------> setBeanFactory 执行
User ---------> Aware接口 ---------> ApplicationContextAware ---------> setApplicationContext 执行
User ---------> BeanPostProcessor ---------> postProcessBeforeInitialization 执行   ---------> 所有初始化方法调用之前执行
User ---------> afterConstruct 执行 ---------> @PostConstruct
User ---------> 初始化bean -------> InitializingBean ---------> afterPropertiesSet 执行
User ---------> 初始化bean -------> myInit 执行
User ---------> BeanPostProcessor ---------> postProcessAfterInitialization 执行  ---------> 所有初始化方法调用之后执行
User [name=李四, age=30]
User ---------> 销毁bean -------> DisposableBean ---------> destroy 执行
User ---------> 销毁bean -------> myDestroy 执行
```

# 简要概括：
1. 容器启动，实例化bean对象（`AbstractAutowireCapableBeanFactory.doCreateBean(String, RootBeanDefinition, Object[])`）。
2. 调用`setter`方法为对象赋值
3. 如果实现了`Aware`接口，调用相关`Aware`接口的方法，往bean中注入其他信息。例如：如果bean实现了`BeanNameAware`接口，调用`setBeanName`方法；如果实现了`BeanFactoryAware`接口，调用`setBeanFactory`方法；如果实现了`ApplicationContextAware`，调用`setApplicationContext`方法。
4. 初始化之前，执行`BeanPostProcessor`的`postProcessBeforeInitialization`方法。
5. 对bean进行初始化。如果标注了`@PostConstruct`，执行对应的方法；如果实现了`InitializingBean`接口，调用`afterPropertiesSet`方法；如果指定了`init-method`，执行initMethod方法。
6. 初始化之后，执行`BeanPostProcessor`的`postProcessAfterInitialization`方法。
7. 业务调用相关逻辑处理。
8. 容器关闭，如果实现了`DisposableBean`接口，调用`destroy`方法。如果指定了`destroy-method`，执行destroyMethod方法。

**下面就 bean 的生命周期，结合源码进行详细分析。**