// User Model

import mongoose, { Schema, Document } from 'mongoose';

// Interface defining the structure of the User document
interface IUser extends Document {
    userId: string; 
    email: string; 
    password: string; 
    assignments: mongoose.Types.ObjectId[]; // Array of related assignment IDs
}

// Define the schema for the User model
const UserSchema: Schema = new Schema(
    {
        userId: { type: String, required: true, unique: true, trim: true }, // Unique user ID
        email: { type: String, required: true, unique: true, trim: true }, // Unique email
        password: { type: String, required: true }, // Hashed password
        assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }], // References to assignments
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt timestamps
    }
);

// Create the User model from the schema
const User = mongoose.model<IUser>('User', UserSchema);

export default User; 
