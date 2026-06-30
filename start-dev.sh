#!/bin/bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 20
cp -r node_modules/pdfjs-dist www && cp -r assets/fonts www && cp -r assets/style www/style
exec ./node_modules/.bin/vite www --port "${PORT:-5173}"
