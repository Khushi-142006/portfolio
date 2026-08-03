import mongoose from "mongoose";

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  isPlanned: { type: Boolean, default: false }
}, { _id: false });

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  items: [skillItemSchema]
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

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
