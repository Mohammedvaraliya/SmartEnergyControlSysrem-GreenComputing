import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 flex flex-col items-center justify-center text-center px-6">
      <div className="bg-gradient-to-r from-blue-100 via-green-200 to-blue-100 rounded-2xl shadow-2xl p-10 max-w-5xl animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-700 drop-shadow-lg font-serif">
          Welcome to{" "}
          <span className="text-green-900">Smart Energy Control System</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-green-700 font-light">
          Comprehensive solution for real-time energy management and sustainable
          control.
        </p>
        <div className="mt-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 text-lg sm:text-xl font-medium bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out hover:bg-gradient-to-l"
          >
            View Real-Time Data
          </button>
        </div>
      </div>

      <footer className="mt-16 text-green-800 font-sans">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} Smart Energy Control System. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
