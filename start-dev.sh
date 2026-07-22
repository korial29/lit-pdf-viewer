#!/bin/bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 20
rm -rf www/src www/assets www/pdfjs-dist www/style www/fonts
cp -r node_modules/pdfjs-dist www && cp -r assets www && cp -r assets/fonts www && cp -r assets/style www/style && cp -r src www
exec ./node_modules/.bin/vite www --config vite.config.js --port "${PORT:-5173}"
