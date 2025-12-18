import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface INotice extends Document {
  title: string;
  details: string;
  date: Date;
  school: Types.ObjectId;
}

const noticeSchema = new Schema<INotice>({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true,
  }
});

const Notice: Model<INotice> = mongoose.models.notice || mongoose.model<INotice>('notice', noticeSchema);

export default Notice;

