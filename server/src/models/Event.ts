/**
 * Created by hreid on 4/14/17.
 */
import {Document, model, Model, Schema} from "mongoose";
import Address, {AddressSchema, IAddress} from "./Address";
import Church from "./Church";
import Person from "./Person";
import Dimension from "./Dimension";
const Mongoosastic = require('mongoosastic')

export interface IEvent extends Document {
    title: string
    slug: string
    description: string
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
    synchronize: any
}

export const EventSchema = new Schema({
    title: {type: String, required: true, es_indexed: true},
    slug: {type: String, required: true, index: { unique: true }},
    description: {type: String, required: true, es_indexed: true},
    hostingChurch: {type: Schema.Types.ObjectId, ref: 'Church', required: true, es_indexed: true},
    location: {type: [AddressSchema], required: true},
    startDateTime: {type: Date, required: true, default: Date.now(), es_indexed: true},
    endDateTime: {type: Date,  default: Date.now()},
    numberOfSeats: {type: Number, default: 0},
    ticketPrice: {type: Number, default: 0.0},
    guestSpeakers: {type: Array, es_indexed: true},
    contacts: {type: [Schema.Types.ObjectId], ref: 'Address', required: false},
    notes: {type: String, es_indexed: true},
    eventType: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true},
    eventLevel: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true},
    eventStatus: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true},
})
EventSchema.plugin(Mongoosastic)

export type Event = Model<IEvent> & IEvent
export const Event: Event = <Event>model<IEvent>('Event', EventSchema)
let count = 0
const stream = Event.synchronize()
stream.on('data', () => {
    count++;
})
stream.on('close', () => {
    console.log('indexed ' + count + ' documents!')
})
stream.on('error', (err) => {
    console.log(err)
})
export default Event