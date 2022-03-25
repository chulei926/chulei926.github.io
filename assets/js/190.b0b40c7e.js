(window.webpackJsonp=window.webpackJsonp||[]).push([[190],{556:function(s,a,t){"use strict";t.r(a);var n=t(22),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"集群配置分发"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#集群配置分发"}},[s._v("#")]),s._v(" 集群配置分发")]),s._v(" "),t("h2",{attrs:{id:"_1-ssh-免密登录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-ssh-免密登录"}},[s._v("#")]),s._v(" 1. SSH 免密登录")]),s._v(" "),t("h3",{attrs:{id:"需求-实现-big002、big003、big004-三台主机之前相互免密登录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#需求-实现-big002、big003、big004-三台主机之前相互免密登录"}},[s._v("#")]),s._v(" 需求：实现 big002、big003、big004 三台主机之前相互免密登录")]),s._v(" "),t("p",[t("img",{attrs:{src:"/images/bigData/Hadoop/ssh.png",alt:"ssh"}})]),s._v(" "),t("ul",[t("li",[s._v("使用 leichu 账号登录 big002")]),s._v(" "),t("li",[s._v("进入"),t("code",[s._v("~/.ssh")]),s._v("目录")]),s._v(" "),t("li",[s._v("执行命令："),t("code",[s._v("ssh-keygen -t rsa")]),s._v(" ,连续三次回车，当前目录下回生成2个文件："),t("code",[s._v("id_rsa")]),s._v(" 和 "),t("code",[s._v("id_rsa.pub")])]),s._v(" "),t("li",[s._v("执行命令："),t("code",[s._v("ssh-copy-id big002")]),s._v("，将公钥文件 "),t("code",[s._v("id_rsa.pub")]),s._v(" 拷贝到主机 big002")]),s._v(" "),t("li",[s._v("执行命令："),t("code",[s._v("ssh-copy-id big003")]),s._v("，将公钥文件 "),t("code",[s._v("id_rsa.pub")]),s._v(" 拷贝到主机 big003")]),s._v(" "),t("li",[s._v("执行命令："),t("code",[s._v("ssh-copy-id big004")]),s._v("，将公钥文件 "),t("code",[s._v("id_rsa.pub")]),s._v(" 拷贝到主机 big004")])]),s._v(" "),t("ul",[t("li",[s._v("此时，从主机 big002 的 leichu 账户免密登录到 big003 和 big004 已经配置完成。")]),s._v(" "),t("li",[s._v("然后，在 主机 big003 和 big004 上进行相同的操作.")]),s._v(" "),t("li",[s._v("最后，在三台主机上，切换到 root 用户，分别再进行一次相同的操作。")]),s._v(" "),t("li",[s._v("这样，三台主机之间的 可以使用 root 账户 和 leichu 账号 进行免密登录了。")])]),s._v(" "),t("h2",{attrs:{id:"_2-scp-命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-scp-命令"}},[s._v("#")]),s._v(" 2. scp 命令")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("### 在主机 big001上：将 big001 主机上的 /test 目录 拷贝到 big004 的 /test 目录\t（推送）")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("leichu@big001 ~"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" -r "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v(" leichu@big004:~/test                              "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v("%    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("     "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v(".7KB/s   00:00    \n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("### 在主机 big004 上：将 big001 主机上的 /test 目录 拷贝到 big004 的 /test 目录（拉取）")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("leichu@big004 ~"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" -r leichu@big001:test ./\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("### 在主机 big003 上：将 big001 主机上的 /test 目录 拷贝到 big004 的 /test 目录（第三者）")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("leichu@big003 ~"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" -r leichu@big001:~/test leichu@big004:~/test\nleichu@big001"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'s password: \nleichu@big004'")]),s._v("s password: \nwx.txt                                                                                             "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v("%   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("79")]),s._v("    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("71")]),s._v(".3KB/s   00:00    \npart-r-00000                                                                                       "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v("%   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("48")]),s._v("    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("45")]),s._v(".0KB/s   00:00    \n.part-r-00000.crc                                                                                  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v("%   "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("12")]),s._v("    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(".2KB/s   00:00    \n_SUCCESS                                                                                           "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v("%    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("     "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(".0KB/s   00:00    \n._SUCCESS.crc                                                                                      "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v("%    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("    "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(".2KB/s   00:00    \nConnection to big001 closed.\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br")])]),t("h2",{attrs:{id:"_3-自定义命令-xsync"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-自定义命令-xsync"}},[s._v("#")]),s._v(" 3. 自定义命令：xsync")]),s._v(" "),t("ol",[t("li",[s._v("新建 "),t("code",[s._v("/usr/local/bin/xsync")]),s._v(" 文件，内容如下")]),s._v(" "),t("li",[s._v("赋予可执行权限 "),t("code",[s._v("chmod +x /usr/local/bin/xsync")])])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/bin/bash")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#1 获取输入参数个数，如果没有参数，直接退出")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("pcount")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$#")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("((")]),s._v("pcount"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("))")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("then")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" no args"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exit")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fi")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#2 获取文件名称")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("p1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("fname")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("basename")]),s._v(" $p1"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("fname")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$fname")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#3 获取上级目录到绝对路径")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("pdir")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" -P "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("$(")]),s._v("dirname $p1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("pwd")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("pdir")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$pdir")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#4 获取当前用户名称")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("user")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("whoami")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#5 循环")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("((")]),s._v("host"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" host"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" host"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("))")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" ------------------- big00"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$host")]),s._v(" --------------\n        "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rsync")]),s._v(" -rvl "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$pdir")]),s._v("/"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$fname")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$user")]),s._v("@big00"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$host")]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$pdir")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);