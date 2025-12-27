export const buildPropertyPrompt = (property) => {
  return `
You are a professional real estate market analyst.

Analyze the following property and return ONLY valid JSON:

{
  "estimatedValue": number,
  "confidence": number,
  "recommendation": "underpriced" | "fair" | "overpriced",
  "reasoning": string
}

Property Details:
City: ${property.city}
State: ${property.state}
Square Feet: ${property.sqft}
Bedrooms: ${property.bedrooms}
Bathrooms: ${property.bathrooms}
Listing Price: ${property.listingPrice}

Consider:
- Location desirability
- Property size
- Market trends
- Comparable pricing
`;
};
