#!/bin/bash

# Script to deploy both client and server

echo "=== Deploying Fake News Detector Application ==="

# Deploy client to Netlify
echo "\n=== Deploying Client to Netlify ==="
cd client
./deploy-netlify.sh
cd ..

# Deploy server to Render
echo "\n=== Preparing Server for Render Deployment ==="
cd server
./deploy-render.sh
cd ..

echo "\n=== Deployment Preparation Complete ==="
echo "Client: Deployed to Netlify"
echo "Server: Ready for deployment to Render"
echo "\nTo complete server deployment, follow the instructions provided by the server deployment script."