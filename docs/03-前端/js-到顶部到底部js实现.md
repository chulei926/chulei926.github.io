```js
// 到顶部
$('.back2Top').off('click');
$('.back2Top').click(function(){
    $('body,html').animate({scrollTop:0},1000);  
    return false; 
})

// 到底部
$('.toBottom').off('click');
$('.toBottom').click(function() {
    $('body,html').animate({scrollTop: $(document).height()}, 1000); 
    return false;
})
```