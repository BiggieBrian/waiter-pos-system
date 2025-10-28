import mongoose from "mongoose";
import { Session } from "../models/Session.js";

export const getDailySales = async (req, res) => {
  try {
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    console.log({ startOfDay, endOfDay });

    const sessions = await Session.find({
      status: "Closed",
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const total = sessions.reduce((acc, s) => acc + (Number(s.total) || 0), 0);

    // Respond with sessions and total
   res.status(200).json({
  message: "Daily sales fetched successfully",
  totalSales: total,
  sessionCount: sessions.length,
  sessions,
});

  } catch (error) {
    console.error("Error fetching daily sales:", error);
    res.status(500).json({
      message: "Error fetching daily sales",
      error: error.message,
    });
  }
};
