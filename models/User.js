import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avatarUrl: String, //means not required
}, {
  timestamps: true //means to generate date for every user ? every creation and edition
},);

export default mongoose.model("User", UserSchema)