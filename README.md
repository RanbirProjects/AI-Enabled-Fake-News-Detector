# AI-Enabled Fake News Detector

A modern web application that uses rule-based algorithms to detect fake news from text, URLs, and titles. The application provides a confidence score and detailed analysis of the content.

## Features

- Multiple input types: Text, URL, and Title analysis
- Confidence score visualization
- Detailed explanation of detection results
- History tracking of previous checks
- Responsive design for all devices
- Fallback to in-memory storage when MongoDB is unavailable

## Project Structure

```
├── client/            # React frontend
│   ├── public/        # Static files
│   ├── src/           # React source code
│   └── netlify.toml   # Netlify deployment configuration
└── server/            # Express backend
    ├── models/        # MongoDB schemas
    ├── routes/        # API routes
    └── index.js       # Server entry point
```

## Technologies Used

### Frontend
- React
- Axios for API requests
- CSS with custom animations
- SVG icons and patterns

### Backend
- Node.js with Express
- MongoDB with Mongoose
- In-memory fallback storage

## Deployment Instructions

### Automated Deployment

Use the provided deployment scripts to automate the process:

```bash
# Deploy both client and server
./deploy-all.sh

# Or deploy individually
cd client && ./deploy-netlify.sh
cd server && ./deploy-render.sh
```

### Manual Frontend Deployment (Netlify)

1. Push your code to GitHub
2. Log in to Netlify and click "New site from Git"
3. Select your GitHub repository
4. Configure build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `build`
5. Click "Deploy site"

#### Troubleshooting Netlify 404 Errors

If you encounter "Page not found" errors on Netlify:

1. Ensure the `_redirects` file exists in the `client/public` directory
2. Verify your `netlify.toml` configuration is correct
3. Try deploying again with the updated configuration

### Backend (Optional - for full functionality)

The backend can be deployed to platforms like Heroku, Render, or Railway:

1. Create a MongoDB Atlas account and database
2. Set the environment variable `MONGO_URI` with your MongoDB connection string
3. Update the CORS settings in `server/index.js` to allow requests from your Netlify domain
4. Deploy the server directory to your chosen platform
5. Update the API URL in the frontend to point to your deployed backend

## Local Development

### Frontend
```bash
cd client
npm install
npm start
```

### Backend
```bash
cd server
npm install
npm run dev
```

## License

MIT
