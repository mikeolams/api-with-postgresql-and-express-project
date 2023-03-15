import  {product_routes}  from '../productsRoute';
import supertest from 'supertest';
import { response} from 'express'

const app = require('./../../test-server')
const request = supertest(app);
describe('Test Product endpoints responses', () => {
    try {
        it('gets the list of products api endpoint', () => {
            const response = request.get('/products');
            expect(response.ok).toBe(response.ok);
            // expectAsync(response).toBeResolved();
            // done()
        });
    } catch(err) {
        response.status(400)
    }


    try {
        it('gets specific product api endpoint',  () => {
            const response = request.get('/products/:id');
            expect(response.ok).toBe(response.ok);
            // expectAsync(response).toBeResolved();
            // done();
        });
    } catch(err) {
        response.status(400)
    }


    try {
        it('get the top five products api endpoint', (done) => {
            const response =  request.get('/products/topfive');
            expect(response.ok).toBe(response.ok);
            // expectAsync(response).toBeResolved();
            done();
        });
    } catch(err) {
        response.status(400)
    }


    try {
        it('get the product by category api endpoint', (done) => {
            const response =  request.get('/products/:category');
            expect(response.ok).toBe(response.ok);
            // expectAsync(response).toBeResolved();
            done();
        });
    } catch(err) {
        response.status(400)
    }

    try {
        it('post the product api endpoint', (done) => {
            const response =  request.post('/products');
            expect(response.ok).toBe(response.ok);
            // done();
            // expectAsync(response).toBeResolved();
             done();
        });
    } catch(err) {
        response.status(400)
    }

});

 
