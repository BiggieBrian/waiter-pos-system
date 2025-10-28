// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, trim: true }
});

const Category = mongoose.model("Category", categorySchema);
export {Category}