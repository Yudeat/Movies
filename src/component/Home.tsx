import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Home = ({ user }) => {
  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">🎬 Movie Explorer</h1>
        {user && (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || "/user.png"}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full border"
            />
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>

      <section className="text-center mt-10 px-4">
        <img src="/hero.png" alt="Hero banner" className="w-48 mx-auto mb-6 rounded-xl shadow-lg" />
        <h2 className="text-3xl font-bold mb-4">
          Find <span className="text-gradient">Movies</span> You Love
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto mb-8">
          Browse, explore, and watch trailers. Login is optional if disabled in config.
        </p>
        <Link
          to="/movie/550"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium"
        >
          Explore Example Movie →
        </Link>
      </section>
    </main>
  );
};

export default Home;
