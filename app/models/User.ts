import mongoose, {Schema, Document, Model} from 'mongoose';

export interface IUser extends Document {
  name: string;
  password: string;
  createdAt?: Date;
}
  const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 