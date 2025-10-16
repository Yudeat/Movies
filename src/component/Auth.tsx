import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";

const AuthPage = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  const signInWithGitHub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (err) {
      console.error("GitHub sign-in error:", err);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-3xl font-bold mb-6">🎬 Movie App Login</h1>
      <button
        onClick={signInWithGoogle}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg mb-4 w-full max-w-xs flex items-center justify-center gap-2"
      >
        <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </button>
      <button
        onClick={signInWithGitHub}
        className="bg-gray-800 hover:bg-gray-900 px-6 py-3 rounded-lg w-full max-w-xs flex items-center justify-center gap-2"
      >
        <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
        Sign in with GitHub
      </button>
    </main>
  );
};

export default AuthPage;
