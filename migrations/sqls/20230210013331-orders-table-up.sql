CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    product_id bigint REFERENCES products(id),
    product_quantity_order integer,
    user_id bigint REFERENCES users(id),
    order_status VARCHAR(10)
);
