const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simple route
app.get('/', (req, res) => {
  res.send('Welcome to NodeJS Application!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
