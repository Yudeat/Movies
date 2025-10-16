import React, { useEffect, useState } from "react";
import { getFavoriteMovies, rateFavoriteMovie, addMovieToFavorites } from "../firebase.js";
import { auth } from "../firebase.js";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [user] = useState(auth.currentUser);

  const loadFavorites = async () => {
    const movies = await getFavoriteMovies();
    setFavorites(movies);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRate = async (docId, value) => {
    await rateFavoriteMovie(docId, value);
    loadFavorites(); // refresh
  };

  const handleAddFavorite = async (movie) => {
    if (!user) {
      alert("Please log in to add favorites!");
      return;
    }
    await addMovieToFavorites(movie, user);
    loadFavorites();
  };

  return (
    <div className="wrapper p-6">
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      {favorites.length === 0 && <p>No favorites yet.</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-2 rounded text-center">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
              alt={movie.title}
              className="w-full h-auto rounded mb-2"
            />
            <h3 className="text-sm font-semibold mb-1">{movie.title}</h3>
            <div className="flex justify-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer ${movie.rating >= star ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => handleRate(movie.id, star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
