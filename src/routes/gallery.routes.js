import express from "express";

import upload from "../config/multer.js";

import { protect } from "../middleware/auth.middleware.js";

import {
  createGalleryItem,getGalleryItems,deleteGalleryItem,updateGalleryItem
} from "../controllers/gallery.controller.js";


const router = express.Router();
router.get("/", getGalleryItems);
router.post(
  "/",
  protect,

  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },

    {
      name: "variants",
      maxCount: 50,
    },
  ]),

  createGalleryItem
);
router.delete(
  "/:id",
  protect,
  deleteGalleryItem
);


router.put(
  "/:id",
  protect,
  updateGalleryItem
);
export default router;