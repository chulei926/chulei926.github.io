# step 1
```java
ApplicationContext ctx = new AnnotationConfigApplicationContext(BeanConfig.class); // 启动容器

public AnnotationConfigApplicationContext(Class<?>... componentClasses) {
	this();
	register(componentClasses);
	refresh(); // 刷新 容器
}

// org.springframework.context.support.AbstractApplicationContext#refresh
@Override
public void refresh() throws BeansException, IllegalStateException {
	synchronized (this.startupShutdownMonitor) {
		prepareRefresh();
		ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory(); // 核心逻辑在于创建BeanFactory并加载BeanDefinition到BeanFactory当中
		prepareBeanFactory(beanFactory);
		try {
			postProcessBeanFactory(beanFactory);
			invokeBeanFactoryPostProcessors(beanFactory);
			registerBeanPostProcessors(beanFactory);
			initMessageSource();
			initApplicationEventMulticaster();
			onRefresh();
			registerListeners();
			finishBeanFactoryInitialization(beanFactory); // 实例化所有的非懒加载的单例对象到容器中
			finishRefresh();
		} catch (BeansException ex) {
			...... // 忽略不重要代码 
		} finally {
		    ...... // 忽略不重要代码 
		}
	}
}

// org.springframework.context.support.AbstractApplicationContext#finishBeanFactoryInitialization
protected void finishBeanFactoryInitialization(ConfigurableListableBeanFactory beanFactory) {
	...... // 忽略不重要代码 
	// Instantiate all remaining (non-lazy-init) singletons.
	beanFactory.preInstantiateSingletons(); // 准备实例化 非懒加载的单例对象
}

```

# step 2
```java
// org.springframework.beans.factory.support.DefaultListableBeanFactory#preInstantiateSingletons
@Override
public void preInstantiateSingletons() throws BeansException {

	List<String> beanNames = new ArrayList<>(this.beanDefinitionNames);
	// 遍历所有的 beanName，通过 getBean(beanName) 方法，将所有的 bean 创建一遍。
	for (String beanName : beanNames) {
	    
	    // 从 mergedBeanDefinitions map 中获取 BeanDefinition，获取不到再从 beanDefinitionMap 中获取。
		RootBeanDefinition bd = getMergedLocalBeanDefinition(beanName); 
		
		if (!bd.isAbstract() && bd.isSingleton() && !bd.isLazyInit()) { // 非抽象、非懒加载、非单例
			if (isFactoryBean(beanName)) { // 是否是 工厂bean
				Object bean = getBean(FACTORY_BEAN_PREFIX + beanName);
				if (bean instanceof FactoryBean) {
					final FactoryBean<?> factory = (FactoryBean<?>) bean;
					boolean isEagerInit;
					if (System.getSecurityManager() != null && factory instanceof SmartFactoryBean) {
						isEagerInit = AccessController.doPrivileged((PrivilegedAction<Boolean>) ((SmartFactoryBean<?>) factory)::isEagerInit, getAccessControlContext());
					} else {
						isEagerInit = (factory instanceof SmartFactoryBean && ((SmartFactoryBean<?>) factory).isEagerInit());
					}
					if (isEagerInit) {
						getBean(beanName);
					}
				}
			} else {
				getBean(beanName); // 非工厂bean
			}
		}
	}
	// Trigger post-initialization callback for all applicable beans...
	...... // 忽略不重要代码 
}
```

# step 3
```java
// org.springframework.beans.factory.support.AbstractBeanFactory#getBean(java.lang.String)
@Override
public Object getBean(String name) throws BeansException {
	return doGetBean(name, null, null, false);
}

// org.springframework.beans.factory.support.AbstractBeanFactory#doGetBean
protected <T> T doGetBean(final String name, @Nullable final Class<T> requiredType, @Nullable final Object[] args, boolean typeCheckOnly) throws BeansException {

	final String beanName = transformedBeanName(name);
	Object bean;

	// Eagerly check singleton cache for manually registered singletons.
	Object sharedInstance = getSingleton(beanName);
	if (sharedInstance != null && args == null) {
		bean = getObjectForBeanInstance(sharedInstance, name, beanName, null);
	} else {
		// 因为 Spring 只解决单例模式下得循环依赖，在原型模式下如果存在循环依赖则会抛出异常。
		if (isPrototypeCurrentlyInCreation(beanName)) {
			throw new BeanCurrentlyInCreationException(beanName);
		}
		// Check if bean definition exists in this factory.
		...... // 忽略不重要代码 

		if (!typeCheckOnly) {
			markBeanAsCreated(beanName);
		}

		try {
			final RootBeanDefinition mbd = getMergedLocalBeanDefinition(beanName);
			checkMergedBeanDefinition(mbd, beanName, args);

			// Guarantee initialization of beans that the current bean depends on.
			// 检查 当前 bean 是否依赖其他 bean，如果依赖，先创建 依赖的 bean
			String[] dependsOn = mbd.getDependsOn();
			if (dependsOn != null) {
				for (String dep : dependsOn) {
					if (isDependent(beanName, dep)) {
						throw new BeanCreationException(mbd.getResourceDescription(), beanName, "Circular depends-on relationship between '" + beanName + "' and '" + dep + "'");
					}
					registerDependentBean(dep, beanName);
					try {
						getBean(dep);
					} catch (NoSuchBeanDefinitionException ex) {
						throw new BeanCreationException(mbd.getResourceDescription(), beanName, "'" + beanName + "' depends on missing bean '" + dep + "'", ex);
					}
				}
			}

			// Create bean instance.
			// 单例 bean
			if (mbd.isSingleton()) {
				sharedInstance = getSingleton(beanName, () -> {
					try {
						return createBean(beanName, mbd, args);  // 核心
					} catch (BeansException ex) {
						...... // 忽略不重要代码 
					}
				});
				bean = getObjectForBeanInstance(sharedInstance, name, beanName, mbd);
			}
            // 原型 bean
			else if (mbd.isPrototype()) {
				...... // 忽略不重要代码 
			}
            // 其他 scope bean 
			else {
				...... // 忽略不重要代码 
			}
		}
		catch (BeansException ex) {
			cleanupAfterBeanCreationFailure(beanName);
			throw ex;
		}
	}

	// Check if required type matches the type of the actual bean instance.
	...... // 忽略不重要代码
	return (T) bean;
}
```

# step 4
```java
// org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#createBean(java.lang.String, org.springframework.beans.factory.support.RootBeanDefinition, java.lang.Object[])
@Override
protected Object createBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args) throws BeanCreationException {
	RootBeanDefinition mbdToUse = mbd;

	...... // 忽略不重要代码

	try {
		// Give BeanPostProcessors a chance to return a proxy instead of the target bean instance.
		Object bean = resolveBeforeInstantiation(beanName, mbdToUse); // 执行实现了 InstantiationAwareBeanPostProcessor 接口的子类的方法。
		if (bean != null) {
			return bean;
		}
	} catch (Throwable ex) {
		throw new BeanCreationException(mbdToUse.getResourceDescription(), beanName, "BeanPostProcessor before instantiation of bean failed", ex);
	}

	try {
		Object beanInstance = doCreateBean(beanName, mbdToUse, args); // 核心
		return beanInstance;
	} catch (BeanCreationException | ImplicitlyAppearedSingletonException ex) {
		throw ex;
	} catch (Throwable ex) {
		throw new BeanCreationException( mbdToUse.getResourceDescription(), beanName, "Unexpected exception during bean creation", ex);
	}
}

```
# step 5
```java
// org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(String, RootBeanDefinition, Object[])
protected Object doCreateBean(final String beanName, final RootBeanDefinition mbd, final @Nullable Object[] args) throws BeanCreationException {

	// Instantiate the bean.
	BeanWrapper instanceWrapper = null;
	if (mbd.isSingleton()) {
		instanceWrapper = this.factoryBeanInstanceCache.remove(beanName);
	}
	if (instanceWrapper == null) {
		instanceWrapper = createBeanInstance(beanName, mbd, args); // s1：创建对象
	}
	...... // 忽略不重要代码

	// Initialize the bean instance.
	Object exposedObject = bean;
	try {
		populateBean(beanName, mbd, instanceWrapper);   // s2：调用setter方法进行赋值
		exposedObject = initializeBean(beanName, exposedObject, mbd);   // s3：初始化
	} catch (Throwable ex) {
	    ...... // 忽略不重要代码
	}

	...... // 忽略不重要代码

	// Register bean as disposable.
	try {
	    // 注册 bean 的 销毁方法
		registerDisposableBeanIfNecessary(beanName, bean, mbd);
	} catch (BeanDefinitionValidationException ex) {
		throw new BeanCreationException(mbd.getResourceDescription(), beanName, "Invalid destruction signature", ex);
	}

	return exposedObject;
}
```

