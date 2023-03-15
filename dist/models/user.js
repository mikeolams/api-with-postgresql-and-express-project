"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Could not list users: ${err}`);
        }
    }
    async show(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(` Could not list these users: ${err}`);
        }
    }
    async create(firstName, lastName, password) {
        try {
            // const sql = 'INSERT INTO users ( first_name, last_name, password) VALUES($1,$2,$3)'
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            // const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await database_1.default.connect();
            const hash = bcrypt.hashSync(password + pepper, 
            //@ts-ignore 
            parseInt(saltRounds));
            //   const result = await conn.query(sql, [u.username, hash])
            const result = await conn.query(sql, [firstName, lastName, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(` Could not add user ${firstName}: ${err}`);
        }
    }
    async authenticate(u) {
        const username = u.firstName;
        //@ts-ignore
        const conn = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE first_name=($1)';
        const result = await conn.query(sql, [username]);
        console.log(u.password + pepper);
        if (result.rows.length) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt.compareSync(u.password + pepper, user.password)) {
                return user;
            }
            //   if (bcrypt.compareSync(u.password+pepper, user.password_digest)) {
            //     return user
            //   }
        }
        return null;
    }
}
exports.UserStore = UserStore;
