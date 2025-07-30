#!/bin/bash

# Exit on error
set -e

echo "Installing Netlify CLI..."
npm install -g netlify-cli

echo "Building the client..."
CI= npm run build

# Create a simple test file to verify deployment
echo "Creating test file..."
echo '<!DOCTYPE html><html><head><title>Netlify Direct Test</title></head><body><h1>Netlify Direct Test Page</h1><p>If you can see this, the direct deployment is working!</p></body></html>' > build/direct-test.html

# Ensure redirects are properly set up
echo "Setting up redirects for client-side routing..."
echo "/* /index.html 200" > build/_redirects

echo "Deploying to Netlify..."
npx netlify deploy --prod --dir=build

echo "Deployment complete!"
echo "Your site should now be available at the URL shown above."
echo "Try accessing /direct-test.html to verify static file serving."
echo "Try accessing /about or other routes to verify client-side routing."