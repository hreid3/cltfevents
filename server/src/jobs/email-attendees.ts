/**
 * Created by hreid on 4/29/17.
 */

import {Event} from "../models/Event";
import {ObjectID} from "mongodb";
import Attendee from "../models/Person";
import {Dimension} from "../models/Dimension";
import {Church} from "../models/Church";
import {AttendeeEventBooking} from "../models/AttendeeEventBooking";
import {createTransport} from 'nodemailer'
import * as moment from 'moment'
import {eventStartReminderTemplate, reminderTemplate} from './email-templates'
import {scheduleJob} from 'node-schedule'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const mongoDB = 'mongodb://localhost/cltfevents';
mongoose.connect(mongoDB);

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const currencyFormatterUs = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
})

// Find all attendees that are active and have a balance due for any event that has not passed.
const findAttendeesWithBalanceForUpcomingEvents = async () => {
    Event
    Dimension
    Attendee
    const tt = await AttendeeEventBooking
        .find({status: 'Active'})
        .populate(
        [{
            path: 'event',
            populate: [{
                path: 'eventStatus',
            }]
        }, {
            path: 'attendee',
            populate: [{
                path: 'status'
            }],
        }]);
    const tt2 = tt.filter((val: any) => {
        const amtPaid = val.payments.reduce((a, b) => ({amount: a.amount + b.amount}), {amount: 0}).amount
        const total = val.numberSeatsReserved * val.event.ticketPrice
        const amountOwned = total - amtPaid
            return (
            val.event.eventStatus.id == "published"
            && val.event.startDateTime.getTime() >= new Date().getTime()
            && val.attendee.status.id == "active"
            && amountOwned > 0
        )
    })
    // console.log(JSON.stringify(tt2), null, '\t')
    return tt2
}

// Find all events that is less than 24 hours and email all attendees
const findAttendeesForEventsThatAreLessThanSpecifiedTime = async (time: Date = new Date(new Date().getTime() + 86400000)) => {
   Event
   Dimension
   Attendee

   const now = new Date()
   const events = await Event
       .find(
           {startDateTime: {$lte: time, $gt: now}}
           )
       .select(['_id', 'eventStatus'])
       .populate([
           {path: 'eventStatus'}
       ])
    if (events.length == 0) {
       return events
    }
    const filteredEventIds = events
        .filter((val: any) => val.eventStatus.id == "published")
        .map(val => ({_id: val._id}))

    if (!filteredEventIds) return []
    const eventBookings = await AttendeeEventBooking
        .find({status: 'Active', event: {$in: filteredEventIds}})
        .populate(
            [{
                path: 'event',
                populate: [{
                    path: 'eventStatus',
                }]
            }, {
                path: 'attendee',
                populate: [{
                    path: 'status'
                }],
            }]);

   if (!eventBookings) return []

   const attendeeBooked = eventBookings
       .filter((val: any) => val.attendee.status.id == "active")

//    console.log('attendeesToEmail', attendeeBooked)

    return attendeeBooked
}

// const attendeesToEmail = findAttendeesForEventsThatAreLessThanSpecifiedTime()
// findAttendeesWithBalanceForUpcomingEvents()
// console.log('hello world')

const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: 1025,
    ignoreTLS: true
})

const emailheader = {
    from: 'sender@christianfellowshipchurches.org',
    to: '',
    subject: '',
    text: '',
    // html: '<p>HTML version of the message</p>'
};

/**
 * Send out reminder that event is taking place to emails
 *
 */
export const remindAttendeesToAttendEvent = async () => {
    try {
        const attendees = await findAttendeesForEventsThatAreLessThanSpecifiedTime()
        attendees.forEach(val => {
            const anAttendee = {
                title: val.attendee.title || '',
                firstName: val.attendee.firstName,
                lastName: val.attendee.lastName,
                eventStartTime: moment(val.event.startDateTime).format('MMM Do, YYYY h:mm a'),
                eventTitle: val.event.title
            }
            const template = eventStartReminderTemplate(anAttendee)
            transporter.sendMail({...emailheader, to: val.attendee.email, subject: 'CLT Fellowship Churches Reminder', text: template}, (err, info) => {
                if (err) {
                    return console.log(err)
                }
                console.log('Message %s send: %s', info.messageId, info.response)
            })

            // console.log('template', template)
        })
    } catch(err) {
        console.log(err)
    }
}

export const remindAttendeesToMakePayment = async () => {
    try {
        const attendees = await findAttendeesWithBalanceForUpcomingEvents()
        attendees.forEach((val: any) => {
            const amtPaid = val.payments.reduce((a, b) => ({amount: a.amount + b.amount}), {amount: 0}).amount
            const total = val.numberSeatsReserved * val.event.ticketPrice
            const amountOwed = currencyFormatterUs.format(total - amtPaid)
            const anAttendee = {
                title: val.attendee.title || '',
                firstName: val.attendee.firstName,
                lastName: val.attendee.lastName,
                eventStartTime: moment(val.event.startDateTime).format('MMM Do, YYYY h:mm a'),
                eventTitle: val.event.title,
                amountOwed: amountOwed
            }
            const template = reminderTemplate(anAttendee)
            transporter.sendMail({...emailheader, to: val.attendee.email, subject: 'CLT Fellowship Churches Payment Reminder', text: template}, (err, info) => {
                if (err) {
                    return console.log(err)
                }
                console.log('Message %s send: %s', info.messageId, info.response)
            })
        })
    } catch(err) {
        console.log(err)
    }
}

const reminderSchedulerForAttendEvents = scheduleJob('0 15 * * *', () => {
    console.log('Send Reminder Event is about to start.');
    remindAttendeesToAttendEvent()
});

const reminderSchedulerToMakePayments = scheduleJob('00 5 * * 0', () => {
    console.log('Remind users to make payments');
    remindAttendeesToMakePayment()
});


// remindAttendeesToMakePayment()
// export const remindAttend
// remindAttendeesToAttendEvent()
