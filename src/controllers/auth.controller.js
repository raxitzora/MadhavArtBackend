import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";
import generateToken from "../config/generateToken.js";

export const loginAdmin = async (req, res) => {
    
  try {

    const { username, password } = req.body;

    const admin = await Admin.findOne({
      username,
    });
    

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

        console.log("Entered Password:", password);
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );


    console.log("Password Match:", isMatch);
console.log("Stored Hash:", admin.password);


    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(admin._id);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};