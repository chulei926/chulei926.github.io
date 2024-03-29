// 注意: base的值为github仓库的名称
module.exports = {
    base: '/',
    /* 基础虚拟路径: */
    dest: 'dist',
    /* 打包文件基础路径, 在命令所在目录下 */
    title: '好记性不如烂笔头', // 标题
    description: '点点滴滴......', // 标题下的描述
    plugins: [
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-201181155-1' // UA-00000000-0
            }
        ],
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    const moment = require('moment')
                    moment.locale(lang)
                    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
                }
            }
        ]
    ],
    markdown: {
        lineNumbers: true,
        extractHeaders: []
    },
    themeConfig: { // 主题配置
        // logo: '/favicon.ico',
        logo: '/favicon.ico',
        lastUpdated: '更新时间', // string | boolean
        nav: [{
            text: '首页',
            link: '/',
        },
        {
            text: 'Java',
            items: [
                {
                    text: '基础', items: [
                        {text: '常用配置', link: '/01-java/config/'},
                        {text: '代码片段', link: '/01-java/snippet/'},
                        {text: 'jdk8', link: '/01-java/jdk8/'},
                        {text: 'jvm', link: '/01-java/jvm/'},
                        {text: '源码学习', link: '/01-java/src/'},
                    ]
                },
                {
                    text: 'Framework', items: [
                        {text: 'Tomcat', link: '/01-java/Tomcat/'},
                        {text: 'Netty', link: '/01-java/bio&nio&netty/'},
                        {text: 'Spring', link: '/01-java/spring/'},
                        {text: 'Dubbo', link: '/01-java/dubbo/'},
                        {text: 'CAS', link: '/01-java/cas/'},
                    ]
                }
            ]
        },
        {
            text: '数据库',
            items: [
                {
                    text: '关系型', items: [
                        {text: 'MySQL', link: '/02-数据库/mysql/'},
                    ]
                },
                {
                    text: '非关系型', items: [
                        {text: 'Redis', link: '/02-数据库/redis/'},
                        {text: 'MongoDB', link: '/02-数据库/mongodb/'},
                        {text: 'Elasticsearch', link: '/02-数据库/elasticsearch/'},
                    ]
                }
            ]
        },
        {
            text: '前端',
            items: [
                {text: 'NodeJs', link: '/03-前端/node/'},
                {text: 'Angular', link: '/03-前端/Angular/'},
                {text: 'Vue', link: '/03-前端/vue/'},
                {text: 'PM2', link: '/03-前端/pm2/'},
                {text: 'other', link: '/03-前端/other/'},
            ]
        },
        {
            text: '运维',
            items: [
                {text: 'Linux', link: '/04-运维/Linux/'},
                {text: 'Nginx', link: '/04-运维/Nginx/'},
                {text: 'Docker', link: '/04-运维/docker/'},
                {text: '其他', link: '/04-运维/other/'},
            ]
        },
        {
            text: 'python',
            ariaLabel: 'python',
            link: '/06-python/',
        },
        {
            text: 'golang',
            ariaLabel: 'golang',
            link: '/07-golang/',
        },
        {
            text: '大数据',
            items: [
                {text: 'Zookeeper', link: '/08-大数据/Zookeeper/'},
                {text: 'Hadoop', link: '/08-大数据/Hadoop/'},
                {text: 'Hbase', link: '/08-大数据/HBASE/'},
                {text: 'kafka', link: '/08-大数据/kafka/'},
                {text: 'Scala', link: '/08-大数据/scala/'}
            ]
        },
        {
            text: '杂货铺',
            ariaLabel: '杂货铺',
            link: '/other/',
        },
        {
            text: 'github',
            link: 'https://github.com/chulei926',
            target: '_blank'
        }
        ],
        sidebarDepth: 6,
        sidebar: {
            '/01-java/config/': [
                '/01-java/config/jdk环境变量',
                '/01-java/config/maven'
            ],
            '/01-java/snippet/': [
                '/01-java/snippet/动态加载jar包内的接口',
                '/01-java/snippet/根据坐标点画图',
            ],
            '/01-java/jdk8/': [
                '/01-java/jdk8/时间计算',
                '/01-java/jdk8/list&map'
            ],
            '/01-java/src/': [],
            '/01-java/Tomcat/': [
                '/01-java/Tomcat/01-tomcat内存',
                '/01-java/Tomcat/02-tomcat运行窗口标题',
                '/01-java/Tomcat/03-tomcat访问日志'
            ],
            '/01-java/jvm/': [
                '/01-java/jvm/000-jvm常用命令',
                '/01-java/jvm/001-java虚拟机',
                '/01-java/jvm/002-JVM的架构模型',
                '/01-java/jvm/003-JVM的生命周期',
                '/01-java/jvm/004-JVM的内存结构',
                '/01-java/jvm/005-类加载子系统',
                '/01-java/jvm/006-类加载器',
                '/01-java/jvm/007-双亲委派机制',
                '/01-java/jvm/008-运行时数据区',
                '/01-java/jvm/009-运行时数据区-PC寄存器',
                '/01-java/jvm/010-运行时数据区-虚拟机栈',
            ],
            '/01-java/bio&nio&netty/': [
                '/01-java/bio&nio&netty/01-bio-demo',
                '/01-java/bio&nio&netty/02-nio-demo',
                '/01-java/bio&nio&netty/03-nio-group_chat-demo',
                '/01-java/bio&nio&netty/04-IO模型',
                '/01-java/bio&nio&netty/05-nio',
                '/01-java/bio&nio&netty/06-nio-Scatter&Gather',
                '/01-java/bio&nio&netty/07-Reactor模式'
            ],
            '/01-java/spring/': [
                '/01-java/spring/000-spring基础',
                '/01-java/spring/001-Ioc 之 beans.xml加载',
                '/01-java/spring/002-Ioc 之 ClassPathXmlApplicationContext',
                '/01-java/spring/003-Ioc 之 Resource 与 ResourceLoader',
                '/01-java/spring/004-Spring Bean生命周期',
                '/01-java/spring/005-Bean的创建过程',
                '/01-java/spring/006-Bean实例化策略',
                '/01-java/spring/AOP',
                '/01-java/spring/sprin事件通知机制',
            ],
            '/01-java/dubbo/': [
                '/01-java/dubbo/01-常用',
                '/01-java/dubbo/src01-SPI',
                '/01-java/dubbo/src02-JavaSPI',
                '/01-java/dubbo/src03-DubboSPI',
            ],
            '/01-java/cas/': [
                '/01-java/cas/01-原理',
                '/01-java/cas/02-HTTPS',
                '/01-java/cas/03-cas server',
                '/01-java/cas/04-cas client',
            ],
            '/02-数据库/mysql/': [
                '/02-数据库/mysql/001-mysql安装-windows',
                '/02-数据库/mysql/002-mysql安装-linux',
                '/02-数据库/mysql/003-mysql主从复制',
                '/02-数据库/mysql/004-mysql数据类型',
                '/02-数据库/mysql/005-常用SQL',
                '/02-数据库/mysql/006-数据库SQL',
                '/02-数据库/mysql/007-数据表SQL',
            ],
            '/02-数据库/redis/': [
                '/02-数据库/redis/001-redis安装',
                '/02-数据库/redis/002-redis配置文件详解',
            ],
            '/02-数据库/mongodb/': [
                '/02-数据库/mongodb/001-mongodb单实例安装',
                '/02-数据库/mongodb/002-mongodb配置文件详解',
                '/02-数据库/mongodb/003-mongodb副本集模式原理',
                '/02-数据库/mongodb/004-mongodb副本集模式配置',
                '/02-数据库/mongodb/005-mongodb ObjectId',
                '/02-数据库/mongodb/006-mongodb oplog',
                '/02-数据库/mongodb/007-mongodb shell命令',
                '/02-数据库/mongodb/008-mongodb 高级查询',
                '/02-数据库/mongodb/009-mongodb-java',
                '/02-数据库/mongodb/010-mongodb-spring',
                '/02-数据库/mongodb/011-Dockerfile安装MongoDB',
                '/02-数据库/mongodb/012-常用命令',
                '/02-数据库/mongodb/013-数组更新',
            ],
            '/02-数据库/elasticsearch/': [
                '/02-数据库/elasticsearch/001-es集群部署',
                '/02-数据库/elasticsearch/002-IK分词器安装',
                '/02-数据库/elasticsearch/003-常用查询',
                '/02-数据库/elasticsearch/004-mapping样例',
            ],
            '/03-前端/other/': [
                '/03-前端/other/html-禁止页面内容复制',
                '/03-前端/other/html-复选框模拟单选按钮功能',
                '/03-前端/other/css-flex 弹性布局',
                '/03-前端/other/ckeditor-插件开发',
                '/03-前端/other/js-动态加载外部文件',
                '/03-前端/other/js-到顶部到底部js实现',
            ],
            '/03-前端/node/': [
                '/03-前端/node/npm常用命令',
                '/03-前端/node/npm私服',
                '/03-前端/node/puppeteer',
                '/03-前端/node/puppeteer应用',
            ],
            '/03-前端/Angular/': [
                '/03-前端/Angular/cli',
                '/03-前端/Angular/ng6升级至ng10',
                '/03-前端/Angular/创建&部署library到npm私服',
                '/03-前端/Angular/常用指令',
                '/03-前端/Angular/拦截器',
                '/03-前端/Angular/mathjax',
            ],
            '/03-前端/vue/': [
                '/03-前端/vue/01-简介',
                '/03-前端/vue/02-生命周期',
            ],
            '/03-前端/pm2/': [
                '/03-前端/pm2/01-简介',
                '/03-前端/pm2/02-安装',
                '/03-前端/pm2/03-命令',
                '/03-前端/pm2/04-配置文件',
            ],
            '/04-运维/Linux/': [
                '/04-运维/Linux/001-linux基本命令',
                '/04-运维/Linux/002-linux用户和组',
                '/04-运维/Linux/003-ssh证书登录',
                '/04-运维/Linux/004-linux常用工具安装',
                '/04-运维/Linux/005-centos7修改网卡名称',
                '/04-运维/Linux/006-iptables',
                '/04-运维/Linux/007-JDK',
                '/04-运维/Linux/008-xshell配色设置',
                '/04-运维/Linux/009-磁盘常用命令',
                '/04-运维/Linux/010-静态IP',
                '/04-运维/Linux/011-openvpn客户端安装',
                '/04-运维/Linux/012-centos7使用阿里源',
                '/04-运维/Linux/013-内存占用高',
                '/04-运维/Linux/014-vim',
                '/04-运维/Linux/015-journalctl',
                '/04-运维/Linux/016-firewalld',
                '/04-运维/Linux/017-centos8修改22端口',
                '/04-运维/Linux/018-curl',
                '/04-运维/Linux/Linux性能实时监控工具',
            ],
            '/04-运维/docker/': [
                '/04-运维/docker/000-docker基础',
                '/04-运维/docker/001-docker安装',
                '/04-运维/docker/003-docker搭建私有仓库',
                '/04-运维/docker/004-docker命令',
                '/04-运维/docker/005-docker常用命令',
                '/04-运维/docker/006-Dockerfile指令',
                '/04-运维/docker/007-Dockerfile各种构建',
                '/04-运维/docker/008-java-war包部署',
                '/04-运维/docker/009-nexus私服安装',
                '/04-运维/docker/010-pandoc加入docker'
            ],
            '/04-运维/Nginx/': [
                '/04-运维/Nginx/01-安装脚本',
                '/04-运维/Nginx/02-Nginx配置',
                '/04-运维/Nginx/03-Nginx配置-main',
                '/04-运维/Nginx/04-Nginx配置-event',
                '/04-运维/Nginx/05-Nginx配置-http',
                '/04-运维/Nginx/499状态码问题',
                '/04-运维/Nginx/lua限流',
                '/04-运维/Nginx/OpenResty',
            ],
            '/04-运维/other/': [
                '/04-运维/other/一键扩容',
            ],
            // '/05-移动端/': [],
            '/06-python/': [
                '/06-python/001-基础',
                '/06-python/002-数据类型',
                '/06-python/003-类型检查、类型转换',
                '/06-python/004-对象',
                '/06-python/005-运算符',
                '/06-python/006-流程控制-条件判断语句',
                '/06-python/006-流程控制-循环语句',
                '/06-python/007-序列',
                '/06-python/008-range',
                '/06-python/009-tuple',
                '/06-python/010-字典（dictionary）',
                '/06-python/011-集合',
                '/06-python/012-函数-概念',
                '/06-python/012-函数-应用',
                '/06-python/013-面向对象',
            ],
            // '/07-golang/': [],
            '/08-大数据/Zookeeper/': [
                '/08-大数据/zookeeper/安装',
            ],
            '/08-大数据/Hadoop/': [
                '/08-大数据/Hadoop/000-Hadoop命令',
                '/08-大数据/Hadoop/001-Hadoop安装',
                '/08-大数据/Hadoop/002-Hadoop运行模式-本地模式',
                '/08-大数据/Hadoop/003-Hadoop运行模式-伪集群',
                '/08-大数据/Hadoop/004-Hadoop运行模式-完全集群',
                '/08-大数据/Hadoop/005-集群配置分发',
            ],
            '/08-大数据/HBASE/': [
                '/08-大数据/HBASE/安装',
            ],
            '/08-大数据/kafka/': [
                '/08-大数据/kafka/001-kafka简介',
                '/08-大数据/kafka/002-安装',
                '/08-大数据/kafka/003-常用命令',
                '/08-大数据/kafka/004-架构',
                '/08-大数据/kafka/kafka-eagle',
            ],
            '/08-大数据/scala/': [
                '/08-大数据/scala/01-概述',
                '/08-大数据/scala/02-环境搭建',
                '/08-大数据/scala/03-入门',
                '/08-大数据/scala/04-基础语法',
                '/08-大数据/scala/05-流程控制',
                '/08-大数据/scala/06-方法与函数',
                '/08-大数据/scala/07-面向对象',
                '/08-大数据/scala/08-异常',
            ],
            '/other/': [
                '/other/正则表达式/常用表达式',
                '/other/正则表达式/常用元字符',
                '/other/常用cmd脚本',
                '/other/常用shell脚本',
                '/other/杂货铺',
                '/other/git'
            ]
        }
    }
}
