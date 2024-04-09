const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// ============ RUNNING CMD SENT FROM FRONTEND ============
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: 'http://192.168.1.12:3000', // Replace with your frontend URL
  credentials: false,
}));

app.post('/api/run-command', (req, res) => {
const { command } = req.body;
console.log('Received command:', command); // Log the received command
  if (!command) {
    return res.status(400).json({ error: 'Command is missing or undefined' });
  }
  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    if (stderr) {
      res.status(400).json({ error: stderr });
      return;
    }
    res.json({ output: stdout });
  });
});
// ========== END OF RUNNING CMD FROM FRONTEND ============


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

