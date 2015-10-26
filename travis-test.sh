#!/bin/bash

# Stop on error
set -e

# Install dependencies

echo travis_fold:start:Dependencies
sudo apt-get update
sudo apt-get -y install wget tar bzip2 flvtool2 build-essential linux-headers-`uname -r` git yasm

git clone git://source.ffmpeg.org/ffmpeg.git ffmpeg
cd ffmpeg
./configure
make
echo $?
make install

git clone git://git.videolan.org/x264.git x264
cd x264
./configure --enable-static --enable-shared
make
su -c 'make install'

cd ffmpeg
make clean

./configure --enable-gpl --enable-nonfree --enable-pthreads --enable-libx264 --enable-libfaac --enable-libmp3lame --extra-cflags=-I/usr/local/include --extra-ldflags=-L/usr/local/lib
su -c 'make install'

echo travis_fold:end:Dependencies

# Print versions

echo travis_fold:start:Versions
echo "node version: $(node --version)"
echo "npm version: $(npm --version)"
echo "ffmpeg version: $(ffmpeg -version)"
echo travis_fold:end:Versions