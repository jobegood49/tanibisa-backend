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

# Endpoint and Data

## Users

| Endpoint          | Method | Description           | isAuthenticated | isAdmin |
| ----------------- | ------ | --------------------- | --------------- | ------- |
| `/`               | GET    | Hello                 |                 |         |
| `/users/register` | POST   | Register new user     |                 |         |
| `/users/login`    | POST   | Login to user         |                 |         |
| `/users/profile`  | GET    | Get user profile      | YES             |         |
| `/users/:id`      | GET    | Get one user by id    |                 |         |
| `/users`          | GET    | Get all users         |                 |         |
| `/users`          | DELETE | Delete all users      |                 | YES     |
| `/users/:id`      | DELETE | Delete one user by id | YES             |         |
| `/users/:id`      | PUT    | Update one user by id |                 |         |

Example Data:

```json
{
  "_id": ObjectID(),
  "id": 1,
  "name": "",
  "email": "",
  "salt": "",
  "password": ""
}
```

## Items

| Endpoint           | Method | Description           | isAuthenticated | isAdmin |
| ------------------ | ------ | --------------------- | --------------- | ------- |
| `/items`           | GET    | Get all items         |                 |         |
| `/items?q=keyword` | GET    | Search for items      |                 |         |
| `/items`           | POST   | Create new idea       | YES             |         |
| `/items`           | DELETE | Delete all items      |                 | YES     |
| `/items/:id`       | DELETE | Delete one idea by id | YES             |         |
| `/items/:id`       | PUT    | Update one idea by id | YES             |         |

Example Data:

```json
{
  "_id": ObjectID(),
  "id": 1,
  "title": "",
  "description": "",
  "author": "",
  "date": "",
  "slug": "",
  "images": [
    "/assets/images/picture.jpg",
    "/assets/images/picture.jpg",
    "/assets/images/picture.jpg"
  ],
  "details": "<p></p>"
}
```

Buyers_collection:

```json
{
  "name": "name",
  "email": "email",
  "salt": "",
  "password": "password",
  "image": "/assets/images/picture.jpg"
}
```

Farmers_collection:

```json
{
  "name": "name",
  "email": "email",
  "salt": "",
  "password": "password",
  "location": "location",
  "product_id": ObjectID(),
  "image": ["/assets/images/picture.jpg"]
}
```

Products_collection:

```json
{
  "name": "name",
  "category": [
    { "fruits": "apple" },
    { "vegetables": "tomato" },
    { "rice": "rice" }
  ],
  "price": number,
  "image": ["/assets/images/picture.jpg"],
  "description": "description",
  "farmers_id": ObjectID(),
  "subCategory": "subCategory"
}
```

Cart:

```json
{
  "_id": "12121821982",
  "buyer_id": "2344tnghkjkj",
  "products": [
    {
      "_id": "120910291029",
      "quantity": 10
    },
    {
      "_id": "120910291029",
      "quantity": 10
    }
  ]
}
```
