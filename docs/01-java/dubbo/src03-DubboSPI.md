# DubboSPI

想要理解 Dubbo，理解 Dubbo SPI 是必须的，在 Dubbo 中，提供了大量的**扩展点**，基于 Dubbo SPI 机制进行加载。如官网所示：
![SPI扩展实现](/images/dubbo/SPI扩展实现.png)

17种扩展点实现，可见 Dubbo SPI 机制在整个框架中的地位。那么， Dubbo SPI 为什么这么重要？为什么不使用 Java 自带的 SPI 机制？这些疑问，可以从官网文档中获得答案。

Dubbo 的扩展点加载从 JDK 标准的 SPI (Service Provider Interface) 扩展点发现机制加强而来。 Dubbo 改进了 JDK 标准的 SPI 的以下问题：

- JDK 标准的 SPI 会一次性实例化扩展点所有实现，如果有扩展实现初始化很耗时，但如果没用上也加载，会很浪费资源。
- 如果扩展点加载失败，连扩展点的名称都拿不到了。比如：JDK 标准的 ScriptEngine，通过 getName() 获取脚本类型的名称，但如果 RubyScriptEngine 因为所依赖的 jruby.jar 不存在，导致 RubyScriptEngine 类加载失败，这个失败原因被吃掉了，和 ruby 对应不起来，当用户执行 ruby 脚本时，会报不支持 ruby，而不是真正失败的原因。
- 增加了对扩展点 IoC 和 AOP 的支持，一个扩展点可以直接 setter 注入其它扩展点。

1. 上面第一点，了解 JDK SPI 的加载机制就会明白，它会一次性加载所有的实现。然而，从上面的图中可知，Dubbo的扩展点有 N 多种，如果一次性加载所有的扩展点，不仅加载时间变长，也会造成内存等其他一些的资源浪费。
2. 第二点，没用过 ScriptEngine ，暂不影响。
3. 第三点，Dubbo 不想过度依赖其他第三方框架，所以自己实现了一套 IoC 和 AOP。

