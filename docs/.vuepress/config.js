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
                                title: 'list&map',
                                collapsable: false,
                                path: '/01-java/jdk8/list&map.md'
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
                    {
                        title: 'Tomcat',
                        collapsable: true,
                        children: [{
                                title: 'tomcat内存',
                                collapsable: false,
                                path: '/01-java/Tomcat/01-tomcat内存.md'
                            },
                            {
                                title: 'tomcat运行窗口标题',
                                collapsable: false,
                                path: '/01-java/Tomcat/02-tomcat运行窗口标题.md'
                            },
                            {
                                title: 'tomcat访问日志',
                                collapsable: false,
                                path: '/01-java/Tomcat/03-tomcat访问日志.md'
                            },
                        ]
                    },
                    {
                        title: 'bio&nio&netty',
                        collapsable: true,
                        children: [{
                                title: 'bio-demo',
                                collapsable: false,
                                path: '/01-java/bio&nio&netty/01-bio-demo.md'
                            },
                            {
                                title: 'nio-demo',
                                collapsable: false,
                                path: '/01-java/bio&nio&netty/02-nio-demo.md'
                            },
                            {
                                title: 'nio-group_chat-demo',
                                collapsable: false,
                                path: '/01-java/bio&nio&netty/03-nio-group_chat-demo.md'
                            },
                            {
                                title: 'IO模型',
                                collapsable: false,
                                path: '/01-java/bio&nio&netty/04-IO模型.md'
                            },
                            {
                                title: 'nio',
                                collapsable: false,
                                path: '/01-java/bio&nio&netty/05-nio.md'
                            },
                            {
                                title: 'nio-Scatter&Gather',
                                collapsable: false,
                                path: '/01-java/bio&nio&netty/06-nio-Scatter&Gather.md'
                            },
                            {
                                title: 'Reactor模式',
                                collapsable: false,
                                path: '/01-java/bio&nio&netty/07-Reactor模式.md'
                            },
                        ]
                    },
                ]
            },
            {
                title: 'Spring & SB & SC',
                collapsable: true,
                children: [{
                        title: 'Spring',
                        collapsable: true,
                        children: [{
                                title: 'src-spring基础',
                                collapsable: false,
                                path: '/01-java/spring/000-spring基础.md'
                            },
                            {
                                title: 'src-beans.xml加载',
                                collapsable: false,
                                path: '/01-java/spring/001-Ioc 之 beans.xml加载.md'
                            },
                            {
                                title: 'src-ClassPathXmlApplicationContext',
                                collapsable: false,
                                path: '/01-java/spring/002-Ioc 之 ClassPathXmlApplicationContext.md'
                            },
                            {
                                title: 'src-Resource&ResourceLoader',
                                collapsable: false,
                                path: '/01-java/spring/003-Ioc 之 Resource 与 ResourceLoader.md'
                            },
                            {
                                title: 'src-Bean生命周期',
                                collapsable: false,
                                path: '/01-java/spring/004-Spring Bean生命周期.md'
                            },
                            {
                                title: 'src-Bean的创建过程',
                                collapsable: false,
                                path: '/01-java/spring/005-Bean的创建过程.md'
                            },
                            {
                                title: 'src-Bean实例化策略',
                                collapsable: false,
                                path: '/01-java/spring/006-Bean实例化策略.md'
                            },
                            {
                                title: 'src-AOP',
                                collapsable: false,
                                path: '/01-java/spring/AOP.md'
                            },
                            {
                                title: 'sprin事件通知机制',
                                collapsable: false,
                                path: '/01-java/spring/sprin事件通知机制.md'
                            }
                        ]
                    },
                    {
                        title: 'SpringBoot',
                        collapsable: true,
                        children: []
                    },
                    {
                        title: 'SpringCloud',
                        collapsable: true,
                        children: []
                    }
                ]
            },
            {
                title: 'Dubbo',
                collapsable: true,
                children: [{
                        title: 'zk安装',
                        collapsable: false,
                        path: '/01-java/dubbo/001-zk安装.md'
                    },
                    {
                        title: 'dubbo调试',
                        collapsable: false,
                        path: '/01-java/dubbo/002-dubbo调试.md'
                    },
                    {
                        title: '修改线程池',
                        collapsable: false,
                        path: '/01-java/dubbo/003-修改线程池.md'
                    },
                    {
                        title: 'dubbo超时设置',
                        collapsable: false,
                        path: '/01-java/dubbo/004-dubbo超时设置.md'
                    }, {
                        title: 'src01-SPI',
                        collapsable: false,
                        path: '/01-java/dubbo/src01-SPI.md'
                    }, {
                        title: 'src02-JavaSPI',
                        collapsable: false,
                        path: '/01-java/dubbo/src02-JavaSPI.md'
                    }, {
                        title: 'src03-DubboSPI',
                        collapsable: false,
                        path: '/01-java/dubbo/src03-DubboSPI.md'
                    }
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
                children: [{
                        title: 'mysql安装-windows',
                        collapsable: false,
                        path: '/02-数据库/mysql/001-mysql安装-windows.md'
                    },
                    {
                        title: 'mysql安装-linux',
                        collapsable: false,
                        path: '/02-数据库/mysql/002-mysql安装-linux.md'
                    },
                    {
                        title: 'mysql主从复制',
                        collapsable: false,
                        path: '/02-数据库/mysql/003-mysql主从复制.md'
                    },
                    {
                        title: 'mysql数据类型',
                        collapsable: false,
                        path: '/02-数据库/mysql/004-mysql数据类型.md'
                    },
                    {
                        title: '常用SQL',
                        collapsable: false,
                        path: '/02-数据库/mysql/005-常用SQL.md'
                    },
                    {
                        title: '数据库SQL',
                        collapsable: false,
                        path: '/02-数据库/mysql/006-数据库SQL.md'
                    },
                    {
                        title: '数据表SQL',
                        collapsable: false,
                        path: '/02-数据库/mysql/007-数据表SQL.md'
                    }
                ]
            },
            {
                title: 'Redis',
                collapsable: true,
                children: [{
                    title: '配置文件详解',
                    collapsable: false,
                    path: '/02-数据库/redis/001-redis配置文件详解.md'
                }]
            },
            {
                title: 'MongoDB',
                collapsable: true,
                children: [{
                        title: '单实例安装',
                        collapsable: false,
                        path: '/02-数据库/mongodb/001-mongodb单实例安装.md'
                    },
                    {
                        title: '配置文件详解',
                        collapsable: false,
                        path: '/02-数据库/mongodb/002-mongodb配置文件详解.md'
                    },
                    {
                        title: '副本集模式原理',
                        collapsable: false,
                        path: '/02-数据库/mongodb/003-mongodb副本集模式原理.md'
                    },
                    {
                        title: '副本集模式配置',
                        collapsable: false,
                        path: '/02-数据库/mongodb/004-mongodb副本集模式配置.md'
                    },
                    {
                        title: 'ObjectId',
                        collapsable: false,
                        path: '/02-数据库/mongodb/005-mongodb ObjectId.md'
                    },
                    {
                        title: 'oplog',
                        collapsable: false,
                        path: '/02-数据库/mongodb/006-mongodb oplog.md'
                    },
                    {
                        title: 'shell命令',
                        collapsable: false,
                        path: '/02-数据库/mongodb/007-mongodb shell命令.md'
                    },
                    {
                        title: '高级查询',
                        collapsable: false,
                        path: '/02-数据库/mongodb/008-mongodb 高级查询.md'
                    },
                    {
                        title: 'java',
                        collapsable: false,
                        path: '/02-数据库/mongodb/009-mongodb-java.md'
                    },
                    {
                        title: 'spring',
                        collapsable: false,
                        path: '/02-数据库/mongodb/010-mongodb-spring.md'
                    },
                    {
                        title: 'Dockerfile安装MongoDB',
                        collapsable: false,
                        path: '/02-数据库/mongodb/011-Dockerfile安装MongoDB.md'
                    },
                    {
                        title: '常用命令',
                        collapsable: false,
                        path: '/02-数据库/mongodb/012-常用命令.md'
                    },
                    {
                        title: '数组更新',
                        collapsable: false,
                        path: '/02-数据库/mongodb/013-数组更新.md'
                    }
                ]
            },
            {
                title: 'elasticsearch',
                collapsable: true,
                children: [{
                        title: 'es集群部署',
                        collapsable: false,
                        path: '/02-数据库/elasticsearch/001-es集群部署.md'
                    },
                    {
                        title: 'IK分词器安装',
                        collapsable: false,
                        path: '/02-数据库/elasticsearch/002-IK分词器安装.md'
                    }, {
                        title: '常用查询',
                        collapsable: false,
                        path: '/02-数据库/elasticsearch/003-常用查询.md'
                    }, {
                        title: 'mapping样例',
                        collapsable: false,
                        path: '/02-数据库/elasticsearch/004-mapping样例.md'
                    }
                ]
            },
            {
                title: 'Linux',
                collapsable: true,
                children: [{
                        title: '基础命令',
                        collapsable: false,
                        path: '/04-运维/Linux/001-linux基本命令.md'
                    },
                    {
                        title: '用户和组',
                        collapsable: false,
                        path: '/04-运维/Linux/002-linux用户和组.md'
                    },
                    {
                        title: 'ssh证书登录',
                        collapsable: false,
                        path: '/04-运维/Linux/003-ssh证书登录.md'
                    },
                    {
                        title: 'linux常用工具安装',
                        collapsable: false,
                        path: '/04-运维/Linux/004-linux常用工具安装.md'
                    },
                    {
                        title: 'centos7修改网卡名称',
                        collapsable: false,
                        path: '/04-运维/Linux/005-centos7修改网卡名称.md'
                    },
                    {
                        title: 'iptables',
                        collapsable: false,
                        path: '/04-运维/Linux/006-iptables.md'
                    },
                    {
                        title: 'JDK',
                        collapsable: false,
                        path: '/04-运维/Linux/007-JDK.md'
                    },
                    {
                        title: 'xshell配色设置',
                        collapsable: false,
                        path: '/04-运维/Linux/008-xshell配色设置.md'
                    },
                    {
                        title: '磁盘常用命令',
                        collapsable: false,
                        path: '/04-运维/Linux/009-磁盘常用命令.md'
                    },
                    {
                        title: '静态IP',
                        collapsable: false,
                        path: '/04-运维/Linux/010-静态IP.md'
                    },
                    {
                        title: 'openvpn客户端安装',
                        collapsable: false,
                        path: '/04-运维/Linux/011-openvpn客户端安装.md'
                    },

                    {
                        title: 'centos7使用阿里源',
                        collapsable: false,
                        path: '/04-运维/Linux/012-centos7使用阿里源.md'
                    },
                    {
                        title: '内存占用高',
                        collapsable: false,
                        path: '/04-运维/Linux/013-内存占用高.md'
                    },
                    {
                        title: 'vim',
                        collapsable: false,
                        path: '/04-运维/Linux/014-vim.md'
                    },
                    {
                        title: 'journalctl',
                        collapsable: false,
                        path: '/04-运维/Linux/015-journalctl.md'
                    },
                    {
                        title: '性能实时监控工具',
                        collapsable: false,
                        path: '/04-运维/Linux/Linux性能实时监控工具.md'
                    },
                ]
            },
            {
                title: 'Nginx',
                collapsable: true,
                children: [{
                    title: '安装脚本',
                    collapsable: false,
                    path: '/04-运维/Nginx/01-安装脚本.md'
                }, {
                    title: 'Nginx配置',
                    collapsable: false,
                    path: '/04-运维/Nginx/02-Nginx配置.md'
                }, {
                    title: 'Nginx配置-main',
                    collapsable: false,
                    path: '/04-运维/Nginx/03-Nginx配置-main.md'
                }, {
                    title: 'Nginx配置-event',
                    collapsable: false,
                    path: '/04-运维/Nginx/04-Nginx配置-event.md'
                }, {
                    title: 'Nginx配置-http',
                    collapsable: false,
                    path: '/04-运维/Nginx/05-Nginx配置-http.md'
                }, {
                    title: '499状态码问题',
                    collapsable: false,
                    path: '/04-运维/Nginx/499状态码问题.md'
                }, {
                    title: 'lua限流',
                    collapsable: false,
                    path: '/04-运维/Nginx/lua限流.md'
                }, {
                    title: 'OpenResty',
                    collapsable: false,
                    path: '/04-运维/Nginx/OpenResty.md'
                }]
            },
            {
                title: 'Docker',
                collapsable: true,
                children: [{
                        title: '基础',
                        collapsable: false,
                        path: '/04-运维/docker/000-docker基础.md'
                    },
                    {
                        title: '安装',
                        collapsable: false,
                        path: '/04-运维/docker/001-docker安装.md'
                    },
                    {
                        title: '搭建私有仓库',
                        collapsable: false,
                        path: '/04-运维/docker/003-docker搭建私有仓库.md'
                    },
                    {
                        title: 'docker命令',
                        collapsable: false,
                        path: '/04-运维/docker/004-docker命令.md'
                    },
                    {
                        title: 'docker常用命令',
                        collapsable: false,
                        path: '/04-运维/docker/005-docker常用命令.md'
                    },
                    {
                        title: 'Dockerfile指令',
                        collapsable: false,
                        path: '/04-运维/docker/006-Dockerfile指令.md'
                    },
                    {
                        title: 'Dockerfile各种构建',
                        collapsable: false,
                        path: '/04-运维/docker/007-Dockerfile各种构建.md'
                    },
                    {
                        title: 'java-war包部署',
                        collapsable: false,
                        path: '/04-运维/docker/008-java-war包部署.md'
                    },
                    {
                        title: 'nexus私服安装',
                        collapsable: false,
                        path: '/04-运维/docker/009-nexus私服安装.md'
                    },
                    {
                        title: 'pandoc加入docker',
                        collapsable: false,
                        path: '/04-运维/docker/010-pandoc加入docker.md'
                    },
                ]
            },
            {
                title: '前端',
                collapsable: true,
                children: [{
                        title: 'npm常用命令',
                        collapsable: false,
                        path: '/03-前端/npm/npm常用命令.md'
                    },
                    {
                        title: 'npm私服',
                        collapsable: false,
                        path: '/03-前端/npm/npm私服.md'
                    },
                    // HTML
                    {
                        title: 'html-禁止页面内容复制',
                        collapsable: false,
                        path: '/03-前端/html-禁止页面内容复制.md'
                    },
                    {
                        title: 'html-复选框模拟单选按钮功能',
                        collapsable: false,
                        path: '/03-前端/html-复选框模拟单选按钮功能.md'
                    },
                    // CSS
                    {
                        title: 'css-flex 弹性布局',
                        collapsable: false,
                        path: '/03-前端/css-flex 弹性布局.md'
                    },
                    // JS
                    {
                        title: 'ckeditor-插件开发',
                        collapsable: false,
                        path: '/03-前端/ckeditor-插件开发.md'
                    },
                    {
                        title: 'js-动态加载外部文件',
                        collapsable: false,
                        path: '/03-前端/js-动态加载外部文件'
                    },
                    {
                        title: 'js-到顶部到底部js实现',
                        collapsable: false,
                        path: '/03-前端/js-到顶部到底部js实现'
                    }
                ]
            },
            {
                title: 'Angular',
                collapsable: true,
                children: [{
                        title: 'cli',
                        collapsable: false,
                        path: '/03-前端/Angular/cli.md'
                    },
                    {
                        title: 'ng6升级至ng10',
                        collapsable: false,
                        path: '/03-前端/Angular/ng6升级至ng10.md'
                    },
                    {
                        title: '创建&部署library到npm私服',
                        collapsable: false,
                        path: '/03-前端/Angular/创建&部署library到npm私服.md'
                    },
                    {
                        title: '常用指令',
                        collapsable: false,
                        path: '/03-前端/Angular/常用指令.md'
                    },
                    {
                        title: '拦截器',
                        collapsable: false,
                        path: '/03-前端/Angular/拦截器.md'
                    },
                    {
                        title: 'mathjax',
                        collapsable: false,
                        path: '/03-前端/Angular/mathjax.md'
                    }
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
                        children: [{
                                title: 'Hadoop命令',
                                collapsable: false,
                                path: '/08-大数据/Hadoop/000-Hadoop命令.md'
                            },
                            {
                                title: 'Hadoop安装',
                                collapsable: false,
                                path: '/08-大数据/Hadoop/001-Hadoop安装.md'
                            },
                            {
                                title: '运行模式-本地模式',
                                collapsable: false,
                                path: '/08-大数据/Hadoop/002-Hadoop运行模式-本地模式.md'
                            },
                            {
                                title: '运行模式-伪集群',
                                collapsable: false,
                                path: '/08-大数据/Hadoop/003-Hadoop运行模式-伪集群.md'
                            },
                            {
                                title: '运行模式-完全集群',
                                collapsable: false,
                                path: '/08-大数据/Hadoop/004-Hadoop运行模式-完全集群.md'
                            },
                            {
                                title: '集群配置分发',
                                collapsable: false,
                                path: '/08-大数据/Hadoop/005-集群配置分发.md'
                            }
                        ]
                    },
                    {
                        title: 'HBASE',
                        collapsable: true,
                        children: [{
                            title: '安装',
                            collapsable: false,
                            path: '/08-大数据/HBASE/安装.md'
                        }, ]
                    },
                    {
                        title: 'kafka',
                        collapsable: true,
                        children: [{
                                title: 'kafka简介',
                                collapsable: false,
                                path: '/08-大数据/kafka/001-kafka简介.md'
                            },
                            {
                                title: '安装',
                                collapsable: false,
                                path: '/08-大数据/kafka/002-安装.md'
                            },
                            {
                                title: '常用命令',
                                collapsable: false,
                                path: '/08-大数据/kafka/003-常用命令.md'
                            }
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
                title: 'Python',
                collapsable: true,
                children: [{
                        title: '基础',
                        collapsable: false,
                        path: '/06-python/001-基础.md'
                    },
                    {
                        title: '数据类型',
                        collapsable: false,
                        path: '/06-python/002-数据类型.md'
                    },
                    {
                        title: '类型检查&类型转换',
                        collapsable: false,
                        path: '/06-python/003-类型检查、类型转换.md'
                    },
                    {
                        title: '对象',
                        collapsable: false,
                        path: '/06-python/004-对象.md'
                    },
                    {
                        title: '运算符',
                        collapsable: false,
                        path: '/06-python/005-运算符.md'
                    },
                    {
                        title: '流程控制-条件判断语句',
                        collapsable: false,
                        path: '/06-python/006-流程控制-条件判断语句.md'
                    },
                    {
                        title: '流程控制-循环语句',
                        collapsable: false,
                        path: '/06-python/006-流程控制-循环语句.md'
                    },
                    {
                        title: '序列',
                        collapsable: false,
                        path: '/06-python/007-序列.md'
                    },
                    {
                        title: 'range',
                        collapsable: false,
                        path: '/06-python/008-range.md'
                    },
                    {
                        title: 'tuple',
                        collapsable: false,
                        path: '/06-python/009-tuple.md'
                    },
                    {
                        title: '字典（dictionary）',
                        collapsable: false,
                        path: '/06-python/010-字典（dictionary）.md'
                    },
                    {
                        title: '集合',
                        collapsable: false,
                        path: '/06-python/011-集合.md'
                    },
                    {
                        title: '函数-概念',
                        collapsable: false,
                        path: '/06-python/012-函数-概念.md'
                    },
                    {
                        title: '函数-应用',
                        collapsable: false,
                        path: '/06-python/012-函数-应用.md'
                    },
                    {
                        title: '面向对象',
                        collapsable: false,
                        path: '/06-python/013-面向对象.md'
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