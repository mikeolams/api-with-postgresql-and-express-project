import { Order, OrderStore } from '../order';
import {Request, response} from 'express'

 
const store = new OrderStore()
// const User = User
const id = 1


describe("Oder Model", () => {
  try {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
} catch(err) {
    response.status(400)
    response.json(err)
}

try {
  it('should have an index method', () => {
    expect(store.show).toBeDefined();
  });
} catch(err) {
  response.status(400)
  response.json(err)
}

try {
  it('should have a completeUserOrders method', () => {
    expect(store.completeUserOrders).toBeDefined();
  });
} catch(err) {
  response.status(400)
  response.json(err)
}

try {
  it('should have a createOrder method', () => {
    expect(store.createOrder).toBeDefined();
  });
} catch(err) {
  response.status(400)
  response.json(err)
}

try {
  it('should have a addProductOrder method', () => {
    expect(store.addProductOrder).toBeDefined();
  })
} catch(err) {
  response.status(400)
  response.json(err)
}


try {
  it('create method should create an Order', async () => {
    const result = await store.createOrder(
      {
        id: 1,
        userId: 2,
        // quantityOrder: 3,
        orderStatus: 'active'

      }
  )
    expect(result).toEqual({
        id: 1,
        userId: 2,
        // quantityOrder: 3,
        orderStatus: 'active'
    });
  });
} catch(err) {
  response.status(400)
  response.json(err)
}


  try {
    it('index method should return a list of product orders', async () => {
      const result = await store.index();
      expect(result).toEqual([{
          id: 1,
          userId: 2,
          // quantityOrder: 3,
          orderStatus: 'active'
      }]);
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }

  // try {
  //   it('should have a addProductOrder method', () => {
  //     expect(store.addProductOrder).toBeDefined();
  //   })
  // } catch(err) {
  //   response.status(400)
  //   response.json(err)
  // }

  // it('show method should return the correct order  with the id ', async () => {
  //   const result = await store.completeUserOrders(id)
  //   expect(result).toEqual([{
  //       id: 1,
  //       userId: 2,
  //       quantityOrder: 3,
  //       orderStatus: 'active'
  //   }]);
  // });

  
  try {
    it('create method should add an Product order', async () => {
      const result = await store.addProductOrder(
           4,
           4,
          3
    )
      expect(result).toEqual({
          id: 1,
          orderId: 4,
          productId: 4,
          productQuantityOrder: 3
          
      });
    });
  
} catch(err) {
    response.status(400)
    response.json(err)
}

});