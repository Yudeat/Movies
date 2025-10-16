import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

type Trailer = {
  key: string;
  site: string;
  type: string;
  official: boolean;
  name: string;
};

type Provider = {
  provider_id: number;
  provider_name: string;
  logo_path: string;
};

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

type CastInfo = {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
};

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerId, setTrailerId] = useState<string | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [selectedCastId, setSelectedCastId] = useState<number | null>(null);
  const [castInfo, setCastInfo] = useState<CastInfo | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
        const data = await res.json();
        setMovie(data);
        document.title = `${data.title} - Movie Details`;
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/movie/${id}/videos`, API_OPTIONS);
        const data = await res.json();
        const trailer = data.results.find(
          (vid: Trailer) =>
            vid.type === 'Trailer' &&
            vid.site === 'YouTube' &&
            (vid.official || vid.name.toLowerCase().includes('official'))
        );
        if (trailer) setTrailerId(trailer.key);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    const fetchProviders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/movie/${id}/watch/providers`, API_OPTIONS);
        const data = await res.json();
        const language = navigator.language || 'en-US';
        const country = language.includes('-') ? language.split('-')[1] : 'US';
        const providerData = data.results?.[country]?.flatrate;
        if (Array.isArray(providerData)) {
          setProviders(providerData);
        }
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    const fetchCasts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/movie/${id}/credits`, API_OPTIONS);
        const data = await res.json();
        const topCasts = data.cast.slice(0, 10);
        setCasts(topCasts);
      } catch (error) {
        console.error('Error fetching casts:', error);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/movie/${id}/similar`, API_OPTIONS);
        const data = await res.json();
        setSimilarMovies(data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    fetchMovieDetails();
    fetchTrailer();
    fetchProviders();
    fetchCasts();
    fetchSimilarMovies();
  }, [id]);

  const handleCastClick = async (castId: number) => {
    if (selectedCastId === castId) {
      setSelectedCastId(null);
      setCastInfo(null);
      return;
    }

    setSelectedCastId(castId);
    try {
      const res = await fetch(`${API_BASE_URL}/person/${castId}`, API_OPTIONS);
      const data = await res.json();
      setCastInfo(data);
    } catch (error) {
      console.error('Error fetching cast info:', error);
    }
  };

  if (!movie) return <div className="text-center py-10"> Loading movie details...</div>;

  return (
    <main>
      {/* Header */}
      <header>
        <img src="/hero.png" alt="Hero banner" />
        <h1>
           <span className="text-gradient">Movies </span>Of your choice,
           Make life's better 
        </h1>
      </header>

      {/* Back Link */}
      <div className="wrapper mt-6 px-6">
        <Link to="/" className="text-red-700 underline text-sm">
          ← Back to Home
        </Link>
      </div>

      {/* Main Movie Detail Content */}
      <div className="wrapper px-6 py-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : '/no-movie.png'
              }
              alt={movie.title}
              className="rounded-lg shadow-md w-full max-w-[220px] mx-auto md:mx-0"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <p className="text-white leading-relaxed mb-6">{movie.overview}</p>

            {/* Trailer */}
            {trailerId && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">🎬 Trailer</h2>
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-md"
                    src={`https://www.youtube.com/embed/${trailerId}`}
                    title="YouTube trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Streaming Providers */}
            {providers.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">📺 Available On</h2>
                <div className="flex flex-wrap gap-4">
                  {providers.map((provider) => (
                    <div key={provider.provider_id} className="text-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="w-12 h-12 object-contain mb-1 mx-auto"
                      />
                      <p className="text-sm text-gray-600">{provider.provider_name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {providers.length === 0 && (
              <p className="mt-4 text-sm text-gray-500">
                No streaming options found for your region.
              </p>
            )}
          </div>
        </div>

        {/* ✅ Cast Section */}
        {casts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">👥 Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {casts.map((cast) => (
                <div key={cast.id} className="text-center relative">
                  <button
                    onClick={() => handleCastClick(cast.id)}
                    className="focus:outline-none w-full"
                  >
                    <img
                      src={
                        cast.profile_path
                          ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                          : '/no-actor.png'
                      }
                      alt={cast.name}
                      className="w-24 h-24 object-cover rounded-full mx-auto mb-2 transition-transform hover:scale-105"
                    />
                    <p className="font-medium text-sm">{cast.name}</p>
                    <p className="text-xs text-gray-400">{cast.character}</p>
                  </button>

                  {selectedCastId === cast.id && castInfo && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-gray-800 text-white text-sm p-3 rounded-lg shadow-lg z-10">
                      <p className="font-semibold mb-1">{castInfo?.name || cast.name}</p>
                      {castInfo?.birthday && (
                        <p className="text-gray-300 text-xs mb-1">
                          📅 {castInfo.birthday}
                          {castInfo.place_of_birth && ` • ${castInfo.place_of_birth}`}
                        </p>
                      )}
                      <p className="text-gray-200 line-clamp-4">
                        {castInfo?.biography
                          ? castInfo.biography || 'No biography available.'
                          : 'Loading...'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Similar Movies Section */}
        {similarMovies.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">🎞️ Similar Movies</h2>
            <div className="flex overflow-x-auto gap-4 pb-2">
              {similarMovies.map((sim) => (
                <Link
                  to={`/movie/${sim.id}`}
                  key={sim.id}
                  className="flex-shrink-0 w-[150px]"
                >
                  <img
                    src={
                      sim.poster_path
                        ? `https://image.tmdb.org/t/p/w200${sim.poster_path}`
                        : '/no-movie.png'
                    }
                    alt={sim.title}
                    className="rounded-md w-full h-[225px] object-cover"
                  />
                  <p className="mt-2 text-sm text-center">{sim.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MovieDetail;
