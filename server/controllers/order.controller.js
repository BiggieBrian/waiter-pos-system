import { Order } from "../models/Order.js";
import { Session } from "../models/Session.js";
import { MenuItem } from "../models/MenuItem.js";


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "session",
        populate: { path: "table", select: "number" } 
      })
      .populate("items.menuItem").sort({createdAt: -1}); 

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Error in getting orders",
      error: error.message,
    });
  }
};


export const createOrder = async (req, res) => {
  try {
    const { sessionId, items } = req.body;

    // make sure session exists and is active
    const session = await Session.findById(sessionId);
    if (!session || session.status !== "Active") {
      return res.status(400).json({ message: "Invalid or inactive session" });
    }

    // extract all menuItem IDs from request
    const itemIds = items.map((i) => i.menuItem);

    // fetch all menu items at once
    const menuItems = await MenuItem.find({ _id: { $in: itemIds } });

    // check for missing menu items
    if (menuItems.length !== itemIds.length) {
      return res
        .status(404)
        .json({ message: "One or more menu items not found" });
    }

    // calculate total
    let total = 0;
    items.forEach((i) => {
      const menuItem = menuItems.find((m) => m._id.toString() === i.menuItem);
      total += menuItem.price * i.qty;
    });

    const newOrder = new Order({
      session: sessionId,
      items,
      total,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Get all orders for a session
export const getOrdersBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const orders = await Order.find({ session: sessionId }).populate(
      "items.menuItem"
    );
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

export const getDailyOrders = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const orders = await Order.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate({
        path: "session",
        populate: { path: "table", select: "number" },
      })
      .populate("items.menuItem");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Error in getting orders",
      error: error.message,
    });
  }
};

