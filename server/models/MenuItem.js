import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Main", "Side", "Drink", "Dessert", "Other"],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },

    stockQty: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export { MenuItem };
