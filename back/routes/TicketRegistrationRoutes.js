const express = require('express');
const router = express.Router();
const Tickets = require('../models/Tickets');
const User = require('../models/Users');
const jsonWebToken = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
const MIN_LENGTH = 3;

const budgetRegex = /^(R\$|\$)\s\d{1,3}(?:\d{3})*,\d{2}$/;
const dateReportRegex = /^\d{2}\/\d{2}\/\d{4}$/;
const linkTicketRegex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
const allowedPriorityLevels = ['Critical', 'Blocker', 'Failure', 'Failure Blocker', 'High', 'Low'];

router.post('/api/ticketRegistration', async (req, res) => {
    const body = req.body;
    const token = req.cookies.token;
    console.log('Request Body', req.body);

    const companyName = body.companyName
    const companyBudget = body.companyBudget;
    const dateReport = body.dateReport;
    const priorityLevel = body.priorityLevel;
    const priorityReason = body.priorityReason;
    const errorFound = body.errorFound;
    const linkTicket = body.linkTicket;
    let email = null;
    let userName = null;


    try {
        const decoded = jsonWebToken.verify(token, SECRET_KEY);
        email = decoded.email;
    } catch (err) {
        console.error('Invalid or expired token', err);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    if (!body || typeof body.companyName !== 'string' || body.companyName.trim() === '') {
        console.error("The name is not valid.");
        return res.status(400).json({ error: 'The name is not valid.' });
    }

    if (companyName.length < MIN_LENGTH) {
        console.error("Company name must be at least 3 characters.");
        return res.status(400).json({ error: 'Company name must be at least 3 characters.' });
    }

    if (!body.companyBudget) {
        console.error("Company budget is required.");
        return res.status(400).json({ error: 'Company budget is required.' });
    }

    if (!budgetRegex.test(companyBudget)) {
        console.error("invalid budget format.");
        return res.status(400).json({ error: 'invalid budget format' });
    }

    const budgetNumber = Number(companyBudget.replace(/[^\d.-]/g, ''));
    if (isNaN(budgetNumber) || budgetNumber <= 0) {
        console.error("Budget must be a valid number greater than 0.");
        return res.status(400).json({ error: 'Budget must be a valid number greater than 0.' });
    }

    if (!body.dateReport) {
        console.error("Date report is required.");
        return res.status(400).json({ error: 'Date report is required.' });
    }

    if (!dateReportRegex.test(dateReport)) {
        console.error("invalid date format.");
        return res.status(400).json({ error: 'invalid date format' });
    }

    const [day, month, year] = dateReport.split('/');
    const reportDate = new Date(`${year}-${month}-${day}`);
    if (reportDate > new Date()) {
        console.error("Date report cannot be in the future.");
        return res.status(400).json({ error: 'Date report cannot be in the future.' });
    }


    if (!body.priorityLevel || !allowedPriorityLevels.includes(body.priorityLevel)) {
        console.error("Invalid priority level.");
        return res.status(400).json({ error: 'Invalid priority level.' });
    }

    if (!body.priorityReason) {
        console.error("Priority reason is required.");
        return res.status(400).json({ error: 'Priority reason is required.' });
    }

    if (priorityReason.length < MIN_LENGTH) {
        console.error("Priority reason must be at least 3 characters.");
        return res.status(400).json({ error: 'Priority reason must be at least 3 characters.' });
    }


    if (!body.linkTicket) {
        console.error("The ticket link is required.");
        return res.status(400).json({ error: 'The ticket link is required.' });
    }

    if (!linkTicketRegex.test(linkTicket)) {
        console.error("invalid link format.");
        return res.status(400).json({ error: 'invalid link format' });
    }

    const existingTicket = await Tickets.findOne({ linkTicket });
    if (existingTicket) {
        console.error("A ticket with this link already exists.");
        return res.status(400).json({ error: 'A ticket with this link already exists.' });
    }


    if (!body.errorFound) {
        console.error("Error found is required.");
        return res.status(400).json({ error: 'Error found is required.' });
    }

    if (errorFound.length < MIN_LENGTH) {
        console.error("Error found must be at least 3 characters.");
        return res.status(400).json({ error: 'Error found must be at least 3 characters.' });
    }

    try {
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        userName = user.name;
    } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    const newTicket = new Tickets({ companyName, companyBudget, dateReport, priorityLevel, priorityReason, errorFound, linkTicket, userName, email });

    try {
        await newTicket.save();
        console.info('Ticket created successfully.');
        return res.status(201).json({ message: 'Ticket created successfully.' });

    } catch (err) {
        console.error('Error registering:', err.message);
        return res.status(400).json({ error: err.message });
    }

});

module.exports = router;