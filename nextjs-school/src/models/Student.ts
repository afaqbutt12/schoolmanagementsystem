import mongoose, { Schema, Document, Model, Types } from 'mongoose';

interface IExamResult {
  subName: Types.ObjectId;
  marksObtained: number;
}

interface IAttendance {
  date: Date;
  status: 'Present' | 'Absent';
  subName: Types.ObjectId;
}

export interface IStudent extends Document {
  name: string;
  rollNum: number;
  password: string;
  sclassName: Types.ObjectId;
  school: Types.ObjectId;
  role: string;
  examResult: IExamResult[];
  attendance: IAttendance[];
}

const studentSchema = new Schema<IStudent>({
  name: {
    type: String,
    required: true
  },
  rollNum: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
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
  role: {
    type: String,
    default: "Student"
  },
  examResult: [
    {
      subName: {
        type: Schema.Types.ObjectId,
        ref: 'subject',
      },
      marksObtained: {
        type: Number,
        default: 0
      }
    }
  ],
  attendance: [{
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Present', 'Absent'],
      required: true
    },
    subName: {
      type: Schema.Types.ObjectId,
      ref: 'subject',
      required: true
    }
  }]
});

const Student: Model<IStudent> = mongoose.models.student || mongoose.model<IStudent>('student', studentSchema);

export default Student;

