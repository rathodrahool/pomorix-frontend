# Pomorix 
A global Pomodoro-based study app focused on consistency, visibility, and motivation.

Pomorix helps users build a daily study habit using the **Pomodoro technique**, while feeling motivated by seeing others study at the same time — without chat, groups, or distractions.

---

##  Core Idea

- One **global study space**
- Everyone studies silently together
- No rooms, no chat, no social noise
- Motivation comes from **visibility, streaks, and progress**

Think of Pomorix as a **silent digital library** where everyone is focused.

---

##  Features

###  Authentication
- Authentication: Guest access, and Google social login (JWT-based)
- Secure JWT-based authentication

---

### Tasks
- Create simple study tasks
- One active task at a time
- Tasks are **context**, not a todo system

---

### Pomodoro Sessions
- Server-authoritative Pomodoro timer
- Focus & break cycles
- Pause / resume support
- One active session per user
- Sessions are the **single source of truth**

---

### Global Study Feed (Polling-based)
- See who is studying right now
- Shows:
  - User name
  - Task being studied
  - Focus / break / recently completed status
- Implemented using **short polling**
- No WebSockets in MVP (keeps infra simple)

---

### Daily Streaks
- Streak increases if user completes **at least one Pomodoro per day**
- Timezone-aware
- Tracks:
  - Current streak
  - Longest streak
- Idempotent and retry-safe

---

### Stats & Analytics
- Pre-aggregated (no raw session scans)
- Daily, weekly, and lifetime stats
- Includes:
  - Total Pomodoros
  - Total focus time
  - Daily focus charts
  - Task-wise focus stats

---

### Bug Reporting
- Users can report bugs directly from the app
- Simple lifecycle:
  - Open → In Progress → Resolved → Closed
- Admin-only management




## Tech Stack (Current)

- **Backend:** Node.js, TypeScript, NestJS
- **Frontend:** React js 
- **Database:** PostgreSQL , supabase 
- **ORM:** Prisma
- **Auth:** JWT
- **Infra:** AWS
- **Testing:** Jest


## Why Pomorix?

Most focus apps are:
- Either isolated
- Or socially noisy

Pomorix finds the middle ground:
> *“You are not studying alone — but you are not distracted either.”*

---
## 🤝 Contributing

This project is currently under active development.  
Contributions, feedback, and ideas are welcome.

---
## 🔗 Links

- Live App: https://www.pomorix.space
- GitHub: https://github.com/rathodrahool
- LinkedIn: https://linkedin.com/in/rathodrahool
