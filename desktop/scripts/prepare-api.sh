#!/bin/bash
set -e

# Ensure we're in the desktop directory
cd "$(dirname "$0")/.."

# Build the API if needed
cd ../api
bun run build

# Create the resources directory in desktop/src-tauri if it doesn't exist
mkdir -p src-tauri/resources

# Copy the API dist files
cp -r dist/* src-tauri/resources/

echo "API files prepared for Tauri build"