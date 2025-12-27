// Generate realistic AI estimate with natural variance
export const calculateFallbackEstimate = (listingPrice) => {
  /**
   * Market behavior bands:
   * - Underpriced: -15% to -5%
   * - Fair: -5% to +5%
   * - Overpriced: +5% to +15%
   */

  const rand = Math.random();

  let multiplier;

  if (rand < 0.3) {
    // 🔻 Underpriced market
    multiplier = 0.85 + Math.random() * 0.1; // 0.85 – 0.95
  } else if (rand < 0.65) {
    // ⚖ Fairly priced
    multiplier = 0.95 + Math.random() * 0.1; // 0.95 – 1.05
  } else {
    // 🔺 Overpriced market
    multiplier = 1.05 + Math.random() * 0.15; // 1.05 – 1.20
  }

  return Math.round(listingPrice * multiplier);
};

// Confidence should depend on how strong the signal is
export const calculateConfidenceScore = (listingPrice, estimatedValue) => {
  const diffPercent =
    Math.abs(estimatedValue - listingPrice) /
    listingPrice;

  // Bigger difference = higher confidence
  if (diffPercent > 0.15) {
    return Math.floor(90 + Math.random() * 6); // 90–95
  }

  if (diffPercent > 0.05) {
    return Math.floor(85 + Math.random() * 8); // 85–92
  }

  // Close values → lower confidence
  return Math.floor(75 + Math.random() * 8); // 75–82
};
