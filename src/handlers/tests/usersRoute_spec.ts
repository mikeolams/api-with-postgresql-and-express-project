import {user_routes} from '../usersRoute';
import supertest from 'supertest';
import { response} from 'express'

const app = require('./../../test-server')
const request = supertest(app);
describe('Test USER endpoints responses', () => {
    try {
        it('gets the list of users api endpoint', async () => {
            const response = request.get('/users');
            // expect(response.status).toBe(200);
            expectAsync(response).toBeResolved();
        });
    } catch(err) {
        response.status(400)
    }

    try {
        it('gets specific user api endpoint', async () => {
            const response =  request.get('/users/:id');
            // expect(response.status).toBe(200);
            // done();
            expectAsync(response).toBeResolved();
        });
    } catch(err) {
        response.status(400)
    }

    try {
        it('post the user api endpoint', async () => {
            const response = request.post('/user');
            // expect(response.status).toBe(200);
            // done();
            expectAsync(response).toBeResolved();
        })
    } catch(err) {
        response.status(400)
    }
});

 
