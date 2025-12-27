import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // 🔑 Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Direct redirect to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 overflow-hidden">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-6">
        
        {/* LEFT SIDE - QUOTE & BRANDING */}
        <div className="flex-1 text-center lg:text-left space-y-5 px-4">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            🏡 EstateAI
          </h1>
          
          <div className="space-y-3">
            <p className="text-xl lg:text-3xl font-semibold text-gray-800 leading-snug">
              "The best investment on Earth is Earth."
            </p>
            <p className="text-base lg:text-lg text-gray-600 italic">— Louis Glickman</p>
          </div>

          <div className="hidden lg:block pt-4 space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="font-semibold text-base">AI-Powered Analysis</p>
                <p className="text-sm text-gray-600">Advanced property insights at your fingertips</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-semibold text-base">Smart Decisions</p>
                <p className="text-sm text-gray-600">Make informed investment choices</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-semibold text-base">Accurate Predictions</p>
                <p className="text-sm text-gray-600">Cutting-edge property value forecasting</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="flex-1 w-full max-w-md">
          <div className="bg-white rounded-xl shadow-2xl p-6 space-y-4 border border-gray-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Welcome Back!
              </h2>
              <p className="text-sm text-gray-600 mt-1">Login to continue</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  onChange={handleChange}
                  value={form.email}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  onChange={handleChange}
                  value={form.password}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login to Dashboard"
                )}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-500">New to EstateAI?</span>
              </div>
            </div>

            <p className="text-center text-sm">
              <Link
                to="/register"
                className="text-green-600 font-semibold hover:text-emerald-600 transition-colors inline-flex items-center gap-1"
              >
                Create an account
                <span>→</span>
              </Link>
            </p>
          </div>

          {/* TRUST BADGE */}
          <p className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
            <span>🔒</span>
            <span>Secured with encryption</span>
          </p>
        </div>
      </div>
    </div>
  );
}