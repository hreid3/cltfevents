/**
 * Created by hreid on 4/14/17.
 */
import {Document, model, Model, Schema} from "mongoose";
import {AddressSchema, Address, IAddress} from "./Address";

export interface IChurch extends Document {
    title: string
    location: IAddress
    phoneNumber: string
}

export const ChurchSchema = new Schema({
    title: {type: String, required: true},
    location: {type: [AddressSchema], required: true},
    phoneNumber: {type: String}
})

export type Church = Model<IChurch> & IChurch
export const Church: Church = <Church>model<IChurch>('Church', ChurchSchema)
export default Church