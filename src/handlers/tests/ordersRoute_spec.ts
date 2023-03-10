// import  app  from './../../server';
import  {order_routes}  from '../ordersRoute';
import supertest from 'supertest';
import { response} from 'express'

const request = supertest(order_routes);
describe('Test endpoint responses', () => {
    try {
        it('gets the current orders by user api endpoint', async (done) => {
            const response = await request.get('/orders/product/user/:id');
            expect(response.status).toBe(200);
        });
    } catch(err) {
        response.status(400)
    }


    try {
        it('gets specific user complete orders api endpoint', async (done) => {
            const response = await request.get('/orders/products/user/:id');
            expect(response.status).toBe(200);
            done();
        });
    } catch(err) {
        response.status(400)
    }


    try {
       
    it('post the order api endpoint', async (done) => {
        const response = await request.post('/orders');
        expect(response.status).toBe(200);
        done();
    })
    } catch(err) {
        response.status(400)
    }
   
});

 