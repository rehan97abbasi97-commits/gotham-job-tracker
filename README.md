# GOTHAM — Job Application Tracker

A full-stack job application tracking platform built with React, Express.js, and MongoDB. GOTHAM helps users organize job applications, track application statuses, and monitor their job search progress through an interactive dashboard.

## Features

- **User Authentication:** Register and log in securely using password hashing and JWT authentication.
- **Dashboard:** View application statistics and job search progress.
- **Application Management:** Create, view, update, and delete job applications.
- **Search and Filtering:** Find applications and filter them by relevant criteria.
- **Analytics Dashboard:** Visualize application data using interactive charts.
- **Protected Routes:** Restrict authenticated pages to logged-in users.
- **Responsive UI:** A premium dark interface with gold accents.
- **Settings and About Pages:** Access application settings and project information.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Recharts
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
jobtrack/
├── client/             # React frontend
├── server/             # Express backend
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Community Server running locally
- Git (optional, for cloning the repository)

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/rehan97abbasi97-commits/gotham-job-tracker.git
cd gotham-job-tracker
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/YOUR_DATABASE_NAME
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
```

Replace `YOUR_DATABASE_NAME` with your preferred local database name and set `JWT_SECRET` to a strong, private value.

Make sure your local MongoDB server is running before starting the backend.

### 3. Start the backend

From the `server` directory, run:

```bash
npm run dev
```

If the project does not define a `dev` script, check `server/package.json` and use the script configured there.

### 4. Configure and start the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

`http://localhost:5173`

## API Overview

The backend provides the following API groups:

| Method | Endpoint             | Purpose                                        |
| ------ | -------------------- | ---------------------------------------------- |
| GET    | `/api/health`        | Check backend health                           |
| POST   | `/api/auth/register` | Register a user                                |
| POST   | `/api/auth/login`    | Log in                                         |
| GET    | `/api/jobs`          | Retrieve the authenticated user's applications |
| POST   | `/api/jobs`          | Create a job application                       |
| GET    | `/api/jobs/:id`      | Retrieve a specific application                |
| PUT    | `/api/jobs/:id`      | Update an application                          |
| DELETE | `/api/jobs/:id`      | Delete an application                          |

Protected job endpoints require a valid authentication token. Check the backend route files for the exact request body and response formats.

## Security Notes

- Passwords should be stored as hashes, never as plain text.
- Keep `.env` out of version control.
- Never publish your JWT secret or database credentials.
- Validate incoming data on the backend.
- Use HTTPS and production-specific configuration when deploying.

## Future Improvements

- Deployment with production environment variables.
- Additional dashboard insights and reporting.
- More advanced application filtering and sorting.

## Author

**Mohd Rehan Abbasi**

GitHub: [rehan97abbasi97-commits](https://github.com/rehan97abbasi97-commits)

---

*GOTHAM — Organize your applications. Track your progress. Own your job search.*
