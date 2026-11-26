const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Route 1: Home page (GET)
app.get('/', (req, res) => {
  res.render('home', { title: 'Express Routes App' });
});

// Route 2: About page (GET)
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page' });
});

// Route 3: Contact page (GET)
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Route 4: POST route for contact form
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Process the form data
  console.log(`Received contact form: ${name}, ${email}, ${message}`);
  res.render('contact', { title: 'Contact Us', success: true });
});

// Route 5: Products page (GET) - demonstrates dynamic data
app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 45 }
  ];
  res.render('products', { title: 'Products', products });
});

// Route 6: User profile (GET with parameter)
app.get('/user/:username', (req, res) => {
  const { username } = req.params;
  res.render('user', { title: 'User Profile', username });
});

// Route 7: Calculator (POST)
app.post('/calculate', (req, res) => {
  const { num1, num2 } = req.body;
  const result = Number(num1) + Number(num2);
  res.render('calculate', { title: 'Calculator', result });
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});