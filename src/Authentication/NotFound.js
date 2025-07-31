import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <h1 className="text-9xl font-extrabold text-red-500 drop-shadow-lg">404</h1>
      <p className="text-2xl md:text-3xl mt-4 font-semibold">
        Oops! Page Not Found 🚧
      </p>
      <p className="mt-2 text-gray-300 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.  
        Don’t worry, let’s get you back on track.
      </p>

      <div className="mt-6 flex space-x-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition duration-300 font-medium shadow-lg"
        >
          Go Home
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-600 transition duration-300 font-medium shadow-lg"
        >
          Login
        </Link>
      </div>

      <div className="absolute bottom-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Radio Clip Studio
      </div>
    </div>
  );
}
