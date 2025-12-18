import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBook extends Document {
  bookName: string;
  subject: string;
  writer: string;
  class: string;
  idNo?: string;
  published: Date;
  uploadDate: Date;
  isbn?: string;
  publisher?: string;
  pages?: number;
  language: string;
  description?: string;
  school: Types.ObjectId;
  status: string;
  borrower?: Types.ObjectId;
  borrowDate?: Date;
  returnDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>({
  bookName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['English', 'Math', 'Bangla', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Computer', 'Religion', 'Economics', 'Accounting', 'Other']
  },
  writer: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'General']
  },
  idNo: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  published: {
    type: Date,
    required: true
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  isbn: {
    type: String,
    required: false
  },
  publisher: {
    type: String,
    required: false
  },
  pages: {
    type: Number,
    required: false,
    min: 1
  },
  language: {
    type: String,
    required: false,
    enum: ['English', 'Bangla', 'Arabic', 'Hindi', 'Urdu', 'Other'],
    default: 'English'
  },
  description: {
    type: String,
    required: false
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Borrowed', 'Lost', 'Damaged'],
    default: 'Available'
  },
  borrower: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: false
  },
  borrowDate: {
    type: Date,
    required: false
  },
  returnDate: {
    type: Date,
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

bookSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Book: Model<IBook> = mongoose.models.book || mongoose.model<IBook>('book', bookSchema);

export default Book;

