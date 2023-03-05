import { Order, OrderStore } from '../order';

 
const store = new OrderStore()
// const User = User
const id = 1


describe("Oder Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a completeUserOrders method', () => {
    expect(store.completeUserOrders).toBeDefined();
  });

  it('should have a createOrder method', () => {
    expect(store.createOrder).toBeDefined();
  });

  it('should have a addOrder method', () => {
    expect(store.addOrder).toBeDefined();
  });


it('create method should create an Order', async () => {
    const result = await store.createOrder(
      {
        id: 1,
        productId: 4,
        userId: 2,
        productQuantityOrder: 3,
        orderStatus: 'active'

      }
  )
    expect(result).toEqual({
        id: 1,
        productId: 4,
        userId: 2,
        productQuantityOrder: 3,
        orderStatus: 'active'
    });
  });

  it('index method should return a list of product orders', async () => {
    const result = await store.index(id);
    expect(result).toEqual([{
        id: 1,
        productId: 4,
        userId: 2,
        productQuantityOrder: 3,
        orderStatus: 'active'
    }]);
  });

  it('show method should return the correct order  with the id ', async () => {
    const result = await store.completeUserOrders(id)
    expect(result).toEqual({
        id: 1,
        productId: 4,
        userId: 2,
        productQuantityOrder: 3,
        orderStatus: 'active'
    });
  });

  
it('create method should add an Order', async () => {
    const result = await store.addOrder(
         1,
         4,
        2,
        3,
        'active'  
  )
    expect(result).toEqual({
        id: 1,
        productId: 4,
        userId: 2,
        productQuantityOrder: 3,
        orderStatus: 'active'
    });
  });

});