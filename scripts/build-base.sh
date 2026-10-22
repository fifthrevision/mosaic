#!/bin/sh
set -e
cd "$(dirname "$0")/.."
tailwindcss -i src/base.css -o dist/base.css
