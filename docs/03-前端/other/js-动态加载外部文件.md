# JS动态加载外部文件

## 1、加载js

```js
$.getScript(basePath + "/static/3rdparty/jsmarty/jsmart.js");
```

## 2、加载json

```js
$.getJSON("../data/test.json", function(data) {
	console.log(data);
});
```

## 3、加载html

```js
$('#myDiv').load("/paper/data/test.html")
```