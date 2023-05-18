import * as mongoose from "mongoose";

export interface IUser {
  google: { id: string; name: string; email: string };
}

const UserSchema = new mongoose.Schema<IUser>({
  google: {
    id: String,
    name: String,
    email: String,
  },
});

export const User = mongoose.model("User", UserSchema);
