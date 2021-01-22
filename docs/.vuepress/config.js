// 注意: base的值为github仓库的名称
module.exports = {
    base: '/',
    /* 基础虚拟路径: */
    dest: 'dist',
    /* 打包文件基础路径, 在命令所在目录下 */
    title: '储雷的笔记本', // 标题
    description: '好记性不如烂笔头', // 标题下的描述
    themeConfig: { // 主题配置
        sidebar: [ // 左侧导航
            {
                title: '初识 TypeScript', // 标题
                collapsable: true, // 下级列表不可折叠
                children: [ // 下级列表
                    'chapter1/01_初识TS',
                    'chapter1/02_安装TS'
                ]
            },
            {
                title: 'TypeScript 常用语法',
                collapsable: true,
                children: [
                    'chapter2/01_初识TS',
                    'chapter2/02_安装TS'
                ]
            },
            {
                title: 'TypeScript 常用语法1',
                collapsable: true,
                children: [
                    'chapter3/01_初识TS',
                    'chapter3/02_安装TS'
                ]
            },
            {
                title: '2222',
                collapsable: true,
                children: [
                    'chapter3/01_初识TS',
                    'chapter3/02_安装TS'
                ]
            },
        ]
    }
}