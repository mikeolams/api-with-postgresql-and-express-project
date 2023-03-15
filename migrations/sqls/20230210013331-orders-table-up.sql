CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id bigint REFERENCES users(id),
    quantity_order integer,
    order_status VARCHAR(10)
);
