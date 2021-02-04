# 1. 在tomcat的lib目录中加入4个jar包

- slf4j-api-1.7.25.jar
- logback-access-1.2.3.jar
- logback-classic-1.2.3.jar
- logback-core-1.2.3.jar

# 2. 在tomcat的conf目录中添加`logback-access.xml`配置文件。参考内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
	<!-- always a good activate OnConsoleStatusListener -->
	<statusListener class="ch.qos.logback.core.status.OnConsoleStatusListener" />

	<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
		<encoder>
			<pattern>%reqAttribute{userId} %t{yyyy-MM-dd HH:mm:ss.SSS} %s %b %D [%i{x-forwarded-for}] "%r"</pattern>
		</encoder>
	</appender>

	<appender name="ROLLING_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<File>tomcat-access.log</File>
		<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<fileNamePattern>history/tomcat-access.%d{yyyy-MM-dd}_%i.log</fileNamePattern>
			<MaxHistory>30</MaxHistory>
			<timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
				<maxFileSize>10MB</maxFileSize>
			</timeBasedFileNamingAndTriggeringPolicy>
		</rollingPolicy>
		<!-- appName、appPort、userId的值AccessLogFilter中添加，在此处可以直接通过%reqAttribute方式获取 -->
		<encoder>
			<pattern>%reqAttribute{appName} %reqAttribute{appPort} %reqAttribute{userId} %t{yyyy-MM-ddHH:mm:ss.SSS} %s %b %D [%i{X-Forwarded-For}] "%r"</pattern>
			<charset>UTF-8</charset>
		</encoder>
	</appender>

	<appender-ref ref="ROLLING_FILE" />

</configuration>
```

# 3.创建`AccessLogFilter.java`文件

```java
/**
 * 访问日志处理器。
 *
 * @author leichu
 */
public class AccessLogFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;

        // 获取应用名和端口
		String appName = null == request.getContextPath() || request.getContextPath().length() <= 1 ? "" : request.getContextPath().substring(1);
		int appPort = request.getLocalPort();

        // 从session中获取当前用户信息
		CurUser user = CurUserUtil.get(request, request.getSession());
		String userId = null == user ? null : user.getId();
        
        // 写入request
		request.setAttribute("appName", appName);
		request.setAttribute("appPort", appPort);
		request.setAttribute("userId", userId);

		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {

	}
}

```

# 4.在`web.xml`中配置上面的Filter

```xml
<filter>
    <filter-name>accessLogFilter</filter-name>
    <filter-class>com.leichu.webutil.util.AccessLogFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>accessLogFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>

```

