import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { randomUUID } from "crypto";
import { decodeToken } from "./tokenUtil";
import { parse } from "cookie";

class WebSocketUtil {
  wss?: WebSocketServer;
  user: { [name: string]: WebSocket } = {};

  onInit(server: Server) {
    this.wss = new WebSocket.Server({
      server,
      path: "/notify",
    });

    this.wss.on('connection', async (ws, req) => {
      let uuid = randomUUID();
      this.send({ message: "connect" }, ws);
      let authorization = req.headers.authorization;
      let token;
      if (authorization) {
        authorization?.split(" ")[1];
      } else {
        let cookie = parse(req.headers.cookie ?? "");
        token = cookie["token"];
      }
      let validation = token ? await decodeToken(token) : undefined;

      if (validation?.email) {
        this.user[uuid] = ws;
        this.send({ message: "authorized" }, ws);
      } else {
        this.send({ message: "unauthorized" }, ws);
        ws.close();
      }

      ws.onclose = () => {
        delete this.user[uuid];
      }
    });
  }

  send(message: any, ws: WebSocket) {
    ws.send(JSON.stringify(message));
  }

  onMessage() {
  }

  broadcast(message: any) {
    console.log("broadcast")
    Object.values(this.user).map((ws) => {
      ws.send(JSON.stringify(message))
    })
  }
}

const websocketUtil = new WebSocketUtil();

const globalWSHandler = global as typeof global & {
  wsUtil?: WebSocketUtil;
};

if (!globalWSHandler.wsUtil) {
  globalWSHandler.wsUtil = websocketUtil;
}

export const wsUtil = globalWSHandler.wsUtil;
