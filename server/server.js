const express = require('express');
const pool = require('./dbconnect');
const bcrypt = require('bcrypt');
const multer = require('multer');
const app = express();
const PORT = 8181;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '/images/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomUUID()}`)
});

const images = multer({ storage });

app.use(express.json());

// Define a basic GET route
app.get('/', (req, res) => {
  res.send('v1.0.0');
});

app.get('/recipes/', async (req, res) => {
  let client;
  try {
    client = await pool.connect();

    let sqlQuery = `SELECT 
    r.*,
    COALESCE(json_agg(t) FILTER (WHERE t.id IS NOT NULL), '[]') AS tags
FROM 
    recipes AS r
LEFT OUTER JOIN 
    recipesXtags rxt ON r.id = rxt.recipeid
LEFT OUTER JOIN
    tags t ON rxt.tagid = t.id
GROUP BY 
    r.id, r.name
ORDER BY
  r.id asc;`;

    let result = await client.query(sqlQuery);
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.error });
  } finally {
    if (client) client.release();
  }
});

app.post('/recipes/add/', async (req, res) => {
  let client;
  try {
    client = await pool.connect();

    let recipe = req.body;

    let sqlInsertRecipe = `
    INSERT INTO recipes (name, image, description)
    VALUES
    ($1, $2, $3);
    `;

    let sqlGetRecipes = `
    SELECT 
    r.*,
    COALESCE(json_agg(t) FILTER (WHERE t.id IS NOT NULL), '[]') AS tags
FROM 
    recipes AS r
LEFT OUTER JOIN 
    recipesXtags rxt ON r.id = rxt.recipeid
LEFT OUTER JOIN
    tags t ON rxt.tagid = t.id
GROUP BY 
    r.id, r.name
ORDER BY
  r.id asc;
    `;
    
    const insert = await client.query(sqlInsertRecipe, [recipe.name, recipe.image, recipe.description]);
    const result = await client.query(sqlGetRecipes);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.error });
  } finally {
    if (client) client.release();
  }
});

app.post('/images/add/', images.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No valid image to upload.');
  }

  console.log(req.file.path);
  res.json(req.file.path);
});

/*app.get('/users/', async (req, res) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query('SELECT * FROM users');

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.error });
  } finally {
    if (client) client.release();
  }
});*/

// Start the server
app.listen(PORT, () => {});