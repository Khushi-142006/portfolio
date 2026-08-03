import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema({
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  email: { type: String },
  phone: { type: String },
  location: { type: String }
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

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);
export default SocialLink;
