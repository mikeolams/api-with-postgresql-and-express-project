"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const express_1 = require("express");
const store = new user_1.UserStore();
// const User = User
const id = 1;
describe("User Model", () => {
    try {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
    }
    catch (err) {
        express_1.response.status(400);
        express_1.response.json(err);
    }
    try {
        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
    }
    catch (err) {
        express_1.response.status(400);
        express_1.response.json(err);
    }
    try {
        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        });
    }
    catch (err) {
        express_1.response.status(400);
        express_1.response.json(err);
    }
    try {
        it('create method should add a User', async () => {
            const result = await store.create({
                id: 1,
                firstName: 'Terabi',
                lastName: 'Peter',
                password: 'hashpassword'
            });
            expect(result).toEqual({
                id: 1,
                firstName: 'Terabi',
                lastName: 'Peter',
                password: 'hashpassword'
            });
        });
    }
    catch (err) {
        express_1.response.status(400);
        express_1.response.json(err);
    }
    try {
        it('index method should return a list of users', async () => {
            const result = await store.index();
            expect(result).toEqual([{
                    id: 1,
                    firstName: 'Terabi',
                    lastName: 'Peter',
                    password: 'hashpassword'
                }]);
        });
    }
    catch (err) {
        express_1.response.status(400);
        express_1.response.json(err);
    }
    try {
        it('show method should return the correct user with the id ', async () => {
            const result = await store.show(id);
            expect(result).toEqual({
                id: 1,
                firstName: 'Terabi',
                lastName: 'Peter',
                password: 'hashpassword'
            });
        });
    }
    catch (err) {
        express_1.response.status(400);
        express_1.response.json(err);
    }
});
