import dotenv from "dotenv";

dotenv.config();
import nodemailer from "nodemailer";

const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },
  });

export const sendInquiryEmail =
  async ({
    fullName,
    phone,
    email,
    message,
  }) => {
    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to:
        process.env.EMAIL_USER,

      subject:
        "New MadhavArt Inquiry",

      html: `
        <h2>New Inquiry Received</h2>

        <p>
          <strong>Name:</strong>
          ${fullName}
        </p>

        <p>
          <strong>Phone:</strong>
          ${phone}
        </p>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Message:</strong>
          ${message}
        </p>
      `,
    });
  };