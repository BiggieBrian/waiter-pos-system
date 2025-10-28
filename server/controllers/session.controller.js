import { Session } from "../models/Session.js";
import { Table } from "../models/Table.js";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";

// Start a new session
export const createSession = async (req, res) => {
  try {
    const { tableId } = req.params;
    const { customerName, customerPhone } = req.body;

    // ensure table exists
    const table = await Table.findById(tableId);
    if (!table) return res.status(404).json({ message: "Table not found" });

    // check table availability
    if (table.status !== "Available") {
      return res.status(400).json({ message: "Table is not available" });
    }

    // get all available waiters
    const waiters = await User.find({ role: "Waiter" });
    if (!waiters.length) {
      return res.status(400).json({ message: "No waiters available" });
    }

    // pick a random waiter (later you can optimize: least busy waiter)
    const randomWaiter = waiters[Math.floor(Math.random() * waiters.length)];

    // create session
    const newSession = new Session({
      table: tableId,
      waiter: randomWaiter._id,
      customerName,
      customerPhone,
      status: "Active",
      startTime: new Date(),
    });

    const saved = await newSession.save();

    // ✅ update table status
    table.status = "Occupied";
    await table.save();

    res.status(201).json({
      message: "Session started successfully",
      session: saved,
      table,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating session",
      error: error.message,
    });
  }
};

// End a session
// End a session
export const closeSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    //Session Totals
    const sessionOrders = await Order.find({ session: id });
    let total = 0;
    sessionOrders.forEach((i) => {
      total += i.total || 0;
    });

    // update session
    session.total = Number(total)
    session.status = "Closed";
    session.endTime = Date.now();
    await session.save();


    const table = await Table.findById(session.table);
    if (table) {
      table.status = "Available";
      await table.save();
    }

    res.status(200).json({
      message: "Session closed successfully",
      session,
      table,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error ending session",
      error: error.message,
    });
  }
};

// Get active sessions
export const getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "Active" }).populate(
      "table waiter"
    );
    res.status(200).json(sessions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sessions", error: error.message });
  }
};

export const getDailyActiveSessions = async (req, res) => {
  try {
    // Make sure 'today' is a real Date object
    const today = new Date();

    // Clone 'today' before modifying hours to avoid reusing the same mutated object
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    console.log({ startOfDay, endOfDay });


    // Correct query: filter by both status and createdAt range
    const sessions = await Session.find({
      status: "Active",
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).populate("table waiter");

    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({
      message: "Error fetching sessions",
      error: error.message,
    });
  }
};



// Get a single session
export const getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId).populate("table waiter");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status === "Closed") {
      return res.status(400).json({
        message: "This session is closed",
        tableId: session.table?.toString(), // 👈 always include
      });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching session",
      error: error.message,
    });
  }
};