## 说明：
该方法中的核心有3步：
1. instanceWrapper = createBeanInstance(beanName, mbd, args);   创建对象
2. populateBean(beanName, mbd, instanceWrapper);  调用setter方法设置属性
3. exposedObject = initializeBean(beanName, exposedObject, mbd); 初始化

下面详细分析

## step 5.1 createBeanInstance(beanName, mbd, args); 创建对象
```java
// org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(String, RootBeanDefinition, Object[])
protected BeanWrapper createBeanInstance(String beanName, RootBeanDefinition mbd, @Nullable Object[] args) {
	
	...... // 忽略不重要代码

	// Candidate constructors for autowiring?
	Constructor<?>[] ctors = determineConstructorsFromBeanPostProcessors(beanClass, beanName);
	if (ctors != null || mbd.getResolvedAutowireMode() == AUTOWIRE_CONSTRUCTOR || mbd.hasConstructorArgumentValues() || !ObjectUtils.isEmpty(args)) {
		return autowireConstructor(beanName, mbd, ctors, args);     // 调用有参构造器创建 对象
	}

	// Preferred constructors for default construction?
	ctors = mbd.getPreferredConstructors();
	if (ctors != null) {
		return autowireConstructor(beanName, mbd, ctors, null);
	}

	// No special handling: simply use no-arg constructor.
	return instantiateBean(beanName, mbd);      // 调用无参构造器创建 对象
}
```

### step 5.1.1 createBeanInstance(beanName, mbd, args) 创建对象 之 有参构造器
```java
// org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.autowireConstructor(String, RootBeanDefinition, Constructor<?>[], Object[])
protected BeanWrapper autowireConstructor(String beanName, RootBeanDefinition mbd, @Nullable Constructor<?>[] ctors, @Nullable Object[] explicitArgs) {
	return new ConstructorResolver(this).autowireConstructor(beanName, mbd, ctors, explicitArgs);
}

// org.springframework.beans.factory.support.ConstructorResolver.autowireConstructor(String, RootBeanDefinition, Constructor<?>[], Object[])

// org.springframework.beans.factory.support.ConstructorResolver.autowireConstructor(String, RootBeanDefinition, Constructor<?>[], Object[])
public BeanWrapper autowireConstructor(String beanName, RootBeanDefinition mbd, @Nullable Constructor<?>[] chosenCtors, @Nullable Object[] explicitArgs) {
    
    // 封装 constructorToUse 和 argsToUse
	BeanWrapperImpl bw = new BeanWrapperImpl();
	this.beanFactory.initBeanWrapper(bw);

	Constructor<?> constructorToUse = null;
	ArgumentsHolder argsHolderToUse = null;
	Object[] argsToUse = null;

	...... // 忽略不重要代码

	Assert.state(argsToUse != null, "Unresolved constructor arguments");
	bw.setBeanInstance(instantiate(beanName, mbd, constructorToUse, argsToUse));
	return bw;
}

// org.springframework.beans.factory.support.ConstructorResolver.instantiate(String, RootBeanDefinition, Constructor<?>, Object[])
private Object instantiate(String beanName, RootBeanDefinition mbd, Constructor<?> constructorToUse, Object[] argsToUse) {
    // 获取bean的实例化策略进行实例化
	try {
		InstantiationStrategy strategy = this.beanFactory.getInstantiationStrategy();  // 默认是 CglibSubclassingInstantiationStrategy
		if (System.getSecurityManager() != null) {
			return AccessController.doPrivileged((PrivilegedAction<Object>) () ->
					strategy.instantiate(mbd, beanName, this.beanFactory, constructorToUse, argsToUse),
					this.beanFactory.getAccessControlContext());
		} else {
			return strategy.instantiate(mbd, beanName, this.beanFactory, constructorToUse, argsToUse); // INTO
		}
	} catch (Throwable ex) {
		throw new BeanCreationException(mbd.getResourceDescription(), beanName, "Bean instantiation via constructor failed", ex);
	}
}

// org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(RootBeanDefinition, String, BeanFactory, Constructor<?>, Object...)
public Object instantiate(RootBeanDefinition bd, @Nullable String beanName, BeanFactory owner, final Constructor<?> ctor, Object... args) {
	if (!bd.hasMethodOverrides()) {
	    ...... // 忽略不重要代码
		return BeanUtils.instantiateClass(ctor, args);  // INTO 截至到此处，有参构造器和参数已经拿到。其余实例化的工作交给 BeanUtils 处理。
	} else {
		return instantiateWithMethodInjection(bd, beanName, owner, ctor, args);
	}
}

```

