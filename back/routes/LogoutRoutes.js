const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.send({ message: 'Logout successful' });
});

module.exports = router;
