CREATE TABLE order_products (
    id SERIAL PRIMARY  KEY,
    order_id bigint REFERENCES order(id),
    product_id bigint REFERENCES products(id),
    user_id bigint REFERENCES users(id),
    quantity_order integer,
);