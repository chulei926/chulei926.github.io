# 创建&部署library到npm私服

代码地址：https://github.com/chulei926/web-workspace/tree/master/angular-workspace/eiduo-cl

## 1. 创建 workspace
```shell
ng new eiduo-cl --skip-tests --skip-git --skip-install --create-application=false -p eiduo
npm install
```

## 2. 创建 library
```shell
cd eiduo-cl
ng generate library eiduo-ui-lib -p cl
```

## 3. 删除测试文件（非必须）

```shell
cd .\projects\eiduo-ui-lib\src\lib\
del *.spec.ts
```

## 4. 修改文件 projects\eiduo-com-lib\package.json
```json
"private": false, // 默认 true
"publishConfig": {
    "registry": "http://study:8081/repository/npm-hosted/"
},
```

## 5. 构建
```shell
ng build eiduo-ui-lib --prod
```

## 6. 发布
```shell
npm login
npm whoami
cd .\dist\eiduo-ui-lib\
npm publish
```

### 注意：
以上步骤只适合 单独的 组件库 发布，不包含测试应用

## 参考：
* https://jasonwatmore.com/post/2020/06/16/angular-npm-how-to-publish-an-angular-component-to-npm
* https://medium.com/angular-in-depth/complete-beginner-guide-to-publish-an-angular-library-to-npm-d42343801660