import dotenv from "dotenv";
dotenv.config();

export const config = {
  mongoUri: process.env.MONGOURI,
  port: process.env.PORT || 5000,
};
export const admin = {
  adminUserName: process.env.ADMIN_USER,
  adminPassword: process.env.ADMIN_PASS,
};
