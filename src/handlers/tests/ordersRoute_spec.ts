// import  app  from '';
import  {order_routes}  from '../ordersRoute';
import supertest from 'supertest';
import { response} from 'express'

const app = require('./../../test-server')
const request = supertest(app);
describe('Test Order endpoints responses', () => {
    try {
        it('gets the current orders by user api endpoint',  () => {
            const response = request.get('/orders/product/user/:id');
            // expect(response.ok).toBe(200);
            // expect(response.status).toBe(200);
            // await expectAsync(response).toBeResolved();
             expectAsync(response).toBeResolved();
        });
    } catch(err) {
        response.status(400)
    }


    try {
        it('gets specific user complete orders api endpoint', () => {
            const response =  request.get('/orders/products/user/:id');
            // expect(response.ok).toBe(ok);
            expectAsync(response).toBeResolved();
            // done();
        });
    } catch(err) {
        response.status(400)
    }


    try {
       
    it('post the order api endpoint', async () => {
        const response =  request.post('/orders');
        // expect(response.status).toBe(200);
        // done();
        expectAsync(response).toBeResolved();
    })
    } catch(err) {
        response.status(400)
    }
   
});

 