// Admin Model
import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface for Admin document
 * Extends the Mongoose Document type
 * Defines the structure and types for Admin properties
 */
export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

/**
 * Mongoose Schema for Admin
 * Defines the structure of the Admin document in MongoDB
 */
const AdminSchema: Schema<IAdmin> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true  // Ensures each admin has a unique name
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures each admin has a unique email
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Mongoose model for Admin
 * Used for creating and querying Admin documents in MongoDB
 */
const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;