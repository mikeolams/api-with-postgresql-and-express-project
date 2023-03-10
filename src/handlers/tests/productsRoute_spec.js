"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productsRoute_1 = __importDefault(require("../productsRoute"));
const supertest_1 = __importDefault(require("supertest"));
const express_1 = require("express");
const request = (0, supertest_1.default)(productsRoute_1.default);
describe('Test endpoint responses', () => {
    try {
        it('gets the list of products api endpoint', async (done) => {
            const response = await request.get('/products');
            expect(response.status).toBe(200);
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
    try {
        it('gets specific product api endpoint', async (done) => {
            const response = await request.get('/products/:id');
            expect(response.status).toBe(200);
            done();
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
    try {
        it('get the top five products api endpoint', async (done) => {
            const response = await request.get('/products/topfive');
            expect(response.status).toBe(200);
            done();
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
    try {
        it('get the product by category api endpoint', async (done) => {
            const response = await request.get('/products/:category');
            expect(response.status).toBe(200);
            done();
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
    try {
        it('post the product api endpoint', async (done) => {
            const response = await request.post('/products');
            expect(response.status).toBe(200);
            done();
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
});
