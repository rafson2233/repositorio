const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const adminAccessCodeRegex = /^(?=(?:.*[Aa])(?=.*[Dd])(?=.*[Mm]))(?=.*[A-Za-z])(?=(?:.*\d){4}).{8}$/;
const userAccessCodeRegex = /^(?=(?:.*[Uu])(?=.*[Ss])(?=.*[Rr]))(?=.*[A-Za-z])(?=(?:.*\d){4}).{8}$/;

router.post('/api/auth/register', async (req, res) => {
  const body = req.body;
  console.log('Request Body:', req.body);

  const name = body.name;
  const email = body.email.trim().toLowerCase();
  const password = body.password;
  const accessCode = body.accessCode;

  if (!body || !body.name) {
    console.error("Name is required.");
    return res.status(400).json({ error: 'Name is required.' });
  }

  if (typeof body.name !== 'string' || body.name.trim() === '') {
    console.error("The name is not valid.");
    return res.status(400).json({ error: 'The name is not valid.' });
  }

  if (name.length < 3) {
    console.error("Name must be at least 3 characters long.");
    return res.status(400).json({ error: 'Name must be at least 3 characters long.' });
  }

  if (!nameRegex.test(name)) {
    console.error("Name must contain only letters and spaces.");
    return res.status(400).json({ error: 'Name must contain only letters and spaces.' });
  }

  if (!body.email) {
    console.error("Email is required.");
    return res.status(400).json({ error: 'Email is required.' });
  }

  if (!emailRegex.test(email)) {
    console.error("Invalid email format.");
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const user = await Users.findOne({ email });
    if (user) {
      console.error(`Email already in use.`);
      return res.status(400).json({ error: 'This email is already registered.' });
    }
  } catch (err) {
    console.error('Database error:', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }

  if (!body.password) {
    console.error("Password is required.");
    return res.status(400).json({ error: 'Password is required.' });
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters long.");
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  if (!strongPasswordRegex.test(password)) {
    console.error("The password must contain at least one uppercase letter, one lowercase letter, one number and one special character.");
    return res.status(400).json({ error: 'The password must contain at least one uppercase letter, one lowercase letter, one number and one special character.' });
  }

  if (!body.accessCode) {
    console.error("Access code is required.");
    return res.status(400).json({ error: 'Access code is required.' });
  }

  if (!adminAccessCodeRegex.test(accessCode) && !userAccessCodeRegex.test(accessCode)) {
    console.error("Invalid access code format.");
    return res.status(400).json({ error: 'Invalid access code format.' });
  }

  try {
    const code = await Users.findOne({ accessCode });
    if (code) {
      console.error(`Access code already in use.`);
      return res.status(400).json({ error: 'This access code is already registered.' });
    }
  } catch (err) {
    console.error('Database error:', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }

  if (adminAccessCodeRegex.test(accessCode)) {
    userType = "admin";
  } else {
    userType = "user";
  }

  const newUser = new Users({ name, email, password, accessCode, userType });

  try {
    await newUser.save();
    console.info('User created successfully.');
    return res.status(201).json({ message: 'User created successfully.' });

  } catch (err) {
    console.error('Error registering:', err.message);
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;