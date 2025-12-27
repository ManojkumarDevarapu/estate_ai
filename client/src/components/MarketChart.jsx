import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function MarketChart({ listingPrice, estimatedValue }) {
  const data = [
    { name: 'Listing Price', price: listingPrice },
    { name: 'AI Estimate', price: estimatedValue }
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: '#4b5563' }} />
          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: '#4b5563' }} width={60} />
          <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Price']} />
          <Bar dataKey="price" radius={[4, 4, 0, 0]}>
            <Cell fill="#3b82f6" />
            <Cell fill="#10b981" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}