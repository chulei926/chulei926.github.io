(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{471:function(e,t,s){"use strict";s.r(t);var a=s(22),r=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"puppeteer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#puppeteer"}},[e._v("#")]),e._v(" puppeteer")]),e._v(" "),s("ul",[s("li",[e._v("Doc： "),s("a",{attrs:{href:"https://pptr.dev/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://pptr.dev/"),s("OutboundLink")],1)]),e._v(" "),s("li",[e._v("github： "),s("a",{attrs:{href:"https://github.com/puppeteer/puppeteer/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/puppeteer/puppeteer/"),s("OutboundLink")],1)]),e._v(" "),s("li",[e._v("参考： "),s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/76237595",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://zhuanlan.zhihu.com/p/76237595"),s("OutboundLink")],1)])]),e._v(" "),s("p",[e._v("Puppeteer 是 Chrome 开发团队在 2017 年发布的一个 Node.js 包，用来模拟 Chrome 浏览器的运行。")]),e._v(" "),s("h2",{attrs:{id:"社么是-cdp-chrome-devtool-protocol"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#社么是-cdp-chrome-devtool-protocol"}},[e._v("#")]),e._v(" 社么是 CDP（Chrome DevTool Protocol）")]),e._v(" "),s("ul",[s("li",[e._v("CDP 基于 WebSocket，利用 WebSocket 实现与浏览器内核的快速数据通道")]),e._v(" "),s("li",[e._v("CDP 分为多个域（DOM，Debugger，Network，Profiler，Console...），每个域中都定义了相关的命令和事件（Commands and Events）")]),e._v(" "),s("li",[e._v("我们可以基于 CDP 封装一些工具对 Chrome 浏览器进行调试及分析，比如我们常用的 “Chrome 开发者工具” 就是基于 CDP 实现的")]),e._v(" "),s("li",[e._v("如果你以 remote-debugging-port 参数启动 Chrome，那么就可以看到所有 Tab 页面的开发者调试前端页面，还会在同一端口上还提供了 http 服务，主要提供以下几个接口：")])]),e._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("GET /json/version                     "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 获取浏览器的一些元信息")]),e._v("\nGET /json or /json/list               "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 当前浏览器上打开的一些页面信息")]),e._v("\nGET /json/protocol                    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 获取当前 CDP 的协议信息   ")]),e._v("\nGET /json/new?"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("                   "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 开启一共新的 Tab 页面")]),e._v("\nGET /json/activate/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("targetId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("         "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 激活某个页面成为当前显示的页面")]),e._v("\nGET /json/close/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("targetId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("            "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 关闭某个页面")]),e._v("\nGET /devtools/inspector.html          "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 打开当前页面的开发者调试工具")]),e._v("\nWebSocket /devtools/page/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("targetId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("   "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 获取某个页面的 websocket 地址")]),e._v("\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br")])]),s("ul",[s("li",[e._v("很多有用的工具都是基于 CDP 实现的，比如 Chrome 开发者工具，chrome-remote-interface，Puppeteer 等")])]),e._v(" "),s("h2",{attrs:{id:"什么是-headless-chrome"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是-headless-chrome"}},[e._v("#")]),e._v(" 什么是 Headless Chrome")]),e._v(" "),s("ul",[s("li",[e._v("在无界面的环境中运行 Chrome")]),e._v(" "),s("li",[e._v("通过命令行或者程序语言操作 Chrome")]),e._v(" "),s("li",[e._v("无需人的干预，运行更稳定")]),e._v(" "),s("li",[e._v("在启动 Chrome 时添加参数 --headless，便可以 headless 模式启动 Chrome")])]),e._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("alias")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("chrome")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome"')]),e._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Mac OS X 命令别名")]),e._v("\nchrome --headless --remote-debugging-port"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("9222")]),e._v(" --disable-gpu                   "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 开启远程调试")]),e._v("\nchrome --headless --disable-gpu --dump-dom https://www.baidu.com               "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 获取页面 DOM")]),e._v("\nchrome --headless --disable-gpu --screenshot https://www.baidu.com             "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 截图")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 更多参数见：https://peter.sh/experiments/chromium-command-line-switches/")]),e._v("\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])]),s("h2",{attrs:{id:"puppeteer-是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#puppeteer-是什么"}},[e._v("#")]),e._v(" Puppeteer 是什么")]),e._v(" "),s("ul",[s("li",[e._v("Puppeteer 是 Node.js 工具引擎")]),e._v(" "),s("li",[e._v("Puppeteer 提供了一系列 API，通过 Chrome DevTools Protocol 协议控制 Chromium/Chrome 浏览器的行为")]),e._v(" "),s("li",[e._v("Puppeteer 默认情况下是以 headless 启动 Chrome 的，也可以通过参数控制启动有界面的 Chrome")]),e._v(" "),s("li",[e._v("Puppeteer 默认绑定最新的 Chromium 版本，也可以自己设置不同版本的绑定")]),e._v(" "),s("li",[e._v("Puppeteer 让我们不需要了解太多的底层 CDP 协议实现与浏览器的通信")])]),e._v(" "),s("h2",{attrs:{id:"puppeteer-能做什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#puppeteer-能做什么"}},[e._v("#")]),e._v(" Puppeteer 能做什么")]),e._v(" "),s("p",[e._v("官方称：“ Most things that you can do manually in the browser can be done using Puppeteer ”。")]),e._v(" "),s("ul",[s("li",[e._v("网页截图或者生成 PDF")]),e._v(" "),s("li",[e._v("爬取 SPA 或 SSR 网站")]),e._v(" "),s("li",[e._v("UI 自动化测试，模拟表单提交，键盘输入，点击等行为")]),e._v(" "),s("li",[e._v("捕获网站的时间线，帮助诊断性能问题")]),e._v(" "),s("li",[e._v("创建一个最新的自动化测试环境，使用最新的 js 和最新的 Chrome 浏览器运行测试用例")]),e._v(" "),s("li",[e._v("测试 Chrome 扩展程序")]),e._v(" "),s("li",[e._v("...")])]),e._v(" "),s("h2",{attrs:{id:"puppeteer-api-分层结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#puppeteer-api-分层结构"}},[e._v("#")]),e._v(" Puppeteer API 分层结构")]),e._v(" "),s("p",[e._v("Puppeteer 中的 API 分层结构基本和浏览器保持一致，下面对常使用到的几个类介绍一下：")]),e._v(" "),s("p",[s("img",{attrs:{src:"/images/other/ppte.png",alt:"PuppeteerAPI"}})]),e._v(" "),s("ul",[s("li",[e._v("Browser： 对应一个浏览器实例，一个 Browser 可以包含多个 BrowserContext")]),e._v(" "),s("li",[e._v("BrowserContext： 对应浏览器一个上下文会话，就像我们打开一个普通的 Chrome 之后又打开一个隐身模式的浏览器一样，BrowserContext 具有独立的 Session(cookie 和 cache 独立不共享)，一个 - BrowserContext 可以包含多个 Page")]),e._v(" "),s("li",[e._v("Page：表示一个 Tab 页面，通过 browserContext.newPage()/browser.newPage() 创建，browser.newPage() 创建页面时会使用默认的 BrowserContext，一个 Page 可以包含多个 Frame")]),e._v(" "),s("li",[e._v("Frame: 一个框架，每个页面有一个主框架（page.MainFrame()）,也可以多个子框架，主要由 iframe 标签创建产生的")]),e._v(" "),s("li",[e._v("ExecutionContext： 是 javascript 的执行环境，每一个 Frame 都一个默认的 javascript 执行环境")]),e._v(" "),s("li",[e._v("ElementHandle: 对应 DOM 的一个元素节点，通过该该实例可以实现对元素的点击，填写表单等行为，我们可以通过选择器，xPath 等来获取对应的元素")]),e._v(" "),s("li",[e._v("JsHandle：对应 DOM 中的 javascript 对象，ElementHandle 继承于 JsHandle，由于我们无法直接操作 DOM 中对象，所以封装成 JsHandle 来实现相关功能")]),e._v(" "),s("li",[e._v("CDPSession：可以直接与原生的 CDP 进行通信，通过 session.send 函数直接发消息，通过 session.on 接收消息，可以实现 Puppeteer API 中没有涉及的功能")]),e._v(" "),s("li",[e._v("Coverage：获取 JavaScript 和 CSS 代码覆盖率")]),e._v(" "),s("li",[e._v("Tracing：抓取性能数据进行分析")]),e._v(" "),s("li",[e._v("Response： 页面收到的响应")]),e._v(" "),s("li",[e._v("Request： 页面发出的请求")])])])}),[],!1,null,null,null);t.default=r.exports}}]);