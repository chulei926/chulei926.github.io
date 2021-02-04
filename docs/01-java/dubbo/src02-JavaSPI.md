# 1. 原理解析

```java
public final class ServiceLoader<S> implements Iterable<S> {

    //扫描目录前缀
    private static final String PREFIX = "META-INF/services/";

    // The class or interface representing the service being loaded
    // 被加载的类或接口
    private final Class<S> service;

    // The class loader used to locate, load, and instantiate providers
    // 用于定位、加载和实例化实现方实现的类的类加载器
    private final ClassLoader loader;

    // The access control context taken when the ServiceLoader is created
    // 上下文对象
    private final AccessControlContext acc;

    // Cached providers, in instantiation order
    // 按照实例化的顺序缓存已经实例化的类
    private LinkedHashMap<String,S> providers = new LinkedHashMap<>();

    // The current lazy-lookup iterator
    // 懒查找迭代器
    private LazyIterator lookupIterator;

    // step 4
    public void reload() {
        providers.clear();
        lookupIterator = new LazyIterator(service, loader);
    }
    
    // step 3
    private ServiceLoader(Class<S> svc, ClassLoader cl) {
        service = Objects.requireNonNull(svc, "Service interface cannot be null");
        loader = (cl == null) ? ClassLoader.getSystemClassLoader() : cl;
        acc = (System.getSecurityManager() != null) ? AccessController.getContext() : null;
        reload();
    }

    // ...... 
    
    // Parse a single line from the given configuration file, adding the name
    // on the line to the names list.
    // 按行解析文件 
    private int parseLine(Class<?> service, URL u, BufferedReader r, int lc, List<String> names) throws IOException, ServiceConfigurationError {
        String ln = r.readLine();
        if (ln == null) {
            return -1;
        }
        int ci = ln.indexOf('#');
        if (ci >= 0) ln = ln.substring(0, ci);
        ln = ln.trim();
        int n = ln.length();
        if (n != 0) {
            if ((ln.indexOf(' ') >= 0) || (ln.indexOf('\t') >= 0))
                fail(service, u, lc, "Illegal configuration-file syntax");
            int cp = ln.codePointAt(0);
            if (!Character.isJavaIdentifierStart(cp))
                fail(service, u, lc, "Illegal provider-class name: " + ln);
            for (int i = Character.charCount(cp); i < n; i += Character.charCount(cp)) {
                cp = ln.codePointAt(i);
                if (!Character.isJavaIdentifierPart(cp) && (cp != '.'))
                    fail(service, u, lc, "Illegal provider-class name: " + ln);
            }
            if (!providers.containsKey(ln) && !names.contains(ln))
                names.add(ln);
        }
        return lc + 1;
    }

    // 解析 META-INF/services/ 下的文件 ，比如：com.alibaba.dubbo.demo.model.java_spi.Color
    private Iterator<String> parse(Class<?> service, URL u) throws ServiceConfigurationError {
        InputStream in = null;
        BufferedReader r = null;
        ArrayList<String> names = new ArrayList<>();
        try {
            in = u.openStream();
            r = new BufferedReader(new InputStreamReader(in, "utf-8"));
            int lc = 1;
            while ((lc = parseLine(service, u, r, lc, names)) >= 0);
        } catch (IOException x) {
            fail(service, "Error reading configuration file", x);
        } finally {
            try {
                if (r != null) r.close();
                if (in != null) in.close();
            } catch (IOException y) {
                fail(service, "Error closing configuration file", y);
            }
        }
        return names.iterator();
    }

    // Private inner class implementing fully-lazy provider lookup
    // 私有内部类，提供对所有的service的类的加载与实例化（按需加载）
    // step 5
    private class LazyIterator implements Iterator<S> {

        Class<S> service;
        ClassLoader loader;
        Enumeration<URL> configs = null;
        Iterator<String> pending = null;
        String nextName = null;

        private LazyIterator(Class<S> service, ClassLoader loader) {
            this.service = service;
            this.loader = loader;
        }

        private boolean hasNextService() {
            if (nextName != null) {
                return true;
            }
            if (configs == null) {
                try {
                    // //获取目录下所有的类
                    String fullName = PREFIX + service.getName();
                    if (loader == null)
                        configs = ClassLoader.getSystemResources(fullName);
                    else
                        configs = loader.getResources(fullName);
                } catch (IOException x) {
                    fail(service, "Error locating configuration files", x);
                }
            }
            while ((pending == null) || !pending.hasNext()) {
                if (!configs.hasMoreElements()) {
                    return false;
                }
                pending = parse(service, configs.nextElement());
            }
            nextName = pending.next();
            return true;
        }

        private S nextService() {
            if (!hasNextService())
                throw new NoSuchElementException();
            String cn = nextName;
            nextName = null;
            Class<?> c = null;
            try {
                // 反射加载类
                c = Class.forName(cn, false, loader);
            } catch (ClassNotFoundException x) {
                fail(service, "Provider " + cn + " not found");
            }
            if (!service.isAssignableFrom(c)) {
                fail(service,  "Provider " + cn  + " not a subtype");
            }
            try {
                // 实例化
                S p = service.cast(c.newInstance());
                // 放进缓存
                providers.put(cn, p);
                return p;
            } catch (Throwable x) {
                fail(service, "Provider " + cn + " could not be instantiated", x);
            }
            throw new Error();          // This cannot happen
        }

        public boolean hasNext() {
            if (acc == null) {
                return hasNextService();
            } else {
                PrivilegedAction<Boolean> action = new PrivilegedAction<Boolean>() {
                    public Boolean run() { return hasNextService(); }
                };
                return AccessController.doPrivileged(action, acc);
            }
        }

        public S next() {
            if (acc == null) {
                return nextService();
            } else {
                PrivilegedAction<S> action = new PrivilegedAction<S>() {
                    public S run() { return nextService(); }
                };
                return AccessController.doPrivileged(action, acc);
            }
        }

        public void remove() {
            throw new UnsupportedOperationException();
        }

    }

    // step 2
    public static <S> ServiceLoader<S> load(Class<S> service,  ClassLoader loader) {
        return new ServiceLoader<>(service, loader);
    }

    // step 1
    // 执行 ServiceLoader.load(Color.class) 时
    // 先获取当前线程的 ClassLoader
    // 然后调用 ServiceLoader.load(service, cl)
    public static <S> ServiceLoader<S> load(Class<S> service) {
        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        return ServiceLoader.load(service, cl);
    }

    
    public static <S> ServiceLoader<S> loadInstalled(Class<S> service) {
        ClassLoader cl = ClassLoader.getSystemClassLoader();
        ClassLoader prev = null;
        while (cl != null) {
            prev = cl;
            cl = cl.getParent();
        }
        return ServiceLoader.load(service, prev);
    }
}
```