### step 5.1.2 createBeanInstance(beanName, mbd, args) 创建对象 之 无参构造器
```java
// org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateBean(String, RootBeanDefinition)
protected BeanWrapper instantiateBean(final String beanName, final RootBeanDefinition mbd) {
    // 获取bean的实例化策略进行实例化
	try {
		Object beanInstance;
		final BeanFactory parent = this;
		if (System.getSecurityManager() != null) {
			beanInstance = AccessController.doPrivileged((PrivilegedAction<Object>) () ->
					getInstantiationStrategy().instantiate(mbd, beanName, parent),
					getAccessControlContext());
		} else {
			beanInstance = getInstantiationStrategy().instantiate(mbd, beanName, parent);
		}
		BeanWrapper bw = new BeanWrapperImpl(beanInstance);
		initBeanWrapper(bw);
		return bw;
	} catch (Throwable ex) {
		throw new BeanCreationException(mbd.getResourceDescription(), beanName, "Instantiation of bean failed", ex);
	}
}

// org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(RootBeanDefinition, String, BeanFactory)
public Object instantiate(RootBeanDefinition bd, @Nullable String beanName, BeanFactory owner) {
	// Don't override the class with CGLIB if no overrides.
	if (!bd.hasMethodOverrides()) {
		...... // 忽略不重要代码
		return BeanUtils.instantiateClass(constructorToUse); // BeanUtils line 171
	}
	else {
		// Must generate CGLIB subclass.
		return instantiateWithMethodInjection(bd, beanName, owner);
	}
}

```

### step 5.1.3 createBeanInstance(beanName, mbd, args) 创建对象 之 BeanUtils.instantiateClass(ctor, args);
```java
// org.springframework.beans.BeanUtils.instantiateClass(Constructor<T>, Object...)
public static <T> T instantiateClass(Constructor<T> ctor, Object... args) throws BeanInstantiationException {
	Assert.notNull(ctor, "Constructor must not be null");
	...... // 忽略不重要代码
	Object[] argsWithDefaultValues = new Object[args.length];
	for (int i = 0; i < args.length; i++) {
		if (args[i] == null) {
			Class<?> parameterType = parameterTypes[i];
			argsWithDefaultValues[i] = (parameterType.isPrimitive() ? DEFAULT_TYPE_VALUES.get(parameterType) : null);
		} else {
			argsWithDefaultValues[i] = args[i];
		}
	}
	// 通过JDK的反射 创建对象。--- leichu
	return ctor.newInstance(argsWithDefaultValues);
	...... // 忽略不重要代码
}
```

