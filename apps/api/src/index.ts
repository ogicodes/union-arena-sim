import "dotenv/config";
import cors from "cors";
import express from "express";
import router from "./routes";
import { configure as configureSockets } from "./sockets";

const PORT = process.env.API_PORT || 1930;

const api = express();

api.use(cors());
api.use(express.json());

api.use(router);

configureSockets(
  api.listen(PORT, () => {
    console.log(`🚀 API took off on PORT: ${PORT}`);
  }),
);
