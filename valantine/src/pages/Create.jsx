import { useState } from "react";
import API from "../api/axios";
import ThemePicker from "../components/ThemePicker";
import MusicPicker from "../components/MusicPicker";
import "./create.css"; // Import the CSS file

export default function Create() {
  const [form, setForm] = useState({
    senderName: "",
    receiverName: "",
    message: "",
    theme: "rose",
    music: "love.mp3",
    noButtonMode: "move",
  });

  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await API.post("/valentine/create", form);
      setLink(res.data.link);
    } catch (err) {
      console.error(err);
      alert("Failed to create Valentine");
    }
  };

  return (
    <div className="create-container">
      <div className="create-card">
        <h1 className="create-title">
          Create Valentine 💌
        </h1>

        <input
          placeholder="Your name"
          className="create-input"
          onChange={(e) =>
            setForm({ ...form, senderName: e.target.value })
          }
        />

        <input
          placeholder="Their name"
          className="create-input"
          onChange={(e) =>
            setForm({ ...form, receiverName: e.target.value })
          }
        />

        <textarea
          placeholder="Custom message"
          className="create-textarea"
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <ThemePicker
          value={form.theme}
          onChange={(theme) =>
            setForm({ ...form, theme })
          }
        />

        <MusicPicker
          value={form.music}
          onChange={(music) =>
            setForm({ ...form, music })
          }
        />

        <button
          onClick={handleSubmit}
          className="create-button"
        >
          Generate Link 💖
        </button>

        {link && (
          <p className="create-link">
            {link}
          </p>
        )}
      </div>
    </div>
  );
}