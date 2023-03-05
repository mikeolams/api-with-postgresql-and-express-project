import  product_routes  from '../productsRoute';
import supertest from 'supertest';


const request = supertest(product_routes);
describe('Test endpoint responses', () => {
    it('gets the list of products api endpoint', async (done) => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });

    it('gets specific product api endpoint', async (done) => {
        const response = await request.get('/products/:id');
        expect(response.status).toBe(200);
        done();
    });

    it('get the top five products api endpoint', async (done) => {
        const response = await request.get('/products/topfive');
        expect(response.status).toBe(200);
        done();
    });

    it('get the product by category api endpoint', async (done) => {
        const response = await request.get('/products/:category');
        expect(response.status).toBe(200);
        done();
    });

    it('post the product api endpoint', async (done) => {
        const response = await request.post('/products');
        expect(response.status).toBe(200);
        done();
    });
});

 
