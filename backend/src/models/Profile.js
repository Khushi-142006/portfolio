import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  tagline: { type: String, required: true },
  bio: { type: String, required: true },
  profileImage: { type: String },
  resumeUrl: { type: String, default: "#" },
  careerObjective: { type: String },
  stats: [statSchema],
  achievements: [{ type: String }]
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

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
