const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory product storage (use MongoDB by replacing this with database calls)
let products = [
  { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop' },
  { id: 2, name: 'Mouse', price: 25, description: 'Wireless mouse' },
  { id: 3, name: 'Keyboard', price: 45, description: 'Mechanical keyboard' }
];
let nextId = 4;

// GET: Show all products
app.get('/', (req, res) => {
  res.render('index', { title: 'Product CRUD with MongoDB', products });
});

// GET: Show form to add product
app.get('/products/create', (req, res) => {
  res.render('create', { title: 'Add Product' });
});

// POST: Add new product to database
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  const product = { id: nextId++, name, price: parseFloat(price), description };
  products.push(product);
  res.redirect('/');
});

// GET: Show single product details
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.render('detail', { title: 'Product Details', product });
  } else {
    res.status(404).send('Product not found');
  }
});

// GET: Show edit form
app.get('/products/:id/edit', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.render('edit', { title: 'Edit Product', product });
  } else {
    res.status(404).send('Product not found');
  }
});

// POST: Update product in database
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

// GET: Delete product
app.get('/products/:id/delete', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

app.listen(port, () => {
  console.log('Express MongoDB CRUD app listening at http://localhost:' + port);
});