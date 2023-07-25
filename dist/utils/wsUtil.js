"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsUtil = void 0;
const ws_1 = __importDefault(require("ws"));
const crypto_1 = require("crypto");
const tokenUtil_1 = require("./tokenUtil");
const cookie_1 = require("cookie");
class WebSocketUtil {
    constructor() {
        this.user = {};
    }
    onInit(server) {
        this.wss = new ws_1.default.Server({
            server,
            path: "/notify",
        });
        this.wss.on('connection', async (ws, req) => {
            var _a;
            let uuid = (0, crypto_1.randomUUID)();
            this.send({ message: "connect" }, ws);
            let authorization = req.headers.authorization;
            let token;
            if (authorization) {
                authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
            }
            else {
                let cookie = (0, cookie_1.parse)((_a = req.headers.cookie) !== null && _a !== void 0 ? _a : "");
                token = cookie["token"];
            }
            let validation = token ? await (0, tokenUtil_1.decodeToken)(token) : undefined;
            if (validation === null || validation === void 0 ? void 0 : validation.email) {
                this.user[uuid] = ws;
                this.send({ message: "authorized" }, ws);
            }
            else {
                this.send({ message: "unauthorized" }, ws);
                ws.close();
            }
            ws.onclose = () => {
                delete this.user[uuid];
            };
        });
    }
    send(message, ws) {
        ws.send(JSON.stringify(message));
    }
    onMessage() {
    }
    broadcast(message) {
        console.log("broadcast");
        Object.values(this.user).map((ws) => {
            ws.send(JSON.stringify(message));
        });
    }
}
const websocketUtil = new WebSocketUtil();
const globalWSHandler = global;
if (!globalWSHandler.wsUtil) {
    globalWSHandler.wsUtil = websocketUtil;
}
exports.wsUtil = globalWSHandler.wsUtil;
