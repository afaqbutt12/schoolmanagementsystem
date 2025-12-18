import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IExpense extends Document {
  name: string;
  expenseType: string;
  amount: number;
  status: string;
  phone?: string;
  email?: string;
  date: Date;
  description?: string;
  paymentDate?: Date;
  paymentMethod?: string;
  transactionId?: string;
  receiptNumber?: string;
  vendor?: string;
  category: string;
  school: Types.ObjectId;
  approvedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>({
  name: {
    type: String,
    required: true
  },
  expenseType: {
    type: String,
    required: true,
    enum: ['Salary', 'Transport', 'Utilities', 'Maintenance', 'Office Supplies', 'Insurance', 'Marketing', 'Equipment', 'Software', 'Training', 'Other']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Paid', 'Due', 'Overdue'],
    default: 'Due'
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
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    required: false
  },
  paymentDate: {
    type: Date,
    required: false
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
  receiptNumber: {
    type: String,
    required: false
  },
  vendor: {
    type: String,
    required: false
  },
  category: {
    type: String,
    enum: ['Operational', 'Administrative', 'Academic', 'Infrastructure', 'Marketing', 'Other'],
    default: 'Operational'
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
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

expenseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Expense: Model<IExpense> = mongoose.models.expense || mongoose.model<IExpense>('expense', expenseSchema);

export default Expense;

