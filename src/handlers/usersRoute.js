"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
// import jwt from 'jsonwebtoken'
var jwt = require('jsonwebtoken');
const store = new user_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const id = parseInt(req.params.id);
    const users = await store.show(id);
    res.json(users);
};
const create = async (req, res) => {
    try {
        const user = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };
        const newUser = await store.create(user);
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        //  res.json(newUser)
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    const username = req.body.firstName;
    const user = {
        firstName: username,
        lastName: req.body.lastName,
        password: req.body.password,
        id: parseInt(req.params.id)
    };
    try {
        const u = await store.authenticate(user);
        var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
//  Authorization: Bearer <token>
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded.id !== req.params.id) {
            throw new Error('User id does not match!');
        }
        next();
    }
    catch (error) {
        res.status(401);
    }
};
const user_routes = (app) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/user', verifyAuthToken, create);
};
exports.default = user_routes;
