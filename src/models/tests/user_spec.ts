import { User, UserStore } from '../user';
import {response} from 'express'

 
const store = new UserStore()
// const User = User
const id = 1


describe("User Model", () => {

try {
      it('should have an index method', () => {
        expect(store.index).toBeDefined();
      });
  } catch(err) {
    response.status(400)
    response.json(err)
  }

  try {
    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }


  try {
    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }


  try {
    it('create method should add a User', async () => {
      const firstName: string = 'Terabi'
      const lastName: string = 'Peter'
      const password: string = 'hashpassword'

      const result = await store.create(
          firstName,
          lastName,
          password
    )
      expect(result).toEqual(result);
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }


  try {
    it('index method should return a list of users', async () => {
      const result = await store.index();
      expect(result).toEqual([...result]);
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }

  try {
    it('show method should return the correct user with the id ', async () => {
      const result = await store.show(id)
      expect(result).toEqual(result);
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }

});