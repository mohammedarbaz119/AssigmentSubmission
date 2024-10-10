// Assignment Model
import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface for Assignment document
 * Extends the Mongoose Document type
 * Defines the structure and types for Assignment properties
 */
interface IAssignment extends Document {
    userId: string;     // ID of the user who created the assignment
    task: string;       // Description of the assignment task
    admin: string;      // ID or name of the admin assigned to this task
    accepted: boolean;  // Whether the assignment has been accepted
    rejected: boolean;  // Whether the assignment has been rejected
    createdAt?: Date;   // Timestamp of when the assignment was created
    updatedAt?: Date;   // Timestamp of when the assignment was last updated
}

/**
 * Mongoose Schema for Assignment
 * Defines the structure of the Assignment document in MongoDB
 */
const AssignmentSchema: Schema = new Schema(
    {
        userId: { type: String, required: true },
        task: { type: String, required: true },
        admin: { type: String, required: true },
        accepted: { type: Boolean, default: false },
        rejected: { type: Boolean, default: false },
    },
    {
        timestamps: true,  // Automatically manages createdAt and updatedAt fields
    }
);

/**
 * Mongoose model for Assignment
 * Used for creating and querying Assignment documents in MongoDB
 */
const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);

export default Assignment;