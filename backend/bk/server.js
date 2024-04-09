const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://192.168.1.9:3000', // Replace with your frontend URL
  credentials: false,
}));

app.use(express.json());

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mgmtweb', 'app_user', 'changeme', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('Unable to connect to the database:', err));

// ADDING SIMPLE API ENDPOINT

// Dummy data
const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// API endpoint to fetch data
app.get('/api/data', (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

