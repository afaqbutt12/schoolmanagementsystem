import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IParent extends Document {
  firstName: string;
  lastName: string;
  gender: string;
  occupation?: string;
  idNo?: string;
  bloodGroup: string;
  religion: string;
  email?: string;
  address?: string;
  phone?: string;
  shortBio?: string;
  photo?: string;
  school: Types.ObjectId;
  children: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const parentSchema = new Schema<IParent>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  occupation: {
    type: String,
    required: false
  },
  idNo: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  religion: {
    type: String,
    required: true,
    enum: ['Islam', 'Christianity', 'Hinduism', 'Buddhism', 'Sikhism', 'Judaism', 'Other']
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    lowercase: true
  },
  address: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  shortBio: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'student'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

parentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Parent: Model<IParent> = mongoose.models.parent || mongoose.model<IParent>('parent', parentSchema);

export default Parent;

