import express from 'express';
import sqlite3 from 'better-sqlite3';

// Create a new web server and store in a variable called app
let app = express();

// Tell the web server to serve all files in the frontend folder
app.use(express.static('frontend'));

// Start the web server
app.listen(3000, () => console.log('Listening on http://localhost:3000'));

// Connect to the database
let db = sqlite3('./products.db');


app.get('/api/products', (request, response) => {
  // Run a SELECT query to get all data from the table products
  // and store the result in the variable products
  let products = db.prepare('SELECT * FROM products').all();
  // Send the response to the frontend
  response.json(products);
});