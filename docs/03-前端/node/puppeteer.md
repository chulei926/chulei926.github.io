# puppeteer

- Doc： [https://pptr.dev/](https://pptr.dev/)
- github： [https://github.com/puppeteer/puppeteer/](https://github.com/puppeteer/puppeteer/)
- 参考： [https://zhuanlan.zhihu.com/p/76237595](https://zhuanlan.zhihu.com/p/76237595)

Puppeteer 是 Chrome 开发团队在 2017 年发布的一个 Node.js 包，用来模拟 Chrome 浏览器的运行。

## 社么是 CDP（Chrome DevTool Protocol）

- CDP 基于 WebSocket，利用 WebSocket 实现与浏览器内核的快速数据通道
- CDP 分为多个域（DOM，Debugger，Network，Profiler，Console...），每个域中都定义了相关的命令和事件（Commands and Events）
- 我们可以基于 CDP 封装一些工具对 Chrome 浏览器进行调试及分析，比如我们常用的 “Chrome 开发者工具” 就是基于 CDP 实现的
- 如果你以 remote-debugging-port 参数启动 Chrome，那么就可以看到所有 Tab 页面的开发者调试前端页面，还会在同一端口上还提供了 http 服务，主要提供以下几个接口：
```shell
GET /json/version                     # 获取浏览器的一些元信息
GET /json or /json/list               # 当前浏览器上打开的一些页面信息
GET /json/protocol                    # 获取当前 CDP 的协议信息   
GET /json/new?{url}                   # 开启一共新的 Tab 页面
GET /json/activate/{targetId}         # 激活某个页面成为当前显示的页面
GET /json/close/{targetId}            # 关闭某个页面
GET /devtools/inspector.html          # 打开当前页面的开发者调试工具
WebSocket /devtools/page/{targetId}   # 获取某个页面的 websocket 地址
```
- 很多有用的工具都是基于 CDP 实现的，比如 Chrome 开发者工具，chrome-remote-interface，Puppeteer 等

## 什么是 Headless Chrome

- 在无界面的环境中运行 Chrome
- 通过命令行或者程序语言操作 Chrome
- 无需人的干预，运行更稳定
- 在启动 Chrome 时添加参数 --headless，便可以 headless 模式启动 Chrome
```shell
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"  # Mac OS X 命令别名
chrome --headless --remote-debugging-port=9222 --disable-gpu                   # 开启远程调试
chrome --headless --disable-gpu --dump-dom https://www.baidu.com               # 获取页面 DOM
chrome --headless --disable-gpu --screenshot https://www.baidu.com             # 截图

# 更多参数见：https://peter.sh/experiments/chromium-command-line-switches/
```

## Puppeteer 是什么

- Puppeteer 是 Node.js 工具引擎
- Puppeteer 提供了一系列 API，通过 Chrome DevTools Protocol 协议控制 Chromium/Chrome 浏览器的行为
- Puppeteer 默认情况下是以 headless 启动 Chrome 的，也可以通过参数控制启动有界面的 Chrome
- Puppeteer 默认绑定最新的 Chromium 版本，也可以自己设置不同版本的绑定
- Puppeteer 让我们不需要了解太多的底层 CDP 协议实现与浏览器的通信

## Puppeteer 能做什么

官方称：“ Most things that you can do manually in the browser can be done using Puppeteer ”。

- 网页截图或者生成 PDF
- 爬取 SPA 或 SSR 网站
- UI 自动化测试，模拟表单提交，键盘输入，点击等行为
- 捕获网站的时间线，帮助诊断性能问题
- 创建一个最新的自动化测试环境，使用最新的 js 和最新的 Chrome 浏览器运行测试用例
- 测试 Chrome 扩展程序
- ...

## Puppeteer API 分层结构

Puppeteer 中的 API 分层结构基本和浏览器保持一致，下面对常使用到的几个类介绍一下：

![PuppeteerAPI](/images/other/ppte.png)

- Browser： 对应一个浏览器实例，一个 Browser 可以包含多个 BrowserContext
- BrowserContext： 对应浏览器一个上下文会话，就像我们打开一个普通的 Chrome 之后又打开一个隐身模式的浏览器一样，BrowserContext 具有独立的 Session(cookie 和 cache 独立不共享)，一个 - BrowserContext 可以包含多个 Page
- Page：表示一个 Tab 页面，通过 browserContext.newPage()/browser.newPage() 创建，browser.newPage() 创建页面时会使用默认的 BrowserContext，一个 Page 可以包含多个 Frame
- Frame: 一个框架，每个页面有一个主框架（page.MainFrame()）,也可以多个子框架，主要由 iframe 标签创建产生的
- ExecutionContext： 是 javascript 的执行环境，每一个 Frame 都一个默认的 javascript 执行环境
- ElementHandle: 对应 DOM 的一个元素节点，通过该该实例可以实现对元素的点击，填写表单等行为，我们可以通过选择器，xPath 等来获取对应的元素
- JsHandle：对应 DOM 中的 javascript 对象，ElementHandle 继承于 JsHandle，由于我们无法直接操作 DOM 中对象，所以封装成 JsHandle 来实现相关功能
- CDPSession：可以直接与原生的 CDP 进行通信，通过 session.send 函数直接发消息，通过 session.on 接收消息，可以实现 Puppeteer API 中没有涉及的功能
- Coverage：获取 JavaScript 和 CSS 代码覆盖率
- Tracing：抓取性能数据进行分析
- Response： 页面收到的响应
- Request： 页面发出的请求

