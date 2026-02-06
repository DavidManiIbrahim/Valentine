import mongoose from "mongoose";

const ValentineSchema = new mongoose.Schema({
  linkId: { 
    type: String, 
    unique: true,
    required: true,
    index: true
  },
  senderName: {
    type: String,
    required: true,
    trim: true
  },
  receiverName: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    default: "Will you be my Valentine?",
    trim: true
  },
  theme: { 
    type: String, 
    default: "rose"
  },
  music: {
    type: String,
    default: "love.mp3"
  },
  noButtonMode: {
    type: String,
    enum: ["move", "disabled", "normal"],
    default: "move"
  },
  response: {
    type: String,
    enum: ["pending", "YES", "NO"],
    default: "pending"
  },
  respondedAt: Date,
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  anonymous: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true 
});

// Create indexes for better performance
ValentineSchema.index({ expiresAt: 1 });
ValentineSchema.index({ createdAt: -1 });

export default mongoose.model("Valentine", ValentineSchema);