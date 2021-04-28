# SPI

## 1. 简介
SPI 全称为 Service Provider Interface，是一种服务发现机制。<br>
SPI 的**本质是将接口实现类的全限定名配置在文件中，并由服务加载器读取配置文件，加载实现类**。<br>
这样可以在运行时，动态为接口替换实现类。<br>
正因此特性，我们可以很容易的通过 SPI 机制为我们的程序提供拓展功能。<br>
SPI 机制在第三方框架中也有所应用，比如 Dubbo 就是通过 SPI 机制加载所有的组件。不过，Dubbo 并未使用 Java 原生的 SPI 机制，而是对其进行了增强，使其能够更好的满足需求。在 Dubbo 中，SPI 是一个非常重要的模块。基于 SPI，我们可以很容易的对 Dubbo 进行拓展。

## 2. JAVA SPI 使用范例

## 2.1 定义接口
```java
public interface Color {
	void draw();
}
```
## 2.2 定义实现类
```java
// Red
public class Red  implements Color{
	@Override
	public void draw() {
		System.out.println(" I am Red");
	}
}

// Black
public class Black implements Color{
	@Override
	public void draw() {
		System.out.println(" I am black");
	}
}

// Blue
public class Blue implements Color{
	@Override
	public void draw() {
		System.out.println(" I am blue");
	}
}
```

## 2.3 创建 META-INF/services 文件
在 `src/main/META-INF/services` 文件夹下创建一个文件，名称为 Color 的全限定名 `com.alibaba.dubbo.demo.model.java_spi.Color`。<br>
文件内容为实现类的全限定的类名，如下：

```java
com.alibaba.dubbo.demo.model.java_spi.Black
com.alibaba.dubbo.demo.model.java_spi.Blue
com.alibaba.dubbo.demo.model.java_spi.Red
```

## 2.4 测试

```java
// Java 原生 ServiceLoader

import java.util.ServiceLoader;

public class Java_SPI_Test {

	@Test
	public void spiTest(){
		ServiceLoader<Color> serviceLoader = ServiceLoader.load(Color.class);
		System.out.println("Java SPI");
		Iterator<Color> iterator = serviceLoader.iterator();
		while (iterator.hasNext()) {
			Color color = iterator.next();
			color.draw();
		}
		// Java SPI
		// I am black
		// I am blue
		// I am Red
	}
	
}
```


## 3. Dubbo SPI 使用范例

## 3.1 定义接口
```java
import com.alibaba.dubbo.common.extension.SPI;

// 比 java spi 多了一个 @SPI 注解

@SPI
public interface Color {
	void draw();
}
```

## 3.2 定义实现类
```java
// 同 Java SPI 中的实现类
```

## 3.3 创建 META-INF/dubbo 文件
和 Java SPI 不同， Java SPI在 `META-INF/services` 下创建文件，而 Dubbo SPI 是在 `META-INF/dubbo` 下创建文件。<br>
在 `src/main/META-INF/dubbo` 文件夹下创建一个文件，名称为 Color 的全限定名 `com.alibaba.dubbo.demo.model.dubbo_spi.Color`。<br>
文件内容为实现类的全限定的类名，如下：

```java
black=com.alibaba.dubbo.demo.model.dubbo_spi.Black
blue=com.alibaba.dubbo.demo.model.dubbo_spi.Blue
red=com.alibaba.dubbo.demo.model.dubbo_spi.Red
```

## 3.4 测试

```java
// Dubbo 的 ExtensionLoader
import com.alibaba.dubbo.common.extension.ExtensionLoader;
import com.alibaba.dubbo.demo.model.dubbo_spi.Color;

public class Dubbo_SPI_Test {
	
	@Test
	public void dubboSPI_Test(){
		ExtensionLoader<Color> extensionLoader = ExtensionLoader.getExtensionLoader(Color.class);
		Color red = extensionLoader.getExtension("red");
		red.draw();

		Color blue = extensionLoader.getExtension("blue");
		blue.draw();

		Color black = extensionLoader.getExtension("black");
		black.draw();
	}

}

```


