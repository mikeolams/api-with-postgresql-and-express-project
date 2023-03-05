import  user_routes  from '../usersRoute';
import supertest from 'supertest';
// import app from '../../server';

const request = supertest(user_routes);
describe('Test endpoint responses', () => {
    it('gets the list of users api endpoint', async (done) => {
        const response = await request.get('/users');
        expect(response.status).toBe(200);
    });

    it('gets specific user api endpoint', async (done) => {
        const response = await request.get('/users/:id');
        expect(response.status).toBe(200);
        done();
    });

    it('post the user api endpoint', async (done) => {
        const response = await request.post('/user');
        expect(response.status).toBe(200);
        done();
    })
});

 