## step 5.2 populateBean(beanName, mbd, instanceWrapper); 调用setter方法设置属性
```java
// org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#populateBean(String beanName, RootBeanDefinition mbd, @Nullable BeanWrapper bw)
protected void populateBean(String beanName, RootBeanDefinition mbd, @Nullable BeanWrapper bw) {

	...... // 忽略不重要代码
	
	if (pvs != null) {
		applyPropertyValues(beanName, mbd, bw, pvs); // INTO
	}
}

// org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#applyPropertyValues(String beanName, BeanDefinition mbd, BeanWrapper bw, PropertyValues pvs)
protected void applyPropertyValues(String beanName, BeanDefinition mbd, BeanWrapper bw, PropertyValues pvs) {
	
	...... // 忽略不重要代码

	// Set our (possibly massaged) deep copy.
	try {
		bw.setPropertyValues(new MutablePropertyValues(deepCopy));
	}
	catch (BeansException ex) {
		throw new BeanCreationException(mbd.getResourceDescription(), beanName, "Error setting property values", ex);
	}
}

// org.springframework.beans.AbstractPropertyAccessor#setPropertyValues(org.springframework.beans.PropertyValues)
public void setPropertyValues(PropertyValues pvs) throws BeansException {
	setPropertyValues(pvs, false, false);
}
// org.springframework.beans.AbstractPropertyAccessor#setPropertyValues(org.springframework.beans.PropertyValues, boolean, boolean)
public void setPropertyValues(PropertyValues pvs, boolean ignoreUnknown, boolean ignoreInvalid) throws BeansException {

    List<PropertyAccessException> propertyAccessExceptions = null;
    List<PropertyValue> propertyValues = (pvs instanceof MutablePropertyValues ? ((MutablePropertyValues) pvs).getPropertyValueList() : Arrays.asList(pvs.getPropertyValues()));
    for (PropertyValue pv : propertyValues) {
    	try {
    		// 循环设置 属性和值
    		setPropertyValue(pv);
    	}
    }
    ...... // 忽略不重要代码
}

// org.springframework.beans.AbstractNestablePropertyAccessor#setPropertyValue(org.springframework.beans.PropertyValue)
public void setPropertyValue(PropertyValue pv) throws BeansException {
	PropertyTokenHolder tokens = (PropertyTokenHolder) pv.resolvedTokens;
	if (tokens == null) {
		...... // 忽略不重要代码
		nestedPa.setPropertyValue(tokens, pv); // INTO
	}
	else {
		setPropertyValue(tokens, pv);
	}
}
// org.springframework.beans.AbstractNestablePropertyAccessor#setPropertyValue(org.springframework.beans.AbstractNestablePropertyAccessor.PropertyTokenHolder, org.springframework.beans.PropertyValue)
protected void setPropertyValue(PropertyTokenHolder tokens, PropertyValue pv) throws BeansException {
	if (tokens.keys != null) {
		processKeyedProperty(tokens, pv);
	}
	else {
		processLocalProperty(tokens, pv);
	}
}
// org.springframework.beans.AbstractNestablePropertyAccessor#processLocalProperty(PropertyTokenHolder tokens, PropertyValue pv)
private void processLocalProperty(PropertyTokenHolder tokens, PropertyValue pv) {
	PropertyHandler ph = getLocalPropertyHandler(tokens.actualName); // BeanWrapperImpl$BeanPropertyHandler
	...... // 忽略不重要代码
	Object oldValue = null;
	try {
		Object originalValue = pv.getValue();
		Object valueToApply = originalValue;
		...... // 忽略不重要代码
		ph.setValue(valueToApply);
	}
	...... // 忽略不重要代码
}
// org.springframework.beans.BeanWrapperImpl.BeanPropertyHandler#setValue(final @Nullable Object value)
public void setValue(final @Nullable Object value) throws Exception {
	final Method writeMethod = (this.pd instanceof GenericTypeAwarePropertyDescriptor ?
			((GenericTypeAwarePropertyDescriptor) this.pd).getWriteMethodForActualAccess() :
			this.pd.getWriteMethod());
	if (System.getSecurityManager() != null) {
		...... // 忽略不重要代码
	}
	else {
		ReflectionUtils.makeAccessible(writeMethod);
		// 最终 执行setter方法，给属性赋值
		writeMethod.invoke(getWrappedInstance(), value);
	}
}
```

