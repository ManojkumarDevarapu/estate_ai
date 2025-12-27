import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    sqft: {
      type: Number,
      required: true,
      min: 200,
      max: 50000,
    },

    bedrooms: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    bathrooms: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    listingPrice: {
      type: Number,
      required: true,
      min: 10000,
      max: 100000000, // 100M
    },

    aiAnalysis: {
      estimatedValue: {
        type: Number,
        required: true,
      },
      confidence: {
        type: Number,
        min: 0,
        max: 100,
      },
      recommendation: {
        type: String,
        enum: ["underpriced", "fair", "overpriced"],
      },
      reasoning: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
