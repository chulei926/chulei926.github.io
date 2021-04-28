# ng6升级至ng10

## 1. 当前环境（升级后）

![升级后](/images/angular/升级后.png)

## 2. 升级node

下载最新安装包重新安装

https://nodejs.org/zh-cn/download/


## 3. 升级angular-cli

```shell
## 卸载原angular-cli
npm uninstall -g @angualr/cli
npm cache clean --force

#全局安装最新版cli
npm install -g @angular/cli
```

## 4. 使用公司内部npm私服

```shell
## 拷贝一下内容到 C:\Users\administrator\.npmrc 文件中
registry=http://192.168.195.95:8888/repository/npm-group/
always-auth=true
_auth="ZGVwbG95ZXI6ZGVwbG95ZXI="
//192.168.195.95:8888/repository/npm-group/:_authToken=NpmToken.80b3af5b-c05a-3569-b259-ba716af1891c
```


## 5. 运行命令，启动更新程序，查看需要更新的依赖：
```shell
cd demo-webapp\web
ng update
```



## 6. 强制升级
```shell
ng update --all --force
```


## 7. 升级后修改点：
### 7.1 配置文件

##### 以下文件移入 web 目录，参考报告教师PC端或学生PC端
* tsconfig.json
* tsconfig.app.json
* tsconfig.base.json
* tsconfig.spec.json
* .browserslistrc
* karma.conf.js
##### 修改angular.json文件，参考报告教师PC端或学生PC端

### 7.2 代码（ 哪里报错改哪里 ）

### 7.3 特别注意
```javascript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)

    },
    {
        path: 'index',
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule)

    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
```

完成后最新目录如下：

![目录结构](/images/angular/目录结构.png)

## 常见问题解决

### 解决启动时警告：
```shell
depends on 'jquery'. CommonJS or AMD dependencies can cause optimization bailouts.
```
#### 解决：
```json
 "build": {
   "builder": "@angular-devkit/build-angular:browser",
   "options": {
      "outputPath": "dist/web",
      "index": "src/index.html",
      "main": "src/main.ts",
      "polyfills": "src/polyfills.ts",
      "tsConfig": "tsconfig.app.json",
      "aot": true,
      "assets": [
         ...
      ],
      "styles": [
         ...
      ],
      "scripts": [
         ...
      ],
      "allowedCommonJsDependencies": [ // 允许 CommonJs 依赖
         "jquery",
         "echarts",
         "zrender/lib/svg/svg",
         "zrender/lib/vml/vml"
      ]
   }
}
```

