import { Express } from "express";
import { Router } from "express";

const router = Router();

const mountSockets = (app: Express) => {
  router.ws("/", (ws, _req) => {
    console.log("connection established");

    ws.on("message", (msg) => {
      console.log(`recieved: ${msg}`);
      ws.send(`Echo: ${msg}`);
    });

    ws.on("close", () => {
      console.log("connection closed");
    });
  });

  app.use("/game", router);
};

export default mountSockets;
