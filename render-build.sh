#!/usr/bin/env bash

# Exit on first error
set -o errexit

echo "--- Installing Node.js dependencies ---"
npm install --production # Keep this as it ensures puppeteer-core is installed

# Define the Puppeteer cache directory within the project's build path
PUPPETEER_CACHE_DIR=/opt/render/project/src/.cache/puppeteer

echo "--- Ensuring Puppeteer cache directory exists ---"
mkdir -p $PUPPETEER_CACHE_DIR

# Set the PUPPETEER_CACHE_DIR environment variable for the install step
export PUPPETEER_CACHE_DIR=$PUPPETEER_CACHE_DIR

echo "--- Installing Puppeteer browser (Chromium) ---"
# The failing line (comment out):
# /opt/render/project/src/node_modules/.bin/puppeteer browsers install chromium

# The new, robust way: Directly run the CLI script using node
node /opt/render/project/src/node_modules/puppeteer-core/lib/cjs/cli.js browsers install chromium

echo "--- Build process finished ---"