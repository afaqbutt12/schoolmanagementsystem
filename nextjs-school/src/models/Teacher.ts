import mongoose, { Schema, Document, Model, Types } from 'mongoose';

interface IAttendance {
  date: Date;
  presentCount: number;
  absentCount: number;
}

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  school: Types.ObjectId;
  teachSubject: Types.ObjectId;
  teachSclass: Types.ObjectId;
  attendance: IAttendance[];
}

const teacherSchema = new Schema<ITeacher>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Teacher"
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true,
  },
  teachSubject: {
    type: Schema.Types.ObjectId,
    ref: 'subject',
  },
  teachSclass: {
    type: Schema.Types.ObjectId,
    ref: 'sclass',
  },
  attendance: [{
    date: {
      type: Date,
      required: true
    },
    presentCount: {
      type: Number,
      default: 0
    },
    absentCount: {
      type: Number,
      default: 0
    }
  }]
});

const Teacher: Model<ITeacher> = mongoose.models.teacher || mongoose.model<ITeacher>('teacher', teacherSchema);

export default Teacher;

