import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  const diff =
    property.listingPrice - property.aiAnalysis.estimatedValue;
  const percentDiff = Math.abs(
    (diff / property.aiAnalysis.estimatedValue) * 100
  ).toFixed(1);

  const getRecommendationBadge = () => {
    if (diff > 15000)
      return { text: 'Overpriced', color: 'bg-red-100 text-red-800', icon: '📈' };
    if (diff < -10000)
      return { text: 'Underpriced', color: 'bg-green-100 text-green-800', icon: '📉' };
    return { text: 'Fair', color: 'bg-blue-100 text-blue-800', icon: '✅' };
  };

  const badge = getRecommendationBadge();

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg truncate">{property.address}</h3>
        <span className={`badge ${badge.color}`}>
          {badge.icon} {badge.text}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-3">
        {property.city}, {property.state}
      </p>

      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>{property.bedrooms}bd</span>
        <span>{property.bathrooms}ba</span>
        <span>{property.sqft.toLocaleString()} sqft</span>
        <span>{property.yearBuilt}</span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-xs text-gray-500">Listing</span>
          <span className="font-semibold">
            ${property.listingPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-xs text-gray-500">AI Estimate</span>
          <span className="font-semibold text-green-600">
            ${property.aiAnalysis.estimatedValue.toLocaleString()}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
          <span className="font-medium text-sm">
            {diff > 0
              ? `+${percentDiff}% over`
              : diff < 0
              ? `-${percentDiff}% under`
              : 'At market'}
          </span>
          <span className="badge bg-gray-100">
            ${Math.abs(diff).toLocaleString()}
          </span>
        </div>
      </div>

      <Link
        to={`/property/${property._id}`}
        state={{ property }}
        className="btn-primary w-full text-center block"
      >
        View Full Report
      </Link>
    </div>
  );
}
