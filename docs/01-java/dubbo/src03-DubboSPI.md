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

ExtensionLoader 是 Dubbo 的扩展点加载器，这是 Dubbo SPI 的**核心**。 再回顾一下前面的一个例子：

```java
@SPI
public interface Color {
	void draw(URL url);
}

public class Red implements Color {
	@Override
	public void draw(URL url) {
		System.out.println(" I am Red");
	}
}

public class Blue implements Color {
	@Override
	public void draw(URL url) {
		System.out.println(" I am blue");
	}
}

@Adaptive
public class Black implements Color {
	@Override
	public void draw(URL url) {
		System.out.println(" I am black");
	}
}

// src/main/resources/META-INF/dubbo/com.alibaba.dubbo.demo.model.dubbo_spi.Color
black=com.alibaba.dubbo.demo.model.dubbo_spi.Black
blue=com.alibaba.dubbo.demo.model.dubbo_spi.Blue
red=com.alibaba.dubbo.demo.model.dubbo_spi.Red

public class Dubbo_SPI_Test {
	@Test
	public void adaptiveTest() {
        URL url = URL.valueOf("test://localhost/test");
		ExtensionLoader<Color> extensionLoader = ExtensionLoader.getExtensionLoader(Color.class);
		final Color color = extensionLoader.getAdaptiveExtension();
		color.draw(url);
	}
}
```

找出关键的2句话：
1. `ExtensionLoader.getExtensionLoader(Color.class)`：获取扩展点加载器。
2. `extensionLoader.getAdaptiveExtension()` ：获取自适应扩展点。

下面详细分析这2句代码，这两句分析透彻了，Dubbo SPI 机制也了解差不多了。

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

## `ExtensionLoader.getExtensionLoader(Color.class)`
```java
// Step 1
public static <T> ExtensionLoader<T> getExtensionLoader(Class<T> type) {
    // 检查入参不能为空
    if (type == null)
        throw new IllegalArgumentException("Extension type == null");
    // 检查入参必须是接口，如果不是，抛出异常。
    if (!type.isInterface()) {
        throw new IllegalArgumentException("Extension type(" + type + ") is not interface!");
    }
    // 检查是否带有 SPI 注解，如果没有，直接抛出异常！
    if (!withExtensionAnnotation(type)) {
        throw new IllegalArgumentException("Extension type(" + type + ") is not extension, because WITHOUT @" + SPI.class.getSimpleName() + " Annotation!");
    }
    // 先从缓存获取 ExtensionLoader，如果缓存没有，创建一个 新的 ExtensionLoader。
    ExtensionLoader<T> loader = (ExtensionLoader<T>) EXTENSION_LOADERS.get(type);
    if (loader == null) {
        // // 第一次加载肯定是空，所提先创建一个 扩展点加载器 ExtensionLoader。
        EXTENSION_LOADERS.putIfAbsent(type, new ExtensionLoader<T>(type));
        loader = (ExtensionLoader<T>) EXTENSION_LOADERS.get(type);
    }
    return loader;
}

// Step 2
// 私有化构造器，说明不想被外部调用。将实例化的权限 收紧。
private ExtensionLoader(Class<?> type) {
    this.type = type;
    // 如果 type 是 ExtensionFactory 工厂类类型，objectFactory = null
    // 否则，获取 ExtensionFactory 类的 扩展类加载器，最后获取 自适应的 扩展类。
    // objectFactory = (type == ExtensionFactory.class ? null : ExtensionLoader.getExtensionLoader(ExtensionFactory.class).getAdaptiveExtension());
    // TODO 上面是源码，下面是改写，主要用于分析 ExtensionLoader.getExtensionLoader(ExtensionFactory.class)
    if (type == ExtensionFactory.class) {
        objectFactory = null;
    } else {
        // 第一次进入，type = Color.class，所以进到 else 分支。
        // 此时先获取一个 ExtensionFactory 扩展点的工厂类，这里又回到了 Step 1，
        // 在 Step 1 中会执行 new ExtensionLoader<T>(ExtensionFactory.class)，便有了一个 扩展点加载器的工厂类，并加入 EXTENSION_LOADERS 缓存。
        ExtensionLoader<ExtensionFactory> factoryExtensionLoader = ExtensionLoader.getExtensionLoader(ExtensionFactory.class);
        objectFactory = factoryExtensionLoader.getAdaptiveExtension();  // 核心
    }
}
```

