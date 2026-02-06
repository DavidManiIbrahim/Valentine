import express from "express";
import cors from "cors";
import valentineRoutes from "./routes/valentineRoutes.js";

const app = express();

// Configure CORS properly
const corsOptions = {
  origin: [
    "https://valentineday.pxxl.click",      // Your production frontend
    "http://localhost:5173",                 // Vite dev
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept"
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400 // 24 hours for preflight cache
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(express.json());
app.use("/api/valentine", valentineRoutes);

export default app;
