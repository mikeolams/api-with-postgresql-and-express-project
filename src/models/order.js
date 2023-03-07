"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async show(userId) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM order_products WHERE user_id=($1) ORDER BY order_id DESC LIMIT 1';
            const result = await conn.query(sql, userId);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Could not list orders: ${err}`);
        }
    }
    async completeUserOrders(userId) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM order_products WHERE user_id=($1)';
            const result = await conn.query(sql, userId);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Could not list orders: ${err}`);
        }
    }
    async addProductOrder(orderId, productId, userId, quantityOrder) {
        // get order to see if it is active
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(ordersql, [orderId]);
            const order = result.rows[0];
            if (order.orderStatus !== "active") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`);
            }
            conn.release();
        }
        catch (err) {
            throw new Error(`${err}`);
        }
        try {
            const sql = 'INSERT INTO order_products ( order_Id, product_id, user_id, quantity_order) VALUES($1,$2,$3)';
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderId, productId, userId, quantityOrder]);
            const productsOrder = result.rows[0];
            conn.release();
            return productsOrder;
        }
        catch (err) {
            throw new Error(` Could not add ordered product for ${userId}: ${err}`);
        }
    }
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Could not list orders: ${err}`);
        }
    }
    async createOrder(O) {
        try {
            const sql = 'INSERT INTO orders ( product_id, product_quantity_order, order_status, user_id) VALUES($1,$2,$3,$4)';
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [O.productId, O.productQuantityOrder, O.orderStatus, O.userId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(` Could not create order ${O.id}: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;