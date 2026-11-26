const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory product and cart storage
let products = [
  { id: 1, name: 'Laptop', price: 999, image: 'laptop.jpg' },
  { id: 2, name: 'Mouse', price: 25, image: 'mouse.jpg' },
  { id: 3, name: 'Keyboard', price: 45, image: 'keyboard.jpg' },
  { id: 4, name: 'Monitor', price: 150, image: 'monitor.jpg' },
  { id: 5, name: 'Headphones', price: 80, image: 'headphones.jpg' }
];

let cart = [];
let orders = [];

// Home - Product listing
app.get('/', (req, res) => {
  res.render('home', { title: 'E-commerce', products });
});

// Product detail
app.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.render('product-detail', { title: 'Product Details', product });
  } else {
    res.status(404).send('Product not found');
  }
});

// Add to cart
app.post('/cart/add', (req, res) => {
  const productId = parseInt(req.body.productId);
  const product = products.find(p => p.id === productId);
  if (product) {
    const existing = cart.find(p => p.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  }
  res.redirect('/');
});

// View cart
app.get('/cart', (req, res) => {
  res.render('cart', { title: 'Shopping Cart', cart, orders });
});

// Remove from cart
app.post('/cart/remove', (req, res) => {
  const productId = parseInt(req.body.productId);
  cart = cart.filter(p => p.id !== productId);
  res.redirect('/cart');
});

// Checkout - create order
app.post('/checkout', (req, res) => {
  const order = {
    id: orders.length + 1,
    items: cart.map(p => ({ name: p.name, price: p.price, quantity: p.quantity })),
    total: cart.reduce((sum, p) => sum + p.price * p.quantity, 0),
    date: new Date()
  };
  orders.push(order);
  cart = [];
  res.redirect('/');
});

// Seller: Add product
app.get('/seller/add', (req, res) => {
  res.render('add-product', { title: 'Add Product' });
});

// Seller: Submit new product
app.post('/seller/add', (req, res) => {
  const { name, price, image } = req.body;
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    price: parseFloat(price),
    image
  };
  products.push(newProduct);
  res.redirect('/');
});

// Seller: View orders
app.get('/seller/orders', (req, res) => {
  res.render('seller-orders', { title: 'Orders', orders });
});

app.listen(port, () => {
  console.log('E-commerce app listening at http://localhost:' + port);
});