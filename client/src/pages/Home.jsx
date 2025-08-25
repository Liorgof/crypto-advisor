import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold mb-8 tracking-wide text-purple-400 drop-shadow-lg">
        AI Crypto Advisor
      </h1>

      <p className="mb-12 text-lg text-gray-300 text-center max-w-md">
        Your personal AI-powered platform for smart daily insights in the crypto
        world.
      </p>

      <div className="flex gap-6">
        <Link to="/login">
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-lg rounded-xl shadow-lg transition">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-lg rounded-xl shadow-lg transition">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}
