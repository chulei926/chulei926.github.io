#!/bin/sh

if [ -z "$1" ]; then
	echo "please write commit message !"
    sleep 60
	exit 1
fi

npm run build

echo 'build success'
sleep 3

cd ./dist
echo 'note.leichu.top' > CNAME
cat CNAME
echo 'CNAME success'
sleep 3


git init && git add -A && git commit -m "$1"

echo 'commit success'
sleep 3

git push -f git@github.com:chulei926/chulei926.github.io.git master

echo 'deploy success!'

sleep 10

fi