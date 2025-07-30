#!/bin/bash

# Script to deploy the client to Netlify

echo "Installing Netlify CLI..."
npm install -g netlify-cli

echo "Building the client..."
npm run build

# Ensure redirects are properly set up
echo "Setting up redirects for client-side routing..."
echo "/* /index.html 200" > build/_redirects
cp netlify.toml build/

echo "Authenticating with Netlify (if not already logged in)..."
npx netlify login

echo "Initializing Netlify site (if needed)..."
npx netlify init

echo "Deploying to Netlify..."
npx netlify deploy --prod --dir=build

echo "Deployment complete!"