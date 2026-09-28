import mongoose, { Schema } from "mongoose";

interface IProject {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
