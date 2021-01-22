@echo off
chcp 65001

SET CURRENT_DIR=%~dp0
SET PROJECT_DIR=%CURRENT_DIR%

@echo 当前路径： %PROJECT_DIR%

cd %PROJECT_DIR%


npm run build
cd ./dist
@echo 'note.leichu.top' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:chulei926/chulei926.github.io.git master
