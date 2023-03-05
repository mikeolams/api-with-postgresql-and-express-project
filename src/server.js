"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import cors from 'cors'
const productsRoute_1 = __importDefault(require("./handlers/productsRoute"));
const usersRoute_1 = __importDefault(require("./handlers/usersRoute"));
const ordersRoute_1 = __importDefault(require("./handlers/ordersRoute"));
var cors = require('cors');
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200 //some legacy browsers (IE11,various)
};
app.use(cors(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', cors(corsOptions), function (req, res, next) {
    res.send('Hello World!');
});
(0, productsRoute_1.default)(app);
(0, usersRoute_1.default)(app);
(0, ordersRoute_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
