import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  schoolName: string;
}

const adminSchema = new Schema<IAdmin>({
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
    default: "Admin"
  },
  schoolName: {
    type: String,
    unique: true,
    required: true
  }
});

const Admin: Model<IAdmin> = mongoose.models.admin || mongoose.model<IAdmin>('admin', adminSchema);

export default Admin;

