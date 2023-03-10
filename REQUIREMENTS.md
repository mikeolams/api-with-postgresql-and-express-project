# API Endpoints
#### Products
- Index  get 'http://localhost:3000/products'
- Show  get 'http://localhost:3000/products/:id'
- Create [token required] post 'http://localhost:3000/products'

- others as seen in the productsRoute file in the handler dictories
---------------------------------------------------------------------
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]  get 'http://localhost:3000/users'
- Show [token required]   get 'http://localhost:3000/users/:id'
- Create N[token required]  post 'http://localhost:3000/user'

#### Orders
- Current Order by user (args: user id)[token required]   get '/orders/product/user/:id'
- [OPTIONAL] Completed Orders by user (args: user id)[token required]


###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ##

## Database schema with column name and type

#### Products
(
  id SERIAL PRIMARY  KEY,
    name VARCHAR(150),
    price integer,
    category VARCHAR(25)  
)

#### Users
(
    id SERIAL PRIMARY  KEY,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    password VARCHAR(150)
    );

#### Orders
   (
    id SERIAL PRIMARY  KEY,
    user_id bigint REFERENCES users(id),
    order_status VARCHAR(10)
    )

#### OrderedProducts
 (
    id SERIAL PRIMARY  KEY,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    product_quantity_order integer
)


###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ##
###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ##




# API Requirements to build project
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

