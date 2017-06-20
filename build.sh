#/bin/bash

# clean node_modules
rm -rf ./node_modules &&
rm -rf ./unit-price-hunter-client/node_modules &&

# Clean dist directory
rm -rf ./unit-price-hunter-client/dist &&
rm -rf ./src/server/dist &&

# Update repos
git pull &&
git submodule init &&
git submodule update &&

# Install node_modules
npm --prefix ./ install &&
npm --prefix ./unit-price-hunter-client/ install &&

# Build the client
npm --prefix ./unit-price-hunter-client/ run build &&

# Copy dist file into the server
cp -a ./unit-price-hunter-client/dist ./src/server/ &&

# Run the server
npm --prefix ./ run server
