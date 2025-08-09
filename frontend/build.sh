#!/bin/bash
export DISABLE_ESLINT_PLUGIN=true
export CI=false
export ESLINT_NO_DEV_ERRORS=true
export GENERATE_SOURCEMAP=false

echo "Starting build with ESLint disabled..."
npm run build
