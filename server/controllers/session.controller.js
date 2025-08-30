import { Session } from "../models/Session.js";
import { Table } from "../models/Table.js";
import { User } from "../models/User.js";

// Start a new session
export const createSession = async (req, res) => {
  try {
    const { tableId } = req.body;

    // ensure table exists
    const table = await Table.findById(tableId);
    if (!table) return res.status(404).json({ message: "Table not found" });

    // get all available waiters
    const waiters = await User.find({ role: "Waiter" });
    if (!waiters.length) {
      return res.status(400).json({ message: "No waiters available" });
    }

    // pick a random waiter
    const randomWaiter = waiters[Math.floor(Math.random() * waiters.length)];

    const newSession = new Session({
      table: tableId,
      waiter: randomWaiter._id,
      status: "Active",
      startedAt: new Date(),
    });

    const saved = await newSession.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating session", error: error.message });
  }
};

// End a session
export const closeSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.status = "Closed";
    session.endTime = Date.now();
    await session.save();

    res.status(200).json(session);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error ending session", error: error.message });
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
