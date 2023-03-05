"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Could not products: ${err}`);
        }
    }
    async show(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, id);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Could not products: ${err}`);
        }
    }
    async showCategory(category) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE category=("active")';
            const result = await conn.query(sql, category);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Could not products: ${err}`);
        }
    }
    async showTopFive() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products ORDER BY category DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Could not products: ${err}`);
        }
    }
    async addProduct(p) {
        try {
            const sql = 'INSERT INTO products ( name, price, category) VALUES($1,$2,$3)';
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.productName, p.price, p.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(` Could not add product ${p.productName}: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
