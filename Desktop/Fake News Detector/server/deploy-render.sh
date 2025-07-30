#!/bin/bash

# Script to prepare the server for deployment to Render

echo "Preparing server for deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create a production .env file if it doesn't exist
if [ ! -f ".env.production" ]; then
  echo "Creating production .env file..."
  echo "# Production environment variables" > .env.production
  echo "NODE_ENV=production" >> .env.production
  echo "PORT=10000" >> .env.production
  echo "# Add your MongoDB Atlas connection string here" >> .env.production
  echo "# MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/fakenews?retryWrites=true&w=majority" >> .env.production
fi

echo "Server is ready for deployment!"
echo "To deploy to Render:"
echo "1. Create a new Web Service on Render"
echo "2. Connect your GitHub repository"
echo "3. Set the Root Directory to 'server'"
echo "4. Set the Build Command to 'npm install'"
echo "5. Set the Start Command to 'node index.js'"
echo "6. Add environment variables from .env.production"
echo "7. Click 'Create Web Service'"