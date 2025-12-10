# Flokken - Dog Sports Social Network

A cross-platform dog sports social networking app built with Astro, React, Firebase, and Tauri.

## Architecture

- **Frontend**: Astro + React (TypeScript)
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Desktop**: Tauri (cross-platform wrapper)

## Project Structure

```
flokken/
├── frontend/          # Astro + React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/  # Firebase services
│   │   ├── lib/       # Firebase config
│   │   └── types/
│   └── package.json
└── desktop/           # Tauri desktop wrapper
    ├── src-tauri/
    └── package.json
```

## Setup

### 1. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Enable Storage
5. Copy your Firebase config

### 2. Environment Variables

Create `frontend/.env` based on `frontend/.env.example`:

```bash
PUBLIC_FIREBASE_API_KEY=your_api_key_here
PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=your_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Install Dependencies

```bash
# Frontend
cd frontend && npm install

# Desktop
cd desktop && npm install
```

## Development

### Run Frontend Only
```bash
cd frontend
npm run dev
```

### Run Desktop App (Tauri + Frontend)
```bash
cd desktop
npm run tauri dev
```

## Features

- 🐕 **Discover**: Swipeable dog profile cards
- 👤 **Profile**: User profile with dog management
- 💬 **Messages**: Direct messaging (coming soon)
- 👥 **Groups**: Dog sport communities (coming soon)
- 🔥 **Firebase**: Real-time data sync, authentication, file storage

## Tech Stack

- [Astro](https://astro.build/) - Frontend framework
- [React](https://react.dev/) - UI components
- [Firebase](https://firebase.google.com/) - Backend services
- [Tauri](https://tauri.app/) - Desktop wrapper
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Build for Production

```bash
cd desktop
npm run tauri build
```

This will create installers for your platform in `desktop/src-tauri/target/release/bundle/`.
