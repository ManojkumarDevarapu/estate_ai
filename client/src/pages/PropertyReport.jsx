import { useLocation, Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function PropertyReport() {
  const location = useLocation();
  const property = location.state?.property;

  if (!property) {
    return (
      <div className="page max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-green-50 min-h-screen p-6">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Property Data Not Available
          </h2>
          <p className="text-gray-600 mb-6">
            Unable to load property information.
          </p>
          <Link
            to="/history"
            className="inline-block px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            ← Back to History
          </Link>
        </div>
      </div>
    );
  }

  const chartData = [
    {
      label: "Listing Price",
      value: property.listingPrice,
    },
    {
      label: "AI Estimate",
      value: property.aiAnalysis.estimatedValue,
    },
  ];

  return (
    <div className="page max-w-6xl mx-auto space-y-6 pb-8 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen p-6">
      {/* BACK BUTTON */}
      <Link
        to="/history"
        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
      >
        <span>←</span> Back to History
      </Link>

      {/* HEADER - SMALLER WITH LIGHTER GRADIENT */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-md p-4 text-white">
        <h1 className="text-xl font-bold mb-1">
          {property.address}
        </h1>
        <p className="text-green-50 text-sm">
          📍 {property.city}, {property.state}
        </p>
      </div>

      {/* PROPERTY DETAILS */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 space-y-5">
        <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-200">
          Property Information
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Square Feet</p>
            <p className="text-lg font-bold text-gray-900">
              {property.sqft?.toLocaleString() || 'N/A'}
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Bedrooms</p>
            <p className="text-lg font-bold text-gray-900">
              {property.bedrooms || 'N/A'}
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Bathrooms</p>
            <p className="text-lg font-bold text-gray-900">
              {property.bathrooms || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* VALUATION STATS */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 space-y-5">
        <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-200">
          Valuation Summary
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-700 mb-2">
              Listing Price
            </p>
            <p className="text-2xl font-bold text-blue-900">
              ₹{property.listingPrice.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="p-5 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-700 mb-2">
              AI Estimated Value
            </p>
            <p className="text-2xl font-bold text-green-900">
              ₹{property.aiAnalysis.estimatedValue.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm font-medium text-purple-700 mb-2">
              Confidence Level
            </p>
            <p className="text-2xl font-bold text-purple-900">
              {property.aiAnalysis.confidence}%
            </p>
          </div>
        </div>
      </div>

      {/* COMPARATIVE CHART */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-200">
          Comparative Market Analysis
        </h2>

        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <div className="h-72">
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

      {/* ACTIONS */}
      <div className="flex gap-4">
        <Link
          to="/history"
          className="flex-1 text-center py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          ← Back to History
        </Link>
        <Link
          to="/dashboard"
          className="flex-1 text-center py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          New Analysis →
        </Link>
      </div>
    </div>
  );
}