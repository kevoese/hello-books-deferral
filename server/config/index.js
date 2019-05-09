import dotenv from "dotenv";
import auth from "@config/auth";
import server from "@config/server";
import database from "@config/database";

dotenv.config();

export default {
  auth: auth(),
  server: server(),
  database: database()
};
