"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const store = new order_1.OrderStore();
// const User = User
const id = 1;
describe("Oder Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have an index method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a completeUserOrders method', () => {
        expect(store.completeUserOrders).toBeDefined();
    });
    it('should have a createOrder method', () => {
        expect(store.createOrder).toBeDefined();
    });
    it('should have a addProductOrder method', () => {
        expect(store.addProductOrder).toBeDefined();
    });
    it('create method should create an Order', async () => {
        const result = await store.createOrder({
            id: 1,
            productId: 4,
            userId: 2,
            productQuantityOrder: 3,
            orderStatus: 'active'
        });
        expect(result).toEqual({
            id: 1,
            productId: 4,
            userId: 2,
            productQuantityOrder: 3,
            orderStatus: 'active'
        });
    });
    it('index method should return a list of product orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                productId: 4,
                userId: 2,
                productQuantityOrder: 3,
                orderStatus: 'active'
            }]);
    });
    it('show method should return the correct order  with the id ', async () => {
        const result = await store.completeUserOrders(id);
        expect(result).toEqual({
            id: 1,
            productId: 4,
            userId: 2,
            productQuantityOrder: 3,
            orderStatus: 'active'
        });
    });
    it('create method should add an Product order', async () => {
        const result = await store.addProductOrder(1, 4, 2, 3);
        expect(result).toEqual({
            id: 1,
            productId: 4,
            userId: 2,
            productQuantityOrder: 3,
            orderStatus: 'active'
        });
    });
});