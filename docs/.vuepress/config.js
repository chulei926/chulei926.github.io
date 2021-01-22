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
        lastUpdated: '更新时间', // string | boolean
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
                        title: '源码1',
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
                    {
                        title: '常见问题',
                        collapsable: true,
                        children: [{
                                title: 'jdk环境变量',
                                collapsable: false,
                                path: '/01-java/jdk环境变量.md'
                            },
                            {
                                title: 'maven常用插件',
                                collapsable: false,
                                path: '/01-java/maven.md'
                            },

                        ]
                    },
                ]
            },
            {
                title: 'Spring & SB & SC',
                collapsable: true,
                children: [

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
                title: 'Docker',
                collapsable: true,
                children: [{
                        title: '基础',
                        collapsable: false,
                        path: '/05-运维/docker/000-docker基础.md'
                    },
                    {
                        title: '安装',
                        collapsable: false,
                        path: '/05-运维/docker/001-docker安装.md'
                    },
                    {
                        title: '搭建私有仓库',
                        collapsable: false,
                        path: '/05-运维/docker/003-docker搭建私有仓库.md'
                    },
                    {
                        title: 'docker命令',
                        collapsable: false,
                        path: '/05-运维/docker/004-docker命令.md'
                    },
                    {
                        title: 'docker常用命令',
                        collapsable: false,
                        path: '/05-运维/docker/005-docker常用命令.md'
                    },
                    {
                        title: 'Dockerfile指令',
                        collapsable: false,
                        path: '/05-运维/docker/006-Dockerfile指令.md'
                    },
                    {
                        title: 'Dockerfile各种构建',
                        collapsable: false,
                        path: '/05-运维/docker/007-Dockerfile各种构建.md'
                    },
                    {
                        title: 'java-war包部署',
                        collapsable: false,
                        path: '/05-运维/docker/008-java-war包部署.md'
                    },
                    {
                        title: 'nexus私服安装',
                        collapsable: false,
                        path: '/05-运维/docker/009-nexus私服安装.md'
                    },
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
                title: '正则表达式',
                collapsable: true,
                children: [{
                        title: '常见元字符',
                        collapsable: false,
                        path: '/other/正则表达式/常用元字符.md'
                    },
                    {
                        title: '常用表达式',
                        collapsable: false,
                        path: '/other/正则表达式/常用表达式.md'
                    },

                ]
            },
            {
                title: '杂货铺',
                collapsable: true,
                children: [{
                        title: '杂货铺',
                        collapsable: false,
                        path: '/other/杂货铺.md'
                    }, {
                        title: 'git',
                        collapsable: false,
                        path: '/other/git.md'
                    },
                    {
                        title: '常用shelll',
                        collapsable: false,
                        path: '/other/常用shell脚本.md'
                    },
                    {
                        title: '常用cmd',
                        collapsable: false,
                        path: '/other/常用cmd脚本.md'
                    },
                ]
            },
        ]
    }
}