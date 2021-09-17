(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{375:function(s,a,e){"use strict";e.r(a);var t=e(22),n=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"tomcat内存修改"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tomcat内存修改"}},[s._v("#")]),s._v(" Tomcat内存修改")]),s._v(" "),e("h2",{attrs:{id:"windows"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#windows"}},[s._v("#")]),s._v(" Windows")]),s._v(" "),e("p",[s._v("在"),e("code",[s._v("tomcat_home/bin")]),s._v("目录下找到"),e("code",[s._v("catalina.bat")]),s._v("，加上下面一行：")]),s._v(" "),e("div",{staticClass:"language-batch line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-batch"}},[e("code",[e("span",{pre:!0,attrs:{class:"token command"}},[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("set")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("JAVA_OPTS")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("Xms1024M "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("Xmx1024M "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("XX:"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("PermSize")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("256M "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("XX:"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("MaxNewSize")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("256M "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("XX:"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("MaxPermSize")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("256M")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token label property"}},[s._v(": -Xms1024M：初始化堆内存大小（注意，不加M的话单位是KB）")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token label property"}},[s._v(": -Xmx1029M：最大堆内存大小")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token label property"}},[s._v(": -XX:PermSize=256M：初始化类加载内存池大小")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token label property"}},[s._v(": -XX:MaxPermSize=256M：最大类加载内存池大小")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("h2",{attrs:{id:"linux"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#linux"}},[s._v("#")]),s._v(" Linux")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -server:一定要作为第一个参数，在多个CPU时性能佳")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -Xms：初始Heap大小，使用的最小内存,cpu性能高时此值应设的大一些")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -Xmx：java heap最大值，使用的最大内存")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 上面两个值是分配JVM的最小和最大内存，取决于硬件物理内存的大小，建议均设为物理内存的一半。")]),s._v("\n    \n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -XX:PermSize:设定内存的永久保存区域")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -XX:MaxPermSize:设定最大内存的永久保存区域")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -XX:MaxNewSize:")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -Xss 15120 这使得JBoss每增加一个线程（thread)就会立即消耗15M内存，而最佳值应该是128K,默认值好像是512k.")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# +XX:AggressiveHeap 会使得 Xms没有意义。这个参数让jvm忽略Xmx参数,疯狂地吃完一个G物理内存,再吃尽一个G的swap。")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -Xss：每个线程的Stack大小")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -verbose:gc 现实垃圾收集信息")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -Xloggc:gc.log 指定垃圾收集日志文件")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -Xmn：young generation的heap大小，一般设置为Xmx的3、4分之一")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -XX:+UseParNewGC ：缩短minor收集的时间")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -XX:+UseConcMarkSweepGC ：缩短major收集的时间")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 提示：此选项在Heap Size 比较大而且Major收集时间较长的情况下使用更合适。")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("JAVA_OPTS")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-server -Xms512m -Xmx4096m -XX:PermSize=256m -XX:MaxPermSize=512m"')]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br")])])])}),[],!1,null,null,null);a.default=n.exports}}]);