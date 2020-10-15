# Online Shop in Angular Project - Peleg ohanuna

## Description
Final project for John bryce in angular, using MongoDB and NodeJs.
Virtual shopping website with list of products and shopping cart,
verification of login and register for users.
Some functionalities are not fully implemented.


## How to run locally

- clone this repository
- Development
    - Install : `npm i` for both client and server folders ( I use Node v10.19.0 )
    - Run : `nodemon app` to run the server, `ng s --aot` to run client
    - Navigate to http://localhost:4200


## Api Server

Server End Points:

- `GET` `/api/users/getAllUsers` - retrieve all registered users
- `POST` `/api/users/verify` - verify user's token and allowed access to certain components
- `POST` `/api/users/register` - registers a new user in the database
- `POST` `/api/users/login` - verifies user's credentials and allows access
- `GET` `/api/users/products` - retrieves all products in the database
- `POST` `/api/users/addProduct` - adds a new product to the database
- `POST` `/api/users/editProduct` - edit an existing product with new values


## Database modelling

-Product:
{
    productName: String,
    category: String,
    price: Number,
    picture: String
}

-User:
{
    _id: String,
    email: String,
    password: String,
    city: String,
    street: String,
    name: String,
    lastName: String,
    role: String,
    shipments: Array
}# Angular-Shopping-Store
