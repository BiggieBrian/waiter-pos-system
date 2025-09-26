import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGOURI,
};

export const admin = {
  adminUserName: process.env.ADMIN_USER,
  adminPassword: process.env.ADMIN_PASS,
};
