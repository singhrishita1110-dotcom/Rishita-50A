const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory storage for products
let products = [
  { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop' },
  { id: 2, name: 'Mouse', price: 25, description: 'Wireless mouse' },
  { id: 3, name: 'Keyboard', price: 45, description: 'Mechanical keyboard' }
];
let nextId = 4;

// Create route: Show all products (GET)
app.get('/', (req, res) => {
  res.render('index', { title: 'Product CRUD', products });
});

// New route: Show form to add product (GET)
app.get('/products/create', (req, res) => {
  res.render('create', { title: 'Add Product' });
});

// Create route: Add new product (POST)
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  const product = { id: nextId++, name, price: parseFloat(price), description };
  products.push(product);
  res.redirect('/');
});

// Read route: Show single product (GET)
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.render('detail', { title: 'Product Details', product });
  } else {
    res.status(404).send('Product not found');
  }
});

// Update route: Show edit form (GET)
app.get('/products/:id/edit', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.render('edit', { title: 'Edit Product', product });
  } else {
    res.status(404).send('Product not found');
  }
});

// Update route: Edit product (POST)
app.post('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    const { name, price, description } = req.body;
    product.name = name;
    product.price = parseFloat(price);
    product.description = description;
  }
  res.redirect('/');
});

// Delete route: Delete product (GET)
app.get('/products/:id/delete', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Express CRUD app listening at http://localhost:${port}`);
});