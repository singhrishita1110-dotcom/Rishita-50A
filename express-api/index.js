const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory product storage
let products = [
  { id: 1, name: 'Laptop', price: 999, rating: 4.5 },
  { id: 2, name: 'Mouse', price: 25, rating: 4.2 },
  { id: 3, name: 'Keyboard', price: 45, rating: 4.8 }
];
let nextId = 4;

// GET: Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET: Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// POST: Add new product
app.post('/api/products', (req, res) => {
  const { name, price, rating } = req.body;
  const product = { id: nextId++, name, price: parseFloat(price), rating: parseFloat(rating) };
  products.push(product);
  res.status(201).json(product);
});

// PUT: Update product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    const { name, price, rating } = req.body;
    product.name = name;
    product.price = parseFloat(price);
    product.rating = parseFloat(rating);
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE: Delete product
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: 'Product deleted' });
});

// HTML routes for client-side rendering

// Home page
app.get('/', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product App - Client Side Rendering</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    .nav { margin-bottom: 20px; }
    .product-card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 10px 0; }
    .product-card h3 { margin-top: 0; }
    form { margin-top: 20px; }
    input, select, button { padding: 8px; margin: 5px; border: 1px solid #ddd; border-radius: 4px; }
    button { background: #333; color: white; cursor: pointer; }
  </style>
</head>
<body>
  <div class="nav">
    <a href="#products">Products</a> | <a href="#add">Add Product</a>
  </div>
  <h1>Product Management with API</h1>
  <div id="products">
    <p>Loading products...</p>
  </div>
  
  <div id="add" style="margin-top: 30px;">
    <h2>Add New Product</h2>
    <form id="productForm">
      <input type="hidden" id="editId">
      <input type="text" id="name" placeholder="Product name" required>
      <input type="number" id="price" placeholder="Price" step="0.01" required>
      <input type="number" id="rating" placeholder="Rating" step="0.1" min="0" max="5">
      <button type="submit">Add Product</button>
    </form>
  </div>
  
  <script>
    // Fetch and display products
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        const products = data;
        const productsDiv = document.getElementById('products');
        productsDiv.innerHTML = '';
        products.forEach(product => {
          const card = document.createElement('div');
          card.className = 'product-card';
          card.innerHTML = '<h3>' + product.name + '</h3>' + '<p>Price: $' + product.price + '</p>' + '<p>Rating: &#9733; ' + product.rating + '</p>' + '<button onclick="deleteProduct(' + product.id + ')">Delete</button>';
          productsDiv.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        document.getElementById('products').innerHTML = '<p>Error loading products.</p>';
      });

    // Handle add/edit product form
    document.getElementById('productForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
      const rating = document.getElementById('rating').value;
      const editId = document.getElementById('editId').value;
      
      if (editId) {
        // Edit product
        fetch('/api/products/' + editId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, price: price, rating: rating })
        })
        .then(response => response.json())
        .then(() => loadProducts());
      } else {
        // Add new product
        fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, price: price, rating: rating })
        })
        .then(response => response.json())
        .then(() => {
          document.getElementById('productForm').reset();
          document.getElementById('editId').value = '';
          loadProducts();
        });
      }
    });

    function deleteProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        fetch('/api/products/' + id, { method: 'DELETE' })
          .then(() => loadProducts());
      }
    }

    function loadProducts() {
      fetch('/api/products')
        .then(response => response.json())
        .then(data => {
          const products = data;
          const productsDiv = document.getElementById('products');
          productsDiv.innerHTML = '';
          products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = '<h3>' + product.name + '</h3>' + '<p>Price: $' + product.price + '</p>' + '<p>Rating: &#9733; ' + product.rating + '</p>' + '<button onclick="deleteProduct(' + product.id + ')">Delete</button>';
            productsDiv.appendChild(card);
          });
        });
    }
  </script>
</body>
</html>`;
  res.send(html);
});

// Start server
app.listen(port, () => {
  console.log('Express API app listening at http://localhost:' + port);
});