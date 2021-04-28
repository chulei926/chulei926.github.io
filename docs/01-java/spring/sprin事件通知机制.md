# 事件通知机制

## 定义 Event 继承自 ApplicationEvent
```java
/**
 * 缓存刷新事件.
 *
 * @author leichu 2020-12-17.
 */
public class CacheRefreshEvent extends ApplicationEvent {

	private String phase;
	private String subject;
	private EventModel eventModel;

	public CacheRefreshEvent(Object source, String phase, String subject, EventModel eventModel) {
		super(source);
		this.phase = phase;
		this.subject = subject;
		this.eventModel = eventModel;
	}

	public String getPhase() {
		return phase;
	}

	public void setPhase(String phase) {
		this.phase = phase;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public EventModel getEventModel() {
		return eventModel;
	}

	public void setEventModel(EventModel eventModel) {
		this.eventModel = eventModel;
	}

	/**
	 * 事件模型.
	 */
	public enum EventModel {
		KNOWLEDGE
	}
}
```

## 定义 Listener 实现 ApplicationListener 接口
```java
/**
 * 知识点缓存.
 *
 * @author leichu 2020-12-17.
 */
@Component
public class KnowledgeCacheProcessor implements ApplicationListener<CacheRefreshEvent> {

	private static final Logger logger = LoggerFactory.getLogger(KnowledgeCacheProcessor.class);

	private static final Map<String, List<Knowledge>> knowledgeMap = Maps.newConcurrentMap();
	private static final Map<String, Knowledge> knowledgeCodeMap = Maps.newConcurrentMap();
	private static final Map<String, Map<String, Set<String>>> knowledgeRecommendMap = Maps.newConcurrentMap();

	@Resource
	private CommonDao commonDao;

	@Override
	public void onApplicationEvent(CacheRefreshEvent event) {
		if (event.getEventModel() == CacheRefreshEvent.EventModel.KNOWLEDGE) {
			logger.warn("收到知识点刷新请求，开始刷新知识点缓存......");
			refresh(event.getPhase(), event.getSubject());
			logger.warn("知识点缓存刷新完成......");
		}
	}

	private void refresh(String phaseCode, String subjectCode) {
		if (StringUtils.isBlank(phaseCode) || StringUtils.isBlank(subjectCode)) {
			List<Phase> phaseList = commonDao.findPhaseList();
			phaseList.forEach(phase -> phase.getSubjects().forEach(subject -> {
				String key = String.format("%s_%s", phase.getCode(), subject.getCode());
				List<Knowledge> knowledgeList = commonDao.findKnowledgeList(phase.getCode(), subject.getCode());
				knowledgeMap.put(key, knowledgeList);
				initCodeCache(knowledgeList);
				// 初始化知识点分词map。key: code_name，value: 分词结果。
				Map<String, Set<String>> knowledgeSegmentationMap = Maps.newConcurrentMap();
				initKnowledgeSegmentationMap(knowledgeList, knowledgeSegmentationMap);
				knowledgeRecommendMap.put(key, knowledgeSegmentationMap);
			}));
			return;
		}
		String key = String.format("%s_%s", phaseCode, subjectCode);
		List<Knowledge> knowledgeList = commonDao.findKnowledgeList(phaseCode, subjectCode);
		knowledgeMap.put(key, knowledgeList);
		initCodeCache(knowledgeList);
		// 初始化知识点分词map。key: code_name，value: 分词结果。
		Map<String, Set<String>> knowledgeSegmentationMap = Maps.newConcurrentMap();
		initKnowledgeSegmentationMap(knowledgeList, knowledgeSegmentationMap);
		knowledgeRecommendMap.put(key, knowledgeSegmentationMap);

	}

	private static void initCodeCache(List<Knowledge> knowledgeList) {
		if (CollectionUtils.isEmpty(knowledgeList)) {
			return;
		}
		for (Knowledge knowledge : knowledgeList) {
			knowledgeCodeMap.put(knowledge.getCode(), knowledge);
			initCodeCache(knowledge.getChildren());
		}
	}

	private void initKnowledgeSegmentationMap(List<Knowledge> knowledgeList, Map<String, Set<String>> knowledgeSegmentationMap) {
		if (CollectionUtils.isEmpty(knowledgeList)) {
			return;
		}
		for (Knowledge knowledge : knowledgeList) {
			String code = knowledge.getCode();
			String name = knowledge.getName();
			List<Word> words = WordSegmenter.seg(name);
			if (CollectionUtils.isEmpty(words)) {
				continue;
			}
			Set<String> segSet = Sets.newHashSet();
			words.forEach(w -> segSet.add(w.getText()));
			knowledgeSegmentationMap.put(String.format("%s_%s", code, name), segSet);
			if (CollectionUtils.isNotEmpty(knowledge.getChildren())) {
				initKnowledgeSegmentationMap(knowledge.getChildren(), knowledgeSegmentationMap);
			}
		}
	}

	public static List<Knowledge> getKnowledgeList(String phaseCode, String subjectCode) {
		String key = String.format("%s_%s", phaseCode, subjectCode);
		return knowledgeMap.get(key);
	}

	public static Knowledge getKnowledge(String knowledgeCode) {
		return knowledgeCodeMap.get(knowledgeCode);
	}

	public static Map<String, Set<String>> getKnowledgeSegmentationMap(String phaseCode, String subjectCode) {
		String key = String.format("%s_%s", phaseCode, subjectCode);
		if (knowledgeRecommendMap.containsKey(key)) {
			return knowledgeRecommendMap.get(key);
		}
		return null;
	}

}
```

## 发布事件
```java
CacheRefreshEvent event = new CacheRefreshEvent(this, phaseCode, subjectCode, CacheRefreshEvent.EventModel.KNOWLEDGE);
SpringContextUtil.getApplicationContext().publishEvent(event);
```



