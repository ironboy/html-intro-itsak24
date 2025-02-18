import express from 'express';
import sqlite3 from 'better-sqlite3';

// Create a new web server and store in a variable called app
let app = express();

// Tell the web server that we want to be able to use request bodies
// (necessary to make POST and PUT request work in a REST api)
app.use(express.json());

// Tell the web server to serve all files in the frontend folder
app.use(express.static('frontend'));

// Start the web server
app.listen(3000, () => console.log('Listening on http://localhost:3000'));

// Connect to the database
let db = sqlite3('./products.db');

// Get/read a list of all products
app.get('/api/products', (request, response) => {
  // Run a SELECT query to get all data from the table products
  // and store the result in the variable products
  let products = db.prepare('SELECT * FROM products').all();
  // Send the response to the frontend in JSON format
  response.json(products);
});

// Get/read info about a specific product
app.get('/api/products/:id', (request, response) => {
  let id = request.params.id;
  // Create a prepared statement with the SQL query + the data/parameter values
  // to use in the prepared statement
  let preparedStatement = db.prepare('SELECT * FROM products WHERE id = :id');
  let result = preparedStatement.all({ id });
  // Send the response to the frontend in JSON format
  response.json(result);
});

// Post/create a new product
app.post('/api/products', (request, response) => {
  // Read the request body
  let body = request.body;
  // Create the SQL query as a prepared statement
  let preparedStatement = db.prepare(`
    INSERT INTO products (name, description, priceSEK)
    VALUES (:name, :description, :priceSEK)
  `);
  // Run the query (using the data from the request body)
  let result = preparedStatement.run(body);
  // Send the result of the query to the frontend in JSON format
  response.json(result);
});

// Update data about a product
app.put('/api/products/:id', (request, response) => {
  // Read the id from the request parameters
  let id = request.params.id;
  // Read the request body
  let body = request.body;
  // Create an UPDATE SQL query based on which properties
  // the request body says that we should change
  let sqlQuery = 'UPDATE products SET ';
  for (let key of Object.keys(body)) {
    sqlQuery += key + '= :' + key + ', '
  }
  // remove te last trailing comma in the SQL query
  sqlQuery = sqlQuery.slice(0, -2);
  // Add a WHERE clause to the SQL query
  sqlQuery += ' WHERE id=:id';
  // Create a prepared statement based on the sql query
  // we have constructed
  let preparedStatement = db.prepare(sqlQuery);
  // Run the query 
  // (using the data from the request body + id from the route)
  let result = preparedStatement.run({ id, ...body });
  // Return the result
  response.json(result);
});

app.delete('/api/products/:id', (request, response) => {
  let id = request.params.id;
  // Create a prepared statement with the sql query
  let preparedStatement = db.prepare('DELETE FROM products WHERE id = :id');
  // Run the sql query
  let result = preparedStatement.run({ id });
  // Return the result
  response.json(result);
});