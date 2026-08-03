import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // 'work', 'internship', 'education'
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  period: { type: String, required: true },
  description: [{ type: String }]
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

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
