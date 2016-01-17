#!/bin/bash

echo "================================= building... =================================="

# build the site
npm run build

PORTFOLIO=$PWD
cd ../

echo "=============================== checking git... ================================"

# make sure the GitHub Pages repo is there
# if not, clone it
[ -d "brendan-w.github.io/" ] || git clone https://github.com/brendan-w/brendan-w.github.io.git

cd brendan-w.github.io/

# blow away anything uncommitted, and pull any new changes
git reset --hard
git clean -fd
git checkout master
git pull origin master


echo "============================== copying files... ================================"

# update the files
cp -rv $PORTFOLIO/site/* ./


echo "=========================== regenerating symlinks... ==========================="

# get a list of the page names (symlinks) to generate
PAGES=$(ls $PORTFOLIO/html)

# remove the old symlinks
find ./ -type l -delete

# generate new symlinks
for PAGE in $PAGES
do
    ln -s index.html $PAGE
    echo $PAGE
done


cd $PORTFOLIO

echo "===================================== done ====================================="
