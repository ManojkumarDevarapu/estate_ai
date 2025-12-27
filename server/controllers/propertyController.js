import Property from "../models/Property.js";
import { analyzePropertyWithAI } from "../utils/openaiService.js";

/**
 * POST /api/properties/analyze
 * Analyze property + save (USER-SPECIFIC)
 */
export const analyzeAndCreateProperty = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      address,
      city,
      state,
      sqft,
      bedrooms,
      bathrooms,
      listingPrice,
    } = req.body;

    /* ===============================
       VALIDATION (CRITICAL)
    ================================ */
    if (
      !address ||
      !city ||
      !state ||
      sqft === undefined ||
      bedrooms === undefined ||
      bathrooms === undefined ||
      listingPrice === undefined
    ) {
      return res.status(400).json({
        message: "All property fields are required",
      });
    }

    if (
      sqft <= 0 ||
      bedrooms <= 0 ||
      bathrooms <= 0 ||
      listingPrice <= 0
    ) {
      return res.status(400).json({
        message: "Numeric values must be greater than zero",
      });
    }

    if (bedrooms > 20 || bathrooms > 20) {
      return res.status(400).json({
        message: "Unrealistic bedroom or bathroom count",
      });
    }

    if (sqft < 200 || sqft > 50000) {
      return res.status(400).json({
        message: "Square feet value looks invalid",
      });
    }

    /* ===============================
       AI ANALYSIS
    ================================ */
    const aiAnalysis = await analyzePropertyWithAI({
      city,
      state,
      sqft,
      bedrooms,
      bathrooms,
      listingPrice,
    });

    /* ===============================
       SAVE PROPERTY
    ================================ */
    const property = await Property.create({
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      sqft,
      bedrooms,
      bathrooms,
      listingPrice,
      aiAnalysis,
      user: userId,
    });

    res.status(201).json(property);
  } catch (error) {
    console.error("Analyze property error:", error);
    res.status(500).json({
      message: "Failed to analyze and save property",
    });
  }
};

/**
 * GET /api/properties
 * Fetch USER-SPECIFIC history
 */
export const getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      user: req.user._id,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    console.error("Fetch history error:", error);
    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};

/**
 * DELETE /api/properties/:id
 * Delete property (OWNER ONLY)
 */
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    await property.deleteOne();

    res.json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);
    res.status(500).json({
      message: "Failed to delete property",
    });
  }
};
