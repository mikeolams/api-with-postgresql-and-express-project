"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
var jwt = require('jsonwebtoken');
const store = new order_1.OrderStore();
const show = async (req, res) => {
    const orderId = parseInt(req.params.id);
    const userId = parseInt(req.body.userId);
    const productId = parseInt(req.body.productId);
    const orderStatus = req.body.orderStatus;
    const productQuantityOrder = parseInt(req.body.productQuantityOrder);
    try {
        const orderedProducts = await store.show(userId);
        res.json(orderedProducts);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const index = async (req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const showCompleteOrder = async (req, res) => {
    // const orderId: number = parseInt(req.params.id)
    const userId = parseInt(req.params.id);
    const userOrders = await store.completeUserOrders(userId);
    res.json(userOrders);
};
const create = async (req, res) => {
    try {
        const order = {
            id: req.body.id,
            productId: req.body.productId,
            userId: req.body.userId,
            productQuantityOrder: req.body.productQuantityOrder,
            orderStatus: req.body.orderStatus
        };
        const newOrder = await store.createOrder(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addOrder = async (req, res) => {
    try {
        const order = {
            id: parseInt(req.body.id),
            productId: parseInt(req.body.productId),
            userId: req.body.userId,
            productQuantityOrder: req.body.productQuantityOrder,
            orderStatus: req.body.orderStatus
        };
        const newProductOrder = await store.addProductOrder(order.id, order.productId, order.userId, order.productQuantityOrder);
        res.json(newProductOrder);
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
const order_routes = (app) => {
    app.get('/orders/', index);
    app.get('/orders/product/user/:id', verifyAuthToken, show);
    app.get('/orders/products/user/:id', verifyAuthToken, showCompleteOrder);
    app.post('/orders', create);
    app.post('/orders/products', verifyAuthToken, addOrder);
};
exports.default = order_routes;
