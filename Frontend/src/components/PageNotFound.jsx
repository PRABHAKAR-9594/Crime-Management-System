import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4">Oops! The page you are looking for doesn't exist.</p>
      <Link to="/" className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound;
