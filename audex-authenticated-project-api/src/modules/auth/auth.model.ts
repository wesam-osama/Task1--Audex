import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "MANAGER" | "USER";
  manager?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "USER"],
      default: "USER",
    },

    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;