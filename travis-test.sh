#!/bin/bash

# Stop on error
set -e

# Install dependencies

echo travis_fold:start:Dependencies
sudo apt-get update
sudo apt-get -y install wget tar bzip2 flvtool2

tar xf ./third-party/ffmpeg-release-64bit-static.tar.xz

sudo cp ffmpeg-2.8.1-*-static/{ffmpeg,ffprobe,ffserver} /usr/bin
sudo cp ffmpeg-2.8.1-*-static/{ffmpeg,ffprobe} $(pwd)

export ALT_FFMPEG_PATH=$(pwd)/ffmpeg
export ALT_FFPROBE_PATH=$(pwd)/ffprobe
echo travis_fold:end:Dependencies

# Print versions

echo travis_fold:start:Versions
echo "node version: $(node --version)"
echo "npm version: $(npm --version)"
echo "ffmpeg version: $(ffmpeg -version)"
echo travis_fold:end:Versions

# Install dependencies
echo travis_fold:start:npm-install
npm install
echo travis_fold:end:npm-install

# Run tests
npm test