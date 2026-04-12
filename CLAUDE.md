# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start          # Start Vite development server (port 3000)
yarn build          # Production build
yarn preview        # Preview production build locally
yarn docker:dev     # Start dev environment via Docker Compose
yarn docker:build   # Build and start production Docker container
```

## Environment Variables

Create a `.env` file at the project root with:

```
REACT_APP_BASE_URL=
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

## Architecture

**Stack:** React 18 + React Router 6 SPA, built with Vite. Tailwind CSS v4 for styling (MUI being removed incrementally during redesign). Axios for HTTP. Firebase Storage for file uploads. React Hook Form for forms.

**Routing:** All routes are defined in `src/navigateAll.js` (a class component). Protected routes use `src/privateRoute.js`, which checks `localStorage.getItem("userId")` and redirects to `/Login` if absent.

**Feature structure:** `src/` is organized by feature — each major section (Plan, Profile, Blog, Explore, DaywisePlan, etc.) has its own directory with its components inside.

**Auth:** Token-based. `userId` and `accessToken` are stored in `localStorage` after login. Every Axios call manually attaches `Authorization: Bearer ${localStorage.getItem("accessToken")}` — there is no centralized API service layer.

**Theme:** Light/dark mode is provided via `src/ThemeContext.js` (custom context + hook `useThemeContext()`). Theme objects are defined in `src/themes.js` and applied via MUI's `ThemeProvider`.

**Firebase:** Only Firebase Storage is used (not Auth or Firestore). Initialized in `src/Firebase/firebase.js`. Used primarily in the Profile feature for avatar uploads.

**Timezone:** Hardcoded to `Asia/Dhaka` via `process.env.TZ` in `src/index.js`. Date utilities live in `src/formatDate.js` and `src/formatTime.js`.
