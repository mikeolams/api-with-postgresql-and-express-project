"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
// import cors from 'cors'
// import jwt from 'jsonwebtoken'
var jwt = require('jsonwebtoken');
// const corsOptions = {
// 	origin:'http://someotherdomain.com',
// 	optionsSuccessStatus: 200 //some legacy browsers (IE11,various)
// }
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const products = await store.show(id);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const topFive = async (req, res) => {
    try {
        const products = await store.showTopFive();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const showCategory = async (req, res) => {
    try {
        const products = await store.showCategory(req.params.category);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            id: req.body.id,
            productName: req.body.productName,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.addProduct(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded.id !== req.body.id) {
            throw new Error('User is not authorised for this action!');
        }
        next();
    }
    catch (error) {
        res.status(401);
    }
};
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.get('/products/topfive', topFive);
    app.get('/products/:category', showCategory);
    app.post('/products', verifyAuthToken, create);
};
exports.default = product_routes;
