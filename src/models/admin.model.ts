import mongoose,{Schema,Document } from "mongoose";


export interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
  }
  
  const AdminSchema: Schema<IAdmin> = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);

  export default Admin;