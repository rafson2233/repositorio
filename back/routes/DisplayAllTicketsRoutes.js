const express = require('express');
const router = express.Router();
const Ticket = require('../models/Tickets');
const User = require('../models/Users');
const jsonWebToken = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/api/tickets/allTickets', async (req, res) => {
  const { field, filter, status, sortField, sortOrder } = req.body;
  const query = {};

  if (field && filter) {
    query[field] = { $regex: filter, $options: 'i' };
  }

  if (status && status.length > 0) {
    query.status = { $in: status };
  }

  const sort = {};
  if (sortField) {
    sort[sortField] = sortOrder === 'asc' ? 1 : -1;
  }

  try {
    const tickets = await Ticket.find(query).sort(sort);
    res.status(200).json(tickets);
  } catch (err) {
    console.error(`Error fetching tickets: ${err}`);
    res.status(500).json({ error: 'Error fetching tickets.' });
  }
});

router.post('/api/tickets/userTickets', async (req, res) => {
  const { field, filter, status, sortField, sortOrder } = req.body;
  const query = {};
  const token = req.cookies.token;
  let userName = null;
  if (field && filter) {
    query[field] = { $regex: filter, $options: 'i' };
  }

  if (status && status.length > 0) {
    query.status = { $in: status };
  }

  const sort = {};
  if (sortField) {
    sort[sortField] = sortOrder === 'asc' ? 1 : -1;
  }
  try {
    const decoded = jsonWebToken.verify(token, SECRET_KEY);
    email = decoded.email;
  } catch (err) {
    console.error('Invalid or expired token', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    userName = user.name;
    query.userName = userName;
  } catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  try {
    const tickets = await Ticket.find(query).sort(sort);
    res.status(200).json(tickets);
  } catch (err) {
    console.error(`Error fetching tickets: ${err}`);
    res.status(500).json({ error: 'Error fetching tickets.' });
  }
});

module.exports = router;
