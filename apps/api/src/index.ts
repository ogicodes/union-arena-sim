import "dotenv/config";
import cors from "cors";
import express from "express";
import router from "./routes";

const PORT = process.env.API_PORT;

const api = express();

api.use(cors());
api.use(express.json());

api.use(router);

api.listen(PORT, () => {
  console.log(`🚀 API took off on PORT: ${PORT}`);
});
