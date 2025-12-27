import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    sqft: "",
    bedrooms: "",
    bathrooms: "",
    listingPrice: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  /* ===============================
     FRONTEND VALIDATION
  ================================ */
  const validateForm = () => {
    const { address, city, state, sqft, bedrooms, bathrooms, listingPrice } =
      form;

    if (
      !address ||
      !city ||
      !state ||
      !sqft ||
      !bedrooms ||
      !bathrooms ||
      !listingPrice
    ) {
      return "All fields are required";
    }

    if (
      Number(sqft) < 200 ||
      Number(sqft) > 50000
    ) {
      return "Square feet must be between 200 and 50,000";
    }

    if (
      Number(bedrooms) < 1 ||
      Number(bedrooms) > 20
    ) {
      return "Bedrooms must be between 1 and 20";
    }

    if (
      Number(bathrooms) < 1 ||
      Number(bathrooms) > 20
    ) {
      return "Bathrooms must be between 1 and 20";
    }

    if (Number(listingPrice) < 10000) {
      return "Listing price must be at least ₹10,000";
    }

    return null;
  };

  const runAnalysis = async () => {
    if (!token) {
      setError("Session expired. Please login again.");
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "http://localhost:5000/api/properties/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            address: form.address.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
            sqft: Number(form.sqft),
            bedrooms: Number(form.bedrooms),
            bathrooms: Number(form.bathrooms),
            listingPrice: Number(form.listingPrice),
          }),
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Analysis failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "AI analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const chartData =
    result && [
      { label: "Listing Price", value: result.listingPrice },
      { label: "AI Estimate", value: result.aiAnalysis.estimatedValue },
    ];

  return (
    <div className="page max-w-6xl mx-auto space-y-6 pb-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-md p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              🏡 AI Property Valuation
            </h1>
            <p className="text-green-50 text-sm mt-1">
              Powered by advanced machine learning
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm italic text-green-50">
              "90% of millionaires own real estate"
            </p>
            <p className="text-xs text-green-100 mt-0.5">— Andrew Carnegie</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 space-y-5">
        <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-200">
          Property Details
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Property Address
            </label>
            <input
              name="address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              placeholder="123 Main Street"
              onChange={handleChange}
              value={form.address}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                City
              </label>
              <input
                name="city"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                placeholder="New York"
                onChange={handleChange}
                value={form.city}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                State
              </label>
              <input
                name="state"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                placeholder="NY"
                onChange={handleChange}
                value={form.state}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Square Feet
              </label>
              <input
                name="sqft"
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                placeholder="2000"
                onChange={handleChange}
                value={form.sqft}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Bedrooms
              </label>
              <input
                name="bedrooms"
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                placeholder="3"
                onChange={handleChange}
                value={form.bedrooms}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Bathrooms
              </label>
              <input
                name="bathrooms"
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                placeholder="2"
                onChange={handleChange}
                value={form.bathrooms}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Listing Price (₹)
            </label>
            <input
              name="listingPrice"
              type="number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              placeholder="4500000"
              onChange={handleChange}
              value={form.listingPrice}
            />
          </div>
        </div>

        <button
          onClick={runAnalysis}
          disabled={loading}
          className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Property...
            </span>
          ) : (
            "🚀 Run AI Analysis"
          )}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* RESULTS */}
      {result && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-200">
            AI Valuation Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <p className="text-sm font-medium text-blue-700 mb-2">Listing Price</p>
              <p className="text-2xl font-bold text-blue-900">
                ₹{result.listingPrice.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-5 border border-green-200">
              <p className="text-sm font-medium text-green-700 mb-2">AI Estimated Value</p>
              <p className="text-2xl font-bold text-green-900">
                ₹{result.aiAnalysis.estimatedValue.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
              <p className="text-sm font-medium text-purple-700 mb-2">Confidence</p>
              <p className="text-2xl font-bold text-purple-900">
                {result.aiAnalysis.confidence}%
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Price Comparison Chart</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="label" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #10b981',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}