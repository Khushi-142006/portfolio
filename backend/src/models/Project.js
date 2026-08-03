import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  technologies: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  status: { type: String },
  architecture: [{ type: String }],
  category: { type: String }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
