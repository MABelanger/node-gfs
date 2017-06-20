#/bin/bash
npm i &&
git submodule init &&
git submodule update &&
cd unit-price-hunter-client &&
npm i &&
npm run build &&
cp -a dist ../src/server/ &&
cd ../ &&
npm run server
