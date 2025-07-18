#!/usr/bin/env bash

# Exit on first error
set -o errexit

echo "--- Installing Node.js dependencies ---"
# Ensure all dependencies, including puppeteer-core, are installed first
npm install --production # --production if you only need production dependencies, otherwise just npm install

# Define the Puppeteer cache directory within the project's build path
# This ensures it's cached between deploys
PUPPETEER_CACHE_DIR=/opt/render/project/src/.cache/puppeteer

echo "--- Ensuring Puppeteer cache directory exists ---"
mkdir -p $PUPPETEER_CACHE_DIR

# Set the PUPPETEER_CACHE_DIR environment variable for the install step
export PUPPETEER_CACHE_DIR=$PUPPETEER_CACHE_DIR

echo "--- Installing Puppeteer browser (Chromium) ---"
# Use the direct path to the puppeteer executable within node_modules
# This bypasses potential npx resolution issues and directly calls the script
# The exact path might vary slightly based on puppeteer-core version,
# but it's usually in .bin or within the lib directory.
# Let's try the common .bin path first.
/opt/render/project/src/node_modules/.bin/puppeteer browsers install chromium

# Alternative if the above fails:
# Try running it directly from the package
# node /opt/render/project/src/node_modules/puppeteer-core/lib/cjs/cli.js browsers install chromium

# If you have a build step (like React/Vue/Angular build), uncomment this:
# echo "--- Running application build (if any) ---"
# npm run build

echo "--- Build process finished ---"