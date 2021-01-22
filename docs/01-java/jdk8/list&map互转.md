# list 转 map

```java
Map<String, User> userMap = userList.stream().collect(Collectors.toMap(User::getId, v -> v, (k1, k2) -> k1));
```

