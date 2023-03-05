import { User, UserStore } from '../user';

 
const store = new UserStore()
// const User = User
const id = 1


describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });


it('create method should add a User', async () => {
    const result = await store.create(
      {
        id: 1,
        firstName: 'Terabi',
        lastName: 'Peter',
        password: 'hashpassword'

      }
  )
    expect(result).toEqual({
        id: 1,
        firstName: 'Terabi',
        lastName: 'Peter',
        password: 'hashpassword'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([{
        id: 1,
        firstName: 'Terabi',
        lastName: 'Peter',
        password: 'hashpassword'
    }]);
  });

  it('show method should return the correct user with the id ', async () => {
    const result = await store.show(id)
    expect(result).toEqual({
        id: 1,
        firstName: 'Terabi',
        lastName: 'Peter',
        password: 'hashpassword'
    });
  });



});