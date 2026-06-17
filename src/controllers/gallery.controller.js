import Gallery from "../models/Gallery.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

export const createGalleryItem = async (req, res) => {
  try {
    const { title, category, label } = req.body;

    if (!title || !category || !label) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.files?.thumbnail?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail is required",
      });
    }

    const thumbnailFile = req.files.thumbnail[0];

    const thumbnailUpload =
      await uploadToCloudinary(
        thumbnailFile.buffer,
        "madhavart/thumbnails"
      );

    let variants = [];

    if (req.files?.variants?.length) {
      variants = await Promise.all(
        req.files.variants.map(async (file) => {
          const upload =
            await uploadToCloudinary(
              file.buffer,
              "madhavart/variants"
            );

          return {
  url: upload.secure_url,
  public_id: upload.public_id
};
        })
      );
    }

    const galleryItem = await Gallery.create({
      title,
      category,
      label,
    thumbnail: {
  url: thumbnailUpload.secure_url,
  public_id: thumbnailUpload.public_id,
},
      variants,
    });

    return res.status(201).json({
      success: true,
      data: galleryItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find()
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    console.log("DELETE ITEM:");
console.log(JSON.stringify(item, null, 2));

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    await cloudinary.uploader.destroy(
      item.thumbnail.public_id
    );

    await Promise.all(
      item.variants.map((variant) =>
        cloudinary.uploader.destroy(
          variant.public_id
        )
      )
    );

    await Gallery.findByIdAndDelete(
      req.params.id
    );

    return res.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { title, category, label } = req.body;

    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    item.title = title || item.title;
    item.category = category || item.category;
    item.label = label || item.label;

    await item.save();

    return res.json({
      success: true,
      message: "Gallery item updated successfully",
      data: item,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};