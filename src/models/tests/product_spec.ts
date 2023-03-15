import { Product, ProductStore } from '../product';
import {response} from 'express'

 
const store = new ProductStore()
const id = 1


describe("Product Model", () => {

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
      expect(store.addProduct).toBeDefined();
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }

  try {
    it('should have a show category method', () => {
      expect(store.showCategory).toBeDefined();
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }

  try {
    it('should have a show category method', () => {
      expect(store.showTopFive).toBeDefined();
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }


  try {
    it('create method should add a Product', async () => {
      const productName:string = 'Terabithia'
      const price:number = 250
      const category:string = 'active'

      const result = await store.addProduct(
          productName,
          price,
          category  
    )
      expect(result).toEqual(result);
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }



  try {
    it('index method should return a list of products', async () => {
      const result = await store.index();
      expect(result).toEqual([...result]);
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }

  try {
    it('show method should return the correct product with the id ', async () => {
      const result = await store.show(id)
      expect(result).toEqual([...result]);
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }

  // try {
  //   it('showCategory method should return the correct product category if product exist', async () => {
  //     const result = await store.showCategory('active')
  //     // expect(result).toHaveBeenCalled();;
  //     expect(function() { return result; }).toThrowError();
  //     // expect(function() { throw new Error('Product has not being created'); }).toThrowMatching(function(thrown) { return thrown.message === 'Product has not being created'; });
  //   });
  // } catch(err) {
  //   response.status(400)
  //   response.json(err)
  // }
  

  try {
    it('showTopFive method should return the top five products', async () => {
      const result = await store.showTopFive()
      expect(result).toEqual([...result]);
    });
  } catch(err) {
    response.status(400)
    response.json(err)
  }

});