# 2. 优缺点

## 2.1 优点
- 使用Java SPI机制的优势是实现了解耦，使第三方模块的装配逻辑与业务代码分离。
- 应用程序可以根据实际业务情况使用新的框架拓展或者替换原有组件。


## 2.2 缺点
- ServiceLoader在加载实现类的时候会全部加载并实例化，假如不想使用某些实现类，它也会被加载示例化的，这就造成了浪费。
- 另外获取某个实现类只能通过迭代器迭代获取，不能根据某个参数来获取，使用方式上不够灵活。


# 3. 使用场景

## 3.1 MySQL Driver

### 3.1.1 测试代码

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.11</version>
</dependency>
```

```java
@Test
public void jdbcTest() {
    String url = "jdbc:mysql://localhost:3306/leichu?serverTimezone=GMT&useUnicode=true&characterEncoding=utf-8";
    // 分析入口
	try (Connection connection = DriverManager.getConnection(url, "root", "123456")){
		String sql = "SELECT * FROM `leichu`.`tb_user`";

		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		ResultSet resultSet = preparedStatement.executeQuery();
		while (resultSet.next()) {
			System.out.println(resultSet.getInt("id") + " " + resultSet.getString("name") + " " + resultSet.getString("pwd"));
		}
	} catch (Exception e){
		e.printStackTrace();
	}
}
```

### 3.1.2 源码分析
![mysql-driver](/images/dubbo/mysql-driver.png)
* step 1 ` DriverManager.getConnection(url, "root", "123456")`

    在调用 `getConnection`时，会先调用 DriverManager 中的静态代码快。

```java
// DriverManager.java 

static {
    loadInitialDrivers();
    println("JDBC DriverManager initialized");
}

private static void loadInitialDrivers() {
    String drivers;
    try {
        drivers = AccessController.doPrivileged(new PrivilegedAction<String>() {
            public String run() {
                return System.getProperty("jdbc.drivers");
            }
        });
    } catch (Exception ex) {
        drivers = null;
    }
    
    AccessController.doPrivileged(new PrivilegedAction<Void>() {
        public Void run() {
            // 使用 Java SPI 机制加载 实现了 java.sql.Driver 接口的实现类.
            ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class);
            Iterator<Driver> driversIterator = loadedDrivers.iterator();
            try{
                while(driversIterator.hasNext()) {
                    // 在此处 调用 next() 方法进行 驱动器的实例化
                    driversIterator.next();
                }
            } catch(Throwable t) {
            // Do nothing
            }
            return null;
        }
    });

    // .......
}
        
```


* step 2 `java.sql.DriverManager.registerDriver(new Driver())`

    在 step1 中执行了 `driversIterator.next();`，此时会利用反射机制创建 实现了 `java.sql.Driver` 接口的实现类。
    由于 `com.mysql.cj.jdbc.Driver` 实现了 `java.sql.Driver` ，所以会创建 `com.mysql.cj.jdbc.Driver` 对象。
    在创建 `com.mysql.cj.jdbc.Driver` 对象的时候，优先执行 静态代码块，如下：
```java
public class Driver extends NonRegisteringDriver implements java.sql.Driver {

    static {
        try {
            java.sql.DriverManager.registerDriver(new Driver());
        } catch (SQLException E) {
            throw new RuntimeException("Can't register driver!");
        }
    }

    // ......
}
```

* step 3 缓存注册的驱动

```java
// DriverManager.java

public static synchronized void registerDriver(java.sql.Driver driver, DriverAction da) throws SQLException {

    /* Register the driver if it has not already been added to our list */
    if(driver != null) {
        registeredDrivers.addIfAbsent(new DriverInfo(driver, da));
    } else {
        // This is for compatibility with the original DriverManager
        throw new NullPointerException();
    }

    println("registerDriver: " + driver);
}
```

* step 4 获取驱动，创建连接

```java
private static Connection getConnection(String url, java.util.Properties info, Class<?> caller) throws SQLException {
    
    // ......
    
    for(DriverInfo aDriver : registeredDrivers) {
        
        if(isDriverAllowed(aDriver.driver, callerCL)) {
            try {
                println("    trying " + aDriver.driver.getClass().getName());
                Connection con = aDriver.driver.connect(url, info);
                if (con != null) {
                    // Success!
                    println("getConnection returning " + aDriver.driver.getClass().getName());
                    return (con);
                }
            } catch (SQLException ex) {
                if (reason == null) {
                    reason = ex;
                }
            }

        } else {
            println("    skipping: " + aDriver.getClass().getName());
        }
    }
    // ......
}
```

## 3.2 slf4j
