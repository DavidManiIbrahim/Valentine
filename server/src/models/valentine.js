import mongoose from "mongoose";

const ValentineSchema = new mongoose.Schema({
  linkId: { type: String, unique: true },
  senderName: String,
  receiverName: String,
  message: {
    type: String,
    default: "Will you be my Valentine?"
  },
  theme: { type: String, default: "rose" },
  music: String,

  noButtonMode: {
    type: String,
    enum: ["move", "disabled", "normal"],
    default: "move"
  },

  response: {
    type: String,
    enum: ["pending", "yes", "no"],
    default: "pending"
  },

  respondedAt: Date,
  expiresAt: Date,
  anonymous: { type: Boolean, default: false },

}, { timestamps: true });

export default mongoose.model("Valentine", ValentineSchema);