通过上面的分析可以看出，在获取 `Color` 的扩展点加载器之前，先创建了一个 `ExtensionFactory` 的扩展点加载器，然后通过 `factoryExtensionLoader.getAdaptiveExtension()` 获取其**自适应扩展点**，继续深入分析该方法的调用过程。
注意：此时的 `type` 是 `ExtensionFactory.class`，并非 `Color.class`。
```java
// Step 3：先从缓存中获取，如果缓存没有就调用 createAdaptiveExtension 创建一个自适应扩展点，然后将其放入缓存。
public T getAdaptiveExtension() {
    // 从缓存中获取自适应拓展
    Object instance = cachedAdaptiveInstance.get();
    if (instance == null) {
        if (createAdaptiveInstanceError == null) { // 缓存未命中
            synchronized (cachedAdaptiveInstance) {
                // 加锁，双重检查
                instance = cachedAdaptiveInstance.get();
                if (instance == null) {
                    try {
                        // 创建自适应拓展
                        instance = createAdaptiveExtension();  // 核心
                        // 设置自适应拓展到缓存中
                        cachedAdaptiveInstance.set(instance);
                    } catch (Throwable t) {
                        createAdaptiveInstanceError = t;
                        throw new IllegalStateException("fail to create adaptive instance: " + t.toString(), t);
                    }
                }
            }
        } else {
            throw new IllegalStateException("fail to create adaptive instance: " + createAdaptiveInstanceError.toString(), createAdaptiveInstanceError);
        }
    }
    return (T) instance;
}

// Step 4
// 1. 调用 getAdaptiveExtensionClass 方法获取自适应拓展 Class 对象
// 2. 通过反射进行实例化
// 3. 调用 injectExtension 方法向拓展实例中注入依赖
private T createAdaptiveExtension() {
    try {
        // 获取自适应拓展类，并通过反射实例化
        // return injectExtension((T) getAdaptiveExtensionClass().newInstance());
        // 源码是上面这一句，下面这几句为改写，就是为了看清楚每一步的过程。
        Class<?> clazz = getAdaptiveExtensionClass(); // 核心
        T t = (T) clazz.newInstance();
        return injectExtension(t);
    } catch (Exception e) {
        throw new IllegalStateException("Can not create adaptive extension " + type + ", cause: " + e.getMessage(), e);
    }
}

// Step 5
private Class<?> getAdaptiveExtensionClass() {
    // 通过 SPI 获取所有的拓展类
    getExtensionClasses();  // 核心
    // 检查缓存，若缓存不为空，则直接返回缓存
    if (cachedAdaptiveClass != null) {
        return cachedAdaptiveClass;
    }
    // 创建自适应拓展类
    return cachedAdaptiveClass = createAdaptiveExtensionClass();
}

// Step 6
private Map<String, Class<?>> getExtensionClasses() {
    // 从缓存中获取已加载的拓展类
    Map<String, Class<?>> classes = cachedClasses.get();
    // 双重检查
    if (classes == null) {
        synchronized (cachedClasses) {
            classes = cachedClasses.get();
            if (classes == null) {
                classes = loadExtensionClasses(); // 核心
                cachedClasses.set(classes);
            }
        }
    }
    return classes;
}

// Step 7：正式加载 扩展点
// 此时的 type 还是 ExtensionFactory，并且 ExtensionFactory 源码上也加了 @SPI 注解，说明 ExtensionFactory 这个工厂类本身就是一个扩展点。
private Map<String, Class<?>> loadExtensionClasses() {
    // 获取 SPI 注解，这里的 type 变量是在调用 getExtensionLoader 方法时传入的
    final SPI defaultAnnotation = type.getAnnotation(SPI.class);
    if (defaultAnnotation != null) {
        String value = defaultAnnotation.value();
        if ((value = value.trim()).length() > 0) {  // ExtensionFactory 的 @SPI 没有标注 value，所以不会进到下面的 if 代码块。
            // 对 SPI 注解内容进行切分（逗号切分）
            String[] names = NAME_SEPARATOR.split(value);
            // 检测 SPI 注解内容是否合法，不合法则抛出异常
            if (names.length > 1) {
                throw new IllegalStateException("more than 1 default extension name on extension " + type.getName() + ": " + Arrays.toString(names));
            }
            // 设置默认名称，参考 getDefaultExtension 方法
            if (names.length == 1)
                cachedDefaultName = names[0];
        }
    }

    Map<String, Class<?>> extensionClasses = new HashMap<String, Class<?>>();
    // 加载指定文件夹下的配置文件
    // 1. "META-INF/dubbo/internal/";
    loadDirectory(extensionClasses, DUBBO_INTERNAL_DIRECTORY);
    // 2. "META-INF/dubbo/";
    loadDirectory(extensionClasses, DUBBO_DIRECTORY);
    // 3. "META-INF/services/";
    loadDirectory(extensionClasses, SERVICES_DIRECTORY);
    return extensionClasses;
}
```
上面的 **Step 3、4、5、6、7** 这几步，主要就是为了加载 `ExtensionFactory` 的自适应扩展点，因为此时的 `type` 还是 `ExtensionFactory`。<br>
具体的加载过程就在 `loadDirectory(Map<String, Class<?>> extensionClasses, String dir)` 方法之中。这里会加载 3个 位置的 文件：
- `META-INF/dubbo/internal/`：dubbo 内部自带的扩展点目录
- `META-INF/dubbo/`：用户自定义的扩展点目录
- `META-INF/services/`：JDK 的 扩展点目录

