# Deployment Guide

## Backend Deployment on Render

### Step 1: Prepare Repository

1. Push your project to GitHub
2. Ensure `.env` is in `.gitignore`

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up and connect your GitHub account

### Step 3: Deploy Backend

1. Click "New +" → "Web Service"
2. Select your repository
3. Configure as follows:
   - **Name:** code-reviewer-backend (or your choice)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Region:** Choose closest to you

### Step 4: Add Environment Variables

In Render dashboard, go to "Environment" and add:

- **GOOGLE_GEMINI_KEY:** Your Google Gemini API key
- **NODE_ENV:** `production`

### Step 5: Deploy

Click "Create Web Service". Render will build and deploy automatically.

**Note:** Copy your Render backend URL (e.g., `https://code-reviewer-backend.onrender.com`)

---

## Frontend Deployment on Vercel

### Step 1: Prepare Repository

1. Ensure frontend is ready with build script: `npm run build`
2. Push to GitHub

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### Step 3: Import Project

1. Click "Add New" → "Project"
2. Select your repository
3. Select "frontend" folder as root directory

### Step 4: Configure Environment Variables

In Project Settings → Environment Variables, add:

- **VITE_API_URL:** Your Render backend URL (e.g., `https://code-reviewer-backend.onrender.com`)

### Step 5: Deploy

Click "Deploy". Vercel will build and deploy automatically.

---

## CORS Configuration (If Needed)

If you get CORS errors, update `backend/src/app.js`:

```javascript
const cors = require("cors");

const corsOptions = {
  origin: ["https://your-vercel-frontend.vercel.app", "http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
```

Replace with your actual Vercel URL.

---

## Verify Deployment

1. **Backend:** Visit your Render URL in browser (should show "Cannot GET /")
2. **Frontend:** Visit your Vercel URL
3. **Test:** Try submitting code for review

---

## Troubleshooting

| Issue                | Solution                               |
| -------------------- | -------------------------------------- |
| "Connection refused" | Check backend URL in frontend env vars |
| CORS errors          | Update CORS config in backend          |
| 404 errors           | Ensure routes are correct              |
| Quota exceeded       | Check your Google Gemini API limits    |

---

## Environment Variables Summary

**Backend (.env in Render):**

- `GOOGLE_GEMINI_KEY` - Your API key
- `NODE_ENV` - `production`
- `PORT` - Auto-assigned by Render

**Frontend (.env.production):**

- `VITE_API_URL` - Your Render backend URL
