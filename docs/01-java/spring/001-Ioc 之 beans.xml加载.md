# beans.xml加载

## User.java
```java
public class User implements Serializable {
    private static final long serialVersionUID = -1459763050776208272L;
    private String name;
    private int age;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    @Override
    public String toString() {
        return super.toString();
    }
}
```

## application.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.1.xsd">
    
    <bean id="user" class="com.spring.rc.leichu.model.User">
        <property name="name" value="leichu"/>
        <property name="age" value="27"/>
    </bean>
</beans>
```

## ApplicationBootstrap.java
```java
public class ApplicationBootstrap {
    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("beans.xml");
        User user = ctx.getBean(User.class);
        System.out.println(user.getName());
    }
}
```
## 加载过程分析
- ClassPathXmlApplicationContext#**ClassPathXmlApplicationContext**(String[], boolean, ApplicationContext)
    - AbstractApplicationContext#**refresh**（核心）
        - AbstractApplicationContext#**prepareRefresh**（环境准备：设置启动时间、设置结束标记、设置激活标记、环境校验等）
        - **AbstractApplicationContext#obtainFreshBeanFactory**（获取一个新的 beanFactory。重点！复杂！）
            - AbstractRefreshableApplicationContext#**refreshBeanFactory**
                - AbstractRefreshableApplicationContext#**createBeanFactory**
                - AbstractRefreshableApplicationContext#**customizeBeanFactory**
                - **AbstractRefreshableApplicationContext#loadBeanDefinitions**
            - AbstractRefreshableApplicationContext#**getBeanFactory**
        - AbstractApplicationContext#**prepareBeanFactory**（对 beanFactory 进行初始化配置）
        - AbstractApplicationContext#**invokeBeanFactoryPostProcessors**（执行 BeanFactoryPostProcessor）
            - PostProcessorRegistrationDelegate#**invokeBeanFactoryPostProcessors**(ConfigurableListableBeanFactory, List`<`BeanFactoryPostProcessor`>`)（委托PostProcessorRegistrationDelegate执行BeanFactory后置处理器）
        - AbstractApplicationContext#**registerBeanPostProcessors**（注册 BeanPostProcessors）
            - PostProcessorRegistrationDelegate#**registerBeanPostProcessors**(ConfigurableListableBeanFactory, AbstractApplicationContext)（委托PostProcessorRegistrationDelegate注册Bean后置处理器）
        - AbstractApplicationContext#**initMessageSource**（初始化 MessageSource，主要用于 I18N 本地化的内容）
        - AbstractApplicationContext#**initApplicationEventMulticaster**（初始化事件广播 ApplicationEventMulticaster，使用观察者模式，对注册的 ApplicationEvent 事件进行捕捉）
        - AbstractApplicationContext#**onRefresh**（初始化特殊的 bean 方法）
        - AbstractApplicationContext#**registerListeners**（将所有 ApplicationEventListener 注册到 ApplicationEventMulticaster 中）
        - AbstractApplicationContext#**finishBeanFactoryInitialization**（初始化所有 lazy-init=false 的bean，singleton 实例）
            - DefaultListableBeanFactory#**preInstantiateSingletons**
                - AbstractBeanFactory#**getMergedBeanDefinition**(String, BeanDefinition, BeanDefinition)
                - AbstractBeanFactory#**doGetBean**
                    - **AbstractAutowireCapableBeanFactory#doCreateBean**
                        - AbstractAutowireCapableBeanFactory#**createBeanInstance**
                        - AbstractAutowireCapableBeanFactory#**populateBean**
                        - AbstractAutowireCapableBeanFactory#**initializeBean**(String, Object, RootBeanDefinition)
                            - AbstractAutowireCapableBeanFactory#**invokeAwareMethods**
                            - AbstractAutowireCapableBeanFactory#**applyBeanPostProcessorsBeforeInitialization**
                            - AbstractAutowireCapableBeanFactory#**invokeInitMethods**
                            - AbstractAutowireCapableBeanFactory#**applyBeanPostProcessorsAfterInitialization**
        - AbstractApplicationContext#**finishRefresh**（初始化 lifeCycle 的bean启动。例如 quartz 的定时器，如果开启 JMX 则将 ApplicationContext 注册到上面）


## 总结：

![初始化加载流程图](/images/spring/初始化加载流程图.png)

## 上图过程涉及一些问题，下面带着问题进行逐个分析：
## 1. 创建 ClassPathXmlApplicationContext 中间经历了什么？
## 1. prepareRefresh 预刷新的主要作用是什么？
## 2. obtainFreshBeanFactory 工厂是如何创建的？
## 3. prepareBeanFactory 对工程进行初始化配置，配置什么？
## 4. invokeBeanFactoryPostProcessors 执行工厂后置处理器，什么是 beanFactory 后置处理器？ 什么时机下开始执行？ 执行的过程的是什么？ 如何自定义 BeanFactoryPostProcessor？
## 5. registerBeanPostProcessors 注册 bean 的后置处理器，什么是 bean 的后置处理器？ 什么时机下开始执行？ 执行的过程的是什么？ 如何自定义 BeanPostProcessor？
## 6. finishBeanFactoryInitialization 这一步执行了什么操作？ 过程怎样？

