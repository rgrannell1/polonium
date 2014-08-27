#!/usr/bin/env sh

git clone https://github.com/rgrannell1/polonium
cd polonium
echo alias polo=$(pwd -P)/lib/polonium.js >> ~/.bashrc && . ~/.bashrc
