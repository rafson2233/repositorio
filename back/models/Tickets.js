const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    companyName:{
        type: String,
        requered: [true, 'Company name is required.'],
        trim: true
    },
    companyBudget:{
        type: String,
        requered: [true, 'Company budget is required.'],
        trim: true
    },
    dateReport:{
        type: Date,
        requered: [true, 'Date report is required.'],
        trim: true
    },
    priorityLevel:{
        type: String,
        enum: ['Critical', 'Blocker', 'Failure', 'Failure Blocker', 'High','Low'],
        requered: [true, 'Priority level is required.']
    },
    priorityReason:{
        type: String,
        requered: [true, 'Priority reason is requered.'],
        trim: true
    },
    errorFound:{
        type: String,
        requered: [true, 'Error found is requered.'],
        trim: true
    },
    linkTicket:{
        type: String,
        requered: [true, 'The ticket link is required.'],
        trim: true,
        match: [/^(https?:\/\/)(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,'Please enter a valid URL.']
    },
    weight:{
        type: Number,
        min:1,
        max:5,
        requered: false
    },
    responsableName:{
        type: String,
        requered: false,
        trim: true
    },
    userName:{
        type: String,
        requered: [true,'User name is required.'],
        trim: true
    },
    priority:{
        type: String,
        enum: ['yes','no'],
        requered: false
    },
    status:{
        type: String,
        enum: ['not started','in progress','completed','cancelled','blocked'],
        requered: false,
        default: 'not started'
    },
    email:{
        type: String,
        requered: true,
        ref: 'Users'
    }
});
module.exports = mongoose.model('Tickets', TicketSchema, 'Tickets');