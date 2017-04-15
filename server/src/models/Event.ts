/**
 * Created by hreid on 4/14/17.
 */
import {Document, model, Model, Schema} from "mongoose";
import Address, {AddressSchema, IAddress} from "./Address";
import Church from "./Church";
import Person from "./Person";
import Dimension from "./Dimension";

export interface IEvent extends Document {
    title: string
    hostingChurch: Church
    location: IAddress
    startDateTime: Date
    endDateTime: Date
    numberOfSeats: number
    ticketPrice: number
    guestSpeakers: string[]
    // suppliers: Suppliers[] = []
    contacts: Person[]
    notes: string
    eventType: Dimension
    eventLevel: Dimension
    eventStatus: Dimension
}

export const EventSchema = new Schema({
    title: {type: String, required: true},
    hostingChurch: {type: Schema.Types.ObjectId, ref: 'Church', required: true},
    location: {type: [AddressSchema], required: true},
    startDateTime: {type: Date, required: true, default: Date.now()},
    endDateTime: {type: Date,  default: Date.now()},
    numberOfSeats: {type: Number, default: 0},
    ticketPrice: {type: Number, default: 0.0},
    guestSpeakers: {type: [String]},
    contacts: {type: [Schema.Types.ObjectId], ref: 'Address', required: true},
    notes: String,
    eventType: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true},
    eventLevel: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true},
    eventStatus: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true},
})

export type Event = Model<IEvent> & IEvent
export const Event: Event = <Event>model<IEvent>('Event', EventSchema)
export default Event