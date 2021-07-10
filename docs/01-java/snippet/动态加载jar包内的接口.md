# 动态加载jar包内的接口

```java
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

public class JarLoadTest {
	public static void main(String[] args) throws Exception {
		URL url = new URL("file:C:\\Users\\leichu\\Desktop\\homework-report-api-1.0.9.jar");
		URLClassLoader classLoader = new URLClassLoader(new URL[]{url}, Thread.currentThread().getContextClassLoader());
		Class<?> clazz = classLoader.loadClass("com.cosfuture.eiduo.homework.report.knowledge.service.Knowledge4SubjectService");
		for (Method method : clazz.getMethods()) {
			System.out.println(method.getName());
		}
	}
}
```
