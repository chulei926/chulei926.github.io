# 禁止页面内容复制

```js
ncontextmenu="return false" 
onselectstart="return false" 
ondragstart="return false" 
onbeforecopy="return false" 
oncopy=document.selection.empty() 
onselect=document.selection.empty()
```