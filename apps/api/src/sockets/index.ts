import { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

const HEARTBEAT_INTERVAL = 1000 * 15; // 15sec

/** http server error */
const onSocketPreError = (e: Error) => {
  console.error(`socket pre error \n`, e);
};

/** ws server error */
const onSocketError = (e: Error) => {
  console.error(`socket error \n`, e);
};

function heartBeat(ws: WebSocket) {
  ws.isAlive = true;
}

export const configure = (s: Server) => {
  /** Prefer to manually upgrade the connection */
  const wss = new WebSocketServer({ noServer: true });

  /** Handle the upgrade */
  s.on("upgrade", (req, socket, head) => {
    socket.on("error", onSocketPreError);

    wss.handleUpgrade(req, socket, head, (ws) => {
      socket.removeListener("error", onSocketPreError); // no longer listening to errors
      wss.emit("connection", ws, req); // emit the connection event
    });
  });

  wss.on("connection", (ws: WebSocket, _req) => {
    ws.isAlive = true;
    ws.on("error", onSocketError);

    ws.on("pong", heartBeat);

    ws.on("message", (message, isBinary) => {
      wss.clients.forEach((client) => {
        // if (ws !== client) {} // only send to those who are not the client.
        if (client.readyState === WebSocket.OPEN) {
          client.send(message, { binary: isBinary });
        }
      });
    });

    const pingPongInterval = setInterval(() => {
      wss.clients.forEach((ws) => {
        const socket = ws as WebSocket;
        if (socket.isAlive === false) return socket.terminate();
        socket.isAlive = false;
        socket.ping();
      });
    }, HEARTBEAT_INTERVAL);

    ws.on("close", (code, reason) => {
      clearInterval(pingPongInterval);
      console.log(`Connection closed: ${code} - ${reason}`);
    });
  });
};
