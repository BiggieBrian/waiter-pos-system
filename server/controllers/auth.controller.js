import { admin } from "../config/config.js";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === admin.adminUserName && password === admin.adminPassword) {
      return res.status(200).json({ success: true });
    }

    return res
      .status(401)
      .json({ success: false, error: "Invalid Credentials" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