## 扩展点特性
参考：[Dubbo 官方文档 扩展点特性](https://dubbo.apache.org/zh/docs/v2.7/dev/spi/#%E6%89%A9%E5%B1%95%E7%82%B9%E7%89%B9%E6%80%A7)
1. 扩展点自动包装
    - 自动包装扩展点的 Wrapper 类。ExtensionLoader 在加载扩展点时，如果加载到的扩展点有拷贝构造函数，则判定为扩展点 Wrapper 类。
    - Wrapper 类同样实现了扩展点接口，但是 Wrapper 不是扩展点的真正实现。它的用途主要是用于从 ExtensionLoader 返回扩展点时，包装在真正的扩展点实现外。即从 ExtensionLoader 中返回的实际上是 Wrapper 类的实例，Wrapper 持有了实际的扩展点实现类。
    - 扩展点的 Wrapper 类可以有多个，也可以根据需要新增。
    - 通过 Wrapper 类可以把所有扩展点公共逻辑移至 Wrapper 中。新加的 Wrapper 在所有的扩展点上添加了逻辑，有些类似 AOP，即 Wrapper 代理了扩展点。
2. 扩展点自动装配
    - 加载扩展点时，自动注入依赖的扩展点。加载扩展点时，扩展点实现类的成员如果为其它扩展点类型，ExtensionLoader 在会自动注入依赖的扩展点。ExtensionLoader 通过扫描扩展点实现类的所有 setter 方法来判定其成员。即 ExtensionLoader 会执行扩展点的拼装操作。
3. 扩展点自适应
    - ExtensionLoader 注入的依赖扩展点是一个 Adaptive 实例，直到扩展点方法执行时才决定调用是哪一个扩展点实现。
    - Dubbo 使用 URL 对象（包含了Key-Value）传递配置信息。
    - 扩展点方法调用会有URL参数（或是参数有URL成员）
    - 这样依赖的扩展点也可以从URL拿到配置信息，所有的扩展点自己定好配置的Key后，配置信息从URL上从最外层传入。URL在配置传递上即是一条总线。
    - 在 Dubbo 的 ExtensionLoader 的扩展点类对应的 Adaptive 实现是在加载扩展点里**动态生成**。指定提取的 URL 的 Key 通过 @Adaptive 注解在接口方法上提供。
4. 扩展点自动激活
    - 对于集合类扩展点，比如：Filter, InvokerListener, ExportListener, TelnetHandler, StatusChecker 等，可以同时加载多个实现，此时，可以用自动激活来简化配置。


## 代码结构

Dubbo SPI 在 `dubbo-common` 的 `extension` 包实现，如下图所示：<br>
![SPI代码结构](/images/dubbo/SPI代码结构.png)

下面开始进行源码分析：

## ExtensionLoader

ExtensionLoader 是 Dubbo 的扩展点加载器，这是 Dubbo SPI 的**核心**。

首先看下 ExtensionLoader 类中的成员变量：

```java
/**
 * 默认的 SPI 扩展点加载目录。
 */
private static final String SERVICES_DIRECTORY = "META-INF/services/";
/**
 * Dubbo SPI 扩展点 和 用户自定义扩展点 加载目录。
 */
private static final String DUBBO_DIRECTORY = "META-INF/dubbo/";
/**
 * Dubbo SPI 内部扩展点加载目录。
 */
private static final String DUBBO_INTERNAL_DIRECTORY = DUBBO_DIRECTORY + "internal/";

private static final Pattern NAME_SEPARATOR = Pattern.compile("\\s*[,]+\\s*");

// ============================== 静态属性 ==============================

/**
 * 扩展点加载器缓存。
 * key: 扩展接口    value：对应的 扩展点加载器。
 */
private static final ConcurrentMap<Class<?>, ExtensionLoader<?>> EXTENSION_LOADERS = new ConcurrentHashMap<Class<?>, ExtensionLoader<?>>();
/**
 * 拓展实现类集合。
 * key：扩展实现类    value：扩展对象。
 * 例如：key 为 Class<AccessLogFilter>，value 为 AccessLogFilter 对象。
 */
private static final ConcurrentMap<Class<?>, Object> EXTENSION_INSTANCES = new ConcurrentHashMap<Class<?>, Object>();

// ============================== 对象属性 ==============================

/**
 * 扩展接口。
 * 例如： Protocol。
 */
private final Class<?> type;
/**
 * 对象工厂（用于实现 IoC）。
 * 用于调用 {@link #injectExtension(Object)} 方法，向拓展对象注入依赖属性。
 */
private final ExtensionFactory objectFactory;
/**
 * 缓存的 拓展名 与 拓展类 的映射。
 * 通过 {@link #loadExtensionClasses} 加载。
 */
private final ConcurrentMap<Class<?>, String> cachedNames = new ConcurrentHashMap<Class<?>, String>();
/**
 * 缓存的 拓展实现类 集合。
 * 通过 {@link #loadExtensionClasses} 加载。
 *
 * 不包含如下两种类型：
 *  1. 自适应扩展实现类。例如：AdaptiveExtensionFactory
 *  2. 拓展 Wrapper 实现类。例如：ProtocolFilterWrapper。拓展 Wrapper 实现类，会添加到 {@link #cachedWrapperClasses} 中。
 */
private final Holder<Map<String, Class<?>>> cachedClasses = new Holder<Map<String, Class<?>>>();
/**
 * 扩展名与 @Activate 的映射。
 * 例如：AccessLogFilter。
 * 用于 {@link #getActivateExtension(URL, String)}
 */
private final Map<String, Activate> cachedActivates = new ConcurrentHashMap<String, Activate>();
/**
 * 缓存的拓展对象集合。
 * key：拓展名  value：拓展对象。
 * 通过 {@link #loadExtensionClasses} 加载。
 * 例如：Protocol 拓展
 *   key：dubbo value：DubboProtocol
 *   key：injvm value：InjvmProtocol
 */
private final ConcurrentMap<String, Holder<Object>> cachedInstances = new ConcurrentHashMap<String, Holder<Object>>();
/**
 * 缓存的自适应（Adaptive）拓展对象。
 */
private final Holder<Object> cachedAdaptiveInstance = new Holder<Object>();
/**
 * 缓存的自适应拓展对象的类。
 * {@link #getAdaptiveExtensionClass()}
 */
private volatile Class<?> cachedAdaptiveClass = null;
/**
 * 缓存的默认拓展名。
 * 通过 {@link SPI} 注解获得。
 */
private String cachedDefaultName;
/**
 * 创建 {@link #cachedAdaptiveInstance} 时发生的异常。
 * 发生异常后，不再创建，参见 {@link #createAdaptiveExtension()}
 */
private volatile Throwable createAdaptiveInstanceError;
/**
 * 拓展 Wrapper 实现类集合。
 * 带唯一参数为拓展接口的构造方法的实现类。
 * 通过 {@link #loadExtensionClasses} 加载。
 */
private Set<Class<?>> cachedWrapperClasses;
/**
 * 拓展名 与 加载对应拓展类发生的异常 的 映射。
 * key：拓展名  value：异常
 * 在 {@link #loadFile(Map, String)} 时，记录。
 */
private Map<String, IllegalStateException> exceptions = new ConcurrentHashMap<String, IllegalStateException>();
```

看到上面的成员变量，头大！但是，不能怂！继续撸！



