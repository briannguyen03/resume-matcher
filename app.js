/*
app.js

Brian Nguyen
18-06-2025

Main entry point for the program
*/

const express = require('express');
const app = express();

// Load routes
const matchRoutes = require('./routes/matchRoutes');

// Middleware
app.use(express.json());
app.use('/api', matchRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
