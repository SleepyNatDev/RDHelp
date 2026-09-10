const express = require('express');
const app = express();
const PORT = 8181;

// Define a basic GET route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/', (req, res) => {
  res.send('Hello API!');
});

// Start the server
app.listen(PORT, () => {});