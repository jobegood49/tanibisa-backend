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

| Endpoint           | Method | Description         | isAuthenticated |
| ------------------ | ------ | ------------------- | --------------- |
| `/`                | GET    | Hello               |                 |
| `/buyers/register` | POST   | Register new buyer  |                 |
| `/buyers/login`    | POST   | Login to buyer      |                 |
| `/buyers`          | GET    | Get all buyers      |                 |
| `/buyers/:id`      | GET    | Get one buyer by id |                 |
| `/buyers`          | DELETE | Delete all buyers   |                 |

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

```json
{
  "name": "name",
  "email": "email",
  "image": ["/assets/images/picture.jpg"],
  "password": "",
  "salt": "",
  "location": "location",
  "products": [ObjectID(), ObjectID(), ObjectID()]
}
```

## Carts

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

## Commodities

```json
{
  "name": "Apel Malang Karapitan",
  "tags": ["fruits", "apple", "malang"],
  "price": 24000,
  "image": "/assets/images/picture.jpg",
  "description": "description",
  "farmer_id": ObjectID()
}
```

## Products

```json
{
  "name": "Apel Malang Karapitan",
  "tags": ["fruits", "apple", "malang"],
  "price": 24000,
  "image": "/assets/images/picture.jpg",
  "description": "description",
  "farmer_id": ObjectID()
}
```
