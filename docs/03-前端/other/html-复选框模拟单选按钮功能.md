# 复选框模拟单选按钮功能

```html
<script type="text/javascript">
    $(function() {
        $('input[name=checkbox]').click(function() {
            $(this).attr('checked', 'checked').siblings().removeAttr('checked');
        });
    })
</script>

<body>
    <input type="checkbox" name="checkbox" id="checkbox1"/>
    <input type="checkbox" name="checkbox" id="checkbox2" checked="checked"/>
    <input type="checkbox" name="checkbox" id="checkbox3" />
</body>
```