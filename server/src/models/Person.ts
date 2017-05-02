/**
 * Created by hreid on 4/14/17.
 */
import {Document, model, Model, Schema} from "mongoose";
import Address, {AddressSchema, IAddress} from "./Address";
import Church from "./Church";
import Dimension from "./Dimension";
const Mongoosastic = require('mongoosastic')

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
    synchronize: any
    search: any
}

export const PersonSchema = new Schema({
    title: {type: String},
    email: {type: String, required: true, index: { unique: true },  es_indexed:true},
    firstName: {type: String, required: true,  es_indexed:true},
    middleInitial: {type: String},
    lastName: {type: String, required: true,  es_indexed:true},
    suffix: {type: String},
    datOfBirth: {type: Date},
    homeChurch: {type: Schema.Types.ObjectId, ref: 'Church', required: false},
    companyName: {type: String, required: false},
    homeAddess: {type: [AddressSchema], required: false,  es_indexed:false},
    contactMobile: {type: String, required: true,  es_indexed:true},
    contactHomePhone: {type: String, required: false},
    disabilities: {type: Boolean, default: false},
    bioImageUri: {type: String},
    status: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true, es_type:'nested', es_include_in_parent:true},
    role: {type: Schema.Types.ObjectId, ref: 'Dimension', required: true, es_type:'nested', es_include_in_parent:true},
})

PersonSchema.plugin(Mongoosastic, {
    hosts: [
        `${process.env.ELASTIC_SEARCH_HOST}:9200`
    ],
    populate: [
        {path: 'status'},
        {path: 'role'}
    ]
});
// PersonSchema.index({email: 'text', firstName: 'text', lastName: 'text', contactMobile: 'text'})
export type Person = Model<IPerson> & IPerson
export const Person: Person = <Person>model<IPerson>('Person', PersonSchema)

let count = 0
const stream = Person.synchronize()
stream.on('data', () => {
    count++;
})
stream.on('close', () => {
    console.log('indexed ' + count + ' documents!')
})
stream.on('error', (err) => {
    console.log(err)
})


export default Person
