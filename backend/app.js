const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes/routes');
const pool = require('./configs/db');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// Routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Connected to MySQL database!');
    connection.release();
  }
});