## step 5.3 initializeBean(beanName, exposedObject, mbd); 初始化
```java
// org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#initializeBean(java.lang.String, java.lang.Object, org.springframework.beans.factory.support.RootBeanDefinition)
protected Object initializeBean(final String beanName, final Object bean, @Nullable RootBeanDefinition mbd) {
	if (System.getSecurityManager() != null) {
		AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
			invokeAwareMethods(beanName, bean);
			return null;
		}, getAccessControlContext());
	}
	else {
		invokeAwareMethods(beanName, bean); // s 5.3.1
	}

	Object wrappedBean = bean;
	if (mbd == null || !mbd.isSynthetic()) {
		wrappedBean = applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);   // s 5.3.2
	}

	try {
		invokeInitMethods(beanName, wrappedBean, mbd);  // s 5.3.3
	}
	catch (Throwable ex) {
		throw new BeanCreationException((mbd != null ? mbd.getResourceDescription() : null), beanName, "Invocation of init method failed", ex);
	}
	if (mbd == null || !mbd.isSynthetic()) {
		wrappedBean = applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName); // s 5.3.4
	}
	
	return wrappedBean;
}

/**
 * s 5.3.1
 * org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#invokeAwareMethods(final String beanName, final Object bean)
 * 执行顺序：BeanNameAware、BeanClassLoaderAware、BeanFactoryAware
 */
private void invokeAwareMethods(final String beanName, final Object bean) {
	if (bean instanceof Aware) {
		if (bean instanceof BeanNameAware) {
			((BeanNameAware) bean).setBeanName(beanName);
		}
		if (bean instanceof BeanClassLoaderAware) {
			ClassLoader bcl = getBeanClassLoader();
			if (bcl != null) {
				((BeanClassLoaderAware) bean).setBeanClassLoader(bcl);
			}
		}
		if (bean instanceof BeanFactoryAware) {
			((BeanFactoryAware) bean).setBeanFactory(AbstractAutowireCapableBeanFactory.this);
		}
	}
}

/**
 * s 5.3.2
 * org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#applyBeanPostProcessorsBeforeInitialization(Object existingBean, String beanName)
 * 调用所有 后置处理器 BeanPostProcessors 的 postProcessBeforeInitialization 方法。
 */
 public Object applyBeanPostProcessorsBeforeInitialization(Object existingBean, String beanName) throws BeansException {
	Object result = existingBean;
	for (BeanPostProcessor processor : getBeanPostProcessors()) {
		Object current = processor.postProcessBeforeInitialization(result, beanName);
		if (current == null) {
			return result;
		}
		result = current;
	}
	return result;
}
 
/**
 * s 5.3.3
 * org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#invokeInitMethods(String beanName, final Object bean, @Nullable RootBeanDefinition mbd)
 */
protected void invokeInitMethods(String beanName, final Object bean, @Nullable RootBeanDefinition mbd) throws Throwable {
    // 判断是否实现了 InitializingBean 接口
    // 如果实现了 InitializingBean 接口，调用 InitializingBean 的 afterPropertiesSet 方法。
    // 判断是否自定义了init-method 方法，如果有，执行 init-method 方法。
	boolean isInitializingBean = (bean instanceof InitializingBean);
	if (isInitializingBean && (mbd == null || !mbd.isExternallyManagedInitMethod("afterPropertiesSet"))) {
		if (logger.isTraceEnabled()) {
			logger.trace("Invoking afterPropertiesSet() on bean with name '" + beanName + "'");
		}
		if (System.getSecurityManager() != null) {
			try {
				AccessController.doPrivileged((PrivilegedExceptionAction<Object>) () -> {
					((InitializingBean) bean).afterPropertiesSet();
					return null;
				}, getAccessControlContext());
			}
			catch (PrivilegedActionException pae) {
				throw pae.getException();
			}
		}
		else {
			((InitializingBean) bean).afterPropertiesSet();
		}
	}

	if (mbd != null && bean.getClass() != NullBean.class) {
		String initMethodName = mbd.getInitMethodName();
		if (StringUtils.hasLength(initMethodName) &&
				!(isInitializingBean && "afterPropertiesSet".equals(initMethodName)) &&
				!mbd.isExternallyManagedInitMethod(initMethodName)) {
			invokeCustomInitMethod(beanName, bean, mbd);
		}
	}
}

/**
 * s 5.3.4
 * org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#applyBeanPostProcessorsAfterInitialization(Object existingBean, String beanName)
 * 调用所有 后置处理器 BeanPostProcessors 的 postProcessAfterInitialization 方法。
 */
 public Object applyBeanPostProcessorsAfterInitialization(Object existingBean, String beanName) throws BeansException {
	Object result = existingBean;
	for (BeanPostProcessor processor : getBeanPostProcessors()) {
		Object current = processor.postProcessAfterInitialization(result, beanName);
		if (current == null) {
			return result;
		}
		result = current;
	}
	return result;
}
```

# 总结：

## 1. bean 的创建是在 beanFactory 创建完成后进行，此时 所有的 bean 的定义 BeanDefinition 已经加载完成。

## 2. bean 的创建 又分为 实例化对象、调用setter方法赋值、初始化属性 三个阶段。


 + 2.1 实例化对象过程 主要是通过 实例化策略接口 InstantiationStrategy 来进行实例化。
 + 2.2 在setter方法调用之后，正式初始化之前，调用 xxxAware 接口的方法。 
    如：BeanNameAware 的 setBeanName 方法，BeanClassLoaderAware 的 setBeanClassLoader 方法，BeanFactoryAware 的 setBeanFactory 方法。
 + 2.3 然后执行所有的后置处理器 BeanPostProcessors 的 postProcessBeforeInitialization 方法。
 + 2.4  接下来正式初始化。初始化的过程就是 执行 标注了@PostConstruct 的 方法、InitializingBean 接口的 afterPropertiesSet 方法和 init-method 方法。
 + 2.5  初始化之后，调用 后置处理器 BeanPostProcessors 的 postProcessAfterInitialization 方法。



![InstantiationStrategy](/images/spring/InstantiationStrategy.png)

## 3. BeanPostProcess 执行的几个时机
![BeanPostProcess](/images/spring/bean的创建过程.png)

