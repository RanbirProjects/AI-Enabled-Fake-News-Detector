#!/bin/bash

# Script to deploy the client to Netlify

echo "Installing Netlify CLI..."
npm install -g netlify-cli

echo "Building the client..."
npm run build

echo "Authenticating with Netlify (if not already logged in)..."
npx netlify login

echo "Initializing Netlify site (if needed)..."
npx netlify init

echo "Deploying to Netlify..."
npx netlify deploy --prod

echo "Deployment complete!"