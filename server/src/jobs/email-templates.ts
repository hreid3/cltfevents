/**
 * Created by hreid on 4/30/17.
 */

export const reminderTemplate = (attendee) =>
    `Dear ${attendee.title} ${attendee.firstName} ${attendee.lastName},
    
    We would like to remind you that you owe $attendee.{amountOwed} for Event ${attendee.eventTitle} 
    that is schedule for ${attendee.eventStartTime}. 
    
    Thank you,
    
    CLT Event Coordinators
`

export const eventStartReminderTemplate = (attendee) =>
    `Dear ${attendee.title} ${attendee.firstName} ${attendee.lastName},
    
    We would like to remind you that you Event ${attendee.eventTitle} 
    that is schedule to start ${attendee.eventStartTime}. 
    
    Thank you,
    
    CLT Event Coordinators
`

