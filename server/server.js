// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// In-memory history storage
let history = [];

// Safe evaluation function
function safeEval(expression) {
  if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
    throw new Error('Invalid characters in expression');
  }
  try {
    const result = Function(`"use strict"; return (${expression})`)();
    if (typeof result !== 'number' || Number.isNaN(result)) {
      throw new Error('Invalid math expression');
    }
    return result;
  } catch {
    throw new Error('Invalid math expression');
  }
}

// POST /api/calculate
app.post('/api/calculate', (req, res) => {
  const { expression } = req.body;
  if (!expression || typeof expression !== 'string') {
    return res.status(400).json({ error: 'Expression is required and must be a string' });
  }
  try {
    const result = safeEval(expression);

    // Save calculation in history (most recent first)
    history.unshift({ expression, result });

    // Keep history to max 20 items
    if (history.length > 20) history.pop();

    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/history
app.get('/api/history', (req, res) => {
  res.json(history);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
