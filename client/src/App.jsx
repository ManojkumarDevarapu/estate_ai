import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import PropertyReport from "./pages/PropertyReport";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ VITE ENV VARIABLE (THIS IS CRITICAL)
const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token && token.length > 10;
  const [scrolled, setScrolled] = useState(false);

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-teal-50">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-300 ${
          scrolled ? "shadow-xl" : "shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* LOGO */}
            <Link to={isLoggedIn ? "/dashboard" : "/login"}>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center">
                🏡 <span className="ml-2">EstateAI</span>
              </h1>
            </Link>

            {/* NAV LINKS */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 font-medium text-gray-700 hover:text-green-600 rounded-lg hover:bg-green-50"
                  >
                    📊 Dashboard
                  </Link>

                  <Link
                    to="/history"
                    className="px-4 py-2 font-medium text-gray-700 hover:text-green-600 rounded-lg hover:bg-green-50"
                  >
                    📜 History
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 font-medium text-gray-700 hover:text-green-600 rounded-lg hover:bg-gray-100"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-5 py-2 font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto py-8 px-6 mt-16">
        <Routes>
          {/* ROOT REDIRECT */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route
            path="/property/:id"
            element={
              <ProtectedRoute>
                <PropertyReport />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
