const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const Users = require('../models/Users');

const SECRET_KEY = process.env.SECRET_KEY ;

router.get('/api/auth/profile', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await Users.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      accessCode: user.accessCode
    });
  } catch (err) {
    console.error('Erro ao verificar token:', err);
    res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
});

module.exports = router;
