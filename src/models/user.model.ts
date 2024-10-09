import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    userId: string; 
    email: string; 
    password: string;
    assignments: mongoose.Types.ObjectId[]; 
}

const UserSchema: Schema = new Schema(
    {
        userId: { type: String, required: true,unique:true,trim:true },
        email: { type: String, required: true, unique: true,trim:true },
        password: { type: String, required: true },
        assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }], 
    },
    {
        timestamps: true, 
    }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;