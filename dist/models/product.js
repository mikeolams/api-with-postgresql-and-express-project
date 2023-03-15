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
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Could not list the required product: ${err}`);
        }
    }
    async showCategory(category) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            // const checkSql = 'SELECT * FROM products'
            // const checkResult = await conn.query(checkSql)
            // if (checkResult=== undefined ){
            //     // const result = "Product has not being created"
            //     // return checkResult
            //     console.log(checkResult)
            //     throw new Error (` Product has not being created: ${checkResult}`)
            // }else{
            const sql = 'SELECT * FROM products WHERE category LIKE "active"';
            const result = await conn.query(sql, [category]);
            console.log(result.Result.rows);
            conn.release();
            return result.rows;
            // }
        }
        catch (err) {
            throw new Error(` Could not list products category required because: ${err}`);
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
    async addProduct(productName, price, category) {
        try {
            const sql = 'INSERT INTO products ( name, price, category) VALUES($1,$2,$3)';
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [productName, price, category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(` Could not add product ${productName}: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
