import "dotenv/config";
import cors from "cors";
import express from "express";
import router from "./routes";
import expressWs from "express-ws";
import mountSockets from "./websocket/game";

const PORT = process.env.API_PORT;

const api = express();
expressWs(api);

api.use(cors());
api.use(express.json());

mountSockets(api);

api.use(router);

api.listen(PORT, () => {
  console.log(`🚀 API took off on PORT: ${PORT}`);
});
