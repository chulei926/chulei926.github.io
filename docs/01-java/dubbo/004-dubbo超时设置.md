# 服务端配置

```xml
<!--服务配置-->
<dubbo:provider timeout="60000" retries="0"/>

<!--接口配置-->
<dubbo:service interface="com.cosfuture.eiduo.tk.common.service.CommonService" ref="commonService" timeout="1000"/>

<!--方法配置-->
<dubbo:service interface="com.cosfuture.eiduo.tk.paper.service.PaperService" ref="paperService" >
    <dubbo:method name="batchSave" timeout="100000"/>
</dubbo:service>
```

# 客户端配置

同服务端

```xml
<dubbo:consumer timeout="300000" retries="0" check="false"/>
```

# 不同粒度配置的覆盖关系

以 timeout 为例，下图显示了配置的查找顺序，其它 retries, loadbalance, actives 等类似：

- 方法级优先，接口级次之，全局配置再次之。
- 如果级别一样，则消费方优先，提供方次之。


其中，服务提供方配置，通过 URL 经由注册中心传递给消费方。

![dubbo-config-override](/images/dubbo/dubbo-config-override.jpg)


# 最佳实践：
建议由服务提供方设置超时，因为一个方法需要执行多长时间，服务提供方更清楚，如果一个消费方同时引用多个服务，就不需要关心每个服务的超时设置。

