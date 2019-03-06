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

| Endpoint          | Method | Description           | isAuthenticated | isAdmin |
| ----------------- | ------ | --------------------- | --------------- | ------- |
| `/`               | GET    | Hello                 |                 |         |
| `/users/register` | POST   | Register new user     |                 |         |
| `/users/login`    | POST   | Login to user         |                 |         |
| `/users/profile`  | GET    | Get user profile      | YES             |         |
| `/users/:id`      | GET    | Get one user by id    |                 |         |
| `/users`          | GET    | Get all users         |                 |         |
| `/users/:id`      | DELETE | Delete one user by id | YES             |         |

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

| Endpoint   | Method | Description     | isAuthenticated | isAdmin |
| ---------- | ------ | --------------- | --------------- | ------- |
| `/farmers` | GET    | Get all farmers |                 |         |

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

## Farmers

| Endpoint       | Method | Description     | isAuthenticated | isAdmin |
| -------------- | ------ | --------------- | --------------- | ------- |
| `/commodities` | GET    | Get all farmers |                 |         |

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

| Endpoint       | Method | Description         | isAuthenticated | isAdmin |
| -------------- | ------ | ------------------- | --------------- | ------- |
| `/commodities` | GET    | Get all commodities |                 |         |

## Carts

```json
{
  "_id": ObjectID(),
  "id": 1,
  "name": "Apple Rome Beauty",
  "description": "",
  "image": "/assets/images/picture.jpg",
  "category": "Fruits",
  "sub_category": "Apple",
  "products": [ObjectID(), ObjectID(), ObjectID()]
}
```

## Commodities

| Endpoint       | Method | Description         | isAuthenticated | isAdmin |
| -------------- | ------ | ------------------- | --------------- | ------- |
| `/commodities` | GET    | Get all commodities |                 |         |

Example Data:

```json
{
  "_id": ObjectID(),
  "id": 1,
  "name": "Apple Rome Beauty",
  "description": "",
  "image": "/assets/images/picture.jpg",
  "category": "Fruits",
  "sub_category": "Apple",
  "products": [ObjectID(), ObjectID(), ObjectID()]
}
```

## Products

| Endpoint    | Method | Description      | isAuthenticated | isAdmin |
| ----------- | ------ | ---------------- | --------------- | ------- |
| `/products` | GET    | Get all products |                 |         |

Example Data:

```json
{
  "_id": ObjectID(),
  "id": 1,
  "farmer_id": ObjectID(), // from token's sub
  "commodity_id": ObjectID(),
  "price": 34000
}
```
