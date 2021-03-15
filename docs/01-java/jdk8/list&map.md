# list 转 map

```java
Map<String, User> userMap = userList.stream().collect(Collectors.toMap(User::getId, v -> v, (k1, k2) -> k1));
```

# list 排序
```java
// 根据其中一个属性排序
List<SimilarQuestion> similarQuestions = new ArrayList<>();
// 根据相似度 倒排
similarQuestions.sort(Comparator.comparingDouble(SimilarQuestion::getSimilarity).reversed());
```

# map 排序

```java
// 根据 key 排序
Map<Difficulty, List<RecommendSuggestion>> map = new HashMap<>();
Map<Difficulty, List<RecommendSuggestion>> diffMap = map.entrySet().stream().sorted(Map.Entry.comparingByKey())
					.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldValue, newValue) -> oldValue, LinkedHashMap::new));
```

