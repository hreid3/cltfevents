/**
 * Created by hreid on 4/14/17.
 */
import {Document, model, Model, Schema} from "mongoose";
import Address, {AddressSchema, IAddress} from "./Address";
import Church from "./Church";
import Dimension from "./Dimension";

export interface IPerson extends Document {
    email: string
    title: string
    firstName: string
    middleInitial: string
    lastName: string
    suffix: string
    datOfBirth: Date
    homeChurch: Church
    companyName: string
    homeAddess: IAddress
    contactMobile: string
    contactHomePhone: string
    disabilities: boolean
    bioImageUri: string
    status: Dimension
    role: Dimension
}

export const PersonSchema = new Schema({
    title: {type: String},
    firstName: {type: String, required: true},
    middleInitial: {type: String},
    lastName: {type: String, required: true},
    suffix: {type: String},
    datOfBirth: {type: Date},
    homeChurch: {type: Schema.Types.ObjectId, ref: 'Church', required: true},
    companyName: {type: String, required: true},
    homeAddess: {type: [AddressSchema], required: true},
    contactMobile: {type: String, required: true},
    contactHomePhone: {type: String, required: true},
    disabilities: {type: Boolean, default: false},
    bioImageUri: {type: String},
    status: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true},
    role: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true},
})

export type Person = Model<IPerson> & IPerson
export const Person: Person = <Person>model<IPerson>('Person', PersonSchema)
export default Person