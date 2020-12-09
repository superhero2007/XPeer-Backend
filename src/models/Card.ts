import mongoose, { Document, Model, Schema } from 'mongoose';
import Random from 'meteor-random-universal';

export interface ITask extends Document {
  id: number;
  description: string;
}

export interface ICard extends Document {
  title: string;
  tasks: ITask[];
  lastTaskId: number;
  success: boolean;
}

export interface ICardModel extends Model<ICard> {
}

const cardSchema = new Schema({
  _id: {
    type: String,
    default: () => `cg_${Random.id()}`,
    required: true
  },
  title: String,
  tasks: Array,
  lastTaskId: Number,
  success: Boolean
}, { timestamps: true });

const Card = mongoose.model<ICard, ICardModel>('Card', cardSchema);

export default Card;
