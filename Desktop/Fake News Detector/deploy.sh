#!/bin/bash

# Script to prepare and deploy the Fake News Detector project

echo "Preparing project for deployment..."

# Install dependencies
echo "Installing dependencies..."
npm run install-all

# Build the client
echo "Building client..."
cd client && npm run build

# Return to root directory
cd ..

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
  git add .
  git commit -m "Initial commit"
fi

# Add remote repository if not already added
if ! git remote | grep -q "origin"; then
  echo "Adding remote repository..."
  git remote add origin https://github.com/RanbirProjects/AI-Enabled-Fake-News-Detector.git
fi

# Push to GitHub
echo "Pushing to GitHub..."
git add .
git commit -m "Deployment preparation"
git branch -M main
git push -u origin main

echo "Project is ready for deployment!"
echo "To deploy the client to Netlify, run: cd client && npx netlify deploy"
echo "To deploy the server, follow the instructions in the README.md file."