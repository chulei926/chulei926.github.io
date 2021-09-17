(window.webpackJsonp=window.webpackJsonp||[]).push([[154],{515:function(s,a,e){"use strict";e.r(a);var t=e(22),n=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),e("h2",{attrs:{id:"_1-卸载系统原有-docker-相关的包"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-卸载系统原有-docker-相关的包"}},[s._v("#")]),s._v(" 1. 卸载系统原有 docker 相关的包")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("$ yum remove docker "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n                    docker-client "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n                    docker-client-latest "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n                    docker-common "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n                    docker-latest "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n                    docker-latest-logrotate "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n                    docker-logrotate "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n                    docker-engine\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br")])]),e("h2",{attrs:{id:"_2-安装依赖包"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-安装依赖包"}},[s._v("#")]),s._v(" 2. 安装依赖包")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("$ yum "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -y yum-utils device-mapper-persistent-data lvm2 \n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"_3-设置阿里云镜像源"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-设置阿里云镜像源"}},[s._v("#")]),s._v(" 3. 设置阿里云镜像源")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("$ yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo \n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"_4-安装-docker-ce"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-安装-docker-ce"}},[s._v("#")]),s._v(" 4. 安装 Docker-CE")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("$ yum "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" docker-ce\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"_5-启动docker"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-启动docker"}},[s._v("#")]),s._v(" 5. 启动docker")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 开机自启")]),s._v("\n$ systemctl "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" docker \n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 启动docker服务  ")]),s._v("\n$ systemctl start docker\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("hr"),s._v(" "),e("h2",{attrs:{id:"配置阿里镜像加速器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置阿里镜像加速器"}},[s._v("#")]),s._v(" 配置阿里镜像加速器")]),s._v(" "),e("blockquote",[e("p",[s._v("可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器")])]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p /etc/docker\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("tee")]),s._v(" /etc/docker/daemon.json "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<-")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'EOF\'\n{\n    "registry-mirrors": ["https://hd8lc7de.mirror.aliyuncs.com"]\n}\nEOF')]),s._v("\n\n$ systemctl daemon-reload\n$ systemctl restart docker\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br")])]),e("hr"),s._v(" "),e("h2",{attrs:{id:"gui管理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gui管理"}},[s._v("#")]),s._v(" GUI管理")]),s._v(" "),e("ul",[e("li",[s._v("推荐使用 Portainer 作为容器的 GUI 管理方案。")]),s._v(" "),e("li",[s._v("官方地址："),e("code",[s._v("https://portainer.io/install.html")])]),s._v(" "),e("li",[s._v("安装命令：")])]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("$ docker volume create portainer_data\n$ docker run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("8000")]),s._v(":8000 -p "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("9000")]),s._v(":9000 --restart"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("访问 "),e("code",[s._v("IP:9000")]),s._v(" 即可进入容器管理页面")]),s._v(" "),e("h1",{attrs:{id:"ubuntu-安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ubuntu-安装"}},[s._v("#")]),s._v(" Ubuntu 安装")]),s._v(" "),e("p",[s._v("https://www.jianshu.com/p/c2d7aba34056")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" docker.io\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])])}),[],!1,null,null,null);a.default=n.exports}}]);