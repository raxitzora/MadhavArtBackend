import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await cloudinary.api.ping();

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

export default router;