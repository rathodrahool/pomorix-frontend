# Pomorix

A modular Pomodoro timer application with social features, built with React, TypeScript, and Vite.

## 📁 Project Structure

```
pomorix-frontend/
├── src/
│   ├── api/                    # HTTP client configuration
│   │   ├── client.ts          # Axios instance with interceptors
│   │   ├── endpoints.ts       # API endpoint constants
│   │   └── index.ts
│   │
│   ├── services/              # Business logic & API calls
│   │   ├── auth.service.ts    # Authentication
│   │   ├── user.service.ts    # User operations
│   │   ├── task.service.ts    # Task management
│   │   ├── timer.service.ts   # Pomodoro sessions
│   │   └── index.ts
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useApi.ts          # Generic API hook
│   │   ├── useAuth.ts         # Authentication state
│   │   ├── useTasks.ts        # Task management
│   │   └── index.ts
│   │
│   ├── types/                 # TypeScript definitions
│   │   ├── api.types.ts       # API request/response types
│   │   ├── models.types.ts    # Domain models
│   │   └── index.ts
│   │
│   ├── utils/                 # Utility functions
│   │   ├── storage.ts         # LocalStorage wrapper
│   │   ├── formatters.ts      # Data formatters
│   │   ├── validators.ts      # Input validation
│   │   └── index.ts
│   │
│   ├── constants/             # App constants
│   │   ├── config.ts          # Configuration
│   │   ├── routes.ts          # Route paths
│   │   └── index.ts
│   │
│   ├── components/            # React components
│   ├── pages/                 # Page components
│   ├── App.tsx               # Main app component
│   └── index.tsx             # Entry point
│
├── .env.example              # Environment variables template
├── .env.local                # Your local environment (gitignored)
├── vite.config.ts            # Vite configuration
└── package.json              # Dependencies
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and update the values:

```bash
copy .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## 📚 Architecture Guide

### API Layer (`src/api/`)

The API layer handles HTTP communication:

- **`client.ts`**: Axios instance with request/response interceptors
  - Automatically attaches JWT tokens to requests
  - Handles 401 errors (redirect to login)
  - Centralized error handling

- **`endpoints.ts`**: All API endpoint paths in one place
  - Organized by feature
  - Type-safe endpoint builders

### Services (`src/services/`)

Services contain business logic and API calls. They're **framework-agnostic** and can be used anywhere:

```typescript
import { authService } from '@/services';

// Login user
const response = await authService.login({ email, password });

// Get tasks
const tasks = await taskService.getTasks();
```

**Available Services:**
- `authService` - Login, register, logout
- `userService` - Profile, stats, achievements
- `taskService` - CRUD operations for tasks
- `timerService` - Pomodoro session management

### Custom Hooks (`src/hooks/`)

React hooks for easy component integration:

```typescript
import { useAuth, useTasks } from '@/hooks';

function MyComponent() {
  const { user, login, logout } = useAuth();
  const { tasks, createTask, updateTask } = useTasks();
  
  // Use them in your component
}
```

**Available Hooks:**
- `useApi` - Generic hook for any API call with loading/error states
- `useAuth` - Authentication state management
- `useTasks` - Task list with CRUD operations

### Types (`src/types/`)

Comprehensive TypeScript types:

- **`api.types.ts`**: Request/response types for all endpoints
- **`models.types.ts`**: Domain models (Task, User, etc.)

### Utils (`src/utils/`)

Reusable utility functions:

- **`storage`**: Type-safe localStorage operations
- **`formatters`**: Date/time/number formatting
- **`validators`**: Form validation functions

### Constants (`src/constants/`)

App-wide constants:

- **`config`**: Environment-based configuration
- **`routes`**: Application route paths

## 🔧 Usage Examples

### Making API Calls

```typescript
// Using services directly
import { taskService } from '@/services';

const newTask = await taskService.createTask({
  title: 'Study React',
  pomodoros: 4
});
```

### Using Hooks in Components

```typescript
import { useTasks } from '@/hooks';

function TaskList() {
  const { tasks, loading, error, createTask } = useTasks();

  const handleAdd = async () => {
    await createTask({ title: 'New Task' });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}
```

### Authentication

```typescript
import { useAuth } from '@/hooks';

function LoginPage() {
  const { login, loading, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login({
      email: 'user@example.com',
      password: 'password123'
    });
    
    if (success) {
      // Redirect to dashboard
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* form fields */}
    </form>
  );
}
```

## 🎯 Best Practices

### 1. **Separation of Concerns**
- UI components should only handle presentation
- Business logic lives in services
- Hooks bridge services and components

### 2. **Type Safety**
- Use TypeScript types from `@/types`
- Services return typed data
- Hooks provide typed values

### 3. **Error Handling**
- API errors are caught in interceptors
- Services throw errors for hooks to catch
- Hooks provide error states for UI

### 4. **State Management**
- Authentication state via `useAuth`
- Task state via `useTasks`
- Generic API calls via `useApi`

### 5. **Path Aliases**
- Use `@/` instead of relative imports
- Example: `import { authService } from '@/services'`

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:4000/api` |
| `VITE_GEMINI_API_KEY` | Gemini AI API key (optional) | `your_key_here` |

**Note**: All Vite environment variables must be prefixed with `VITE_` to be exposed to the client.

## 📦 Dependencies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Routing
- **Recharts** - Charts

## 🤝 Contributing

When adding new features:

1. **API Endpoints**: Add to `src/api/endpoints.ts`
2. **Types**: Add request/response types to `src/types/api.types.ts`
3. **Services**: Create service methods in appropriate service file
4. **Hooks**: Create custom hooks for component integration
5. **Components**: Build UI using hooks

This keeps code modular and maintainable!
