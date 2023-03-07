import  order_routes  from '../ordersRoute';
import supertest from 'supertest';

const request = supertest(order_routes);
describe('Test endpoint responses', () => {
    it('gets the current orders by user api endpoint', async (done) => {
        const response = await request.get('/orders/product/user/:id');
        expect(response.status).toBe(200);
    });

    it('gets specific user complete orders api endpoint', async (done) => {
        const response = await request.get('/orders/products/user/:id');
        expect(response.status).toBe(200);
        done();
    });

    it('post the order api endpoint', async (done) => {
        const response = await request.post('/orders');
        expect(response.status).toBe(200);
        done();
    })
});

 