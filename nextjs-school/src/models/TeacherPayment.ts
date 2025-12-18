import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ITeacherPayment extends Document {
  teacherId: string;
  teacherName: string;
  gender: string;
  class: string;
  subject: string;
  amount: number;
  status: string;
  paymentDate?: Date;
  dueDate: Date;
  paymentMethod?: string;
  transactionId?: string;
  phone?: string;
  email?: string;
  description?: string;
  month: string;
  year: number;
  school: Types.ObjectId;
  teacher?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const teacherPaymentSchema = new Schema<ITeacherPayment>({
  teacherId: {
    type: String,
    required: true
  },
  teacherName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  class: {
    type: String,
    required: true,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  },
  subject: {
    type: String,
    required: true,
    enum: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Computer', 'Religion', 'Economics', 'Accounting', 'Other']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Overdue'],
    default: 'Pending'
  },
  paymentDate: {
    type: Date,
    required: false
  },
  dueDate: {
    type: Date,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Bank Transfer', 'Card', 'Check'],
    required: false
  },
  transactionId: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false,
    lowercase: true
  },
  description: {
    type: String,
    required: false
  },
  month: {
    type: String,
    required: true,
    enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  },
  year: {
    type: Number,
    required: true,
    min: 2020,
    max: 2030
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'teacher',
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

teacherPaymentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const TeacherPayment: Model<ITeacherPayment> = mongoose.models.teacherPayment || mongoose.model<ITeacherPayment>('teacherPayment', teacherPaymentSchema);

export default TeacherPayment;

