# Fake News Detector - Client

This is the frontend for the AI-Enabled Fake News Detector application. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Netlify Deployment

This project includes configuration for easy deployment to Netlify:

1. The `netlify.toml` file configures the build settings
2. The `_redirects` file in the public directory ensures client-side routing works correctly
3. The `deploy-netlify.sh` script automates the deployment process

### Troubleshooting 404 Errors

If you encounter "Page not found" errors after deployment:

1. Make sure the `_redirects` file is being copied to the build directory
2. Verify that the `netlify.toml` configuration is correct
3. Try redeploying with the updated configuration

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Your backend is now scaffolded and ready for fake news detection! Here’s what’s set up:

### Backend (Node.js/Express/MongoDB)
- **MongoDB connection** (via Mongoose, using `MONGO_URI` from `.env`)
- **News model** for storing news checks
- **API routes**:
  - `POST /api/news/detect` — submit news content, get fake/real result (placeholder logic for now)
  - `GET /api/news` — fetch all news checks

---

**Next steps:**
- Add your real MongoDB connection string to `server/.env`
- Start the backend:  
  ```bash
  cd server
  npm run dev
  ```

---

Would you like to:
- Scaffold the React frontend to connect to this backend?
- Add user authentication (sign up/login)?
- Replace the placeholder detection logic with a real ML model or API?

Let me know your preference for the next step!
