# Photo Gallery Web App

A responsive Photo Gallery web application built with React, Vite, and Tailwind CSS for the Celebrare Frontend Internship Pre-Screening Assignment.

## Features

- **Picsum API Integration**: Fetches 30 photos on load from the public Picsum Photos API (`https://picsum.photos/v2/list?limit=30`).
- **Loading & Error States**: Displays a loading spinner while fetching photos and a clear error card with a retry button if the request fails.
- **Responsive Grid**:
  - Desktop (large screens): 4 columns
  - Tablet (medium screens): 2 columns
  - Mobile (small screens): 1 column
- **Real-Time Search Filter**: Instant client-side search filtering photos by author name without reloading or making additional API calls.
- **Favourites with `useReducer`**: Heart icon button toggles photos as favourites. State is managed using `useReducer` and persisted across page reloads using `localStorage`.
- **Custom Hook (`useFetchPhotos`)**: Encapsulates API fetch, loading, and error state logic cleanly separated from UI components.
- **Performance Optimization**: `useCallback` memoizes the search input handler and `useMemo` optimizes the computation of filtered photos.

## Tech Stack

- **React** (v19)
- **Vite**
- **Tailwind CSS** (v4 with `@tailwindcss/vite`)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ErrorMessage.jsx     # Error state with retry action
│   ├── Gallery.jsx          # Main gallery view with grid and search
│   ├── LoadingSpinner.jsx   # Loading state indicator
│   ├── PhotoCard.jsx        # Individual card with photo, author, and heart button
│   └── SearchBar.jsx        # Real-time search input with clear button
├── hooks/
│   └── useFetchPhotos.js    # Custom data fetching hook
├── reducers/
│   └── favouritesReducer.js # useReducer logic & localStorage initialization
├── App.jsx                  # Root application component
├── index.css                # Tailwind CSS import and base styles
└── main.jsx                 # Entry point
```
