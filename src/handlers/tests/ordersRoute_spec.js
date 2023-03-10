"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import  app  from './../../server';
const ordersRoute_1 = require("../ordersRoute");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = require("express");
const request = (0, supertest_1.default)(ordersRoute_1.order_routes);
describe('Test endpoint responses', () => {
    try {
        it('gets the current orders by user api endpoint', async (done) => {
            const response = await request.get('/orders/product/user/:id');
            expect(response.status).toBe(200);
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
    try {
        it('gets specific user complete orders api endpoint', async (done) => {
            const response = await request.get('/orders/products/user/:id');
            expect(response.status).toBe(200);
            done();
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
    try {
        it('post the order api endpoint', async (done) => {
            const response = await request.post('/orders');
            expect(response.status).toBe(200);
            done();
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
});
