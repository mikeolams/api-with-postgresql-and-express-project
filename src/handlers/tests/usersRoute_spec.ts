import  user_routes  from '../usersRoute';
import supertest from 'supertest';
import { response} from 'express'

const request = supertest(user_routes);
describe('Test endpoint responses', () => {
    try {
        it('gets the list of users api endpoint', async (done) => {
            const response = await request.get('/users');
            expect(response.status).toBe(200);
        });
    } catch(err) {
        response.status(400)
    }

    try {
        it('gets specific user api endpoint', async (done) => {
            const response = await request.get('/users/:id');
            expect(response.status).toBe(200);
            done();
        });
    } catch(err) {
        response.status(400)
    }

    try {
        it('post the user api endpoint', async (done) => {
            const response = await request.post('/user');
            expect(response.status).toBe(200);
            done();
        })
    } catch(err) {
        response.status(400)
    }
});

 
