import express from "express";
import cors from "cors";
import valentineRoutes from "./routes/valentineRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/valentine", valentineRoutes);

export default app;
