# ckeditor4.1 插件

## ckeditor4.1_math/plugins/blank/plugin.js

```js
/**
 * 针对试题编辑，在填空题中插入一个空格，或者删除用户通过鼠标选择的内容。
 *
 * @auther leichu 2018-07-09
 */
CKEDITOR.plugins.add('blank', {
    init: function (editor) {

        var flag4b = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

        var customCommand4Insert = 'iblank';
        editor.addCommand(customCommand4Insert, {
            // 插入填空题中的一个空，只显示下划线。
            exec: function (editor) {
                editor.insertHtml('<u class="_blank_" style="cursor: pointer">' + flag4b + '</u>');
            }
        });

        var customCommand4Delete = 'dblank';
        editor.addCommand(customCommand4Delete, {
            exec: function () {
                window.document.execCommand("delete");
            }
        });

        editor.ui.addButton('iBlankBtn', { //按钮名称：iBlankBtn，编辑器菜单上用到
            label: '插入空格', //插件名称
            command: customCommand4Insert, //插件命令
            icon: this.path + 'images/i.png' //编辑器菜单的图标
        });
        editor.ui.addButton('dBlankBtn', { //按钮名称：dBlankBtn，编辑器菜单上用到
            label: '删除所选', //插件名称
            command: customCommand4Delete, //插件命令
            icon: this.path + 'images/r.png' //编辑器菜单的图标
        });

        if (editor.contextMenu) {
            var menuGroupName = 'blankGroup';
            editor.addMenuGroup(menuGroupName, 10);
            editor.addMenuItem('iBlankItem', {
                label: '插入空格',
                command: customCommand4Insert,   //通过命令的方式绑定
                group: menuGroupName
            });
            editor.addMenuItem('dBlankItem', {
                label: '删除所选',
                command: customCommand4Delete,   //通过命令的方式绑定
                group: menuGroupName
            });
        }
        //为上下文菜单添加监听器, 如果不添加这句, 我们创建的上下文菜单将无法显示在右键菜单里面.
        editor.contextMenu.addListener(function (element) {
            return {
                'iBlankItem': CKEDITOR.TRISTATE_OFF,
                'dBlankItem': CKEDITOR.TRISTATE_OFF
            };
        });
    }
});

```