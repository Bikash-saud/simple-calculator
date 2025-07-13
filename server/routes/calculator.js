const express = require('express');
const router = express.Router();
const History = require('../models/History');

router.post('/calculate', async (req, res) => {
  const { expression } = req.body;
  try {
    const result = eval(expression); // ⚠️ Use mathjs for safety in production
    const history = new History({ expression, result });
    await history.save();
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Expression' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const logs = await History.find().sort({ createdAt: -1 }).limit(10);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
