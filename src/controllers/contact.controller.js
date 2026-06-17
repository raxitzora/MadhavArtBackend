import Contact from "../models/Contact.js";
import {
  sendInquiryEmail,
} from "../services/mail.service.js";
export const createContact =
  async (req, res) => {
    try {
      const {
        fullName,
        phone,
        email,
        message,
      } = req.body;

      if (
        !fullName ||
        !phone ||
        !email ||
        !message
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All fields are required",
        });
      }

      const inquiry =
        await Contact.create({
          fullName,
          phone,
          email,
          message,
        });

        await sendInquiryEmail({
  fullName,
  phone,
  email,
  message,
});

      return res.status(201).json({
        success: true,
        message:
          "Inquiry submitted successfully",
        data: inquiry,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getContacts =
  async (req, res) => {
    try {
      const contacts =
        await Contact.find()
          .sort({
            createdAt: -1,
          });

      return res.json({
        success: true,
        data: contacts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };