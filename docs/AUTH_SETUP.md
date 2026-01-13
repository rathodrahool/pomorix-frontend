# Authentication API Integration - Quick Reference

## ✅ What Was Configured

### Backend Connection
- **Base URL**: `http://localhost:3000`
- **Auth Endpoint**: `/auth/signin`
- **Config Files Updated**:
  - `.env.example`
  - `.env.local` (add manually if gitignored)
  - `src/constants/config.ts`
  - `src/api/endpoints.ts`

### Login Page
- Updated to use `useAuth` hook
- Email/Password form with real API integration
- Loading and error states
- Fallback to Google/Apple buttons (mock for now)

---

## 🧪 Testing the Login

### 1. Ensure Backend is Running
```bash
# Your backend should be running on http://localhost:3000
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Test Login
1. Navigate to `http://localhost:3000` (should redirect to login)
2. Click **"Sign in with Email"**
3. Enter credentials:
   - Email: `your@email.com`
   - Password: `yourpassword`
4. Click **"Sign In"**

### Expected Flow
1. Login form submits to `POST http://localhost:3000/auth/signin`
2. Backend returns JWT token + user data
3. Token automatically stored in `localStorage`
4. User redirected to dashboard
5. All future API calls include token in `Authorization` header

---

## 📋 API Request/Response Format

### Request (POST /auth/signin)
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Expected Response
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": "https://..."
    }
  }
}
```

---

## 🔍 Debugging

### Check Network Requests
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Submit login form
4. Look for request to `/auth/signin`
5. Check request payload and response

### Common Issues

**CORS Error**
- Backend needs to allow requests from `http://localhost:3000`

**401 Unauthorized**
- Check credentials are correct
- Verify backend endpoint is `/auth/signin` not `/auth/login`

**Network Error**
- Ensure backend is running
- Check base URL in `.env.local` is correct

### Check Console
```typescript
// In browser console, after login attempt:
localStorage.getItem('pomorix_auth_token')  // Should show JWT token
localStorage.getItem('pomorix_user_data')   // Should show user data
```

---

## 🎯 Next Steps

After successful login:
1. User is redirected to home page
2. Token is automatically sent with all API requests
3. You can fetch user data, tasks, etc.

To integrate more endpoints:
- Follow pattern in `docs/API_INTEGRATION.md`
- Add endpoints to `src/api/endpoints.ts`
- Create service methods
- Use in components via hooks
