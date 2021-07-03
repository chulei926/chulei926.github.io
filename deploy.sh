#!/bin/sh

if [ -z "$1" ]; then
  echo "please write commit message !"
  sleep 60
  exit 1
fi

npm run build && cp CNAME ./dist && git init && git add -A && git commit -m "$1" && git push -f git@github.com:chulei926/chulei926.github.io.git master

cd ../ && rm -rf dist

echo 'deploy success!'
