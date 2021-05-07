import express from 'express';
import CartItems from './cart-items'
const routes = express.Router();

const cartItems: CartItems[] = [
    {id: 1, product: "Guitar", price: 500, quantity: 2},
    {id: 2, product: "FX Pedal", price: 100, quantity: 1},
    {id: 3, product: "Tuner", price: 100, quantity: 5},
    {id: 4, product: "Guitar Strings", price: 10, quantity: 8}
];
let nextId: number = 5;


// 1. 
routes.get("/cart-items", (req, res) => {
  let maxPrice: number = parseInt(req.query.maxPrice as string);
  let prefix: string = req.query.prefix as string;
  let pageSize: number = parseInt(req.query.pageSize as string);
  let results = cartItems;

  if (maxPrice) {
    results = results.filter(item => item.price >= maxPrice);
  }
  if (prefix) {
    prefix = prefix.toLowerCase();
    results = results.filter(
        item => item.product.toLowerCase().includes(prefix));
  }
  if (pageSize) {
      //let index = cartItems.length - pageSize;
      results = results.slice(0, pageSize);
  }
  res.json(results);
});

// 2. get item by ID
routes.get("/cart-items/:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  const item:CartItems|undefined = cartItems.find(item => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.send(`No Item found with ID: ${id}`);
  }
});

// 3. Post to cart items (add items)
routes.post("/cart-items", (req, res) => {
    let item: CartItems = req.body;
    item.id = nextId;
    nextId++;
    cartItems.push(item);
    res.status(201);
    res.json(item);
  });

// 4. Put to cart items (update item)
routes.put("/cart-items/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    let item: CartItems = req.body;
    item.id = id; // just to be safe, make sure id is correct
    // #1 - find the index (findIndex)
    const index: number = cartItems.findIndex(item => item.id === id);
    // #2 - replace at that index
    if (index !== -1) { // i.e. If it WAS found
      cartItems[index] = item;
      res.json(item);
    } else {
      res.status(404);
      res.send(`No Movie found with ID: ${id}`);
    }
  });

  // 5. DELETE Cart Items
  routes.delete("/cart-items/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    // #1 - find the index (findIndex)
    const index: number = cartItems.findIndex(item => item.id === id);
    // #2 - remove that index (splice)
    if (index !== -1) { // i.e. If it WAS found
      cartItems.splice(index, 1);
    }
    res.status(204);
    res.send();
  });


export default routes;