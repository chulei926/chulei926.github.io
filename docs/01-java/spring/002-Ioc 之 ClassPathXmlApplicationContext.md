# 1. ClassPathXmlApplicationContext 核心关系图
![ClassPathXmlApplicationContext](/images/spring/ClassPathXmlApplicationContext.png)

# 2. 创建过程分析：

代码：
```java
/**
 * <b>
 * 1. 先调用父类构造器进行初始化。<br/>
 * 2. 设置 xml 文件路径。<br/>
 * 3. refresh 加载配置文件。<br/>
 * </b>
 * Create a new ClassPathXmlApplicationContext with the given parent,
 * loading the definitions from the given XML files.
 *
 * @param configLocations array of resource locations
 * @param refresh         whether to automatically refresh the context,
 *                        loading all bean definitions and creating all singletons.
 *                        Alternatively, call refresh manually after further configuring the context.
 * @param parent          the parent context
 * @throws BeansException if context creation failed
 * @see #refresh()
 */
public ClassPathXmlApplicationContext(String[] configLocations, boolean refresh, @Nullable ApplicationContext parent) throws BeansException {
	super(parent); // parent = null
	setConfigLocations(configLocations);
	if (refresh) { // refresh = true
		refresh();
	}
}
```

## 2.1 super(parent);

从 ClassPathXmlApplicationContext 的关系图可以看到，**ClassPathXmlApplicationContext 本质上其实就是一个 BeanFactory**。只不过 ClassPathXmlApplicationContext 在 BeanFactory 的基础上进行了很多扩展（暂不关心）。 <br/>
- **ClassPathXmlApplicationContext** 继承自 AbstractXmlApplicationContext
- **AbstractXmlApplicationContext** 继承自 AbstractRefreshableConfigApplicationContext
- **AbstractRefreshableConfigApplicationContext** 继承自 AbstractRefreshableApplicationContext
- **AbstractRefreshableApplicationContext** 继承自 AbstractApplicationContext
- **AbstractApplicationContext** 继承自 DefaultResourceLoader
- **DefaultResourceLoader** 最终实现了 **ResourceLoader** 接口

通过源码看出，调用 super(parent) 后，在 **AbstractApplicationContext** 中创建了一个**resourcePatternResolver = new PathMatchingResourcePatternResolver(this)**。

![PathMatchingResourcePatternResolver](/images/spring/PathMatchingResourcePatternResolver.png)

从上图可以看出， PathMatchingResourcePatternResolver 就是为了加载某个路径 xml 文件而定义的一个 **路径解析器**。 

![PathMatchingResourcePatternResolver-Structure](/images/spring/PathMatchingResourcePatternResolver-Structure.png)

上面的核心接口在 **AbstractBeanDefinitionReader**#**loadBeanDefinitions**(`String location, @Nullable Set<Resource> actualResources`) 处有调用。


## 2.2 setConfigLocations(configLocations); 

设置 xml 配置文件到 configLocations， 此处 configLocations 是一个字符串数组，支持多个 xml 文件。

## 2.3 refresh(); 重点！
```java
@Override
public void refresh() throws BeansException, IllegalStateException {
    synchronized (this.startupShutdownMonitor) {
        // 环境准备。 包括： 设置启动时间； 设置结束标记； 设置激活标记；  环境校验 getEnvironment().validateRequiredProperties()
        prepareRefresh();   // step 1

        // 获取一个新的 beanFactory。为什么？ 因为要对 beanFactory 进行配置。
        ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();     // step 2
        
        /**
            * 此时，beanFactory 中的 beanDefinitionMap 已经有值.
            * 包括 spring 自带的几个类（RootBeanDefinition）， 还有自定义的一些类（ScannedGenericBeanDefinition）。
            */
    
        // 对 beanFactory 进行初始化配置
        prepareBeanFactory(beanFactory);    // step 3

        try {
            // 该方法暂未实现。
            postProcessBeanFactory(beanFactory);        // step 4

            /**
                * 执行 BeanFactoryPostProcessor.
                * 先执行 spring 框架中 实现了 BeanFactoryPostProcessor 接口的 类。
                * 再执行 用户自定义的  实现了 BeanFactoryPostProcessor 接口的 类。
                *
                * scan ---> put map ---> invokeBeanFactoryPostProcessors.
                * 注意！！！
                * 此时，所有的 bean 并没有被实例化，只是定义完成。
                * 实例化是在下面的 finishBeanFactoryInitialization 中完成的。
                */
            invokeBeanFactoryPostProcessors(beanFactory);       // step 5

            // 注册 BeanPostProcessors.
            registerBeanPostProcessors(beanFactory);        // step 6

            // Initialize message source for this context.
            initMessageSource();        // step 7

            // Initialize event multicaster for this context.
            initApplicationEventMulticaster();      // step 8

            // Initialize other special beans in specific context subclasses.
            onRefresh();        // step 9

            // Check for listener beans and register them.
            registerListeners();        // step 10

            // Instantiate all remaining (non-lazy-init) singletons. 开始实例化对象。单例！
            finishBeanFactoryInitialization(beanFactory);       // step 11

            // Last step: publish corresponding event.
            finishRefresh();        // step 12
        } catch (BeansException ex) {
            if (logger.isWarnEnabled()) {
                logger.warn("Exception encountered during context initialization - cancelling refresh attempt: " + ex);
            }
            // Destroy already created singletons to avoid dangling resources.
            destroyBeans();
            // Reset 'active' flag.
            cancelRefresh(ex);
            // Propagate exception to caller.
            throw ex;
        } finally {
            // Reset common introspection caches in Spring's core, since we
            // might not ever need metadata for singleton beans anymore...
            resetCommonCaches();
        }
    }
}
```

下面逐步分析：

### 2.3.1 step 1    prepareRefresh();
```java
protected void prepareRefresh() {
    // Switch to active.
    this.startupDate = System.currentTimeMillis();
    this.closed.set(false);
    this.active.set(true);
    // Initialize any placeholder property sources in the context environment.
    initPropertySources();
    // Validate that all properties marked as required are resolvable:
    // see ConfigurablePropertyResolver#setRequiredProperties
    getEnvironment().validateRequiredProperties();
    // Store pre-refresh ApplicationListeners...
    if (this.earlyApplicationListeners ** null) {
        this.earlyApplicationListeners = new LinkedHashSet<>(this.applicationListeners);
    } else {
        // Reset local application listeners to pre-refresh state.
        this.applicationListeners.clear();
        this.applicationListeners.addAll(this.earlyApplicationListeners);
    }
    this.earlyApplicationEvents = new LinkedHashSet<>();
}
```
    
### 2.3.2 step 2    ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory(); 
此过程比较复杂，下面详细分析：

