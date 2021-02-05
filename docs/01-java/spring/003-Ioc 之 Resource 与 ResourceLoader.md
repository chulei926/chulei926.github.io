# 1. `org.springframework.core.io.Resource`

对资源的抽象。它的每一个实现类都代表了一种资源的访问策略，
如 ClassPathResource、RLResource、FileSystemResource 等。<br/>
org.springframework.core.io.Resource 为 Spring 框架所有资源的抽象和访问接口，<br/>
它继承 org.springframework.core.io.InputStreamSource接口。<br/>
作为所有资源的统一抽象，Resource 定义了一些通用的方法，
由子类 AbstractResource 提供统一的默认实现。


- 方法结构图如下：<br />

![Resource_Structure](/images/spring/Resource_Structure.png)
- 类结构关系图如下：<br/>
![Resource](/images/spring/Resource.png)<br />
从上图可以看到，Resource 根据资源的不同类型提供不同的具体实现，如下：
    - ```FileSystemResource``` ：对 java.io.File 类型资源的封装，只要是跟 File 打交道的，基本上与 FileSystemResource 也可以打交道。支持文件和 URL 的形式，实现 WritableResource 接口，且从 Spring Framework 5.0 开始，FileSystemResource 使用 NIO2 API进行读/写交互。
    - ```ByteArrayResource``` ：对字节数组提供的数据的封装。如果通过 InputStream 形式访问该类型的资源，该实现会根据字节数组的数据构造一个相应的 ByteArrayInputStream。
    - ```UrlResource``` ：对 java.net.URL类型资源的封装。内部委派 URL 进行具体的资源操作。
    - ```ClassPathResource``` ：class path 类型资源的实现。使用给定的 ClassLoader 或者给定的 Class 来加载资源。
    - ```InputStreamResource``` ：将给定的 InputStream 作为一种资源的 Resource 的实现类。
- ```org.springframework.core.io.AbstractResource``` ，为 Resource 接口的默认抽象实现。它实现了 Resource 接口的大部分的公共实现，作为 Resource 接口中的重中之重




# 2. `org.springframework.core.io.ResourceLoader`
![ResourceLoader](/images/spring/ResourceLoader.png)

`org.springframework.core.io.ResourceLoader` 为 Spring 资源加载的统一抽象，**具体的资源加载则由相应的实现类来完成**，所以可以将 ResourceLoader 称作为统一资源定位器。

> ResourceLoader，定义资源加载器，主要应用于根据给定的资源文件地址，返回对应的 Resource 。

```java
public interface ResourceLoader {

    /** Pseudo URL prefix for loading from the class path: "classpath:". */
    String CLASSPATH_URL_PREFIX = ResourceUtils.CLASSPATH_URL_PREFIX;

    Resource getResource(String location);

    @Nullable
    ClassLoader getClassLoader();

}
```

