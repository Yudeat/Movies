import React, { useEffect, useState,useRef } from 'react';
import Sea from './component/Sea.tsx';
import Spinner from './component/Spinner.tsx';
import Card from './component/Card.tsx';
import { useDebounce } from 'react-use';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaGoogle, FaGithub, FaHeart, FaUser, FaHome, FaFire } from 'react-icons/fa';

import { updateSearchCount, getTrendingMovies } from './appwrite.js';
import { auth, googleProvider, githubProvider } from './firebase.js';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncSearch, setDebouncSearch] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // Add below your existing states
const [showHamburger, setShowHamburger] = useState(false);
const [showProfileMenu, setShowProfileMenu] = useState(false);
const hamburgerRef = useRef(null);
const profileRef = useRef(null);

  const [trending, setTrending] = useState([]);
const [showWelcome, setShowWelcome] = useState(() => {
  // If "welcomeSeen" is set in localStorage, skip welcome page
  return !localStorage.getItem('welcomeSeen');
});  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const [favorites, setFavorites] = useState([]);

  useDebounce(() => setDebouncSearch(searchTerm), 500, [searchTerm]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) setShowMenu(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error('Failed to fetch movies');

      const data = await response.json();
      setMovieList(data.results || []);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrending = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrending(movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(debouncSearch);
  }, [debouncSearch]);

  useEffect(() => {
    loadTrending();
  }, []);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
      setShowHamburger(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  window.addEventListener('click', handleClickOutside);
  return () => window.removeEventListener('click', handleClickOutside);
}, []);


  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google sign-in error:', err);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (err) {
      console.error('GitHub sign-in error:', err);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.find((m) => m.id === movie.id);
    if (exists) {
      setFavorites(favorites.filter((m) => m.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (movie) => favorites.some((m) => m.id === movie.id);
  if (showWelcome) {
  // Show welcome page first
  return (
    <div className="welcome-page flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to <span className='text-gradient'>Movies</span> 🎬</h1>
      <p className="text-center mb-6">Here you can login and watch the movies of your choices!Hope you enjoy </p>
      <button
  onClick={() => {
    localStorage.setItem('welcomeSeen', 'true'); // remember
    setShowWelcome(false); // hide welcome page
  }}
  className="px-6 py-3 bg-gray-400 text-black text-bold rounded hover:bg-red-700 cursor-pointer"
>
  Continue
</button>

    </div>
  );
}

  return (
    <main>
      <div className='pattern' />

      {/* Navbar */}
     <nav className="flex justify-between items-center px-6 py-3 sticky top-0 z-20 bg-transparent">
  <div className="text-2xl font-bold text-gradient">🎬 Movies</div>

  <div className="relative flex items-center gap-4">
    {/* Hamburger Menu */}
    {!user && (
      <div ref={hamburgerRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowHamburger(!showHamburger);
          }}
          className="text-2xl text-white hover:text-gray-300"
        >
          <GiHamburgerMenu />
        </button>

        {showHamburger && (
          <div className="absolute right-0 mt-2 bg-black backdrop-blur-sm p-3 rounded shadow-lg flex flex-col gap-2 z-10 min-w-[180px]">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center gap-2 px-3 py-1 rounded hover:bg-red-700 text-white"
            >
              <FaGoogle /> Google Sign In
            </button>
            <button
              onClick={handleGitHubSignIn}
              className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-900 text-white"
            >
              <FaGithub /> GitHub Sign In
            </button>
          </div>
        )}
      </div>
    )}

    {/* Profile Menu */}
    {user && (
      <div ref={profileRef}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowProfileMenu(!showProfileMenu);
          }}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer"
        >
          <img
            src={user.photoURL}
            alt="User profile"
            className="w-full h-full object-cover"
          />
        </div>

        {showProfileMenu && (
          <div className="absolute right-0 mt-2 bg-black backdrop-blur-sm p-3 rounded shadow-lg flex flex-col gap-2 z-10 min-w-[120px]">
            <button
              onClick={handleSignOut}
              className="px-3 py-1 rounded hover:bg-red-700 text-white"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    )}
  </div>
</nav>


      {/* Header */}
      <div className='wrapper'>
        <header className="mt-6">
          <img src="./hero.png" alt="Hero banner" className="mx-auto mb-4" />
          <h1 className="text-center text-5xl font-bold mb-4">
            Find <span className='text-gradient'>Movies</span> Of your choice, AD Free
          </h1>
          <Sea searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {/* Favorites Section - ALWAYS VISIBLE */}
        <section className='favorites mt-10'>
          <h2 className='text-xl font-semibold mb-4'>Your Favorites</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-400">No favorites yet. Click 🤍 to add movies!</p>
          ) : (
            <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {favorites.map((movie) => (
                <div key={movie.id} className="relative">
                  <Card movie={movie} />
                  <button
                    onClick={() => toggleFavorite(movie)}
                    className="absolute top-2 right-2 text-red-600 text-xl hover:text-red-800 cursor-pointer"
                  >
                    ❤️
                  </button>
                </div>
              ))}
            </ul>
          )}
        </section>

        {/* Trending */}
        {trending.length > 0 && (
          <section className='trending mt-10'>
            <h2 className='text-xl font-semibold mb-4'>Trending Movies</h2>
            <ul className='flex gap-4 overflow-x-auto pb-2'>
              {trending.map((movie, index) => (
                <li
                  key={movie.$id}
                  className="flex flex-col sm:flex-row items-center hover:scale-105 transition-transform"
                >
                  <p className="font-bold mr-2">{index + 1}</p>
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-24 h-auto rounded"
                  />
                  <span className="ml-2 hidden sm:inline text-sm font-medium">{movie.title}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* All Movies */}
        <section className='all-movies mt-10'>
          <h2 className='text-xl font-semibold mb-2'>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
  {movieList.map((movie) => (
    <div key={movie.id} className="relative">
      <Link to={`/movie/${movie.id}`}>
        <Card movie={movie} />
      </Link>
      <button
        onClick={() => toggleFavorite(movie)}
        className={`absolute top-2 right-2 text-xl hover:text-red-600 cursor-pointer ${
          isFavorite(movie) ? 'text-red-600' : 'text-white'
        }`}
      >
        🤍
      </button>
    </div>
  ))}
</ul>

          )}
        </section>
      </div>
    </main>
  );
};

export default App;
