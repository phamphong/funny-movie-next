"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.encodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const encodeToken = (input) => {
    const secret = process.env.SECRET_TOKEN || "APP_SECRET_TOKEN_1975917509175091702570";
    return jsonwebtoken_1.default.sign(input, secret, {
        algorithm: "HS256"
    });
};
exports.encodeToken = encodeToken;
const decodeToken = (token) => {
    const secret = process.env.SECRET_TOKEN || "APP_SECRET_TOKEN_1975917509175091702570";
    return jsonwebtoken_1.default.verify(token, secret, {
        algorithms: ["HS256"]
    });
};
exports.decodeToken = decodeToken;
