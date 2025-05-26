const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/api/auth/login', async (req, res) => {
  const body = req.body;

  const email = body.email.trim().toLowerCase();
  const password = body.password;

  if (!body || !body.email) {
    console.error("Email is required.");
    return res.status(400).json({ error: 'Email is required.' });
  }

  if (!emailRegex.test(email)) {
    console.error("Invalid email format.");
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (!body.password) {
    console.error("Password is required.");
    return res.status(400).json({ error: 'Password is required.' });
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters long.");
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      console.error(`User with email ${email} not found.`);
      return res.status(401).json({ error: 'Invalid email credential.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.error(`Incorrect password for user ${user.email}.`);
      return res.status(401).json({ error: 'Invalid password credential.' });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '2h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });

    console.log(`User ${email} successfully logged in.`);
    return res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error(`Login error: ${err}`);
    return res.status(500).send('Internal error while logging in.');
  }
});

module.exports = router;