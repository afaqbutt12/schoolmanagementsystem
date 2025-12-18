import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ISclass extends Document {
  sclassName: string;
  school: Types.ObjectId;
}

const sclassSchema = new Schema<ISclass>({
  sclassName: {
    type: String,
    required: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true,
  }
});

const Sclass: Model<ISclass> = mongoose.models.sclass || mongoose.model<ISclass>('sclass', sclassSchema);

export default Sclass;

