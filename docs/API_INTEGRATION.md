# API Integration Guide

Complete guide for integrating backend APIs with this frontend application.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Making API Calls](#making-api-calls)
- [Adding New Endpoints](#adding-new-endpoints)
- [Error Handling](#error-handling)
- [Authentication Flow](#authentication-flow)

---

## 🚀 Quick Start

### 1. Configure Backend URL

Edit `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### 2. Start Using Services

```typescript
import { taskService } from '@/services';

// Fetch tasks
const tasks = await taskService.getTasks();

// Create task
const newTask = await taskService.createTask({
  title: 'Study React',
  pomodoros: 4
});
```

### 3. Use Hooks in Components

```typescript
import { useTasks } from '@/hooks';

function MyComponent() {
  const { tasks, loading, error } = useTasks();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return <div>{/* render tasks */}</div>;
}
```

---

## 🏗️ Architecture Overview

### Layer 1: API Client (`src/api/`)

**Purpose**: HTTP communication infrastructure

- `client.ts` - Axios instance with interceptors
- `endpoints.ts` - API endpoint constants
- Handles token injection, error responses, and redirects

### Layer 2: Services (`src/services/`)

**Purpose**: Business logic and API calls

- `auth.service.ts` - Authentication
- `user.service.ts` - User operations
- `task.service.ts` - Task CRUD
- `timer.service.ts` - Timer sessions

Services are **framework-agnostic** - can be used anywhere.

### Layer 3: Hooks (`src/hooks/`)

**Purpose**: React integration with state management

- `useApi` - Generic API hook
- `useAuth` - Authentication state
- `useTasks` - Task management

Hooks provide loading/error states and automatic re-renders.

---

## 📡 Making API Calls

### Method 1: Direct Service Use

Best for one-off calls or non-component code:

```typescript
import { authService } from '@/services';

async function loginUser(email: string, password: string) {
  try {
    const response = await authService.login({ email, password });
    console.log('Logged in:', response.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
}
```

### Method 2: Using Hooks (Recommended for Components)

Best for components that need loading/error states:

```typescript
import { useAuth } from '@/hooks';

function LoginForm() {
  const { login, loading, error } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      // Handle success
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {loading && <p>Logging in...</p>}
      {error && <p className="error">{error}</p>}
      {/* form fields */}
    </form>
  );
}
```

### Method 3: Generic useApi Hook

For custom API calls:

```typescript
import { useApi } from '@/hooks';
import { userService } from '@/services';

function ProfileComponent() {
  const { data, loading, error, execute } = useApi(
    userService.getProfile
  );
  
  useEffect(() => {
    execute();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{data?.name}</div>;
}
```

---

## ➕ Adding New Endpoints

### Step 1: Add Endpoint Constant

**File**: `src/api/endpoints.ts`

```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints
  
  COMMENTS: {
    LIST: '/comments',
    CREATE: '/comments',
    UPDATE: (id: string) => `/comments/${id}`,
    DELETE: (id: string) => `/comments/${id}`,
  },
};
```

### Step 2: Define Types

**File**: `src/types/api.types.ts`

```typescript
// Request type
export interface CreateCommentRequest {
  text: string;
  taskId: string;
}

// Response type
export interface CommentResponse {
  id: string;
  text: string;
  taskId: string;
  userId: string;
  createdAt: string;
}
```

### Step 3: Create Service Method

**File**: `src/services/comment.service.ts` (new file)

```typescript
import { apiClient, API_ENDPOINTS } from '../api';
import type {
  CreateCommentRequest,
  CommentResponse,
  ApiResponse,
} from '../types';

export const commentService = {
  async getComments(): Promise<CommentResponse[]> {
    const response = await apiClient.get<ApiResponse<CommentResponse[]>>(
      API_ENDPOINTS.COMMENTS.LIST
    );
    return response.data.data;
  },

  async createComment(data: CreateCommentRequest): Promise<CommentResponse> {
    const response = await apiClient.post<ApiResponse<CommentResponse>>(
      API_ENDPOINTS.COMMENTS.CREATE,
      data
    );
    return response.data.data;
  },
};
```

### Step 4: Export Service

**File**: `src/services/index.ts`

```typescript
export { commentService } from './comment.service';
```

### Step 5: (Optional) Create Custom Hook

**File**: `src/hooks/useComments.ts`

```typescript
import { useState, useCallback } from 'react';
import { commentService } from '@/services';
import type { CommentResponse } from '@/types';

export function useComments() {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await commentService.getComments();
      setComments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { comments, loading, error, fetchComments };
}
```

---

## 🔐 Authentication Flow

### How It Works

1. **User logs in** → `authService.login()` called
2. **Backend returns JWT token** → Stored in `localStorage`
3. **All subsequent requests** → Token automatically attached by interceptor
4. **Token expires** → 401 response → User redirected to login

### Login Example

```typescript
import { authService } from '@/services';

const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Token is automatically stored
// All future API calls will include this token
```

### Protected Routes Example

```typescript
import { useAuth } from '@/hooks';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
```

### Logout Example

```typescript
import { authService } from '@/services';

await authService.logout();
// Token is cleared from localStorage
// User is ready to be redirected to login
```

---

## ⚠️ Error Handling

### Automatic Error Handling (Interceptor)

The axios interceptor automatically handles:

- **401 Unauthorized**: Clears token, redirects to login
- **403 Forbidden**: Logs error
- **500 Server Error**: Logs error

**File**: `src/api/client.ts` (lines 38-60)

### Manual Error Handling

In services:

```typescript
try {
  const data = await taskService.getTasks();
  return data;
} catch (error) {
  if (error.response?.status === 404) {
    console.log('No tasks found');
  }
  throw error; // Re-throw for caller to handle
}
```

In hooks:

```typescript
const { data, error } = useTasks();

// Hook automatically captures errors
if (error) {
  return <div>Error: {error}</div>;
}
```

### Custom Error Messages

From backend:

```typescript
// Backend response
{
  success: false,
  message: "Invalid credentials",
  errors: {
    email: ["Email is required"],
    password: ["Password must be at least 8 characters"]
  }
}
```

Frontend handling:

```typescript
catch (err: any) {
  const message = err.response?.data?.message || 'An error occurred';
  const fieldErrors = err.response?.data?.errors;
  
  setError(message);
  setFieldErrors(fieldErrors);
}
```

---

## 📝 API Response Format

All API responses should follow this structure:

### Success Response

```typescript
{
  success: true,
  data: {
    // Your data here
  },
  message?: "Operation successful"
}
```

### Error Response

```typescript
{
  success: false,
  message: "Error message",
  errors?: {
    field1: ["Error 1", "Error 2"],
    field2: ["Error 3"]
  },
  statusCode?: 400
}
```

---

## 🔧 Configuration

### Environment Variables

**File**: `.env.local`

```env
# Required
VITE_API_BASE_URL=http://localhost:4000/api

# Optional
VITE_GEMINI_API_KEY=your_key_here
```

### API Client Configuration

**File**: `src/constants/config.ts`

```typescript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 30000, // 30 seconds
};
```

### Adjusting Timeout

Edit `src/api/client.ts`:

```typescript
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 60000, // 60 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## 🎯 Best Practices

### ✅ DO

- Use services for all API calls
- Use hooks in React components
- Define types for all requests/responses
- Handle loading and error states
- Keep endpoint paths in `endpoints.ts`
- Use path aliases (`@/services`)

### ❌ DON'T

- Make direct axios calls in components
- Hardcode API URLs in components
- Ignore error states
- Store tokens manually (interceptor handles this)
- Mix API logic with UI logic

---

## 📚 Reference

### Available Services

- `authService` - [auth.service.ts](file:///c:/pomorix-frontend/src/services/auth.service.ts)
- `userService` - [user.service.ts](file:///c:/pomorix-frontend/src/services/user.service.ts)
- `taskService` - [task.service.ts](file:///c:/pomorix-frontend/src/services/task.service.ts)
- `timerService` - [timer.service.ts](file:///c:/pomorix-frontend/src/services/timer.service.ts)

### Available Hooks

- `useApi` - [useApi.ts](file:///c:/pomorix-frontend/src/hooks/useApi.ts)
- `useAuth` - [useAuth.ts](file:///c:/pomorix-frontend/src/hooks/useAuth.ts)
- `useTasks` - [useTasks.ts](file:///c:/pomorix-frontend/src/hooks/useTasks.ts)

### Key Files

- API Client: [src/api/client.ts](file:///c:/pomorix-frontend/src/api/client.ts)
- Endpoints: [src/api/endpoints.ts](file:///c:/pomorix-frontend/src/api/endpoints.ts)
- Types: [src/types/api.types.ts](file:///c:/pomorix-frontend/src/types/api.types.ts)
- Config: [src/constants/config.ts](file:///c:/pomorix-frontend/src/constants/config.ts)

---

## 💬 Need Help?

Check the main [README.md](file:///c:/pomorix-frontend/README.md) for more information about the project structure and architecture.
