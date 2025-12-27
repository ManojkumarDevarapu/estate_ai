import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function History() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔹 Fetch USER-SPECIFIC history
  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:5000/api/properties",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error("Failed to load history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token, navigate]);

  // 🔹 Delete property (USER-SPECIFIC)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `http://localhost:5000/api/properties/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperties((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="page max-w-6xl mx-auto space-y-6 pb-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-md p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              📜 Analysis History
            </h1>
            <p className="text-green-50 text-sm mt-1">
              Review your past property valuations
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm italic text-green-50">
              "Real estate cannot be lost or stolen"
            </p>
            <p className="text-xs text-green-100 mt-0.5">— F.D. Roosevelt</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="animate-spin h-12 w-12 text-green-600 mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 text-lg">Loading history...</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-10 text-center border border-gray-100">
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">No analysis history yet</h2>
            <p className="text-gray-600 text-sm">
              Start analyzing properties to build your portfolio.
            </p>
            <Link
              to="/dashboard"
              className="inline-block mt-4 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-5 space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {property.address || "Unknown Address"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {property.city}, {property.state}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Searched by: {property.user?.name}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(property._id)}
                  className="text-gray-400 hover:text-red-600 transition-colors text-lg"
                  title="Delete"
                >
                  🗑
                </button>
              </div>

              {/* Prices */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Listing Price</span>
                  <span className="font-semibold text-gray-900">
                    ₹{property.listingPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">AI Estimate</span>
                  <span className="font-semibold text-green-700">
                    ₹{property.aiAnalysis.estimatedValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Confidence</span>
                  <span className="font-semibold text-purple-700">
                    {property.aiAnalysis.confidence}%
                  </span>
                </div>
              </div>

              {/* Button */}
              <Link
                to={`/property/${property._id}`}
                state={{ property }}
                className="block w-full text-center py-2.5 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                View Full Report
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}