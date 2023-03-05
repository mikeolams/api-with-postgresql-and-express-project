"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var order_1 = require("../models/order");
var jwt = require('jsonwebtoken');
var store = new order_1.OrderStore();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, userId, productId, orderStatus, productQuantityOrder, orders, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = parseInt(req.params.id);
                userId = parseInt(req.body.userId);
                productId = parseInt(req.body.productId);
                orderStatus = req.body.orderStatus;
                productQuantityOrder = parseInt(req.body.productQuantityOrder);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.index(userId)];
            case 2:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var showCompleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, userId, orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = parseInt(req.params.id);
                userId = parseInt(req.params.id);
                return [4 /*yield*/, store.completeUserOrders(userId)];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [2 /*return*/];
        }
    });
}); };
//  const create = async (req: Request, res: Response) => {
//     try {
//         const order: Order = {
//             id: req.body.id,
//             productId: req.body.productId,
//             userId:req.body.userId,
//             productQuantityOrder: req.body.productQuantityOrder,
//             orderStatus:req.body.orderStatus
//         }
//         const newOrder = await store.createOrder(order)
//         res.json(newOrder)
//     } catch(err) {
//         res.status(400)
//         res.json(err)
//     }
// }
var addOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                order = {
                    id: parseInt(req.body.id),
                    productId: parseInt(req.body.productId),
                    userId: req.body.userId,
                    productQuantityOrder: req.body.productQuantityOrder,
                    orderStatus: req.body.orderStatus
                };
                return [4 /*yield*/, store.addOrder(order.id, order.productId, order.userId, order.productQuantityOrder, order.orderStatus)];
            case 1:
                newOrder = _a.sent();
                res.json(newOrder);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        //@ts-ignore
        var token = authorizationHeader.split(' ')[1];
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded.id !== req.body.id) {
            throw new Error('User is not authorised for this action!');
        }
        next();
    }
    catch (error) {
        res.status(401);
    }
};
var order_routes = function (app) {
    app.get('/orders/user/:id', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, showCompleteOrder);
    app.post('/orders', verifyAuthToken, addOrder);
    // app.post('/orders', create)
};
exports["default"] = order_routes;
