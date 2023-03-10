import  product_routes  from '../productsRoute';
import supertest from 'supertest';
import { response} from 'express'


const request = supertest(product_routes);
describe('Test endpoint responses', () => {
    try {
        it('gets the list of products api endpoint', async (done) => {
            const response = await request.get('/products');
            expect(response.status).toBe(200);
        });
    } catch(err) {
        response.status(400)
    }


    try {
        it('gets specific product api endpoint', async (done) => {
            const response = await request.get('/products/:id');
            expect(response.status).toBe(200);
            done();
        });
    } catch(err) {
        response.status(400)
    }


    try {
        it('get the top five products api endpoint', async (done) => {
            const response = await request.get('/products/topfive');
            expect(response.status).toBe(200);
            done();
        });
    } catch(err) {
        response.status(400)
    }


    try {
        it('get the product by category api endpoint', async (done) => {
            const response = await request.get('/products/:category');
            expect(response.status).toBe(200);
            done();
        });
    } catch(err) {
        response.status(400)
    }

    try {
        it('post the product api endpoint', async (done) => {
            const response = await request.post('/products');
            expect(response.status).toBe(200);
            done();
        });
    } catch(err) {
        response.status(400)
    }

});

 
