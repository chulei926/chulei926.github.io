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

### assembly打包
```xml
<!-- POM 配置 -->
<plugin>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>2.5.5</version>
    <configuration>
        <descriptors>
            <descriptor>src/main/assemble/package.xml</descriptor>
        </descriptors>
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>

<!-- src/main/assemble/package.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<assembly xmlns="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.0 http://maven.apache.org/xsd/assembly-1.1.0.xsd">
	<id>package</id>
	<formats>
		<format>zip</format>
	</formats>
	<includeBaseDirectory>true</includeBaseDirectory>
	<fileSets>
		<fileSet>
			<filtered>true</filtered>
			<directory>src/main/bin</directory>
			<outputDirectory>./bin</outputDirectory>
		</fileSet>
		<fileSet>
			<filtered>false</filtered>
			<directory>src/main/resources</directory>
			<outputDirectory>./</outputDirectory>
			<includes>
				<include>**</include>
			</includes>
		</fileSet>
		<fileSet>
			<filtered>true</filtered>
			<directory>src/main</directory>
			<outputDirectory>./</outputDirectory>
			<includes>
				<include>readme.txt</include>
			</includes>
		</fileSet>
	</fileSets>
	<dependencySets>
		<dependencySet>
			<outputDirectory>lib</outputDirectory>
			<scope>runtime</scope>
		</dependencySet>
	</dependencySets>
</assembly>
```
