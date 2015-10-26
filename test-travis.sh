#!/bin/bash

# Stop on error
set -e

# Install dependencies

echo travis_fold:start:Dependencies
if [ "$(uname)" = "Linux" ]; then
	# Linux
	sudo apt-get update
	sudo apt-get -y install wget tar bzip2 flvtool2

	wget http://johnvansickle.com/ffmpeg/builds/ffmpeg-git-64bit-static.tar.xz
	tar xf ffmpeg-git-64bit-static.tar.xz

	ls -la
	sudo cp ffmpeg-git-*-static/{ffmpeg,ffprobe,ffserver} /usr/bin
	sudo cp ffmpeg-git-*-static/{ffmpeg,ffprobe} $(pwd)

	export ALT_FFMPEG_PATH=$(pwd)/ffmpeg
	export ALT_FFPROBE_PATH=$(pwd)/ffprobe
else
	# OSX
	brew update
	brew install ffmpeg
	brew install flvmeta
	brew unlink node

	# Have brew-installed software available on the PATH
	export PATH=/usr/local/bin:$PATH

	# Copy ffmpeg and ffprobe to home directory to have alternative paths
	cp $(which ffmpeg) ~/ffmpeg
	export ALT_FFMPEG_PATH=$HOME/ffmpeg
	cp $(which ffprobe) ~/ffprobe
	export ALT_FFPROBE_PATH=$HOME/ffprobe
fi
echo travis_fold:end:Dependencies

# Install nvm if needed

echo travis_fold:start:nvm
if [ ! -d ~/.nvm ]; then
	wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.6.1/install.sh | sh
fi
source ~/.nvm/nvm.sh
nvm install $NODE_VERSION
echo travis_fold:end:nvm

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