const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const registerRoutes = require('./routes/RegisterRoutes');
const authRoutes = require('./routes/AuthRoutes');
const ticketRegistrationRoutes = require('./routes/TicketRegistrationRoutes')
const tokenValidation = require('./routes/TokenValidation')
const logoutRoutes = require('./routes/LogoutRoutes')

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://ticket-flow-fawn.vercel.app'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(registerRoutes);
app.use(authRoutes); 
app.use(ticketRegistrationRoutes)
app.use(tokenValidation); 
app.use(logoutRoutes); 

module.exports = app;