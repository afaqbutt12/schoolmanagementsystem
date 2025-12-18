import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IComplain extends Document {
  user: Types.ObjectId;
  date: Date;
  complaint: string;
  school: Types.ObjectId;
}

const complainSchema = new Schema<IComplain>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true,
  }
});

const Complain: Model<IComplain> = mongoose.models.complain || mongoose.model<IComplain>('complain', complainSchema);

export default Complain;

