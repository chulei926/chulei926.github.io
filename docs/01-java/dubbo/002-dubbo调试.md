# dubbo调试

## 1.点对点直连
```xml
<dubbo:reference id="userService" interface="com.kitty.UserService" url="dubbo://127.0.0.1:21000"  check="false"/>
```
    
## 2.invoke方式
```shell
telnet localhost 20880
dubbo> ls
com.test.DemoService
dubbo> ls com.test.DemoService
queryDemoPageList
insertDemolist
dubbo>invoke com.test.DemoService.queryDemoPageList({"id":"100"}, 1, 2)
{"totalCount":1,"data":[{date":"2011-03-23 14:10:32","name":"张三","keyword":null}]}
elapsed: 10 ms.
```

        