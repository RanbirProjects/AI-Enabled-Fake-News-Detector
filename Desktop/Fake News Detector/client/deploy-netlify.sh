#!/bin/bash

# Script to deploy the client to Netlify

echo "Installing Netlify CLI..."
npm install -g netlify-cli

echo "Building the client..."
npm run build

echo "Deploying to Netlify..."
npx netlify deploy --prod

echo "Deployment complete!"