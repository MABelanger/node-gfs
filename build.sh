#/bin/bash
rm -rf ./node_modules
npm i &&
git submodule init &&
git submodule update &&
cd unit-price-hunter-client &&
rm -rf ./node_modules
npm i &&
npm run build &&
cp -a dist ../src/server/ &&
cd ../ &&
npm run server
