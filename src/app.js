import express from "express";
import cors from "cors";
import helmet from "helmet";
import contactRoutes from "./routes/contact.routes.js";

import authRoutes from "./routes/auth.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import testCloudinaryRoutes from "./routes/test-cloudinary.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://madhavart.vercel.app/",
    ],
    credentials: true,
  })
);

app.use(helmet());

app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/test-cloudinary", testCloudinaryRoutes);
app.use(
  "/api/contact",
  contactRoutes
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

export default app;