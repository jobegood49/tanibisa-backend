# Tanibisa Backend

Repo for REST API backend (https://tanibisa.herokuapp.com).

## Setup

```sh
yarn
yarn setup
```

Update the `.env` file.

## Development

```sh
yarn dev
```

## Production

```sh
yarn start
```

---

# Endpoint and Data Collection

## Buyers

| Endpoint           | Method | Description            | isAuthenticated | isAdmin |
| ------------------ | ------ | ---------------------- | --------------- | ------- |
| `/`                | GET    | Hello                  |                 |         |
| `/buyers/register` | POST   | Register new buyer     |                 |         |
| `/buyers/login`    | POST   | Login to buyer         |                 |         |
| `/buyers/profile`  | GET    | Get buyer profile      | YES             |         |
| `/buyers/:id`      | GET    | Get one buyer by id    |                 |         |
| `/buyers`          | GET    | Get all buyers         |                 |         |
| `/buyers/:id`      | DELETE | Delete one buyer by id | YES             |         |

Example Data:

```json
{
  "_id": ObjectID(),
  "id": 1,
  "name": "name",
  "email": "email",
  "salt": "",
  "password": "password",
  "image": "/assets/images/picture.jpg"
}
```

## Farmers

| Endpoint            | Method | Description             | isAuthenticated | isAdmin |
| ------------------- | ------ | ----------------------- | --------------- | ------- |
| `/`                 | GET    | Hello                   |                 |         |
| `/farmers/register` | POST   | Register new farmer     |                 |         |
| `/farmers/login`    | POST   | Login to farmer         |                 |         |
| `/farmers/profile`  | GET    | Get farmer profile      | YES             |         |
| `/farmers/:id`      | GET    | Get one farmer by id    |                 |         |
| `/farmers`          | GET    | Get all farmers         |                 |         |
| `/farmers/:id`      | DELETE | Delete one farmer by id | YES             |         |

Example Data:

```json
{
  "_id": ObjectID(),
  "id": 1,
  "name": "Abu Budi",
  "email": "",
  "image": "",
  "products": [ObjectID(), ObjectID(), ObjectID()]
}
```

Populated Data of Farmer > Product > Commodity.

```json
{
  "_id": ObjectID(),
  "id": 1,
  "name": "Abu Budi",
  "email": "",
  "image": "",
  "products": [
    {
      "_id": ObjectID(),
      "id": 1,
      "farmer_id": ObjectID(), // from token's sub
      "price": 34000,
      "commodity_id": {
        "_id": ObjectID(),
        "id": 1,
        "name": "Apple Rome Beauty",
        "description": "",
        "image": "/assets/images/picture.jpg",
        "category": "Fruits",
        "sub_category": "Apple"
      }
    },
    {
      "_id": ObjectID(),
      "id": 1,
      "farmer_id": ObjectID(), // from token's sub
      "price": 20000,
      "commodity_id": {
        "_id": ObjectID(),
        "id": 1,
        "name": "Apple Rome Beauty",
        "description": "",
        "image": "/assets/images/picture.jpg",
        "category": "Fruits",
        "sub_category": "Apple"
      }
    }
  ]
}
```

## Commodities

| Endpoint           | Method | Description          | isAuthenticated |
| ------------------ | ------ | -------------------- | --------------- |
| `/commodities`     | GET    | Get all commodities  |                 |
| `/commodities/:id` | GET    | Get one commodity    |                 |
| `/commodities`     | POST   | Create new commodity |                 |

Example Data:

```json
{
  "_id": ObjectID(),
  "id": 1,
  "name": "Apple Rome Beauty",
  "description": "",
  "image": "/assets/images/picture.jpg",
  "tags": ["fruits", "apple"],
  "products": [ObjectID(), ObjectID(), ObjectID()]
}
```

## Products

| Endpoint        | Method | Description           | isAuthenticated |
| --------------- | ------ | --------------------- | --------------- |
| `/products`     | GET    | Get all products      |                 |
| `/products/:id` | GET    | Get one product by id |                 |
| `/products`     | POST   | Create new product    | YES as Farmer   |

Example Data:

```json
{
  "_id": ObjectID(),
  "id": 1,
  "farmer_id": ObjectID(), // from token's sub
  "commodity_id": ObjectID(), // from existing commodity
  "price": 34000 // item/Kg
}
```

## Carts

| Endpoint                 | Method | Description                    | isAuthenticated |
| ------------------------ | ------ | ------------------------------ | --------------- |
| `/carts`                 | GET    | Get all carts                  | YES             |
| `/carts`                 | POST   | create new cart                | YES             |
| `/carts/:id`             | GET    | get cart by id                 | YES             |
| `/carts/:id/add-product` | PUT    | add product into existing cart | YES             |
| `/carts/:id/add-address` | PUT    | add adress into existing cart  | YES             |
| `/carts/:id/checkout`    | PUT    | checkout the cart              | YES             |

Example Data:

```json
{
  "_id": ObjectID,
  "id": 1,
  "buyer_id": ObjectID, // from buyer token's sub
  "products": [ObjectId],
  "address": "Jl. Jalan Men No. 10",
  "checkout": false,
  "paid": false
}
```
