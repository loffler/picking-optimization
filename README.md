# Picking Optimization

This is a small Nest.js app that provides single endpoint for order picking optimization.

As input, it takes list of product IDs that need to be picked and starting position for picking.

The result is picking path - a list of product positions in a warehouse ordered in a manner that it
takes (nearly) shortest distance to pick them up. Total distance of the path is also included in the response.

## How does it work
The app uses very simple algorithm called "nearest neighbor" for finding the path. It means that the picker always picks the nearest
product from order. It may not always find the most optimal path, but it is fast and provides fair results generally.

There are many better (and more complex) algorithms, e. g. Christofides algorithm for this.

The product positions in warehouse are retrieved from external API as 3D coordinates `[x,y,z]`.
Product quantities are ignored for simplicity.
Euler distance is used to compute distance between the picker and products. 

## Setup
- copy `.env.template` to `.env` and set your `BOXPI_API_KEY`
- install depencencies: `yarn install`
## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```
The app will run on port 3000 by default.


## Usage
There is single endpoint available: `POST /picking/optimize`.
It accepts list of product IDs and starting position for picking as request body. 

request:
```json
{
    "productIds": [
        "product-132",
        "product-21",
        "product-380"
    ],
    "startingPosition": {
        "x": 30,
        "y": 20,
        "z": 90
    }
}
```
response:
```json
{
  "pickingPath": [
    {
      "positionId": "position-515",
      "x": 15,
      "y": 12,
      "z": 100,
      "productId": "product-132",
      "quantity": 1
    },
    {
      "positionId": "position-295",
      "x": 75,
      "y": 0,
      "z": 100,
      "productId": "product-380",
      "quantity": 11
    },
    {
      "positionId": "position-769",
      "x": 57,
      "y": 11,
      "z": 200,
      "productId": "product-21",
      "quantity": 6
    }
  ],
  "totalDistance": 183.11209986229667
}
```