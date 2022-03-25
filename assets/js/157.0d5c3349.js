(window.webpackJsonp=window.webpackJsonp||[]).push([[157],{519:function(s,t,a){"use strict";a.r(t);var e=a(22),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"常用命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[s._v("#")]),s._v(" 常用命令")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("\n$ docker images                                                   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看镜像            ")]),s._v("\n$ docker "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v("                                                       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看正在运行的容器")]),s._v("\n$ docker start name                                               "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动")]),s._v("\n$ docker stop name                                                "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 停止")]),s._v("\n$ docker restart name                                             "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重启")]),s._v("\n$ docker build -t tomcat-test "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("                                   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用当前路径下的Dockerfile创建tomcat镜像，镜像名称tomcat-test")]),s._v("\n$ docker build -t "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".195.95:5000/tk-es-pro "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("                 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用当前路径下的Dockerfile创建ES镜像，镜像名称tk-es-pro")]),s._v("\n$ docker push  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".195.95:5000/tk-es-pro                      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 把镜像tk-es-pro推送到仓库")]),s._v("\n$ docker rmi tomcat-test                                          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除镜像tomcat-test")]),s._v("\n$ docker "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" -it  name  /bin/sh                                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入正在执行的容器")]),s._v("\n$ docker "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" report-gen-job:/cf/logs/report-gen-job/app.log ./     "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将docker容器内的日志文件拷贝到所在机器的指定目录下")]),s._v("\n$ docker "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" base-service:/services/base-service ./\n$ docker "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" /root/tmp/web/ container-webapp:/webapps/container/   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ")]),s._v("\n$ docker run --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("kitty -itd tomcat-test                        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用tomcat-test镜像 后台方式启动 名称为kitty的docker容器")]),s._v("\n$ docker run -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9999")]),s._v(":8080 --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("kitty -itd tomcat-test\n$ docker run -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9999")]),s._v(":8080 --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("kitty -v /root/work/kitty/logs/demo1:/cf/logs -itd tomcat-kitty\n$ docker run -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9991")]),s._v(":8080 --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("kitty1 -v /root/work/kitty/logs/shell1:/cf/logs -itd tomcat-test\n$ docker run -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9992")]),s._v(":8080 --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("kitty2 -v /root/work/kitty/logs/shell2:/cf/logs -itd tomcat-test\n$ docker run --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("user-service -v /cf/logs/:/cf/logs/ -itd "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".195.95:5000/user-service:v1.0.90-test                              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 从仓库拉取镜像并启动")]),s._v("\n$ docker run --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("user-service --restart"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("on-failure:10 -v /cf/logs/:/cf/logs/ -itd "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".195.95:5000/user-service:v1.0.138          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 从仓库拉取镜像并启动（--restart=on-failure:10 进程退后自动重启）")]),s._v("\n$ docker run --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("user-service-node1 --restart"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("on-failure:10 -v /cf/logs/node1:/cf/logs -itd "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".195.95:5000/user-service:v1.0.138  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# --restart=on-failure:10 进程退后自动重启")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br")])]),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("\n$ docker rmi "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("docker images -q"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("                             "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 直接删除所有镜像")]),s._v("\n\n$ docker "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("docker "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" -aq"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("                                 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 直接删除所有容器")]),s._v("\n\n$ docker rmi "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("docker images "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" xxxxx "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$3")]),s._v("}'")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 按条件筛选之后删除镜像")]),s._v("\n\n$ docker "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" `docker "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" -a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" xxxxx "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v("}'")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 按条件筛选之后删除容器")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])])])}),[],!1,null,null,null);t.default=n.exports}}]);