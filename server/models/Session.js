import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    waiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // role: Waiter
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[0-9]{7,15}$/, "Please provide a valid phone number"],
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export { Session };
