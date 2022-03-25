(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{500:function(s,a,t){"use strict";t.r(a);var e=t(22),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"firewalld"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#firewalld"}},[s._v("#")]),s._v(" firewalld")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#进程与状态相关")]),s._v("\nsystemctl start firewalld.service            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#启动防火墙")]),s._v("\nsystemctl stop firewalld.service             "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#停止防火墙")]),s._v("\nsystemctl status firewalld                   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看防火墙状态")]),s._v("\nsystemctl "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" firewalld                   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#设置防火墙随系统启动")]),s._v("\nsystemctl disable firewalld                  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#禁止防火墙随系统启动")]),s._v("\nfirewall-cmd --state                         "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看防火墙状态")]),s._v("\nfirewall-cmd --reload                        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#更新防火墙规则")]),s._v("\nfirewall-cmd --list-ports                    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看所有打开的端口")]),s._v("\nfirewall-cmd --list-services                 "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看所有允许的服务")]),s._v("\nfirewall-cmd --get-services                  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#获取所有支持的服务")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#区域相关")]),s._v("\nfirewall-cmd --list-all-zones                    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看所有区域信息")]),s._v("\nfirewall-cmd --get-active-zones                  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看活动区域信息")]),s._v("\nfirewall-cmd --set-default-zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public           "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#设置public为默认区域")]),s._v("\nfirewall-cmd --get-default-zone                  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看默认区域信息")]),s._v("\n\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#接口相关")]),s._v("\nfirewall-cmd --zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public --add-interface"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("eth0          "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#将接口eth0加入区域public")]),s._v("\nfirewall-cmd --zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public --remove-interface"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("eth0       "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#从区域public中删除接口eth0")]),s._v("\nfirewall-cmd --zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("default --change-interface"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("eth0      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#修改接口eth0所属区域为default")]),s._v("\nfirewall-cmd --get-zone-of-interface"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("eth0                "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看接口eth0所属区域")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#端口控制")]),s._v("\nfirewall-cmd --query-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v("/tcp                                      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查询端口是否开放")]),s._v("\nfirewall-cmd --add-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v("/tcp --permanent                            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#永久添加8080端口例外(全局)")]),s._v("\nfirewall-cmd --remove-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8800")]),s._v("/tcp --permanent                         "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#永久删除8080端口例外(全局)")]),s._v("\nfirewall-cmd --add-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("65001")]),s._v("-65010/tcp --permanent                     "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#永久增加65001-65010例外(全局)")]),s._v("\nfirewall-cmd  --zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public --add-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v("/tcp --permanent             "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#永久添加8080端口例外(区域public)")]),s._v("\nfirewall-cmd  --zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public --remove-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v("/tcp --permanent          "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#永久删除8080端口例外(区域public)")]),s._v("\nfirewall-cmd  --zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public --add-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("65001")]),s._v("-65010/tcp --permanent      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#永久增加65001-65010例外(区域public)")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br"),t("span",{staticClass:"line-number"},[s._v("33")]),t("br")])]),t("h2",{attrs:{id:"最常用命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#最常用命令"}},[s._v("#")]),s._v(" 最常用命令")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("firewall-cmd --zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public --add-ports"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v("/tcp --permanent\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("####################################")]),s._v("\n--zone              "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#作用域")]),s._v("\n--add-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v("/tcp "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#添加端口，格式为：端口/通讯协议 ；add表示添加，remove则对应移除")]),s._v("\n--permanent         "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#永久生效，没有此参数重启后失效")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("####################################")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])])])}),[],!1,null,null,null);a.default=n.exports}}]);