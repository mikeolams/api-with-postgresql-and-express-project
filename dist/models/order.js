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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.show = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var getUserOrderId;
            return __generator(this, function (_a) {
                getUserOrderId = function () {
                    //@ts-ignore
                    var connServer = database_1["default"].connect();
                    var sql = 'SELECT id FROM order WHERE user_id=($1) ORDER BY id DESC LIMIT 1';
                    var result = connServer.query(sql, userId);
                    connServer.release();
                    var orderId = result.rows;
                    return orderId;
                };
                // type orderId:string;
                return [2 /*return*/, getUserOrderId().then(function (orderId) {
                        //@ts-ignore
                        var connServer = database_1["default"].connect();
                        var sql = 'SELECT * FROM order_products WHERE order_id=($1) ORDER BY order_id DESC LIMIT 1';
                        var result = connServer.query(sql, parseInt(orderId));
                        connServer.release();
                        // order = result.rows
                        var userCurrentOrder = result.rows;
                        return userCurrentOrder;
                    })["catch"](function (err) { return (" Could not process this request: ".concat(err)); })
                    //     // try {
                    //     //     //@ts-ignore
                    //     //     const conn = await Client.connect()
                    //     //     let userCurrentOrder:undefined
                    //     //     // const userCurrentOrder:ProductOrder = []
                    //     //     // let  order=[];
                    //     //     const sql = 'SELECT id FROM order WHERE user_id=($1) ORDER BY id DESC LIMIT 1'
                    //     //     const result = await conn.query(sql,userId)
                    //     //     conn.release()
                    //     //     const orderId = result.rows
                    //     //     if (orderId !== null) {
                    //     //         try {
                    //     //             //@ts-ignore
                    //     //             const conn = await Client.connect()
                    //     //             const sql = 'SELECT * FROM order_products WHERE order_id=($1) ORDER BY order_id DESC LIMIT 1'
                    //     //             const result = await conn.query(sql,orderId)
                    //     //             conn.release()
                    //     //             // order = result.rows
                    //     //             userCurrentOrder = result.rows
                    //     //         }catch (err) {
                    //     //             throw new Error (` Could not list current orders: ${err}`)
                    //     //         }
                    //     //       }
                    //     //     //   const userCurrentOrder:ProductOrder = order
                    //     //       return userCurrentOrder
                    //     // }catch (err) {
                    //     //     throw new Error (` Could not find user id: ${err}`)
                    //     // }
                ];
            });
        });
    };
    OrderStore.prototype.completeUserOrders = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var getCompleteOrder;
            return __generator(this, function (_a) {
                getCompleteOrder = function () {
                    //@ts-ignore
                    var connServer = database_1["default"].connect();
                    var sql = 'SELECT id FROM order WHERE user_id=($1)';
                    var result = connServer.query(sql, userId);
                    connServer.release();
                    var orderIds = result.rows;
                    return orderIds;
                };
                return [2 /*return*/, getCompleteOrder().then(function (orderIds) {
                        orderIds.forEach(function (orderId) {
                            var userAllOrders = [];
                            //@ts-ignore
                            var connServer = database_1["default"].connect();
                            var sql = 'SELECT * FROM order_products WHERE user_id=($1)';
                            var result = connServer.query(sql, parseInt(orderId));
                            connServer.release();
                            // @ts-ignore
                            userAllOrders.push(JSON.parse(result.rows));
                            // userAllOrders.push(JSON.parse(result.rows)) 
                            // const userAllOrders:ProductsInOrder = result.rows
                            //  const userCurrentOrder:ProductOrder = result.rows
                            //                    userAllOrders.push(result.rows) JSON.parse()
                            return userAllOrders;
                        });
                    })["catch"](function (err) { return (" Could not process this request: ".concat(err)); })];
            });
        });
    };
    // async completeUserOrders(userId:number): Promise<ProductsInOrder> {
    //     try {
    //         //@ts-ignore
    //         const connServer = await Client.connect()
    //         const userOrders:ProductsInOrder = [];
    //         // let userOrders:Array<A> ;
    //         const sql = 'SELECT id FROM order WHERE user_id=($1)'
    //         const result = await connServer.query(sql,userId)
    //         connServer.release()
    //         const ordersId:string[] = result.rows
    //         if (ordersId !== null) {
    //             ordersId.forEach( orderId => { });
    //                 try {
    //                     //@ts-ignore
    //                    const connServer = await Client.connect()
    //                    const sql = 'SELECT * FROM order_products WHERE user_id=($1)'
    //                    const result = connServer.query(sql,orderId)
    //                    connServer.release()
    //                    userOrders.push(result.rows) 
    //                }catch (err) {
    //                    throw new Error (` Could not list orders: ${err}`)
    //                }
    //             });
    //           }
    //           return userOrders
    //     }catch (err) {
    //         throw new Error (` Could not find user id: ${err}`)
    //     }
    //         }
    OrderStore.prototype.addProductOrder = function (orderId, productId, productQuantityOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersql, connServer, result, order, err_1, sql, connServer, result, productsOrder, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        ordersql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connServer = _a.sent();
                        return [4 /*yield*/, connServer.query(ordersql, [orderId])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        if (order.orderStatus !== "active") {
                            throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, " because order status is ").concat(order.status));
                        }
                        connServer.release();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("".concat(err_1));
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        sql = 'INSERT INTO order_products ( order_Id, product_id, product_quantity_order) VALUES($1,$2,$3)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 5:
                        connServer = _a.sent();
                        return [4 /*yield*/, connServer.query(sql, [orderId, productId, productQuantityOrder])];
                    case 6:
                        result = _a.sent();
                        productsOrder = result.rows[0];
                        connServer.release();
                        return [2 /*return*/, productsOrder];
                    case 7:
                        err_2 = _a.sent();
                        throw new Error(" Could not add ordered product for product id ".concat(productId, ": ").concat(err_2));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connServer, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connServer = _a.sent();
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, connServer.query(sql)];
                    case 2:
                        result = _a.sent();
                        connServer.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error(" Could not list orders: ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.createOrder = function (O) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connServer, result, order, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'INSERT INTO orders ( user_id, order_status) VALUES($1,$2)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connServer = _a.sent();
                        return [4 /*yield*/, connServer.query(sql, [O.userId, O.orderStatus])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connServer.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error(" Could not create order ".concat(O.id, ": ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
