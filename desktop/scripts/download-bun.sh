#!/usr/bin/env bash
# Helper to download Bun runtime into desktop/bundled/<platform>/
# This script does not run automatically in CI. Use at your own discretion.

set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
BUNDLED_DIR="$ROOT_DIR/bundled"
mkdir -p "$BUNDLED_DIR"

OS=$(uname | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

echo "Detected OS=$OS ARCH=$ARCH"

case "$OS" in
  linux)
    mkdir -p "$BUNDLED_DIR/linux"
    echo "Please download the appropriate bun binary for Linux from https://github.com/oven-sh/bun/releases and place it into $BUNDLED_DIR/linux/ and name it 'bun'"
    ;;
  darwin)
    mkdir -p "$BUNDLED_DIR/macos"
    echo "Please download the appropriate bun binary for macOS from https://github.com/oven-sh/bun/releases and place it into $BUNDLED_DIR/macos/ and name it 'bun'"
    ;;
  msys*|cygwin*|mingw*|windows)
    mkdir -p "$BUNDLED_DIR/windows"
    echo "Please download the appropriate bun.exe for Windows from https://github.com/oven-sh/bun/releases and place it into $BUNDLED_DIR/windows/ and name it 'bun.exe'"
    ;;
  *)
    echo "Unsupported OS: $OS. Please manually place Bun runtime into $BUNDLED_DIR/<platform>/"
    ;;
esac

echo "After placing the runtime, rebuild the Tauri bundle so resources include it."
