/**
 * Created by hreid on 4/14/17.
 */
import {Document, model, Model, Schema} from "mongoose";

export interface IDimension extends Document{
    title: string
    active: boolean
    id: string
    type: string
    getBy(id: string, type: string): Promise<IDimension>
    getByType(type: string): Promise<IDimension>
}

export const DimensionSchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    id: {type: String, required: true},
    active: {type: Boolean}
})

DimensionSchema.static('getBy', (id: string, type: string) => {
    return Dimension.find({id: id, type: type}, '-_id').select('id title').lean().exec()
})

DimensionSchema.static('getByType', (type: string) => {
    return Dimension.find({type: type}, '-_id').select('id title').lean().exec()
})


export type Dimension = Model<IDimension> & IDimension
export const Dimension: Dimension = <Dimension>model<IDimension>('Dimension', DimensionSchema)
export default Dimension
