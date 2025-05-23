# MERN Learning Platform

A modular learning platform built with MongoDB, Express.js, React, and Node.js for the EnglishBhashi internship assignment.

## Project Structure
- `backend/`: Node.js/Express backend with MongoDB.
- `frontend/`: React frontend with Tailwind CSS.
- `frontend/tailwind.config.js`: Configures Tailwind CSS with PostCSS 8.

## Setup Instructions
### Backend
1. Navigate to `backend`: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` with `MONGO_URI`, `JWT_SECRET`, `PORT`.
4. Start MongoDB locally.
5. Run: `npm run dev`

### Frontend
1. Navigate to `frontend`: `cd frontend`
2. Install dependencies: `npm install`
3. Run: `npm start`

**Security Note**: Resolved vulnerabilities in `nth-check`, `svgo`, `yargs-parser` using `resolutions` in `package.json`. Uses `react-scripts@5.0.1` for Node.js 20 compatibility and `postcss@8.4.47` for Tailwind CSS.

## Features
- JWT-based authentication.
- Role-based access (Admin, Instructor, Student).
- Course management.
- Responsive UI with Tailwind CSS.