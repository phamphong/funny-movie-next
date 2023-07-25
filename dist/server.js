"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const wsUtil_1 = require("./utils/wsUtil");
const port = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOSTNAME;
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev, hostname, port });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    let server = (0, http_1.createServer)((req, res) => {
        const parsedUrl = (0, url_1.parse)(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port);
    wsUtil_1.wsUtil.onInit(server);
    console.log(`> Server listening at http://localhost:${port} as ${dev ?
        'development'
        :
            process.env.NODE_ENV}`);
});
