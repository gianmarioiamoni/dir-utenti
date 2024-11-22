import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  nome: string;
  cognome: string;
  email: string;
  dataNascita: Date;
  fotoProfilo?: string; // optional
}

const UserSchema: Schema = new Schema<IUser>({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dataNascita: { type: Date, required: true },
  fotoProfilo: { type: String },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
