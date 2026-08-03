import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: String, required: true },
  credentialId: { type: String },
  verificationUrl: { type: String },
  description: { type: String }
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

const Certification = mongoose.model("Certification", certificationSchema);
export default Certification;
