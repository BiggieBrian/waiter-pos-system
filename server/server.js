import express from "express";
import { connectDB } from "./config/db.js";
import config from "./config/config.js";
import cors from "cors";
import dotenv from "dotenv";
import tableRoutes from "./routes/tables.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import userRoutes from "./routes/users.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/orders", orderRoutes);

const PORT = config.port;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
