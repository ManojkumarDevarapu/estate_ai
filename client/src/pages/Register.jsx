import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      // ✅ After successful registration → go to login
      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
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
              "Don't wait to buy real estate. Buy real estate and wait."
            </p>
            <p className="text-base lg:text-lg text-gray-600 italic">— Will Rogers</p>
          </div>

          <div className="hidden lg:block pt-4 space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-semibold text-base">Start Your Journey</p>
                <p className="text-sm text-gray-600">Join thousands of smart investors today</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-semibold text-base">Expert Insights</p>
                <p className="text-sm text-gray-600">Access AI-powered property analysis</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-semibold text-base">Secure & Private</p>
                <p className="text-sm text-gray-600">Your data is protected with encryption</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - REGISTER FORM */}
        <div className="flex-1 w-full max-w-md">
          <div className="bg-white rounded-xl shadow-2xl p-6 space-y-4 border border-gray-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-sm text-gray-600 mt-1">Start analyzing properties today</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  onChange={handleChange}
                  value={form.name}
                />
              </div>

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
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <p className="text-center text-sm">
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:text-emerald-600 transition-colors inline-flex items-center gap-1"
              >
                Login here
                <span>→</span>
              </Link>
            </p>
          </div>

          {/* TRUST BADGE */}
          <p className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
            <span>✨</span>
            <span>Join 10,000+ property investors</span>
          </p>
        </div>
      </div>
    </div>
  );
}