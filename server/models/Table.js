import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true, // each table number must be unique
    },
    qrCode: {
      type: String, // stores QR code image as base64 or a URL path
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Reserved"],
      default: "Available",
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
export { Table };
