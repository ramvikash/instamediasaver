#!/usr/bin/env bash

# Exit on first error
set -o errexit

echo "--- Installing Node.js dependencies ---"
npm install

# Define the Puppeteer cache directory within the project's build path
# This ensures it's cached between deploys
PUPPETEER_CACHE_DIR=/opt/render/project/src/.cache/puppeteer

echo "--- Ensuring Puppeteer cache directory exists ---"
mkdir -p $PUPPETEER_CACHE_DIR

# Set the PUPPETEER_CACHE_DIR environment variable for the install step
export PUPPETEER_CACHE_DIR=$PUPPETEER_CACHE_DIR

echo "--- Installing Puppeteer browser (Chromium) ---"
# This command downloads the specific Chromium version Puppeteer expects
npx puppeteer-core browsers install chromium # Use 'chromium' here, or 'chrome' if you prefer

# If you have a build step (like React/Vue/Angular build), uncomment this:
# echo "--- Running application build (if any) ---"
# npm run build

echo "--- Build process finished ---"