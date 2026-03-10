# Jacked Mobile

A React Native mobile app for tracking workouts, built with Expo.

## Tech Stack

- **React Native** — mobile framework
- **Expo SDK 54** — development platform
- **TypeScript** — type safety
- **Axios** — HTTP client
- **Expo SecureStore** — encrypted token storage

## Prerequisites

- Node.js 18+
- Expo Go app (for physical device testing)
- Android Studio (for emulator)
- [Jacked API](https://github.com/enelrith/jacked)

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourname/jacked-mobile.git
cd jacked-mobile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

```properties
# .env.local
EXPO_PUBLIC_BACKEND_URL=http://10.0.2.2:8080  # Android emulator
# EXPO_PUBLIC_BACKEND_URL=http://192.168.x.x:8080  # Physical device (use your PC's IP) or localhost
```

### 4. Start the development server

```bash
npx expo start --clear
```

## Running the App

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npx expo start`         | Start Metro bundler      |
| `npx expo start --clear` | Start with cleared cache |
| Press `a`                | Open in Android emulator |
| Press `r`                | Reload the app           |

## Project Structure

```
jacked-mobile/
├── api/                  # API call functions
│   ├── auth.ts           # Auth endpoints
│   └── users.ts          # User endpoints
├── app/                  # Expo Router screens
│   ├── (auth)/           # Unauthenticated screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   │
│   ├── index.tsx
│   └── _layout.tsx       # Root layout
├── assets/               # Images, fonts
├── services/
│   └── axios.ts  # Axios instance and interceptors
├── types/                # TypeScript interfaces
│   ├── auth.ts
│   ├── error.ts
│   └── users.ts
└── utils/                # Helper functions
    └── env.ts
```

## Connecting to the Backend

Make sure the Jacked API is running on port `8080` before starting the app.

| Device                 | Backend URL                              |
| ---------------------- | ---------------------------------------- |
| Android Emulator       | `http://10.0.2.2:8080`                   |
| Physical device (WiFi) | `http://<your-pc-ip>:8080`               |
| Physical device (USB)  | `http://10.0.2.2:8080` via `adb reverse` |

For USB connections run:

```bash
adb reverse tcp:8081 tcp:8081
adb reverse tcp:8082 tcp:8082
```

## Authentication Flow

```
Register / Login → JWT tokens saved to SecureStore
                 → Access token attached to every request via interceptor
                 → 401 response → auto refresh token
                 → Refresh fails → redirect to login
```
