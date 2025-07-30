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

echo "Authenticating with Netlify..."
npx netlify login

echo "Creating a new Netlify site..."
npx netlify sites:create --name fake-news-detector-app

echo "Deploying to Netlify..."
npx netlify deploy --prod --dir=build

echo "Deployment complete!"
echo "Your site should now be available at the URL shown above."
echo "If you encounter any issues, please check the Netlify dashboard for more information."