import { Product, ProductStore } from '../product';
// import {Request, Response, NextFunction} from 'express'

 
const store = new ProductStore()
const id = 1


describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('should have a show category method', () => {
    expect(store.showCategory).toBeDefined();
  });

  it('should have a show category method', () => {
    expect(store.showTopFive).toBeDefined();
  });

it('create method should add a Product', async () => {
    const result = await store.addProduct(
      {
        id: 1,
        productName: 'Terabithia',
        price: 250,
        category: 'active'
      }
  )
    expect(result).toEqual({
      id: 1,
      productName: 'Terabithia',
      price: 250,
      category: 'active'
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      productName: 'Terabithia',
      price: 250,
      category: 'active'
    }]);
  });

  it('show method should return the correct product  with the id ', async () => {
    const result = await store.show(id)
    expect(result).toEqual({
      id:1,
      productName: 'Terabithia',
      price: 250,
      category: 'active'
    });
  });

  it('showCategory method should return the correct product category', async () => {
    const result = await store.showCategory('active')
    expect(result).toEqual({
      id:1,
      productName: 'Terabithia',
      price: 250,
      category: 'active'
    });
  });

  it('showTopFive method should return the top five products', async () => {
    const result = await store.showTopFive()
    expect(result).toBe({
      id:1,
      productName: 'Terabithia',
      price: 250,
      category: 'active'
    },
    {id:2,
    productName: 'Tilapia',
    price: 200,
    category: 'complete'
  });
  });

});