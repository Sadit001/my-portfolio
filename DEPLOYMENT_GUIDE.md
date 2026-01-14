# How to Deploy to Netlify

To share your portfolio with the world using Netlify:

## 1. Prepare your Code
1.  Make sure your code is pushed to **GitHub**.
2.  I have added a `netlify.toml` file to your project. This ensures that when people visit your site, the pages load correctly.

## 2. Deploy Viewer (Public Site)
1.  Go to [Netlify.com](https://www.netlify.com/) and sign up/log in.
2.  Click **"Add new site"** -> **"Import an existing project"**.
3.  Choose **GitHub** and select your `my-portfolio` repository.
4.  **Configuration**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `build`
5.  **Environment Variables** (Key Step!):
    *   Click **"Add environment variables"** (or go to Site Settings > Environment variables later).
    *   Add the following:
        *   `REACT_APP_MODE` = `viewer`
        *   `REACT_APP_FIREBASE_API_KEY` = (Your real key)
        *   ... (Add all other Firebase keys from your .env)
6.  Click **Deploy**.

## 3. Deploy Admin (Optional)
If you want the Admin panel online as well (e.g., at `admin-portfolio.netlify.app`):
1.  Deploy the **same repository** again as a **new site** on Netlify.
2.  This time, set `REACT_APP_MODE` = `admin` in the Environment Variables.
