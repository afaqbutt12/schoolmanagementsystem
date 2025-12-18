import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ISubject extends Document {
  subName: string;
  subCode: string;
  sessions: string;
  sclassName: Types.ObjectId;
  school: Types.ObjectId;
  teacher: Types.ObjectId;
}

const subjectSchema = new Schema<ISubject>({
  subName: {
    type: String,
    required: true,
  },
  subCode: {
    type: String,
    required: true,
  },
  sessions: {
    type: String,
    required: true,
  },
  sclassName: {
    type: Schema.Types.ObjectId,
    ref: 'sclass',
    required: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'teacher',
  }
});

const Subject: Model<ISubject> = mongoose.models.subject || mongoose.model<ISubject>('subject', subjectSchema);

export default Subject;

