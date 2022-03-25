(window.webpackJsonp=window.webpackJsonp||[]).push([[125],{487:function(s,t,a){"use strict";a.r(t);var e=a(22),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"ssh免密登录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ssh免密登录"}},[s._v("#")]),s._v(" SSH免密登录")]),s._v(" "),a("h2",{attrs:{id:"ssh原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ssh原理"}},[s._v("#")]),s._v(" ssh原理")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://www.jianshu.com/p/33461b619d53",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://www.jianshu.com/p/33461b619d53"),a("OutboundLink")],1)]),s._v(" "),a("h2",{attrs:{id:"环境介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#环境介绍"}},[s._v("#")]),s._v(" 环境介绍")]),s._v(" "),a("ul",[a("li",[s._v("操作系统\tCentOS 7")]),s._v(" "),a("li",[s._v("clientOS:     192.168.0.1")]),s._v(" "),a("li",[s._v("serverOS:     192.168.0.2")])]),s._v(" "),a("h2",{attrs:{id:"ssh环境检查"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ssh环境检查"}},[s._v("#")]),s._v(" ssh环境检查")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 查看ssh安装包")]),s._v("\nyum list installed "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 查看ssh服务运行状态")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" -ef "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h2",{attrs:{id:"操作步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#操作步骤"}},[s._v("#")]),s._v(" 操作步骤")]),s._v(" "),a("h3",{attrs:{id:"_1-客户端生成公钥和私钥"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-客户端生成公钥和私钥"}},[s._v("#")]),s._v(" 1. 客户端生成公钥和私钥")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("ssh-keygen -t rsa")]),s._v("\t回车输入保存路径名称，例如："),a("code",[s._v("~/.ssh/id_rsa_kitty")]),s._v("，回车")]),s._v(" "),a("li",[s._v("输入私钥密码，例如："),a("code",[s._v("kitty")]),s._v(",回车。")]),s._v(" "),a("li",[s._v("确认私钥密码，如："),a("code",[s._v("kitty")]),s._v("，回车。")]),s._v(" "),a("li",[s._v("操作完成后会在"),a("code",[s._v("~/.ssh/")]),s._v("目录下生成2个文件。公钥"),a("code",[s._v("id_rsa_kitty")]),s._v("和私钥"),a("code",[s._v("id_rsa_kitty.pub")]),s._v("。")])]),s._v(" "),a("h3",{attrs:{id:"_2-修改客户端配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-修改客户端配置"}},[s._v("#")]),s._v(" 2. 修改客户端配置")]),s._v(" "),a("ul",[a("li",[s._v("把私钥加入"),a("code",[s._v("/etc/ssh/ssh_config")]),s._v("配置里面，防止每次登录都需要指定私钥路径。")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("IdentityFile ~/.ssh/id_rsa_kitty\t\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#如果有其他的私钥，还要再加入其他私钥的路径")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"_3-上传公钥到服务端"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-上传公钥到服务端"}},[s._v("#")]),s._v(" 3. 上传公钥到服务端")]),s._v(" "),a("ul",[a("li",[s._v("使用ftp客户端将"),a("code",[s._v("id_rsa_kitty.pub")]),s._v("上传至服务端的"),a("code",[s._v("~/.ssh/")]),s._v("目录。")])]),s._v(" "),a("h3",{attrs:{id:"_4-修改服务端配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-修改服务端配置"}},[s._v("#")]),s._v(" 4. 修改服务端配置")]),s._v(" "),a("ul",[a("li",[s._v("修改"),a("code",[s._v("/etc/ssh/sshd_config")]),s._v("文件，"),a("code",[s._v("vim /etc/ssh/sshd_config")]),s._v("。")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("Port "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2202")]),s._v("\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#将默认的22端口修改为2202端口")]),s._v("\nPermitRootLogin no\t\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#禁用root账户登录，非必要，但为了安全性，要配置")]),s._v("\nStrictModes no\t\t\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#是否让 sshd 去检查用户家目录或相关档案的权限数据，这是为了担心使用者将某些重要档案的权限设错，可能会导致一些问题所致。例如使用者的 ~.ssh/ 权限设错时，某些特殊情况下会不许用户登入")]),s._v("\nRSAAuthentication "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v("\nPubkeyAuthentication "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v("\nAuthorizedKeysFile      %h/.ssh/authorized_keys\nPasswordAuthentication no\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#有了证书登录，可以禁用密码登录")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("ul",[a("li",[s._v("修改了"),a("code",[s._v("sshd_config")]),s._v("文件，需要重启sshd服务")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("/usr/sbin/sshd restart\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ul",[a("li",[s._v("将公钥写入服务端配置文件")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v("  id_rsa_kitty.pub "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" ～/.ssh/authorized_keys\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"_5-客户端连接服务端"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-客户端连接服务端"}},[s._v("#")]),s._v(" 5. 客户端连接服务端")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2202")]),s._v(" root@192.168.0.2\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])])])}),[],!1,null,null,null);t.default=n.exports}}]);