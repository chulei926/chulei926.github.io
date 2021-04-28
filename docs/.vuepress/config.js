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
                'ga': 'G-2YCQDTXN3W' // UA-00000000-0
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
                ariaLabel: 'Java Language Menu',
                link: '/01-java/',
            },
            {
                text: '数据库',
                ariaLabel: '数据库',
                link: '/02-数据库/',
            },
            {
                text: '前端',
                ariaLabel: '前端',
                link: '/03-前端/',
            },
            {
                text: '运维',
                ariaLabel: '运维',
                link: '/04-运维/',
            },
            {
                text: '移动端',
                ariaLabel: '移动端',
                link: '/05-移动端/',
            },
            {
                text: 'python',
                ariaLabel: '移动端',
                link: '/06-python/',
            },
            {
                text: 'golang',
                ariaLabel: '移动端',
                link: '/07-golang/',
            },
            {
                text: '大数据',
                ariaLabel: '大数据',
                link: '/08-大数据/',
            },
            {
                text: '公式',
                ariaLabel: '公式',
                link: '/09-公式/',
            },
            {
                text: 'github',
                link: 'https://github.com/chulei926',
                target: '_blank'
            }
        ],
        sidebarDepth: 6,
        sidebar: {
            '/01-java/': [{
                title: '常用配置',
                children: [
                    'jdk环境变量',
                    'maven'
                ],
            }, {
                title: '源码学习',
                children: [''],
            }, {
                title: 'JDK8',
                children: ['/01-java/jdk8/时间计算', '/01-java/jdk8/list&map'],
            }, {
                title: 'Tomcat',
                children: [
                    '/01-java/Tomcat/01-tomcat内存',
                    '/01-java/Tomcat/02-tomcat运行窗口标题',
                    '/01-java/Tomcat/03-tomcat访问日志'
                ],
            }, {
                title: 'JVM',
                children: [
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
            }, {
                title: 'bio&nio&netty',
                children: [
                    '/01-java/bio&nio&netty/01-bio-demo',
                    '/01-java/bio&nio&netty/02-nio-demo',
                    '/01-java/bio&nio&netty/03-nio-group_chat-demo',
                    '/01-java/bio&nio&netty/04-IO模型',
                    '/01-java/bio&nio&netty/05-nio',
                    '/01-java/bio&nio&netty/06-nio-Scatter&Gather',
                    '/01-java/bio&nio&netty/07-Reactor模式'
                ],
            }, {
                title: 'Spring',
                children: [
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
            }, {
                title: 'Dubbo',
                children: [
                    '/01-java/dubbo/001-zk安装',
                    '/01-java/dubbo/002-dubbo调试',
                    '/01-java/dubbo/003-修改线程池',
                    '/01-java/dubbo/004-dubbo超时设置',
                    '/01-java/dubbo/src01-SPI',
                    '/01-java/dubbo/src02-JavaSPI',
                    '/01-java/dubbo/src03-DubboSPI',
                ],
            }]
        }
    }
}