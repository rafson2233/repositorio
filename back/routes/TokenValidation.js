const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.get('/api/validate', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({ user: decoded });
  } catch (error) {
    return res.status(403).json({ error: 'Token is not valid' });
  }
});

module.exports = router;