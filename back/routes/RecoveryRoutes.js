const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Users = require('../models/Users.js');
const sendRecoveryEmail = require('../utils/SendRecoveryEmail.js');
const resetPassword = require('../utils/ResetPassword.js');

const BASE_URL = 'http://localhost:5173';
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const recoveryTokens = new Map();

router.post('/api/auth/recovery', async (req, res) => {
  const body = req.body;
  console.log('Request Body:', body);

  const email = body.email?.trim().toLowerCase();

  if (!body || !body.email) {
    console.error("Email is required.");
    return res.status(400).json({ error: 'Email is required.' });
  }

  if (typeof email !== 'string' || email === '') {
    console.error("The email is not valid.");
    return res.status(400).json({ error: 'The email is not valid.' });
  }

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      console.error("E-mail not found in database.");
      return res.status(404).json({ error: 'E-mail not found.' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;
    recoveryTokens.set(token, email);

    const recoveryLink = `${BASE_URL}/reset-password/${token}`;

    await sendRecoveryEmail(email, recoveryLink);

    console.log(`Recovery email sent to: ${email}`);
    res.json({ message: 'Recovery email sent successfully.' });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: 'Server error while processing recovery request.' });
  }
});

router.post('/api/auth/reset-password/:token', async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  if (!token || !password) {
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

  if (!confirmPassword) {
    console.error("Confirmation password is required.");
    return res.status(400).json({ error: 'Confirmation password is required.' });
  }

  if (confirmPassword.length < 8) {
    console.error("Confirmation password must be at least 8 characters long.");
    return res.status(400).json({ error: 'Confirmation password must be at least 8 characters long.' });
  }

  if (!strongPasswordRegex.test(confirmPassword)) {
    console.error("The confirmation password must contain at least one uppercase letter, one lowercase letter, one number and one special character.");
    return res.status(400).json({ error: 'The confirmation password must contain at least one uppercase letter, one lowercase letter, one number and one special character.' });
  }

  if (password !== confirmPassword) {
    console.error("Passwords must be the same.");
    return res.status(400).json({ error: 'Passwords must be the same.' });
  }

  try {
    const user = await Users.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }
    await resetPassword(user.email, password);

    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: 'Password has been successfully reset.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error resetting password.' });
  }
});

module.exports = router;