# Google OAuth Implementation

## ✅ What Was Implemented

### Changes Made

1. **Added GoogleOAuthProvider Wrapper** (`src/index.tsx`)
   - Wrapped the entire app with `GoogleOAuthProvider`
   - Uses `VITE_GOOGLE_CLIENT_ID` from environment variables
   - This enables Google OAuth functionality throughout the app

2. **Implemented Real Google Login** (`src/pages/Login.tsx`)
   - **Removed**: Static user data (`rahul@pomorix.com`)
   - **Added**: Real Google OAuth using `useGoogleLogin` hook
   - Flow:
     1. User clicks "Continue with Google"
     2. Google OAuth popup appears
     3. User authenticates with Google
     4. App receives access token
     5. App fetches user info from Google API
     6. App sends user data to your backend `/auth/signin`
     7. Backend returns JWT token
     8. User is logged in

3. **Apple Login**
   - Currently disabled (shows console log)
   - Can be implemented later when Apple OAuth is configured

---

## 🔧 Configuration Required

### Environment Variable

Make sure `.env.local` has your Google Client ID:

```env
VITE_GOOGLE_CLIENT_ID=your-actual-google-client-id-here
```

### How to Get Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized JavaScript origins:
   - `http://localhost:5173` (or your dev port)
   - Your production domain
7. Authorized redirect URIs:
   - `http://localhost:5173` (or your dev port)
   - Your production domain
8. Copy the **Client ID**

---

## 🧪 Testing

### Test the Google Login Flow

1. **Start the app**:
   ```bash
   npm run dev
   ```

2. **Navigate to login page**:
   - Go to `http://localhost:5173` (or your dev port)
   - Should redirect to `/login`

3. **Click "Continue with Google"**:
   - Google OAuth popup should appear
   - Select your Google account
   - Grant permissions

4. **Verify the flow**:
   - Check browser console for any errors
   - Check Network tab in DevTools:
     - Request to `https://www.googleapis.com/oauth2/v3/userinfo`
     - Request to your backend `/auth/signin`
   - Should redirect to home page after successful login

---

## 📋 API Flow

### 1. Google OAuth Popup
User clicks → Google popup → User authenticates

### 2. Get User Info
```http
GET https://www.googleapis.com/oauth2/v3/userinfo
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "sub": "1234567890",
  "email": "user@gmail.com",
  "email_verified": true,
  "name": "John Doe",
  "picture": "https://..."
}
```

### 3. Send to Your Backend
```http
POST http://localhost:3000/auth/signin
Content-Type: application/json

{
  "email": "user@gmail.com",
  "auth_provider": "GOOGLE",
  "auth_provider_id": "1234567890"
}
```

**Backend Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-123",
      "email": "user@gmail.com",
      "name": "John Doe"
    }
  }
}
```

---

## 🔍 Troubleshooting

### "Google Login Failed" in Console

**Possible causes:**
- Invalid Client ID
- Client ID not in `.env.local`
- Authorized origins not configured in Google Cloud Console

**Fix:**
1. Check `.env.local` has correct `VITE_GOOGLE_CLIENT_ID`
2. Restart dev server after changing `.env.local`
3. Verify authorized origins in Google Cloud Console

### CORS Error

**Issue:** Backend doesn't allow requests from frontend

**Fix:** Make sure your backend allows CORS from `http://localhost:5173`

### "Failed to fetch user info"

**Issue:** Can't get user data from Google

**Fix:**
- Check network connection
- Verify Google+ API is enabled in Google Cloud Console

### Backend Returns Error

**Issue:** Your backend rejects the login request

**Fix:**
- Check backend logs
- Verify `/auth/signin` endpoint expects correct format:
  ```json
  {
    "email": "string",
    "auth_provider": "GOOGLE",
    "auth_provider_id": "string"
  }
  ```

---

## 🎯 Next Steps

- ✅ Google OAuth is now fully implemented
- ⏳ Apple OAuth can be added later (requires Apple Developer account)
- ⏳ Add profile picture from Google to user data
- ⏳ Add "Remember me" functionality
- ⏳ Add email/password login as fallback

---

## 📝 Code Changes Summary

### `src/index.tsx`
- Added `GoogleOAuthProvider` wrapper
- Imports `API_CONFIG` for client ID

### `src/pages/Login.tsx`
- Removed static user data
- Added `useGoogleLogin` hook
- Implemented real OAuth flow
- Fetches user info from Google API
- Sends to backend for authentication
