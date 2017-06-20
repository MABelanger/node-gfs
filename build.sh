#/bin/bash

# clean node_modules
rm -rf ./node_modules &&
rm -rf ./unit-price-hunter-client/node_modules &&

# Clean dist directory
rm -rf ./unit-price-hunter-client/dist &&
rm -rf ./src/server/dist &&

# Update current repos
git pull &&

# update submodule repo
git submodule init &&
git submodule update &&

# Install node_modules
npm --prefix ./ install &&
npm --prefix ./unit-price-hunter-client/ install &&

# Build the client
npm --prefix ./unit-price-hunter-client/ run build &&

# Copy dist client file into the server
cp -a ./unit-price-hunter-client/dist ./src/server/ &&

# Run the express server at http://localhost:3000
npm --prefix ./ run server
