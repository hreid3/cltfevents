/**
 * Created by hreid on 4/14/17.
 */
import {Document, model, Model, Schema} from "mongoose";
import Person from "./Person";
import Event from "./Event";
import Dimension from "./Dimension";

const EventPaymentSchema = new Schema({
    amount: {type: Number, required: true, default: 0.0},
    txDate: {type: Date, required: true, default: Date.now()},
    method: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true},
    receivedBy: {type: Schema.Types.ObjectId, ref: 'Person'},
})

export interface IAttendeeEventBooking extends Document {
    attendee: Person
    event: Event
    bookingDate: Date
    numberSeatsReserved: Number
    status: String
    payments: Object
    addPayment: (amount: number, txDate: Date, method: Dimension, receivedBy?: Person) => Boolean
    removePayment: (amount: number, txDate) => Boolean
    getTotalPaymentAmount: () => Number
}

export const AttendeeEventBookingSchema = new Schema({
    attendee: {type: Schema.Types.ObjectId, ref: 'Person', required: true},
    event: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
    bookingDate: {type: Date, default: Date.now(), required: true},
    numberSeatsReserved: {type: Number},
    status: {type: String, required: true},
    payments: [EventPaymentSchema]

})

export type AttendeeEventBooking = Model<IAttendeeEventBooking> & IAttendeeEventBooking
export const AttendeeEventBooking: AttendeeEventBooking = <AttendeeEventBooking>model<IAttendeeEventBooking>('AttendeeEventBooking', AttendeeEventBookingSchema)
export default AttendeeEventBooking
