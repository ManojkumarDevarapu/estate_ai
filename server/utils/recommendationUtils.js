export const getPriceRecommendation = (listingPrice, estimatedValue) => {
  const diffPercent = ((estimatedValue - listingPrice) / listingPrice) * 100;

  if (diffPercent > 8) return "underpriced";
  if (diffPercent < -8) return "overpriced";
  return "fair";
};
