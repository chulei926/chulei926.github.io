# 常用命令
```shell
# 跳过单元测试
mvn clean package -Dmaven.skip.test=true

# 测试环境构建
mvn clean release:clean release:prepare release:perform
```

# 常用插件

### 指定JDK版本
```xml
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-compiler-plugin</artifactId>
	<configuration>
		<source>1.8</source>
		<target>1.8</target>
	</configuration>
</plugin>
```

### 跳过单元测试
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <skip>true</skip>
    </configuration>
</plugin>
```

### WEB-INF/lib目录下的jar包无法用maven打包
```xml
<plugin>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <source>1.8</source>
        <target>1.8</target>
        <encoding>UTF-8</encoding>
        <compilerArguments>
            <extdirs>${basedir}/src/main/webapp/WEB-INF/lib</extdirs>
        </compilerArguments>
    </configuration>
</plugin>
```

