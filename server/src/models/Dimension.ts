/**
 * Created by hreid on 4/14/17.
 */
import {Document, model, Model, Schema} from "mongoose";

export interface IDimension extends Document{
    title: string
    active: boolean
    id: string
    type: string
}

export const DimensionSchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    id: {type: String, required: true},
    active: {type: Boolean}
})

export type Dimension = Model<IDimension> & IDimension
export const Dimension: Dimension = <Dimension>model<IDimension>('Church', DimensionSchema)
export default Dimension
