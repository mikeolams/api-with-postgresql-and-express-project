"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersRoute_1 = __importDefault(require("../usersRoute"));
const supertest_1 = __importDefault(require("supertest"));
const express_1 = require("express");
const request = (0, supertest_1.default)(usersRoute_1.default);
describe('Test endpoint responses', () => {
    try {
        it('gets the list of users api endpoint', async (done) => {
            const response = await request.get('/users');
            expect(response.status).toBe(200);
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
    try {
        it('gets specific user api endpoint', async (done) => {
            const response = await request.get('/users/:id');
            expect(response.status).toBe(200);
            done();
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
    try {
        it('post the user api endpoint', async (done) => {
            const response = await request.post('/user');
            expect(response.status).toBe(200);
            done();
        });
    }
    catch (err) {
        express_1.response.status(400);
    }
});
