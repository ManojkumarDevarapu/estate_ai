import { useState } from 'react';
import MarketChart from './MarketChart.jsx';

export default function AnalysisResult({ property }) {
  const [showComps, setShowComps] = useState(false);
  const { aiAnalysis } = property;

  const getColor = (rec) => {
    switch (rec) {
      case 'Overpriced': return 'bg-red-100 text-red-800';
      case 'Fairly Priced': return 'bg-green-100 text-green-800';
      case 'Underpriced': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{property.address}</h2>
            <p className="text-gray-600">{property.city}, {property.state}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-semibold ${getColor(aiAnalysis.recommendation)}`}>
            {aiAnalysis.recommendation}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Listing Price</p>
            <p className="text-2xl font-bold text-blue-700">${property.listingPrice.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">AI Estimated Value</p>
            <p className="text-2xl font-bold text-green-700">${aiAnalysis.estimatedValue.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Confidence</p>
            <p className="text-2xl font-bold text-purple-700">{aiAnalysis.confidence}%</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg text-gray-800 mb-2">🧠 AI Reasoning</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{aiAnalysis.reasoning}</p>
        </div>

        <button onClick={() => setShowComps(!showComps)} className="btn btn-ghost mt-4">
          {showComps ? '▲ Hide Comps & Chart' : '▼ Show Comps & Chart'}
        </button>

        {showComps && (
          <div className="mt-6 space-y-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-lg mb-4">📊 Comparative Market Analysis</h3>
              <MarketChart 
                listingPrice={property.listingPrice}
                estimatedValue={aiAnalysis.estimatedValue}
              />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">🏘️ Comparable Properties</h3>
              <div className="grid gap-3">
                {aiAnalysis.comparableSales.map((comp, i) => (
                  <div key={i} className="flex justify-between bg-white p-3 rounded-lg border">
                    <span className="font-medium">{comp.address}</span>
                    <span>${comp.price.toLocaleString()} | {comp.sqft} sqft | ${comp.pricePerSqft.toFixed(0)}/sqft</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}