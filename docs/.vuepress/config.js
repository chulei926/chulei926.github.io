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
    themeConfig: { // 主题配置
        logo: 'favicon.ico',
        // displayAllHeaders: true, // 默认值：false
        lastUpdated: 'Last Updated', // string | boolean
        markdown: {
            lineNumbers: true
        },
        nav: [{
            text: 'github',
            link: 'https://github.com/chulei926',
            target: '_blank'
        }],
        sidebarDepth: 6,
        sidebar: [ // 左侧导航
            {
                title: 'JAVA',
                collapsable: true,
                children: [{
                        title: '源码',
                        collapsable: true,
                        children: [

                        ]
                    },
                    {
                        title: 'JVM',
                        collapsable: true,
                        children: [{
                                title: 'jvm常用命令',
                                collapsable: false,
                                path: '/01-java/jvm/000-jvm常用命令.md'
                            }, {
                                title: 'Java虚拟机',
                                collapsable: false,
                                path: '/01-java/jvm/001-java虚拟机.md'
                            }, {
                                title: 'JVM的架构模型',
                                collapsable: false,
                                path: '/01-java/jvm/002-JVM的架构模型.md'
                            },
                            {
                                title: 'JVM的生命周期',
                                collapsable: false,
                                path: '/01-java/jvm/003-JVM的生命周期.md'
                            },
                            {
                                title: 'JVM的内存结构',
                                collapsable: false,
                                path: '/01-java/jvm/004-JVM的内存结构.md'
                            },
                            {
                                title: '类加载子系统',
                                collapsable: false,
                                path: '/01-java/jvm/005-类加载子系统.md'
                            },
                            {
                                title: '类加载器',
                                collapsable: false,
                                path: '/01-java/jvm/006-类加载器.md'
                            },
                            {
                                title: '双亲委派机制',
                                collapsable: false,
                                path: '/01-java/jvm/007-双亲委派机制.md'
                            },
                            {
                                title: '运行时数据区',
                                collapsable: false,
                                path: '/01-java/jvm/008-运行时数据区.md'
                            },
                            {
                                title: '运行时数据区-PC寄存器',
                                collapsable: false,
                                path: '/01-java/jvm/009-运行时数据区-PC寄存器.md'
                            },
                            {
                                title: '运行时数据区-虚拟机栈',
                                collapsable: false,
                                path: '/01-java/jvm/010-运行时数据区-虚拟机栈.md'
                            },
                        ]
                    },
                    {
                        title: 'JDK8',
                        collapsable: true,
                        children: [{
                                title: 'list&map互转',
                                collapsable: false,
                                path: '/01-java/jdk8/list&map互转.md'
                            },
                            {
                                title: '时间计算',
                                collapsable: false,
                                path: '/01-java/jdk8/时间计算.md'
                            },

                        ]
                    },
                ]
            },
            {
                title: 'Spring & SB & SC', // 标题
                collapsable: true, // 下级列表不可折叠
                children: [ // 下级列表

                ]
            },
            {
                title: 'Dubbo',
                collapsable: true,
                children: [

                ]
            },
            {
                title: 'MyBatis',
                collapsable: true,
                children: [

                ]
            },
            {
                title: 'MySQL',
                collapsable: true,
                children: [

                ]
            },
            {
                title: 'Redis',
                collapsable: true,
                children: [

                ]
            },
            {
                title: 'MongoDB',
                collapsable: true,
                children: [

                ]
            },
            {
                title: 'ELK',
                collapsable: true,
                children: [

                ]
            },
            {
                title: 'Linux',
                collapsable: true,
                children: [

                ]
            },
            {
                title: 'Nginx',
                collapsable: true,
                children: [

                ]
            },
            {
                title: 'Tomcat',
                collapsable: true,
                children: [

                ]
            },
            {
                title: 'Angular',
                collapsable: true,
                children: [

                ]
            },
            {
                title: 'Vue',
                collapsable: true,
                children: [

                ]
            },
            {
                title: '大数据',
                collapsable: true,
                children: [{
                        title: 'Hadoop',
                        collapsable: true,
                        children: [

                        ]
                    },
                    {
                        title: 'HBASE',
                        collapsable: true,
                        children: [

                        ]
                    },
                    {
                        title: 'kafka',
                        collapsable: true,
                        children: [

                        ]
                    },
                    {
                        title: 'flume',
                        collapsable: true,
                        children: [

                        ]
                    },
                    {
                        title: 'spark',
                        collapsable: true,
                        children: [

                        ]
                    },
                    {
                        title: 'flink',
                        collapsable: true,
                        children: [

                        ]
                    },
                ]
            },
            {
                title: '常用脚本',
                collapsable: true,
                children: [

                ]
            },
            {
                title: '正则表达式',
                collapsable: true,
                children: [

                ]
            },
        ]
    }
}