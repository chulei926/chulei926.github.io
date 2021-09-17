(window.webpackJsonp=window.webpackJsonp||[]).push([[194],{558:function(s,a,t){"use strict";t.r(a);var e=t(22),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),t("p",[t("img",{attrs:{src:"/images/bigData/kafka/%E9%83%A8%E7%BD%B2%E8%A7%84%E5%88%92.png",alt:"部署规划"}})]),s._v(" "),t("h2",{attrs:{id:"下载"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#下载"}},[s._v("#")]),s._v(" 下载")]),s._v(" "),t("p",[t("a",{attrs:{href:"http://kafka.apache.org/downloads",target:"_blank",rel:"noopener noreferrer"}},[s._v("下载页"),t("OutboundLink")],1)]),s._v(" "),t("p",[s._v("因为本地使用的是"),t("code",[s._v("scala-2.13.2")]),s._v("，所以下载  "),t("a",{attrs:{href:"https://www.apache.org/dyn/closer.cgi?path=/kafka/2.7.0/kafka_2.13-2.7.0.tgz",target:"_blank",rel:"noopener noreferrer"}},[s._v("kafka_2.13-2.7.0.tgz"),t("OutboundLink")],1)]),s._v(" "),t("h2",{attrs:{id:"安装-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装-2"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),t("h3",{attrs:{id:"_1-安装-zookeeper"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装-zookeeper"}},[s._v("#")]),s._v(" 1. 安装 zookeeper")]),s._v(" "),t("h3",{attrs:{id:"_2-安装-kafka"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-安装-kafka"}},[s._v("#")]),s._v(" 2. 安装 kafka")]),s._v(" "),t("h4",{attrs:{id:"_2-1-复制-安装包到-usr-local-soft-解压"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-复制-安装包到-usr-local-soft-解压"}},[s._v("#")]),s._v(" 2.1 复制 安装包到 "),t("code",[s._v("/usr/local/soft")]),s._v("，解压")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" kafka_2.13-2.7.0.tgz /usr/local/soft\n$ "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/soft\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -xzvf kafka_2.13-2.7.0.tgz\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h4",{attrs:{id:"_2-2-修改配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-修改配置文件"}},[s._v("#")]),s._v(" 2.2 修改配置文件")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/soft/kafka_2.13-2.7.0/config\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" server.properties\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## broker 的全局唯一编号，不能重复")]),s._v("\nbroker.id"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 删除 topic 功能使能")]),s._v("\ndelete.topic.enable"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("true\n\nlog.dirs"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/mnt/data/kafka/data\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## Zookeeper 集群地址")]),s._v("\nzookeeper.connect"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("big002:2181,big003:2181,big004:2181\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 创建 /mnt/data/kafka/data目录")]),s._v("\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p /mnt/data/kafka/data\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h4",{attrs:{id:"_2-3-同步到其他主机-big003、big004"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-同步到其他主机-big003、big004"}},[s._v("#")]),s._v(" 2.3 同步到其他主机 big003、big004")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ xsync kafka_2.13-2.7.0\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h4",{attrs:{id:"_2-4-修改-big003、big004主机中的配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-修改-big003、big004主机中的配置"}},[s._v("#")]),s._v(" 2.4 修改 big003、big004主机中的配置")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## big003")]),s._v("\nbroker.id"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## big004")]),s._v("\nbroker.id"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h4",{attrs:{id:"_2-5-启动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-启动"}},[s._v("#")]),s._v(" 2.5 启动")]),s._v(" "),t("h5",{attrs:{id:"_2-5-1-启动-zookeeper"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-1-启动-zookeeper"}},[s._v("#")]),s._v(" 2.5.1 启动 zookeeper")]),s._v(" "),t("p",[s._v("在 big002 big003 big004 上分别执行")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ /usr/local/soft/zookeeper/bin/zkServer.sh start\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h5",{attrs:{id:"_2-5-2-启动-kafka"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-2-启动-kafka"}},[s._v("#")]),s._v(" 2.5.2 启动 kafka")]),s._v(" "),t("p",[s._v("在 big002 big003 big004 上分别执行")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-server-start.sh -daemon /usr/local/soft/kafka_2.13-2.7.0/config/server.properties\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h4",{attrs:{id:"_2-6-测试"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-测试"}},[s._v("#")]),s._v(" 2.6 测试")]),s._v(" "),t("h5",{attrs:{id:"_2-6-1-查看-topic-列表"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-1-查看-topic-列表"}},[s._v("#")]),s._v(" 2.6.1 查看 topic 列表")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-topics.sh --zookeeper big002:2181 --list\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h5",{attrs:{id:"_2-6-2-新建-topic"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-2-新建-topic"}},[s._v("#")]),s._v(" 2.6.2 新建 topic")]),s._v(" "),t("blockquote",[t("p",[s._v("新建 topic，名称是 myTopic，副本数=3，分区数=1")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-topics.sh --zookeeper big002:2181 --create --replication-factor "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" --partitions "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" --topic myTopic\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h5",{attrs:{id:"_2-6-3-删除-topic"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-3-删除-topic"}},[s._v("#")]),s._v(" 2.6.3 删除 topic")]),s._v(" "),t("blockquote",[t("p",[s._v("需要 server.properties 中设置 delete.topic.enable=true 否则只是标记删除。")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-topics.sh --zookeeper big002:2181 --delete --topic myTopic\n\nTopic myTopic is marked "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" deletion.\nNote: This will have no impact "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" delete.topic.enable is not "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" to true.\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h5",{attrs:{id:"_2-6-4-查看某个-topic-的详情"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-4-查看某个-topic-的详情"}},[s._v("#")]),s._v(" 2.6.4 查看某个 Topic 的详情")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-topics.sh --zookeeper big002:2181 --describe --topic myTopic\nTopic: myTopic\tPartitionCount: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\tReplicationFactor: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\tConfigs: \n\tTopic: myTopic\tPartition: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\tLeader: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\tReplicas: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2,3")]),s._v(",1\tIsr: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2,3")]),s._v(",1\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h5",{attrs:{id:"_2-6-5-修改分区数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-5-修改分区数"}},[s._v("#")]),s._v(" 2.6.5 修改分区数")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-topics.sh --zookeeper big002:2181 --alter --topic myTopic --partitions "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("\n\n$ /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-topics.sh --zookeeper big002:2181 --describe --topic myTopic\nTopic: myTopic\tPartitionCount: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("\tReplicationFactor: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\tConfigs: \n\tTopic: myTopic\tPartition: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\tLeader: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\tReplicas: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2,3")]),s._v(",1\tIsr: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2,3")]),s._v(",1\n\tTopic: myTopic\tPartition: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\tLeader: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\tReplicas: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3,2")]),s._v(",1\tIsr: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3,2")]),s._v(",1\n\tTopic: myTopic\tPartition: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\tLeader: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\tReplicas: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1,3")]),s._v(",2\tIsr: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1,3")]),s._v(",2\n\tTopic: myTopic\tPartition: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\tLeader: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\tReplicas: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2,3")]),s._v(",1\tIsr: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2,3")]),s._v(",1\n\tTopic: myTopic\tPartition: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("\tLeader: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\tReplicas: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3,1")]),s._v(",2\tIsr: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3,1")]),s._v(",2\n\tTopic: myTopic\tPartition: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("\tLeader: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\tReplicas: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1,2")]),s._v(",3\tIsr: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1,2")]),s._v(",3\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("h4",{attrs:{id:"_2-7-收发消息"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-7-收发消息"}},[s._v("#")]),s._v(" 2.7 收发消息")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 消费消息")]),s._v("\n$ /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-console-consumer.sh --topic myTopic --from-beginning --bootstrap-server big002:9092 \n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 发送消息")]),s._v("\n$ /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-console-producer.sh --topic myTopic --bootstrap-server big002:9092\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h2",{attrs:{id:"群起脚本"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#群起脚本"}},[s._v("#")]),s._v(" 群起脚本")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/bin/bash")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"start"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"========================= starting kafka  ========================="')]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[s._v("i")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" big002 big003 big004\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$i")]),s._v(" /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-server-start.sh -daemon /usr/local/soft/kafka_2.13-2.7.0/config/server.properties\n        "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"========================= '),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$i")]),s._v(' kafka start success ========================="')]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"stop"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"========================= stoping kafka  ========================="')]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[s._v("i")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" big002 big003 big004\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$i")]),s._v(" /usr/local/soft/kafka_2.13-2.7.0/bin/kafka-server-stop.sh\n        "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"========================= '),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$i")]),s._v(' kafka stop success ========================="')]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("esac")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br")])]),t("h1",{attrs:{id:"采坑记录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#采坑记录"}},[s._v("#")]),s._v(" 采坑记录")]),s._v(" "),t("p",[s._v("对于 kafka 的 zookeeper 集群地址配置：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## Zookeeper 集群地址")]),s._v("\nzookeeper.connect"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("big002:2181,big003:2181,big004:2181\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("上面的还有一种写法：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## Zookeeper 集群地址")]),s._v("\nzookeeper.connect"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("big002:2181,big003:2181,big004:2181/kafka\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("注意后面多带了一个"),t("code",[s._v("/kafka")]),s._v("，这种配置的意思是 kafka 在 zookeeper 的所有配置都放在 "),t("code",[s._v("/kafka")]),s._v(" 节点下，如下图所示：\n"),t("img",{attrs:{src:"/images/bigData/kafka/zk-node.png",alt:"zk-node"}})]),s._v(" "),t("p",[s._v("一旦采用这种写法之后，所有的控制台命令凡是用到 zookeeper 地址的地方都要加上 "),t("code",[s._v("/kafka")]),s._v("，如：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看 topic 列表")]),s._v("\n$ bin/kafka-topics.sh --zookeeper big002:2181/kafka --list\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 新建 topic：名称是 myTopic，副本数=3，分区数=1")]),s._v("\n$ bin/kafka-topics.sh --zookeeper big002:2181/kafka --create --replication-factor "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" --partitions "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" --topic myTopic\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("如果安装了 "),t("strong",[s._v("Kafka Eagle")]),s._v(" 监控工具，它的 zookeeper 配置也要加上 "),t("code",[s._v("/kafka")]),s._v("。如下：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# /usr/local/soft/kafka-eagle-web-2.0.5/conf/system-config.properties")]),s._v("\nkafka.eagle.zk.cluster.alias"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("cluster1\ncluster1.zk.list"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("big002:2181,big003:2181,big004:2181/kafka\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])])])}),[],!1,null,null,null);a.default=n.exports}}]);