- AbstractRefreshableApplicationContext#**refreshBeanFactory**（刷新）
    ```java
    @Override
    protected final void refreshBeanFactory() throws BeansException {
    	if (hasBeanFactory()) {     // step 1
    		System.err.println("-------------------- AbstractRefreshableApplicationContext.refreshBeanFactory已经有工厂，先销毁 --------------------");
    		destroyBeans();
    		closeBeanFactory();
    	}
    	try {
    		DefaultListableBeanFactory beanFactory = createBeanFactory();     // step 2
    		beanFactory.setSerializationId(getId());
    		customizeBeanFactory(beanFactory);                                // step 3
    		loadBeanDefinitions(beanFactory);                                 // step 4 核心
    		synchronized (this.beanFactoryMonitor) {
    			this.beanFactory = beanFactory;
    		}
    	}
    	catch (IOException ex) {
    		throw new ApplicationContextException("I/O error parsing bean definition source for " + getDisplayName(), ex);
    	}
    }
    ```
    - 如果已经存在 BeanFactory ， 先 注销 所有的 Bean，然后关闭 BeanFactory。
    - 否则，执行 **createBeanFactory**() 创建一个新的 BeanFactory。然后 执行 **customizeBeanFactory**(beanFactory) 和 **loadBeanDefinitions**(beanFactory);
        - createBeanFactory()过程中，创建的是一个 **DefaultListableBeanFactory**，DefaultListableBeanFactory 类的关系图如下：![DefaultListableBeanFactory](/images/spring/DefaultListableBeanFactory.png)
        - 在创建 DefaultListableBeanFactory 时，由于父类的集成关系，会先创建一个 **AbstractAutowireCapableBeanFactory**， AbstractAutowireCapableBeanFactory 这个类比较重要，在创建 bean 的时候再详细分析。
        - 创建完 DefaultListableBeanFactory 后，开始进行自定义 BeanFactory，执行 customizeBeanFactory(beanFactory)
        ```java
        protected void customizeBeanFactory(DefaultListableBeanFactory beanFactory) {
            // 配置了bean是否允许被覆盖，如果允许，beanDefinitionMap 有重复的key存在时就会覆盖，否则就会抛异常。
            // 在 org.springframework.beans.factory.support.DefaultListableBeanFactory.registerBeanDefinition(String beanName, BeanDefinition beanDefinition) 方法中有体现。
            // 默认值 = true
            if (this.allowBeanDefinitionOverriding != null) {
                beanFactory.setAllowBeanDefinitionOverriding(this.allowBeanDefinitionOverriding);
            }
            // 是否允许循环依赖，这里留下一个问题，Spring 是如何解决循环依赖的？
            // 默认是 允许
            if (this.allowCircularReferences != null) {
                beanFactory.setAllowCircularReferences(this.allowCircularReferences);
            }
        }
        ```
        - 在 自定义 BeanFactory 之后，开始正式的创建 **BeanDefinition**， BeanDefinition 是什么？这里先简单的将其认为就是 Bean 的定义。然后将所有的 BeanDefinition 放到  DefaultListableBeanFactory.**beanDefinitionMap<String, BeanDefinition>** 进行存储，然后在需要的时候直接获取。
        此步骤是加载 bean 的核心！！！下面详细分析 AbstractXmlApplicationContext#**loadBeanDefinitions**(DefaultListableBeanFactory).
        ```java
            @Override
            protected void loadBeanDefinitions(DefaultListableBeanFactory beanFactory) throws BeansException, IOException {
                System.err.println("--- 创建工厂 之 加载BeanDefinition --- ");
                // Create a new XmlBeanDefinitionReader for the given BeanFactory.
                XmlBeanDefinitionReader beanDefinitionReader = new XmlBeanDefinitionReader(beanFactory);
        
                // Configure the bean definition reader with this context's
                // resource loading environment.
                beanDefinitionReader.setEnvironment(this.getEnvironment());
                beanDefinitionReader.setResourceLoader(this);
                beanDefinitionReader.setEntityResolver(new ResourceEntityResolver(this));

                // Allow a subclass to provide custom initialization of the reader,
                // then proceed with actually loading the bean definitions.
                initBeanDefinitionReader(beanDefinitionReader);
                loadBeanDefinitions(beanDefinitionReader);
            }
        ```
        - 由上面的代码可以看出，先创建了一个 **XmlBeanDefinitionReader**。 XmlBeanDefinitionReader 是什么？ 从名称可知，XmlBeanDefinitionReader 就是将 xml 转换成 BeanDefinition 的 解析器。<br/>
        ![XmlBeanDefinitionReader](/images/spring/XmlBeanDefinitionReader.png) <br/> 
        从继承关系可知，创建 XmlBeanDefinitionReader 之前先调用父类 **AbstractBeanDefinitionReader** 的构造器进行初始化，此处主要初始化了一个**BeanDefinitionRegistry** 和一个 **ResourceLoader**。
        - 创建完 XmlBeanDefinitionReader 之后，再进行一些设置：setEnvironment、setResourceLoader、setEntityResolver。
        - 下面开始核心的 loadBeanDefinitions(beanDefinitionReader); 方法。
        ```java
        protected void loadBeanDefinitions(XmlBeanDefinitionReader reader) throws BeansException, IOException {
            System.err.println("--- 创建工厂 之 加载 BeanDefinitionReader --- ");
            Resource[] configResources = getConfigResources();  // 这里返回 null。
            if (configResources != null) {
                reader.loadBeanDefinitions(configResources);
            }
            String[] configLocations = getConfigLocations();    // 获取 spring bean 的 xml 配置文件. 也就是我们的 beans.xml
            if (configLocations != null) {
                reader.loadBeanDefinitions(configLocations);    // 调用上一步创建的 XmlBeanDefinitionReader 开始解析 xml 文件。
            }
        }
        ```
        - 接下来几经跳转，进入到 `AbstractBeanDefinitionReader#loadBeanDefinitions(String, Set<Resource>)` 方法。该方法中先获取前几步中设置的 **ResourceLoader** 。然后调用 ResourceLoader 的 getResources() 方法将传入的 xml 文件解析成 Resource 数组。<br/>
        `Resource[] resources = ((ResourcePatternResolver) resourceLoader).getResources(location);`
        - 然后又几经跳转，进入 XmlBeanDefinitionReader#**loadBeanDefinitions**(Resource)方法。在改方法中，对传入的 Resource 进行一层包装，包装成 **EncodedResource**。然后继续调用本类中的 XmlBeanDefinitionReader#loadBeanDefinitions(EncodedResource) 方法，进一步进行装载。核心源码如下：
        ```java
            public int loadBeanDefinitions(EncodedResource encodedResource) throws BeanDefinitionStoreException {
                Set<EncodedResource> currentResources = this.resourcesCurrentlyBeingLoaded.get();
                if (currentResources ** null) {
                    currentResources = new HashSet<>(4);
                    this.resourcesCurrentlyBeingLoaded.set(currentResources);   // 设置正在加载的 Resource 到 ThreadLocal<Set<EncodedResource>> 
                }
                /**
                    * 在解析Resource之前，Spring会将此Resource存储于当前线程的局部变量ThreadLocal<Set<EncodedResource>> resourcesCurrentlyBeingLoaded中；
                    * 在解析之后会将Resource从resourcesCurrentlyBeingLoaded移除。
                    * 但这个操作的目的是什么呢？
                    * 从两方面来分析：
                    * 1. 利用Set结构防止重复解析，注意看 标注1 处的代码，我们知道Set内元素唯一，如果已经将同一个Resource多次添加至Set中时，除了第一次之外其余都不会添加成功的；
                    * 2. 利用ThreadLocal确保线程安全。
                    *    虽然第一步通过Set防止了重复解析，但前提是单线程情况下；
                    *    如果此方法被多线程调用时，那么还是会有几率出现一个Resource被多次解析；
                    *    传统的解决方式是使用synchronized进行同步，但加锁会导致解析效率低下，所以此处将其放置于ThreadLocal对象中，确保每个线程只能访问自己的Set，
                    *    从而既保证了性能，又解决了线程不安全的问题.
                    *
                    */
                if (!currentResources.add(encodedResource)) {   // 标注1
                    throw new BeanDefinitionStoreException("Detected cyclic loading of " + encodedResource + " - check your import definitions!");
                }
                try {
                    InputStream inputStream = encodedResource.getResource().getInputStream();   // 从 Resource 中获取 InputStream，创建 InputSource
                    try {
                        InputSource inputSource = new InputSource(inputStream);
                        if (encodedResource.getEncoding() != null) {
                            inputSource.setEncoding(encodedResource.getEncoding());
                        }
                        return doLoadBeanDefinitions(inputSource, encodedResource.getResource());   // 标注2
                    } finally {
                        inputStream.close();
                    }
                } catch (IOException ex) {
                    throw new BeanDefinitionStoreException("IOException parsing XML document from " + encodedResource.getResource(), ex);
                } finally {
                    currentResources.remove(encodedResource);
                    if (currentResources.isEmpty()) {
                        this.resourcesCurrentlyBeingLoaded.remove();
                    }
                }
            }
        ```
        - 上面用到了 `ThreadLocal<Set<EncodedResource>> resourcesCurrentlyBeingLoaded`进行存储 当前正在加载的 XML Resource 资源，为什么在此处使用[**ThreadLocal**](https://www.jianshu.com/p/3c5d7f09dfbd/)？原因标注在上面的源码中。
        - 接下来，通过 Resource 获取 到 InputStream ， 然后构建 InputSource。然后从 InputSource 和 Resource 中 解析 BeanDefinition。核心源码如下：
        ```java
            protected int doLoadBeanDefinitions(InputSource inputSource, Resource resource) throws BeanDefinitionStoreException {
                try {
                    Document doc = doLoadDocument(inputSource, resource);
                    int count = registerBeanDefinitions(doc, resource);
                    return count;
                } catch (BeanDefinitionStoreException ex) {
                    throw ex;
                } catch (SAXParseException ex) {
                    throw new XmlBeanDefinitionStoreException(resource.getDescription(), "Line " + ex.getLineNumber() + " in XML document from " + resource + " is invalid", ex);
                } catch (SAXException ex) {
                    throw new XmlBeanDefinitionStoreException(resource.getDescription(), "XML document from " + resource + " is invalid", ex);
                } catch (ParserConfigurationException ex) {
                    throw new BeanDefinitionStoreException(resource.getDescription(), "Parser configuration exception parsing XML from " + resource, ex);
                } catch (IOException ex) {
                    throw new BeanDefinitionStoreException(resource.getDescription(), "IOException parsing XML document from " + resource, ex);
                } catch (Throwable ex) {
                    throw new BeanDefinitionStoreException(resource.getDescription(), "Unexpected exception parsing XML document from " + resource, ex);
                }
            }
        ```
        - 从上面的源码看出，主要进行两步操作，第一步 将 Resource 转换为 Document， 第二步 将 Document 解析成 BeanDinifition 然后进行注册。注册到哪里？注册到前面说的 **DefaultListableBeanFactory.beanDefinitionMap** 中.下面继续深入探索。
        - 如何将 Resource 转换成 Document？ 此处不是重点，后面再分析。
        - 将 Document 解析成 BeanDinifition 然后进行注册，中间的详细注册过程是怎么样的？<br/>
        ![Document转BeanDefinition](/images/spring/XmlBeanDefinitionReader.png)<br/>
        核心调用栈如下：<br/>
        - XmlBeanDefinitionReader#**registerBeanDefinitions**(Document doc, Resource resource)
        - XmlBeanDefinitionReader#**createBeanDefinitionDocumentReader**()
        - XmlBeanDefinitionReader#**createReaderContext**(Resource resource)
        - DefaultBeanDefinitionDocumentReader#**registerBeanDefinitions**(Document doc, XmlReaderContext readerContext)
        - DefaultBeanDefinitionDocumentReader#**doRegisterBeanDefinitions**(Element root)
        - DefaultBeanDefinitionDocumentReader#**createDelegate**(XmlReaderContext readerContext, Element root, @Nullable BeanDefinitionParserDelegate parentDelegate)
        - DefaultBeanDefinitionDocumentReader#**parseBeanDefinitions**(Element root, BeanDefinitionParserDelegate delegate)
        - DefaultBeanDefinitionDocumentReader#**parseDefaultElement**(Element ele, BeanDefinitionParserDelegate delegate)
        - DefaultBeanDefinitionDocumentReader#**processBeanDefinition**(Element ele, BeanDefinitionParserDelegate delegate)
        - BeanDefinitionParserDelegate#**parseBeanDefinitionElement**(Element)
            - BeanDefinitionParserDelegate#**parseBeanDefinitionElement**(Element, BeanDefinition)
        - BeanDefinitionReaderUtils#**registerBeanDefinition**(BeanDefinitionHolder definitionHolder, BeanDefinitionRegistry registry)
        - **DefaultListableBeanFactory**#**registerBeanDefinition**(String beanName, BeanDefinition beanDefinition)
       
        经过上面一系列的调用、跳转，最终将 BeanDefinition 注册到 beanDefinitionMap。这个过程中有几个类要特殊记录一下：
        - XmlBeanDefinitionReader 的 registerBeanDefinitions(Document doc, Resource resource) 方法 处理的是 Document 和 Resource。
        - BeanDefinitionDocumentReader 是一个接口，它只定义了一个 registerBeanDefinitions(Document doc, XmlReaderContext readerContext) 方法，DefaultBeanDefinitionDocumentReader 是其默认的实现类。从这一步来说，BeanDefinition 的解析个注册是由 DefaultBeanDefinitionDocumentReader 完成的，但是，不全对，从 DefaultBeanDefinitionDocumentReader.doRegisterBeanDefinitions(Element root) 方法来看，这个类处理的主要还是 Document。
        - 那到底是谁生成的 BeanDefinition 呢？ 看下面的源码：
        ```java
            // DefaultBeanDefinitionDocumentReader.java
        	protected void doRegisterBeanDefinitions(Element root) {
        		BeanDefinitionParserDelegate parent = this.delegate;
        		this.delegate = createDelegate(getReaderContext(), root, parent);
        		if (this.delegate.isDefaultNamespace(root)) {
        			String profileSpec = root.getAttribute(PROFILE_ATTRIBUTE);  // 获取 profile
        			if (StringUtils.hasText(profileSpec)) {
        				String[] specifiedProfiles = StringUtils.tokenizeToStringArray(profileSpec, BeanDefinitionParserDelegate.MULTI_VALUE_ATTRIBUTE_DELIMITERS);
        				if (!getReaderContext().getEnvironment().acceptsProfiles(specifiedProfiles)) {
        					if (logger.isDebugEnabled()) {
        						logger.debug("Skipped XML bean definition file due to specified profiles [" + profileSpec + "] not matching: " + getReaderContext().getResource());
        					}
        					return;
        				}
        			}
        		}
        
        		preProcessXml(root);
        		parseBeanDefinitions(root, this.delegate); // 在这一步 开始 解析xml、扫描包、生成BeanDefinition并放入到beanFactory.beanDefinitionMap
        		postProcessXml(root);
        
        		this.delegate = parent;
        	}
        
        	protected BeanDefinitionParserDelegate createDelegate(XmlReaderContext readerContext, Element root, @Nullable BeanDefinitionParserDelegate parentDelegate) {
        		BeanDefinitionParserDelegate delegate = new BeanDefinitionParserDelegate(readerContext); // 创建一个 解析 BeanDefinition 的委托类。
        		delegate.initDefaults(root, parentDelegate);
        		return delegate;
        	}
        	
    		protected void parseBeanDefinitions(Element root, BeanDefinitionParserDelegate delegate) {
        		if (delegate.isDefaultNamespace(root)) {
        			NodeList nl = root.getChildNodes();
        			for (int i = 0; i < nl.getLength(); i++) {
        				Node node = nl.item(i);
        				if (node instanceof Element) {
        					Element ele = (Element) node;
        					if (delegate.isDefaultNamespace(ele)) {
        						parseDefaultElement(ele, delegate);
        					} else {
        						delegate.parseCustomElement(ele);
        					}
        				}
        			}
        		} else {
        			delegate.parseCustomElement(root);
        		}
        	}
        
        	/**
        	 * 根据标签名称 解析默认元素。
        	 * @param ele
        	 * @param delegate
        	 */
        	private void parseDefaultElement(Element ele, BeanDefinitionParserDelegate delegate) {
        		// 解析 import
        		if (delegate.nodeNameEquals(ele, IMPORT_ELEMENT)) {
        			importBeanDefinitionResource(ele);
        		}
        		// 解析 alias
        		else if (delegate.nodeNameEquals(ele, ALIAS_ELEMENT)) {
        			processAliasRegistration(ele);
        		}
        		// 解析 bean
        		else if (delegate.nodeNameEquals(ele, BEAN_ELEMENT)) {
        			processBeanDefinition(ele, delegate);
        		}
        		// 解析 beans
        		else if (delegate.nodeNameEquals(ele, NESTED_BEANS_ELEMENT)) {
        			// recurse  递归
        			doRegisterBeanDefinitions(ele);
        		}
        	}
        	
        	protected void processBeanDefinition(Element ele, BeanDefinitionParserDelegate delegate) {
        		BeanDefinitionHolder bdHolder = delegate.parseBeanDefinitionElement(ele);
        		if (bdHolder != null) {
        			bdHolder = delegate.decorateBeanDefinitionIfRequired(ele, bdHolder);
        			try {
        				// Register the final decorated instance.
        				BeanDefinitionReaderUtils.registerBeanDefinition(bdHolder, getReaderContext().getRegistry());
        			}
        			catch (BeanDefinitionStoreException ex) {
        				getReaderContext().error("Failed to register bean definition with name '" + bdHolder.getBeanName() + "'", ele, ex);
        			}
        			// Send registration event.
        			getReaderContext().fireComponentRegistered(new BeanComponentDefinition(bdHolder));
        		}
        	}

        ```
        - 从上面的源码看出，`BeanDefinitionHolder bdHolder = delegate.parseBeanDefinitionElement(ele)`真正解析 BeanDefinition 似乎是 委托 给了 **BeanDefinitionParserDelegate**，下面是 BeanDefinitionParserDelegate 中的核心源码：
        ```java
            // BeanDefinitionParserDelegate.java
        
        	public BeanDefinitionHolder parseBeanDefinitionElement(Element ele) {
        		return parseBeanDefinitionElement(ele, null);
        	}
        	
    		public BeanDefinitionHolder parseBeanDefinitionElement(Element ele, @Nullable BeanDefinition containingBean) {
        		String id = ele.getAttribute(ID_ATTRIBUTE);
        		String nameAttr = ele.getAttribute(NAME_ATTRIBUTE);
        
        		List<String> aliases = new ArrayList<>();
        		if (StringUtils.hasLength(nameAttr)) {
        			String[] nameArr = StringUtils.tokenizeToStringArray(nameAttr, MULTI_VALUE_ATTRIBUTE_DELIMITERS);
        			aliases.addAll(Arrays.asList(nameArr));
        		}
        
        		String beanName = id;
        		if (!StringUtils.hasText(beanName) && !aliases.isEmpty()) {
        			beanName = aliases.remove(0);
        			if (logger.isTraceEnabled()) {
        				logger.trace("No XML 'id' specified - using '" + beanName + "' as bean name and " + aliases + " as aliases");
        			}
        		}
        
        		if (containingBean ** null) {
        			checkNameUniqueness(beanName, aliases, ele);
        		}
        
        		AbstractBeanDefinition beanDefinition = parseBeanDefinitionElement(ele, beanName, containingBean);  // 创建 AbstractBeanDefinition
        		if (beanDefinition != null) {
        			if (!StringUtils.hasText(beanName)) {
        				try {
        					if (containingBean != null) {
        						beanName = BeanDefinitionReaderUtils.generateBeanName(beanDefinition, this.readerContext.getRegistry(), true);
        					}
        					else {
        						beanName = this.readerContext.generateBeanName(beanDefinition);
        						// Register an alias for the plain bean class name, if still possible,
        						// if the generator returned the class name plus a suffix.
        						// This is expected for Spring 1.2/2.0 backwards compatibility.
        						String beanClassName = beanDefinition.getBeanClassName();
        						if (beanClassName != null &&
        								beanName.startsWith(beanClassName) && beanName.length() > beanClassName.length() &&
        								!this.readerContext.getRegistry().isBeanNameInUse(beanClassName)) {
        							aliases.add(beanClassName);
        						}
        					}
        					if (logger.isTraceEnabled()) {
        						logger.trace("Neither XML 'id' nor 'name' specified - " + "using generated bean name [" + beanName + "]");
        					}
        				}
        				catch (Exception ex) {
        					error(ex.getMessage(), ele);
        					return null;
        				}
        			}
        			String[] aliasesArray = StringUtils.toStringArray(aliases);
        			return new BeanDefinitionHolder(beanDefinition, beanName, aliasesArray);
        		}
        		return null;
        	}
        	
        	public AbstractBeanDefinition parseBeanDefinitionElement(Element ele, String beanName, @Nullable BeanDefinition containingBean) {
        		this.parseState.push(new BeanEntry(beanName));
        		String className = null;
        		if (ele.hasAttribute(CLASS_ATTRIBUTE)) {
        			className = ele.getAttribute(CLASS_ATTRIBUTE).trim();
        		}
        		String parent = null;
        		if (ele.hasAttribute(PARENT_ATTRIBUTE)) {
        			parent = ele.getAttribute(PARENT_ATTRIBUTE);
        		}
        		try {
        			AbstractBeanDefinition bd = createBeanDefinition(className, parent);
        
        			parseBeanDefinitionAttributes(ele, beanName, containingBean, bd);
        			bd.setDescription(DomUtils.getChildElementValueByTagName(ele, DESCRIPTION_ELEMENT));
        
        			parseMetaElements(ele, bd);
        			parseLookupOverrideSubElements(ele, bd.getMethodOverrides());
        			parseReplacedMethodSubElements(ele, bd.getMethodOverrides());
        
        			parseConstructorArgElements(ele, bd);
        			parsePropertyElements(ele, bd);
        			parseQualifierElements(ele, bd);
        
        			bd.setResource(this.readerContext.getResource());
        			bd.setSource(extractSource(ele));
        
        			return bd;
        		} catch (ClassNotFoundException ex) {
        			error("Bean class [" + className + "] not found", ele, ex);
        		} catch (NoClassDefFoundError err) {
        			error("Class that bean class [" + className + "] depends on not found", ele, err);
        		} catch (Throwable ex) {
        			error("Unexpected failure during bean definition parsing", ele, ex);
        		} finally {
        			this.parseState.pop();
        		}
        		return null;
        	}
        	
        	protected AbstractBeanDefinition createBeanDefinition(@Nullable String className, @Nullable String parentName) throws ClassNotFoundException {
        		return BeanDefinitionReaderUtils.createBeanDefinition(parentName, className, this.readerContext.getBeanClassLoader());
        	}
        ```
        - 从上面的源码可以看出 BeanDefinitionParserDelegate 最终返回的是一个 **BeanDefinitionHolder**，其实 BeanDefinitionHolder 中包含了 BeanDefinition，那 BeanDefinition 究竟是在哪一步创建的呢 ？ 源码中一句`AbstractBeanDefinition beanDefinition = parseBeanDefinitionElement(ele, beanName, containingBean)`可以看出，这个方法返回了一个 AbstractBeanDefinition，那可以肯定 BeanDefinition 是在这个方法里面完成最终创建的，仔细阅读这个方法发现，真正的创建在`AbstractBeanDefinition bd = createBeanDefinition(className, parent);`这一句，在看这个方法，发现 又 通过 **BeanDefinitionReaderUtils** 来创建 BeanDefinition。
        - 截至到这里，BeanDefinition 真正的创建完成。BeanDefinitionReaderUtils 工具类中的细节 暂不深入研究。
        - 完成了 BeanDefinition 的解析过程分析，下面就是 BeanDefinition 是如何注册到 **DefaultListableBeanFactory.beanDefinitionMap** 中的？下面继续分析。
        - 再回到 `DefaultBeanDefinitionDocumentReader#processBeanDefinition(Element ele, BeanDefinitionParserDelegate delegate)`方法：
        ```java
            // DefaultBeanDefinitionDocumentReader.java // line 314
        	protected void processBeanDefinition(Element ele, BeanDefinitionParserDelegate delegate) {
        		BeanDefinitionHolder bdHolder = delegate.parseBeanDefinitionElement(ele); // step 1 
        		if (bdHolder != null) {
        			bdHolder = delegate.decorateBeanDefinitionIfRequired(ele, bdHolder);
        			try {
        				// Register the final decorated instance.
        				BeanDefinitionReaderUtils.registerBeanDefinition(bdHolder, getReaderContext().getRegistry());       // step 2
        			}
        			catch (BeanDefinitionStoreException ex) {
        				getReaderContext().error("Failed to register bean definition with name '" + bdHolder.getBeanName() + "'", ele, ex);
        			}
        			// Send registration event.
        			getReaderContext().fireComponentRegistered(new BeanComponentDefinition(bdHolder));
        		}
        	}
        ```
        - 在完成step1的 BeanDefinition 解析后，这里获取的是一个 BeanDefinitionHolder，前面说到，它的内部 包含 BeanDefinition。之后就开始 调用 BeanDefinitionReaderUtils 工具类 进行 BeanDefinition 的注册，此时发现 BeanDefinition 的解析和注册其实都是通过 BeanDefinitionReaderUtils 这个工具类完成的，进到这个工具类内部，核心源码如下：
        ```java
        public static void registerBeanDefinition(BeanDefinitionHolder definitionHolder, BeanDefinitionRegistry registry) throws BeanDefinitionStoreException {
            // Register bean definition under primary name.
            String beanName = definitionHolder.getBeanName();
            registry.registerBeanDefinition(beanName, definitionHolder.getBeanDefinition());    // 注册
            // Register aliases for bean name, if any.
            String[] aliases = definitionHolder.getAliases();
            if (aliases != null) {
                for (String alias : aliases) {
                    registry.registerAlias(beanName, alias);
                }
            }
        }
        ```
        - 通过上面的源码发现，注册调用的是其实是 入参 **BeanDefinitionRegistry** 的 registerBeanDefinition 方法，那 BeanDefinitionRegistry 又是什么？往前找，发现是 XmlReaderContext 中的成员变量 XmlBeanDefinitionReader 的父类 AbstractBeanDefinitionReader 中的 registry（BeanDefinitionRegistry）,那这个 registry 是什么时候赋值的？ 是前面在 构建 XmlBeanDefinitionReader 时候，先调用了其父类 AbstractBeanDefinitionReader 中的构造器，传入了一个 ****BeanDefinitionRegistry**** 和一个 ****ResourceLoader****。这里的 BeanDefinitionRegistry 就是此处的 registerBeanDefinition。
        - 那最初的 BeanDefinitionRegistry 又是什么？ 继续往前找，在 `AbstractXmlApplicationContext#loadBeanDefinitions(DefaultListableBeanFactory)`方法中，第一步就是创建了一个 ，`XmlBeanDefinitionReader beanDefinitionReader = new XmlBeanDefinitionReader(beanFactory);`，到这里可以发现，其实 这里的 registry 就是 最初创建的那个 beanFactory。
        - 那现在可以知道，最终 BeanDefinition 的注册 就是在 beanFactory 中完成的， 进入到 `DefaultListableBeanFactory#registerBeanDefinition(String beanName, BeanDefinition beanDefinition)` 方法，核心如下。
        ```java
            @Override
            public void registerBeanDefinition(String beanName, BeanDefinition beanDefinition) throws BeanDefinitionStoreException {
                Assert.hasText(beanName, "Bean name must not be empty");
                Assert.notNull(beanDefinition, "BeanDefinition must not be null");
        
                if (beanDefinition instanceof AbstractBeanDefinition) {
                    try {
                        ((AbstractBeanDefinition) beanDefinition).validate();
                    } catch (BeanDefinitionValidationException ex) {
                        throw new BeanDefinitionStoreException(beanDefinition.getResourceDescription(), beanName, "Validation of bean definition failed", ex);
                    }
                }
        
                BeanDefinition existingDefinition = this.beanDefinitionMap.get(beanName);
                if (existingDefinition != null) {
                    if (!isAllowBeanDefinitionOverriding()) {
                        throw new BeanDefinitionOverrideException(beanName, beanDefinition, existingDefinition);
                    }
                    this.beanDefinitionMap.put(beanName, beanDefinition);
                } else {
                    if (hasBeanCreationStarted()) {
                        // Cannot modify startup-time collection elements anymore (for stable iteration)
                        synchronized (this.beanDefinitionMap) {
                            this.beanDefinitionMap.put(beanName, beanDefinition);
                            List<String> updatedDefinitions = new ArrayList<>(this.beanDefinitionNames.size() + 1);
                            updatedDefinitions.addAll(this.beanDefinitionNames);
                            updatedDefinitions.add(beanName);
                            this.beanDefinitionNames = updatedDefinitions;
                            removeManualSingletonName(beanName);
                        }
                    }
                    else {
                        // Still in startup registration phase
                        this.beanDefinitionMap.put(beanName, beanDefinition);
                        this.beanDefinitionNames.add(beanName);
                        removeManualSingletonName(beanName);
                    }
                    this.frozenBeanDefinitionNames = null;
                }
                if (existingDefinition != null || containsSingleton(beanName)) {
                    resetBeanDefinition(beanName);
                }
            }
        ```
        - 至此，整个 BeanDefinition 的 生成 和 注册 过程结束，过程中的细节暂不深入。整个 BeanFactory 也创建成功。
        
- AbstractRefreshableApplicationContext#getBeanFactory（获取）

### 2.3.3 step 3    prepareBeanFactory(beanFactory);
```java
protected void prepareBeanFactory(ConfigurableListableBeanFactory beanFactory) {
    System.err.println("--- 配置工厂 prepareBeanFactory ");
    // Tell the internal bean factory to use the context's class loader etc.
    // 设置类加载器：存在则直接设置/不存在则新建一个默认类加载器
    beanFactory.setBeanClassLoader(getClassLoader());
    // 设置EL表达式解析器（Bean初始化完成后填充属性时会用到）
    beanFactory.setBeanExpressionResolver(new StandardBeanExpressionResolver(beanFactory.getBeanClassLoader()));
    // 设置属性注册解析器PropertyEditor
    beanFactory.addPropertyEditorRegistrar(new ResourceEditorRegistrar(this, getEnvironment()));

    // Configure the bean factory with context callbacks.
    // 将当前的 ApplicationContext 对象交给 ApplicationContextAwareProcessor 类来处理，
    // 从而在 Aware 接口实现类中的注入 applicationContext.
    beanFactory.addBeanPostProcessor(new ApplicationContextAwareProcessor(this));

    // 设置忽略自动装配的接口
    beanFactory.ignoreDependencyInterface(EnvironmentAware.class);
    beanFactory.ignoreDependencyInterface(EmbeddedValueResolverAware.class);
    beanFactory.ignoreDependencyInterface(ResourceLoaderAware.class);
    beanFactory.ignoreDependencyInterface(ApplicationEventPublisherAware.class);
    beanFactory.ignoreDependencyInterface(MessageSourceAware.class);
    beanFactory.ignoreDependencyInterface(ApplicationContextAware.class);

    // BeanFactory interface not registered as resolvable type in a plain factory.
    // MessageSource registered (and found for autowiring) as a bean.
    // 注册可以解析的自动装配
    beanFactory.registerResolvableDependency(BeanFactory.class, beanFactory);
    beanFactory.registerResolvableDependency(ResourceLoader.class, this);
    beanFactory.registerResolvableDependency(ApplicationEventPublisher.class, this);
    beanFactory.registerResolvableDependency(ApplicationContext.class, this);

    // Register early post-processor for detecting inner beans as ApplicationListeners.
    beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(this));

    // Detect a LoadTimeWeaver and prepare for weaving, if found.
    // 如果当前 BeanFactory 包含 loadTimeWeaver Bean，说明存在类加载期织入 AspectJ，
    // 则把当前 BeanFactory 交给类加载期 BeanPostProcessor 实现类 LoadTimeWeaverAwareProcessor 来处理，
    // 从而实现类加载期织入 AspectJ 的目的。
    if (beanFactory.containsBean(LOAD_TIME_WEAVER_BEAN_NAME)) {
        beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory));
        // Set a temporary ClassLoader for type matching.
        beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()));
    }

    // Register default environment beans.
    // 注册当前容器环境environment组件Bean
    if (!beanFactory.containsLocalBean(ENVIRONMENT_BEAN_NAME)) {
        beanFactory.registerSingleton(ENVIRONMENT_BEAN_NAME, getEnvironment());
    }
    // 注册系统配置systemProperties组件Bean
    if (!beanFactory.containsLocalBean(SYSTEM_PROPERTIES_BEAN_NAME)) {
        beanFactory.registerSingleton(SYSTEM_PROPERTIES_BEAN_NAME, getEnvironment().getSystemProperties());
    }
    //注册系统环境systemEnvironment组件Bean
    if (!beanFactory.containsLocalBean(SYSTEM_ENVIRONMENT_BEAN_NAME)) {
        beanFactory.registerSingleton(SYSTEM_ENVIRONMENT_BEAN_NAME, getEnvironment().getSystemEnvironment());
    }
}
```

### 2.3.4 step 4    postProcessBeanFactory(beanFactory);
该方法暂未实现。
```java
/**
 * 在初始化之后修改上下文内部的bean工厂。<br/>
 * 所有的 beanDefinition 都加载完成，但是都没有被实例化。<br/>
 * 允许在某些上下文中注册一些特殊的 BeanPostProcessors。<br />
 * <p>
 * <p>
 * Modify the application context's internal bean factory after its standard
 * initialization. All bean definitions will have been loaded, but no beans
 * will have been instantiated yet. This allows for registering special
 * BeanPostProcessors etc in certain ApplicationContext implementations.
 *
 * @param beanFactory the bean factory used by the application context
 */
protected void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) {
    
}
```

### 2.3.5 step 5    invokeBeanFactoryPostProcessors(beanFactory); 
执行 工厂 后置处理器。
```java
protected void invokeBeanFactoryPostProcessors(ConfigurableListableBeanFactory beanFactory) {
    System.err.println("--- 执行 工厂后置处理器 ");
    // 实例化 并 调用 所有已注册的 BeanFactoryPostProcessor
    PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors(beanFactory, getBeanFactoryPostProcessors());
    
    // Detect a LoadTimeWeaver and prepare for weaving, if found in the meantime
    // (e.g. through an @Bean method registered by ConfigurationClassPostProcessor)
    if (beanFactory.getTempClassLoader() ** null && beanFactory.containsBean(LOAD_TIME_WEAVER_BEAN_NAME)) {
        beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory));
        beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()));
    }
}

/**
    * 拿到当前应用上下文中已经注册的 BeanFactoryPostProcessor， 在默认情况下，this.beanFactoryPostProcessors 是返回空的。
    * Return the list of BeanFactoryPostProcessors that will get applied to the internal BeanFactory.
    */
public List<BeanFactoryPostProcessor> getBeanFactoryPostProcessors() {
    System.err.println("--- 获取工厂后置处理器 getBeanFactoryPostProcessors 个数: " + this.beanFactoryPostProcessors.size());
    for (BeanFactoryPostProcessor beanFactoryPostProcessor : this.beanFactoryPostProcessors) {
        System.out.println(beanFactoryPostProcessor.getClass());
    }
    return this.beanFactoryPostProcessors;
}
```
从上面的源码可以看出，工厂后置处理器的具体执行，交给了 **PostProcessorRegistrationDelegate** 来处理，该类对外暴露了两个静态方法 分别是：
- 注册 Bean 的后置处理器 `registerBeanPostProcessors(ConfigurableListableBeanFactory beanFactory, AbstractApplicationContext applicationContext)`
- 执行 BeanFactory 的后置处理器 `invokeBeanFactoryPostProcessors(ConfigurableListableBeanFactory beanFactory, List<BeanFactoryPostProcessor> beanFactoryPostProcessors)`
此处调用的是第二个 invokeBeanFactoryPostProcessors 来执行 BeanFactory 的后置处理器。进入源码（参考：[Spring IoC：invokeBeanFactoryPostProcessors 详解](https://blog.csdn.net/v123411739/article/details/87741251/)）：
```java
public static void invokeBeanFactoryPostProcessors(ConfigurableListableBeanFactory beanFactory, List<BeanFactoryPostProcessor> beanFactoryPostProcessors) {
    System.err.println("--- 开始执行工厂后置处理器 invokeBeanFactoryPostProcessors 个数： " + beanFactoryPostProcessors.size());
    // Invoke BeanDefinitionRegistryPostProcessors first, if any.
    Set<String> processedBeans = new HashSet<>();
    // 1. 判断 beanFactory 是否为 BeanDefinitionRegistry，beanFactory 为 DefaultListableBeanFactory，
    // 而 DefaultListableBeanFactory 实现了 BeanDefinitionRegistry 接口，因此这边为 true。
    if (beanFactory instanceof BeanDefinitionRegistry) {
        BeanDefinitionRegistry registry = (BeanDefinitionRegistry) beanFactory;
        // 用于存放普通的 BeanFactoryPostProcessor
        List<BeanFactoryPostProcessor> regularPostProcessors = new ArrayList<>();
        // 用于存放 BeanDefinitionRegistryPostProcessor
        List<BeanDefinitionRegistryPostProcessor> registryProcessors = new ArrayList<>();

        // 2. 首先处理入参中的 beanFactoryPostProcessors
        // 遍历所有的 beanFactoryPostProcessors, 将 BeanDefinitionRegistryPostProcessor 和普通 BeanFactoryPostProcessor 区分开
        for (BeanFactoryPostProcessor postProcessor : beanFactoryPostProcessors) {
            // 2.1 如果是 BeanDefinitionRegistryPostProcessor
            if (postProcessor instanceof BeanDefinitionRegistryPostProcessor) {
                BeanDefinitionRegistryPostProcessor registryProcessor = (BeanDefinitionRegistryPostProcessor) postProcessor;
                // 2.1.1 直接执行BeanDefinitionRegistryPostProcessor接口的postProcessBeanDefinitionRegistry方法
                registryProcessor.postProcessBeanDefinitionRegistry(registry);
                // 2.1.2 添加到 registryProcessors(用于最后执行 postProcessBeanFactory 方法)
                registryProcessors.add(registryProcessor);
            } else {
                // 2.2 否则，只是普通的 BeanFactoryPostProcessor
                // 2.2.1 添加到 regularPostProcessors(用于最后执行 postProcessBeanFactory 方法)
                regularPostProcessors.add(postProcessor);
            }
        }

        // Do not initialize FactoryBeans here: We need to leave all regular beans
        // uninitialized to let the bean factory post-processors apply to them!
        // Separate between BeanDefinitionRegistryPostProcessors that implement
        // PriorityOrdered, Ordered, and the rest.
        // 用于保存本次要执行的BeanDefinitionRegistryPostProcessor
        List<BeanDefinitionRegistryPostProcessor> currentRegistryProcessors = new ArrayList<>();

        // First, invoke the BeanDefinitionRegistryPostProcessors that implement PriorityOrdered.
        // 3.调用所有实现 PriorityOrdered 接口的 BeanDefinitionRegistryPostProcessor 实现类
        // 3.1 找出所有实现 BeanDefinitionRegistryPostProcessor 接口的 Bean 的 beanName
        String[] postProcessorNames = beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
        // 3.2 遍历 postProcessorNames
        for (String ppName : postProcessorNames) {
            // 3.3 校验是否实现了 PriorityOrdered 接口
            if (beanFactory.isTypeMatch(ppName, PriorityOrdered.class)) {
                // 3.4 获取 ppName 对应的 bean 实例, 添加到 currentRegistryProcessors中,
                // beanFactory.getBean: 这边 getBean 方法会触发创建 ppName 对应的 bean 对象, 目前暂不深入解析
                currentRegistryProcessors.add(beanFactory.getBean(ppName, BeanDefinitionRegistryPostProcessor.class));
                // 3.5 将要被执行的加入 processedBeans，避免后续重复执行
                processedBeans.add(ppName);
            }
        }
        // 3.6 进行排序(根据是否实现 PriorityOrdered、Ordered 接口和 order 值来排序)
        sortPostProcessors(currentRegistryProcessors, beanFactory);
        // 3.7 添加到 registryProcessors(用于最后执行 postProcessBeanFactory 方法)
        registryProcessors.addAll(currentRegistryProcessors);
        // 3.8 遍历 currentRegistryProcessors, 执行 postProcessBeanDefinitionRegistry 方法
        invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
        // 3.9 执行完毕后, 清空 currentRegistryProcessors
        currentRegistryProcessors.clear();

        // Next, invoke the BeanDefinitionRegistryPostProcessors that implement Ordered.

        // 4. 调用所有实现了 Ordered 接口的 BeanDefinitionRegistryPostProcessor 实现类（过程跟上面的步骤3基本一样）
        // 4.1 找出所有实现 BeanDefinitionRegistryPostProcessor 接口的类,
        // 这边重复查找是因为执行完上面的BeanDefinitionRegistryPostProcessor,
        // 可能会新增了其他的 BeanDefinitionRegistryPostProcessor, 因此需要重新查找
        postProcessorNames = beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
        for (String ppName : postProcessorNames) {
            // 校验是否实现了 Ordered 接口，并且还未执行过
            if (!processedBeans.contains(ppName) && beanFactory.isTypeMatch(ppName, Ordered.class)) {
                currentRegistryProcessors.add(beanFactory.getBean(ppName, BeanDefinitionRegistryPostProcessor.class));
                processedBeans.add(ppName);
            }
        }

        sortPostProcessors(currentRegistryProcessors, beanFactory);
        registryProcessors.addAll(currentRegistryProcessors);
        // 4.2 遍历 currentRegistryProcessors, 执行 postProcessBeanDefinitionRegistry 方法
        invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
        currentRegistryProcessors.clear();

        // Finally, invoke all other BeanDefinitionRegistryPostProcessors until no further ones appear.
        // 5.最后, 调用所有剩下的 BeanDefinitionRegistryPostProcessors
        boolean reiterate = true;
        while (reiterate) {
            reiterate = false;
            // 5.1 找出所有实现 BeanDefinitionRegistryPostProcessor 接口的类
            postProcessorNames = beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
            for (String ppName : postProcessorNames) {
                // 5.2 跳过已经执行过的
                if (!processedBeans.contains(ppName)) {
                    currentRegistryProcessors.add(beanFactory.getBean(ppName, BeanDefinitionRegistryPostProcessor.class));
                    processedBeans.add(ppName);
                    // 5.3 如果有 BeanDefinitionRegistryPostProcessor 被执行, 则有可能会产生新的 BeanDefinitionRegistryPostProcessor,
                    // 因此这边将 reiterate 赋值为true, 代表需要再循环查找一次
                    reiterate = true;
                }
            }
            sortPostProcessors(currentRegistryProcessors, beanFactory);
            registryProcessors.addAll(currentRegistryProcessors);
            // 5.4 遍历 currentRegistryProcessors, 执行 postProcessBeanDefinitionRegistry 方法
            invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
            currentRegistryProcessors.clear();
        }

        // Now, invoke the postProcessBeanFactory callback of all processors handled so far.
        // 6.调用所有 BeanDefinitionRegistryPostProcessor 的 postProcessBeanFactory 方法
        // (BeanDefinitionRegistryPostProcessor 继承自 BeanFactoryPostProcessor)
        invokeBeanFactoryPostProcessors(registryProcessors, beanFactory);
        // 7.最后, 调用入参 beanFactoryPostProcessors 中的普通 BeanFactoryPostProcessor 的 postProcessBeanFactory 方法
        invokeBeanFactoryPostProcessors(regularPostProcessors, beanFactory);
    } else {
        // Invoke factory processors registered with the context instance.
        invokeBeanFactoryPostProcessors(beanFactoryPostProcessors, beanFactory);
    }

    /**
        * 到这里，入参 beanFactoryPostProcessors 和容器中的所有 BeanDefinitionRegistryPostProcessor 已经全部处理完毕,
        * 下面开始处理容器中的所有 BeanFactoryPostProcessor。
        */
    // Do not initialize FactoryBeans here: We need to leave all regular beans
    // uninitialized to let the bean factory post-processors apply to them!
    // 8. 找出所有实现 BeanFactoryPostProcessor 接口的类
    String[] postProcessorNames = beanFactory.getBeanNamesForType(BeanFactoryPostProcessor.class, true, false);

    // Separate between BeanFactoryPostProcessors that implement PriorityOrdered,
    // Ordered, and the rest.
    // 用于存放实现了 PriorityOrdered 接口的 BeanFactoryPostProcessor
    List<BeanFactoryPostProcessor> priorityOrderedPostProcessors = new ArrayList<>();
    // 用于存放实现了 Ordered 接口的 BeanFactoryPostProcessor 的 beanName
    List<String> orderedPostProcessorNames = new ArrayList<>();
    // 用于存放普通 BeanFactoryPostProcessor 的 beanName
    List<String> nonOrderedPostProcessorNames = new ArrayList<>();
    // 8.1 遍历 postProcessorNames， 将 BeanFactoryPostProcessor 按实现 PriorityOrdered、实现Ordered接口、普通三种区分开
    for (String ppName : postProcessorNames) {
        if (processedBeans.contains(ppName)) {
            // 8.2 跳过已经执行过的
            // skip - already processed in first phase above
        } else if (beanFactory.isTypeMatch(ppName, PriorityOrdered.class)) {
            // 8.3 添加实现了 PriorityOrdered 接口的 BeanFactoryPostProcessor
            priorityOrderedPostProcessors.add(beanFactory.getBean(ppName, BeanFactoryPostProcessor.class));
        } else if (beanFactory.isTypeMatch(ppName, Ordered.class)) {
            // 8.4 添加实现了 Ordered 接口的 BeanFactoryPostProcessor 的 beanName
            orderedPostProcessorNames.add(ppName);
        } else {
            // 8.5 添加剩下的普通 BeanFactoryPostProcessor 的 beanName
            nonOrderedPostProcessorNames.add(ppName);
        }
    }

    // First, invoke the BeanFactoryPostProcessors that implement PriorityOrdered.
    // 9. 调用所有实现 PriorityOrdered 接口的 BeanFactoryPostProcessor
    // 9.1 对 priorityOrderedPostProcessors 排序
    sortPostProcessors(priorityOrderedPostProcessors, beanFactory);
    // 9.2 遍历 priorityOrderedPostProcessors， 执行 postProcessBeanFactory 方法
    invokeBeanFactoryPostProcessors(priorityOrderedPostProcessors, beanFactory);

    // Next, invoke the BeanFactoryPostProcessors that implement Ordered.
    // 10.调用所有实现 Ordered 接口的 BeanFactoryPostProcessor
    List<BeanFactoryPostProcessor> orderedPostProcessors = new ArrayList<>(orderedPostProcessorNames.size());
    for (String postProcessorName : orderedPostProcessorNames) {
        // 10.1 获取 postProcessorName 对应的 bean 实例, 添加到 orderedPostProcessors，准备执行
        orderedPostProcessors.add(beanFactory.getBean(postProcessorName, BeanFactoryPostProcessor.class));
    }
    // 10.2 对 orderedPostProcessors 排序
    sortPostProcessors(orderedPostProcessors, beanFactory);
    // 10.3 遍历 orderedPostProcessors，执行 postProcessBeanFactory 方法
    invokeBeanFactoryPostProcessors(orderedPostProcessors, beanFactory);

    // Finally, invoke all other BeanFactoryPostProcessors.
    // 11. 调用所有剩下的 BeanFactoryPostProcessor
    List<BeanFactoryPostProcessor> nonOrderedPostProcessors = new ArrayList<>(nonOrderedPostProcessorNames.size());
    for (String postProcessorName : nonOrderedPostProcessorNames) {
        // 11.1 获取 postProcessorName 对应的 bean 实例, 添加到 nonOrderedPostProcessors，准备执行
        nonOrderedPostProcessors.add(beanFactory.getBean(postProcessorName, BeanFactoryPostProcessor.class));
    }
    // 11.2 遍历 nonOrderedPostProcessors，执行 postProcessBeanFactory 方法
    invokeBeanFactoryPostProcessors(nonOrderedPostProcessors, beanFactory);

    // Clear cached merged bean definitions since the post-processors might have
    // modified the original metadata, e.g. replacing placeholders in values...
    // 12.清除元数据缓存（mergedBeanDefinitions、allBeanNamesByType、singletonBeanNamesByType），
    // 因为后处理器可能已经修改了原始元数据，例如， 替换值中的占位符..
    beanFactory.clearMetadataCache();
}

/**
    * Invoke the given BeanDefinitionRegistryPostProcessor beans.
    */
private static void invokeBeanDefinitionRegistryPostProcessors(Collection<? extends BeanDefinitionRegistryPostProcessor> postProcessors, BeanDefinitionRegistry registry) {
    System.err.println("--- 开始执行 BeanDefinitionRegistry 后置处理器 invokeBeanDefinitionRegistryPostProcessors 个数： " + postProcessors.size());
    for (BeanDefinitionRegistryPostProcessor postProcessor : postProcessors) {
        System.err.println("---------- 执行：" + postProcessor.getClass());
        postProcessor.postProcessBeanDefinitionRegistry(registry);
    }
}

/**
    * Invoke the given BeanFactoryPostProcessor beans.
    */
private static void invokeBeanFactoryPostProcessors(Collection<? extends BeanFactoryPostProcessor> postProcessors, ConfigurableListableBeanFactory beanFactory) {
    for (BeanFactoryPostProcessor postProcessor : postProcessors) {
        postProcessor.postProcessBeanFactory(beanFactory);
    }
}
```
总结： 整个 invokeBeanFactoryPostProcessors 方法围绕两个接口：
- BeanDefinitionRegistryPostProcessor
- BeanFactoryPostProcessor

![BeanDefinitionRegistryPostProcessor](/images/spring/BeanDefinitionRegistryPostProcessor.png)<br/>
BeanDefinitionRegistryPostProcessor 继承了 BeanFactoryPostProcessor 。<br/>
BeanDefinitionRegistryPostProcessor 主要用来在常规 BeanFactoryPostProcessor 检测开始之前注册其他 Bean 定义。<br/>
说的简单点，就是 BeanDefinitionRegistryPostProcessor 具有更高的优先级，执行顺序在 BeanFactoryPostProcessor 之前。<br/>

### 2.3.6 step 6    registerBeanPostProcessors(beanFactory); 
注册 bean 的后置处理器。 [Spring IoC：registerBeanPostProcessors 详解](https://blog.csdn.net/v123411739/article/details/87886900)

invokeBeanFactoryPostProcessors 方法主要用于处理 BeanFactoryPostProcessor 接口， 而 registerBeanPostProcessors 方法主要用于处理 BeanPostProcessor 接口。<br/>
BeanFactoryPostProcessor 和 BeanPostProcessor，从命名看出来这两个接口“长得很像”。<br/>
BeanFactoryPostProcessor 是针对 BeanFactory 的扩展，主要用在 bean 实例化之前，读取 bean 的定义，并可以修改它。<br/>
BeanPostProcessor 是针对 bean 的扩展，主要用在 bean 实例化之后，执行初始化方法前后，允许开发者对 bean 实例进行修改。<br/>

```java
protected void registerBeanPostProcessors(ConfigurableListableBeanFactory beanFactory) {
    PostProcessorRegistrationDelegate.registerBeanPostProcessors(beanFactory, this);
}
```
```java
public static void registerBeanPostProcessors(ConfigurableListableBeanFactory beanFactory, AbstractApplicationContext applicationContext) {

    // 1. 找出所有实现 BeanPostProcessor 接口的类
    String[] postProcessorNames = beanFactory.getBeanNamesForType(BeanPostProcessor.class, true, false);

    // Register BeanPostProcessorChecker that logs an info message when
    // a bean is created during BeanPostProcessor instantiation, i.e. when
    // a bean is not eligible for getting processed by all BeanPostProcessors.
    // 调试下面两句代码的作用，发现除了记录日志没什么作用。
    // BeanPostProcessor 的目标计数
    int beanProcessorTargetCount = beanFactory.getBeanPostProcessorCount() + 1 + postProcessorNames.length;
    // 2. 添加 BeanPostProcessorChecker (主要用于记录信息)到 beanFactory 中
    beanFactory.addBeanPostProcessor(new BeanPostProcessorChecker(beanFactory, beanProcessorTargetCount));

    // Separate between BeanPostProcessors that implement PriorityOrdered,
    // Ordered, and the rest.

    // 3. 定义不同的变量用于区分: 实现 PriorityOrdered 接口的 BeanPostProcessor、实现 Ordered 接口的 BeanPostProcessor、普通 BeanPostProcessor
    // 3.1 priorityOrderedPostProcessors: 用于存放实现 PriorityOrdered 接口的 BeanPostProcessor
    List<BeanPostProcessor> priorityOrderedPostProcessors = new ArrayList<>();
    // 3.2 internalPostProcessors: 用于存放 Spring 内部的 BeanPostProcessor
    List<BeanPostProcessor> internalPostProcessors = new ArrayList<>();
    // 3.3 orderedPostProcessorNames: 用于存放实现 Ordered 接口的 BeanPostProcessor 的 beanName
    List<String> orderedPostProcessorNames = new ArrayList<>();
    // 3.4 nonOrderedPostProcessorNames: 用于存放普通 BeanPostProcessor 的 beanName
    List<String> nonOrderedPostProcessorNames = new ArrayList<>();
    // 4.遍历 postProcessorNames，将 BeanPostProcessors 按3.1 - 3.4定义的变量区分开
    for (String ppName : postProcessorNames) {
        // 4.1 如果 ppName 对应的 Bean 实例实现了 PriorityOrdered 接口，则拿到 ppName 对应的 Bean 实例并添加到 priorityOrderedPostProcessors
        if (beanFactory.isTypeMatch(ppName, PriorityOrdered.class)) {
            BeanPostProcessor pp = beanFactory.getBean(ppName, BeanPostProcessor.class);
            priorityOrderedPostProcessors.add(pp);
            if (pp instanceof MergedBeanDefinitionPostProcessor) {
                // 4.2 如果 ppName 对应的 Bean 实例也实现了 MergedBeanDefinitionPostProcessor 接口,
                // 则将 ppName 对应的 Bean 实例添加到 internalPostProcessors
                internalPostProcessors.add(pp);
            }
        } else if (beanFactory.isTypeMatch(ppName, Ordered.class)) {
            // 4.3 如果 ppName 对应的 Bean 实例没有实现 PriorityOrdered 接口，但是实现了 Ordered 接口，则将 ppName 添加到 orderedPostProcessorNames
            orderedPostProcessorNames.add(ppName);
        } else {
            // 4.4 否则，将 ppName 添加到 nonOrderedPostProcessorNames
            nonOrderedPostProcessorNames.add(ppName);
        }
    }

    // First, register the BeanPostProcessors that implement PriorityOrdered.
    // 5. 首先，注册实现 PriorityOrdered 接口的 BeanPostProcessors
    // 5.1 对 priorityOrderedPostProcessors 进行排序
    sortPostProcessors(priorityOrderedPostProcessors, beanFactory);
    // 5.2 注册 priorityOrderedPostProcessors
    registerBeanPostProcessors(beanFactory, priorityOrderedPostProcessors);

    // Next, register the BeanPostProcessors that implement Ordered.
    // 6. 接下来，注册实现 Ordered 接口的 BeanPostProcessors
    List<BeanPostProcessor> orderedPostProcessors = new ArrayList<>(orderedPostProcessorNames.size());
    for (String ppName : orderedPostProcessorNames) {
        // 6.1 拿到 ppName 对应的 BeanPostProcessor 实例对象
        BeanPostProcessor pp = beanFactory.getBean(ppName, BeanPostProcessor.class);
        // 6.2 将 ppName 对应的 BeanPostProcessor 实例对象添加到 orderedPostProcessors， 准备执行注册
        orderedPostProcessors.add(pp);
        if (pp instanceof MergedBeanDefinitionPostProcessor) {
            // 6.3 如果 ppName 对应的 Bean 实例也实现了 MergedBeanDefinitionPostProcessor 接口，
            // 则将 ppName 对应的 Bean 实例添加到 internalPostProcessors
            internalPostProcessors.add(pp);
        }
    }
    // 6.4 对 orderedPostProcessors 进行排序
    sortPostProcessors(orderedPostProcessors, beanFactory);
    // 6.5 注册 orderedPostProcessors
    registerBeanPostProcessors(beanFactory, orderedPostProcessors);

    // Now, register all regular BeanPostProcessors.
    // 7. 注册所有常规的 BeanPostProcessors（过程与6类似）
    List<BeanPostProcessor> nonOrderedPostProcessors = new ArrayList<>(nonOrderedPostProcessorNames.size());
    for (String ppName : nonOrderedPostProcessorNames) {
        BeanPostProcessor pp = beanFactory.getBean(ppName, BeanPostProcessor.class);
        nonOrderedPostProcessors.add(pp);
        if (pp instanceof MergedBeanDefinitionPostProcessor) {
            internalPostProcessors.add(pp);
        }
    }
    registerBeanPostProcessors(beanFactory, nonOrderedPostProcessors);

    // Finally, re-register all internal BeanPostProcessors.
    // 8.最后，重新注册所有内部 BeanPostProcessors（相当于内部的 BeanPostProcessor 会被移到处理器链的末尾）
    // 8.1 对 internalPostProcessors 进行排序
    sortPostProcessors(internalPostProcessors, beanFactory);
    // 8.2注册 internalPostProcessors
    registerBeanPostProcessors(beanFactory, internalPostProcessors);

    // Re-register post-processor for detecting inner beans as ApplicationListeners,
    // moving it to the end of the processor chain (for picking up proxies etc).
    // 9.重新注册 ApplicationListenerDetector（跟8类似，主要是为了移动到处理器链的末尾）
    beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(applicationContext));
}
```

### 2.3.7 step 7    initMessageSource();

### 2.3.8 step 8    initApplicationEventMulticaster(); 

### 2.3.9 step 9    onRefresh();

### 2.3.10 step 10  registerListeners();

### 2.3.11 step 11  finishBeanFactoryInitialization(beanFactory);

### 2.3.12 step 12  finishRefresh();


