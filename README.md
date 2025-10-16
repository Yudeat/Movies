🎬 Movies Web App

A modern, interactive web application for discovering, searching, and favoriting movies, featuring Google and GitHub authentication, Appwrite backend integration, and a clean, responsive UI.

Table of Contents

Features

Demo

Technologies Used

Installation

Firebase Setup

Appwrite Setup

Usage

Contributing

License

Features

Welcome page shown only on first visit.

Search movies with live debounced search.

Favorite movies (stored in localStorage).

Trending movies section.

Firebase Authentication with Google & GitHub.

User profile picture display (Google/GitHub).

Mobile-friendly responsive UI.

Hamburger menu closes when clicking outside or using the close button.

Demo

Example: [https://movies-app.web.app](https://auth-5d9d7.web.app/)

Technologies Used

Frontend: React, TypeScript, Tailwind CSS, React Router

Backend: Appwrite (for trending/search tracking)

Authentication: Firebase Auth (Google, GitHub)

Movie Data: The Movie Database API (TMDB)

Installation

Clone the repository:

git clone https://github.com/yourusername/movies-app.git
cd movies-app


Install dependencies:

npm install


Create a .env file at the root:

VITE_TMDB_API_KEY=your_tmdb_api_key


Start the development server:

npm run dev

Firebase Setup

Create a Firebase project at https://console.firebase.google.com/
.

Enable Google and GitHub authentication providers.

Copy your Firebase config and update firebase.js:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};


Ensure GitHub OAuth App has callback URL:
https://your-project-id.firebaseapp.com/__/auth/handler

Appwrite Setup

Install Appwrite server or use cloud: https://appwrite.io/docs/installation

Create a project and database for trending/search tracking.

Update appwrite.js with your endpoint, project ID, and other configs.

Usage

Search movies using the search bar.

Add movies to favorites by clicking the heart icon.

Click profile picture to sign out.

View trending movies in the trending section.

Movies are clickable and navigate to the Movie Detail page.

Contributing

Fork the repository.

Create a branch (git checkout -b feature-name).

Commit changes (git commit -m "Add feature").

Push to branch (git push origin feature-name).

Open a Pull Request.

License

This project is licensed under the MIT License.


<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# Movies
>>>>>>> f11260691116a8779c3c31dc57d46566691a0323
