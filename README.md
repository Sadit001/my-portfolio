# Portfolio Project

This is a personal portfolio website built with React. It features a separate **Admin Panel** for managing content and a **Public Viewer** mode for visitors.

## Features
- **Admin Panel**: Secure login, add/edit/delete projects, manage profile.
- **Public Viewer**: Clean, read-only view of your portfolio.
- **Real-time Sync**: Content is stored in **Firebase Firestore**, so updates in the Admin panel appear instantly on the Public site.
- **Animations**: Smooth page transitions and interactions using Framer Motion.

## 🚀 Getting Started

### 1. Prerequisites
You must have a **Firebase Project** set up to store your data.
1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Create a project.
3.  **Enable Firestore Database** (Start in Test Mode).
4.  **Enable Authentication** (Email/Password provider).
5.  Get your **Web Configuration** from Project Settings.

### 2. Installation
Install the dependencies:
```bash
npm install
```

### 3. Configuration (.env)
Create a `.env` file in the root directory (copy `.env.example`) and add your Firebase keys:

```env
# Mode: 'admin' or 'viewer'
REACT_APP_MODE=admin

# Firebase Config
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
...
```

### 4. Running the App

The app behaves differently based on the `REACT_APP_MODE` environment variable.

#### 🔧 Run as Admin
To access the dashboard and manage content:
1.  In `.env`, set: `REACT_APP_MODE=admin`
2.  Start the app:
    ```bash
    npm start
    ```
3.  Go to `http://localhost:3000/admin`.
4.  **Important**: You must create an account or use an existing one in your Firebase Authentication console, or use the temporary default logic if configured.

#### 👁️ Run as Viewer
To see what the public sees:
1.  In `.env`, set: `REACT_APP_MODE=viewer`
2.  **Restart** the server (Control+C, then `npm start`).
3.  Go to `http://localhost:3000/`.
4.  Admin routes will be inaccessible.

## Deployment
You can deploy this codebase to two different subdomains (e.g., `admin.yoursite.com` and `yoursite.com`) by configuring the environment variable differently for each deployment pipeline.
