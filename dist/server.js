"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import cors from 'cors'
const productsRoute_1 = require("./handlers/productsRoute");
const usersRoute_1 = require("./handlers/usersRoute");
const ordersRoute_1 = require("./handlers/ordersRoute");
var cors = require('cors');
exports.app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200 //some legacy browsers (IE11,various)
};
exports.app.use(cors(corsOptions));
exports.app.use(body_parser_1.default.json());
exports.app.get('/', cors(corsOptions), function (_req, res, next) {
    res.send('Hello World!');
});
(0, productsRoute_1.product_routes)(exports.app);
(0, usersRoute_1.user_routes)(exports.app);
(0, ordersRoute_1.order_routes)(exports.app);
exports.app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
