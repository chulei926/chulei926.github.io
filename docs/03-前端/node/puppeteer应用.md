# puppeteer截图&转PDF

用到的主要技术：

- puppeteer
- express

## package.json
```json
{
	"name": "puppeteer-demo",
	"version": "1.0.0",
	"description": "",
	"main": "app.js",
	"scripts": {
		"start": "node --inspect app.js",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"compression": "^1.7.4",
		"express": "^4.17.1",
		"puppeteer": "^9.0.0",
		"uuid": "^8.3.2"
	}
}
```

## app.js
```javascript
var express = require('express');
var compression = require('compression')
var fs = require("fs");
var server = express();
server.use(compression())
const puppeteer = require('puppeteer');

require('./log');

const {
	v4: uuidv4
} = require('uuid');

const MAX_WSE = 4; //启动几个浏览器 
let WSE_LIST = []; //存储browserWSEndpoint列表
/**
 * 性能优化： 先初始化几个 wsEndpoint 放到数组中，使用的时候任取一个进行连接。
 */
(async () => {
	for (var i = 0; i < MAX_WSE; i++) {
		const browser = await puppeteer.launch({
			args: [
				'--disable-gpu',
				'--disable-dev-shm-usage',
				'--disable-setuid-sandbox',
				'--no-first-run',
				'--no-sandbox',
				'--no-zygote',
				'--single-process'
			]
		});
		browserWSEndpoint = await browser.wsEndpoint();
		WSE_LIST[i] = browserWSEndpoint;
	}
	console.log('初始化browser完成', WSE_LIST);
})();

/**
 * 截图。
 */
server.get(/^\/img(.*)/, function (request, response, next) {
	let targetUrl = new URL(request.url.substring(5))
	let width = targetUrl.searchParams.get('width');
	let height = targetUrl.searchParams.get('height');

	let savePath = `tmp/${uuidv4().toString().replace(/\-/g, '')}.jpeg`;

	screenshot(`${targetUrl.origin}${targetUrl.pathname}`, savePath, width, height).then(() => {
		response.setHeader("Content-Type", 'image/jpeg');
		response.setHeader("cache-control", 'public,max-age=31536000');
		response.writeHead(200, "Ok");
		response.write(fs.readFileSync(`./${savePath}`, "binary"), "binary");
		response.end();
	}).catch(error => {
		logger.error(error);
		next(error);
	}).finally(() => {
		try {
			fs.unlink(savePath, () => {
				logger.log('文件已删除', savePath);
			});
		} catch (error) {
			logger.error(error);
		}
	});

});

/**
 * PDF 下载。
 */
server.get(/^\/pdf(.*)/, function (request, response, next) {
	let targetUrl = new URL(request.url.substring(5))
	let width = targetUrl.searchParams.get('width') || null;
	let height = targetUrl.searchParams.get('height') || null;
	let format = targetUrl.searchParams.get('format') || null;
	let landscape = targetUrl.searchParams.get('landscape') == 'true';

	let savePath = `tmp/${uuidv4().toString().replace(/\-/g, '')}.pdf`;

	html2pdf(`${targetUrl.origin}${targetUrl.pathname}`, savePath, format, width, height, landscape).then(() => {
		response.setHeader("Content-Type", 'application/pdf');
		response.setHeader("cache-control", 'public,max-age=31536000');
		response.writeHead(200, "Ok");
		response.write(fs.readFileSync(`./${savePath}`, "binary"), "binary");
		response.end();
	}).catch(error => {
		logger.error(error);
		next(error);
	}).finally(() => {
		try {
			fs.unlink(savePath, () => {
				logger.log('文件已删除', savePath);
			});
		} catch (error) {
			logger.error(error);
		}
	});
});

async function screenshot(url, savePath, width, height) {
	let tmp = Math.floor(Math.random() * MAX_WSE);
	let browserWSEndpoint = WSE_LIST[tmp];
	const browser = await puppeteer.connect({
		browserWSEndpoint
	});
	const page = await browser.newPage();
	await page.goto(url);

	let clip = {
		'x': 0,
		'y': 0
	};
	if ((!width && height) || (width && !height)) {
		return Promise.reject('截图宽度和高度必须同时设置！');
	} else if (width && height) {
		clip.width = Number.parseInt(width);
		clip.height = Number.parseInt(height);
	} else {
		// 未设置 宽度 和 高度，截全屏
	}

	if (Object.keys(clip).length <= 2) {
		console.log('全屏截图', url);
		await page.screenshot({
			path: savePath,
			fullPage: true
		});
	} else {
		console.log('区域截图', url, clip);
		await page.screenshot({
			path: savePath,
			clip: clip
		});
	}
	await page.close();
	return Promise.resolve();
};

async function html2pdf(url, savePath, format, width, height, landscape) {
	let tmp = Math.floor(Math.random() * MAX_WSE);
	let browserWSEndpoint = WSE_LIST[tmp];
	const browser = await puppeteer.connect({
		browserWSEndpoint
	});
	console.log('html2pdf', url);
	const page = await browser.newPage();
	await page.addStyleTag({
		content: '.layout-container { font-family: Times New Roman,SimSun,serif;}'
	})
	await page.goto(url, {
		waitUntil: 'networkidle2',
	});

	await page.pdf({
		path: savePath,
		format: format,
		width: width,
		height: height,
		printBackground: true,
		landscape: landscape,
	});
	await page.close();
	return Promise.resolve();
}

server.listen(8888, '0.0.0.0');
console.log('node服务器已启动......');
```

## log.js
```javascript
const fs = require('fs');

(function () {
    const output = fs.createWriteStream('./logs/stdout.log');
    const errorOutput = fs.createWriteStream('./logs/stderr.log');
    // 自定义日志打印
    var logger = new console.Console(output, errorOutput);
    global.logger = logger;
})();
```




