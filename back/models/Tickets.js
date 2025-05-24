const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company name is required.'],
        trim: true
    },
    companyBudget: {
        type: String,
        required: [true, 'Company budget is required.'],
        trim: true
    },
    dateReport: {
        type: Date,
        required: [true, 'Date report is required.'],
        trim: true
    },
    priorityLevel: {
        type: String,
        enum: ['Critical', 'Blocker', 'Failure', 'Failure Blocker', 'High', 'Low'],
        required: [true, 'Priority level is required.']
    },
    priorityReason: {
        type: String,
        required: [true, 'Priority reason is requered.'],
        trim: true
    },
    errorFound: {
        type: String,
        required: [true, 'Error found is requered.'],
        trim: true
    },
    linkTicket: {
        type: String,
        required: [true, 'The ticket link is required.'],
        trim: true,
        match: [/^(https?:\/\/)(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/, 'Please enter a valid URL.']
    },
    weight: {
        type: Number,
        min: 1,
        max: 5,
        required: false
    },
    responsableName: {
        type: String,
        required: false,
        trim: true
    },
    userName: {
        type: String,
        required: [true, 'User name is required.'],
        trim: true
    },
    priority: {
        type: String,
        enum: ['yes', 'no'],
        required: false
    },
    status: {
        type: String,
        enum: ['not started', 'in progress', 'completed', 'cancelled', 'blocked'],
        required: false,
        default: 'not started'
    },
    email: {
        type: String,
        required: true,
        ref: 'Users'
    }
});
module.exports = mongoose.model('Tickets', TicketSchema, 'Tickets');