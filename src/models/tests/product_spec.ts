import { Product, ProductStore } from '../product';

 
const store = new ProductStore()


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
    expect(store.showTopFive).toBeDefined();
  });

it('create method should add a Product', async () => {
    const result = await store.addProduct(
        'Terabithia',
        250,
        'active'
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

  it('show method should return the correct product category', async () => {
    const result = await store.show('active');
    expect(result).toEqual({
      id:1,
      productName: 'Terabithia',
      price: 250,
      category: 'active'
    });
  });

});