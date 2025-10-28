import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ["Admin", "Manager", "Waiter", "Cashier", "Chef"],
      default: "Waiter",
    },

    assignedTables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
      },
    ],

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
