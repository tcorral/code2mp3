#!/bin/bash

# Stop on error
set -e

# Install dependencies

echo travis_fold:start:Dependencies
brew update
brew install ffmpeg --with-theora --with-libogg --with-libvorbis
echo travis_fold:end:Dependencies

# Print versions

echo travis_fold:start:Versions
echo "node version: $(node --version)"
echo "npm version: $(npm --version)"
echo "ffmpeg version: $(ffmpeg -version)"
echo travis_fold:end:Versions