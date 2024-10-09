import mongoose, { Schema, Document } from 'mongoose';

interface IAssignment extends Document {
    userId: string; 
    task: string;
    admin: string;
    accepted: boolean;
    rejected:boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const AssignmentSchema: Schema = new Schema(
    {
        userId: { type: String, required: true }, 
        task: { type: String, required: true },
        admin: { type: String, required: true },
        accepted: { type: Boolean, default: false },
        rejected: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);

export default Assignment;