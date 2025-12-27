import { useState } from 'react';
import axios from 'axios';

export default function PropertyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    lotSize: 0.25,
    yearBuilt: 2005,
    listingPrice: 475000
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['bedrooms','bathrooms','sqft','lotSize','yearBuilt','listingPrice'].includes(name)
        ? parseFloat(value)
        : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/properties', formData);
      onSubmit(res.data);
    } catch (error) {
      alert('❌ Analysis failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">➕ Add New Property</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium mb-1">Address</label><input name="address" value={formData.address} onChange={handleChange} className="input input-bordered w-full" required /></div>
        <div><label className="block text-sm font-medium mb-1">City</label><input name="city" value={formData.city} onChange={handleChange} className="input input-bordered w-full" required /></div>
        <div><label className="block text-sm font-medium mb-1">State</label><input name="state" value={formData.state} onChange={handleChange} className="input input-bordered w-full" required /></div>
        <div><label className="block text-sm font-medium mb-1">ZIP Code</label><input name="zipCode" value={formData.zipCode} onChange={handleChange} className="input input-bordered w-full" required /></div>
        <div><label className="block text-sm font-medium mb-1">Bedrooms</label><input name="bedrooms" type="number" min="1" value={formData.bedrooms} onChange={handleChange} className="input input-bordered w-full" required /></div>
        <div><label className="block text-sm font-medium mb-1">Bathrooms</label><input name="bathrooms" type="number" min="1" step="0.5" value={formData.bathrooms} onChange={handleChange} className="input input-bordered w-full" required /></div>
        <div><label className="block text-sm font-medium mb-1">Square Feet</label><input name="sqft" type="number" min="100" value={formData.sqft} onChange={handleChange} className="input input-bordered w-full" required /></div>
        <div><label className="block text-sm font-medium mb-1">Lot Size (acres)</label><input name="lotSize" type="number" min="0.1" step="0.01" value={formData.lotSize} onChange={handleChange} className="input input-bordered w-full" required /></div>
        <div><label className="block text-sm font-medium mb-1">Year Built</label><input name="yearBuilt" type="number" min="1900" max="2025" value={formData.yearBuilt} onChange={handleChange} className="input input-bordered w-full" required /></div>
        <div><label className="block text-sm font-medium mb-1">Listing Price ($)</label><input name="listingPrice" type="number" min="50000" value={formData.listingPrice} onChange={handleChange} className="input input-bordered w-full" required /></div>
        <div className="md:col-span-2">
          <button type="submit" disabled={loading} className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}>
            {loading ? 'Analyzing with AI...' : '🔍 Run AI Market Analysis'}
          </button>
        </div>
      </form>
    </div>
  );
}