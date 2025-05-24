const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tickets = require('../models/Tickets');

const budgetRegex = /^(R\$|\$)\s\d{1,3}(?:\.\d{3})*,\d{2}$/;
const dateReportRegex = /^\d{2}\/\d{2}\/\d{4}$/;
const linkTicketRegex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
const allowedPriorityLevels = ['Critical', 'Blocker', 'Failure', 'Failure Blocker', 'High', 'Low'];
const MIN_LENGTH = 3;

router.put('/editTicket/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ticket ID.' });
        }

        const body = req.body;
        const {
            companyName,
            companyBudget,
            dateReport,
            priorityLevel,
            priorityReason,
            errorFound,
            linkTicket
        } = body;

        if (!companyName || companyName.length < MIN_LENGTH) {
            return res.status(400).json({ error: 'Company name must be at least 3 characters.' });
        }

        if (!companyBudget || !budgetRegex.test(companyBudget)) {
            return res.status(400).json({ error: 'Invalid budget format.' });
        }

        const budgetNumber = Number(companyBudget.replace(/[^\d.-]/g, ''));
        if (isNaN(budgetNumber) || budgetNumber <= 0) {
            return res.status(400).json({ error: 'Budget must be a valid number greater than 0.' });
        }

        if (!dateReport || !dateReportRegex.test(dateReport)) {
            return res.status(400).json({ error: 'Invalid date format.' });
        }

        const [day, month, year] = dateReport.split('/');
        const reportDate = new Date(`${year}-${month}-${day}`);
        if (reportDate > new Date()) {
            return res.status(400).json({ error: 'Date report cannot be in the future.' });
        }

        if (!allowedPriorityLevels.includes(priorityLevel)) {
            return res.status(400).json({ error: 'Invalid priority level.' });
        }

        if (!priorityReason || priorityReason.length < MIN_LENGTH) {
            return res.status(400).json({ error: 'Priority reason must be at least 3 characters.' });
        }

        if (!errorFound || errorFound.length < MIN_LENGTH) {
            return res.status(400).json({ error: 'Error found must be at least 3 characters.' });
        }

        if (!linkTicket || !linkTicketRegex.test(linkTicket)) {
            return res.status(400).json({ error: 'Invalid link format.' });
        }

        const ticket = await Tickets.findById(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const updatedTicket = await Tickets.findByIdAndUpdate(
            id,
            {
                $set: {
                    companyName,
                    companyBudget,
                    dateReport: reportDate,
                    priorityLevel,
                    priorityReason,
                    errorFound,
                    linkTicket,
                },
            },
            { new: true }
        );

        res.status(200).json({ message: 'Ticket updated successfully!' });

    } catch (err) {
        console.error('Error updating ticket:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/deleteTicket/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ticket ID.' });
        }

        const ticket = await Tickets.findByIdAndDelete(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (err) {
        console.error('Error deleting ticket:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;