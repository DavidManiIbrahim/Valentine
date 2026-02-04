import Valentine from "../models/Valentine.js";
import { generateLinkId } from "../utils/generateId.js";

export const createValentine = async (req, res) => {
  try {
    const {
      senderName,
      receiverName,
      message,
      theme,
      music,
      noButtonMode,
      anonymous,
      expiresAt
    } = req.body;

    const linkId = generateLinkId();

    const valentine = await Valentine.create({
      linkId,
      senderName,
      receiverName,
      message,
      theme,
      music,
      noButtonMode,
      anonymous,
      expiresAt
    });

    res.status(201).json({
      success: true,
      link: `${process.env.FRONTEND_URL}/val/${linkId}`
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create valentine" });
  }
};

export const getValentine = async (req, res) => {
  const { id } = req.params;

  const valentine = await Valentine.findOne({ linkId: id });

  if (!valentine) {
    return res.status(404).json({ error: "Link not found" });
  }

  if (valentine.expiresAt && valentine.expiresAt < new Date()) {
    return res.status(410).json({ error: "Link expired" });
  }

  res.json(valentine);
};

export const respondValentine = async (req, res) => {
  const { id, response } = req.body;

  if (!["yes", "no"].includes(response)) {
    return res.status(400).json({ error: "Invalid response" });
  }

  const valentine = await Valentine.findOne({ linkId: id });

  if (!valentine) {
    return res.status(404).json({ error: "Link not found" });
  }

  if (valentine.response !== "pending") {
    return res.status(409).json({ error: "Already answered" });
  }

  valentine.response = response;
  valentine.respondedAt = new Date();
  await valentine.save();

  res.json({ success: true, response });
};

export const dashboard = async (req, res) => {
  const { id } = req.params;

  const valentine = await Valentine.findOne({ linkId: id });

  if (!valentine) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({
    senderName: valentine.senderName,
    receiverName: valentine.receiverName,
    response: valentine.response,
    respondedAt: valentine.respondedAt
  });
};
