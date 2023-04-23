import mongoose from "mongoose";

interface IUser {
  google: { id: string; name: string; email: string };
}

const UserSchema = new mongoose.Schema({
  google: {
    id: String,
    name: String,
    email: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
