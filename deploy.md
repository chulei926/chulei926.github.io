# 构建

    npm run build

# 进入发布目录

    cd ./dist

# 写入域名

    echo 'note.leichu.top' > CNAME

# 提交 & 推送

    git init
    git add -A
    git commit -m 'deploy'

    git push -f git@github.com:chulei926/chulei926.github.io.git master