在对应的目录找到各自的扩展点加载器：
1. **META-INF/dubbo/internal/** 目录：<br>
![dubboInternalSPI2](/images/dubbo/dubboInternalSPI2.png)
![dubboInternalSPI](/images/dubbo/dubboInternalSPI.png)
```java
// dubbo-config-spring 包
// src/main/resources/META-INF/dubbo/internal/com.alibaba.dubbo.common.extension.ExtensionFactory
spring=com.alibaba.dubbo.config.spring.extension.SpringExtensionFactory

// dubbo-common 包
// src/main/resources/META-INF/dubbo/internal/com.alibaba.dubbo.common.extension.ExtensionFactory
adaptive=com.alibaba.dubbo.common.extension.factory.AdaptiveExtensionFactory
spi=com.alibaba.dubbo.common.extension.factory.SpiExtensionFactory
```
**注意：** 在其他版本中，把 dubbo-config-spring 包中的 ExtensionFactory 扩展和 dubbo-common 包中的 ExtensionFactory 扩展又整合在一个文件中，如下：
```java
// src/main/resources/META-INF/dubbo/internal/com.alibaba.dubbo.common.extension.ExtensionFactory
spring=com.alibaba.dubbo.config.spring.extension.SpringExtensionFactory
adaptive=com.alibaba.dubbo.common.extension.factory.AdaptiveExtensionFactory
spi=com.alibaba.dubbo.common.extension.factory.SpiExtensionFactory
```
上面的变化不影响分析源码，只是换了一个位置，加载过程还是一样的。

2. **META-INF/dubbo/** 目录：<br>
![userSPI](/images/dubbo/userSPI.png)
```java
// src/main/resources/META-INF/dubbo/com.alibaba.dubbo.demo.model.dubbo_spi.Color 我自定义的
black=com.alibaba.dubbo.demo.model.dubbo_spi.Black
blue=com.alibaba.dubbo.demo.model.dubbo_spi.Blue
red=com.alibaba.dubbo.demo.model.dubbo_spi.Red
```
3. **META-INF/services/** 目录：<br>
暂不考虑

下面接上步 Step 7 继续深入分析加载过程。进入  `loadDirectory(Map<String, Class<?>> extensionClasses, String dir)` 方法：
```java
// Step 8
private void loadDirectory(Map<String, Class<?>> extensionClasses, String dir) {
    // fileName = 文件夹路径 + type 全限定名
    String fileName = dir + type.getName();
    try {
        Enumeration<java.net.URL> urls;
        ClassLoader classLoader = findClassLoader();
        // 根据文件名加载所有的同名文件
        if (classLoader != null) {
            urls = classLoader.getResources(fileName);
        } else {
            urls = ClassLoader.getSystemResources(fileName);
        }
        if (urls != null) {
            while (urls.hasMoreElements()) {
                java.net.URL resourceURL = urls.nextElement();
                // 加载资源
                loadResource(extensionClasses, classLoader, resourceURL); // 核心
            }
        }
    } catch (Throwable t) {
        logger.error("Exception when load extension class(interface: " + type + ", description file: " + fileName + ").", t);
    }
}

// Step 9
private void loadResource(Map<String, Class<?>> extensionClasses, ClassLoader classLoader, java.net.URL resourceURL) {
    try {
        BufferedReader reader = new BufferedReader(new InputStreamReader(resourceURL.openStream(), "utf-8"));
        try {
            String line;
            // 按行读取配置内容
            while ((line = reader.readLine()) != null) {
                final int ci = line.indexOf('#');
                if (ci >= 0) line = line.substring(0, ci);
                line = line.trim();
                if (line.length() > 0) {
                    try {
                        String name = null;
                        int i = line.indexOf('=');
                        if (i > 0) {
                            // 以等于号 = 为界，截取键与值
                            name = line.substring(0, i).trim();
                            line = line.substring(i + 1).trim();
                        }
                        if (line.length() > 0) {
                            // 加载类，并通过 loadClass 方法对类进行缓存
                            loadClass(extensionClasses, resourceURL, Class.forName(line, true, classLoader), name); // 核心
                        }
                    } catch (Throwable t) {
                        IllegalStateException e = new IllegalStateException("Failed to load extension class(interface: " + type + ", class line: " + line + ") in " + resourceURL + ", cause: " + t.getMessage(), t);
                        exceptions.put(line, e);
                    }
                }
            }
        } finally {
            reader.close();
        }
    } catch (Throwable t) {
        logger.error("Exception when load extension class(interface: " + type + ", class file: " + resourceURL + ") in " + resourceURL, t);
    }
}

// Step 10
private void loadClass(Map<String, Class<?>> extensionClasses, java.net.URL resourceURL, Class<?> clazz, String name) throws NoSuchMethodException {
    if (!type.isAssignableFrom(clazz)) {
        throw new IllegalStateException("Error when load extension class(interface: " + type + ", class line: " + clazz.getName() + "), class " + clazz.getName() + "is not subtype of interface.");
    }
    // 检测目标类上是否有 Adaptive 注解
    if (clazz.isAnnotationPresent(Adaptive.class)) {
        if (cachedAdaptiveClass == null) {
            // 设置 cachedAdaptiveClass 缓存
            cachedAdaptiveClass = clazz;  // AdaptiveExtensionFactory
        } else if (!cachedAdaptiveClass.equals(clazz)) {
            throw new IllegalStateException("More than 1 adaptive class found: " + cachedAdaptiveClass.getClass().getName() + ", " + clazz.getClass().getName());
        }
        // 检测 clazz 是否是 Wrapper 类型
    } else if (isWrapperClass(clazz)) {
        Set<Class<?>> wrappers = cachedWrapperClasses;
        if (wrappers == null) {
            cachedWrapperClasses = new ConcurrentHashSet<Class<?>>();
            wrappers = cachedWrapperClasses;
        }
        // 存储 clazz 到 cachedWrapperClasses 缓存中
        wrappers.add(clazz);
    } else {
        // 检测 clazz 是否有默认的构造方法，如果没有，则抛出异常
        clazz.getConstructor();
        if (name == null || name.length() == 0) {
            // 如果 name 为空，则尝试从 Extension 注解中获取 name，或使用小写的类名作为 name
            name = findAnnotationName(clazz);
            if (name.length() == 0) {
                throw new IllegalStateException("No such extension name for the class " + clazz.getName() + " in the config " + resourceURL);
            }
        }
        // 切分 name
        String[] names = NAME_SEPARATOR.split(name);
        if (names != null && names.length > 0) {
            Activate activate = clazz.getAnnotation(Activate.class);
            if (activate != null) {
                // 如果类上有 Activate 注解，则使用 names 数组的第一个元素作为键，
                // 存储 name 到 Activate 注解对象的映射关系
                cachedActivates.put(names[0], activate);
            }
            for (String n : names) {
                if (!cachedNames.containsKey(clazz)) {
                    // 存储 Class 到名称的映射关系
                    cachedNames.put(clazz, n);
                }
                Class<?> c = extensionClasses.get(n);
                if (c == null) {
                    // 存储名称到 Class 的映射关系
                    extensionClasses.put(n, clazz);
                } else if (c != clazz) {
                    throw new IllegalStateException("Duplicate extension " + type.getName() + " name " + n + " on " + c.getName() + " and " + clazz.getName());
                }
            }
        }
    }
}
```

通过上面的 Step 8、9、10 ，loadDirectory ---> loadResource ---> loadClass。



