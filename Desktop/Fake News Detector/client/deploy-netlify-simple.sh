#!/bin/bash

# Exit on error
set -e

echo "Installing Netlify CLI..."
npm install -g netlify-cli

echo "Building the client..."
CI= npm run build

# Ensure redirects are properly set up
echo "Setting up redirects for client-side routing..."
echo "/* /index.html 200" > build/_redirects

echo "Deploying to Netlify..."
npx netlify deploy --prod --dir=build --site=your-netlify-site-id

echo "Deployment complete!"

# Note: Replace 'your-netlify-site-id' with your actual Netlify site ID
# You can find your site ID in the Netlify dashboard or by running 'netlify sites:list'
# Alternatively, remove the --site flag to be prompted to select a site during deployment