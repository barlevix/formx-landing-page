#!/bin/sh
# Copy the site's media and content into the Vite public/ folder.
# They are not committed here to avoid carrying ~36 MB twice in one repo.
set -e
cd "$(dirname "$0")"
rm -rf public/assets
cp -R ../docs/assets public/assets
cp ../docs/content.json public/content.json
echo "synced $(du -sh public/assets | cut -f1) of assets + content.json into public/"
