import { useState } from "react";
import API from "../api/axios";

import ThemePicker from "../components/ThemePicker";
import MusicPicker from "../components/MusicPicker";

const [form, setForm] = useState({
    senderName: "",
    receiverName: "",
    message: "",
    theme: "rose",
    music: "love.mp3",
    noButtonMode: "move"
});


const [link, setLink] = useState("");

const handleSubmit = async () => {
    const res = await API.post("/valentine/create", form);
    setLink(res.data.link);
};

return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 p-6">
        <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h1 className="text-2xl font-bold text-center text-love">
                Create Valentine 💌
        </h1>

            <input
                placeholder="Your name"
                className="input"
                onChange={e => setForm({ ...form, senderName: e.target.value })}
            />

            <input
                placeholder="Their name"
                className="input"
                onChange={e => setForm({ ...form, receiverName: e.target.value })}
            />

            <textarea
                placeholder="Custom message"
                className="input"
                onChange={e => setForm({ ...form, message: e.target.value })}
            />

            <button
                onClick={handleSubmit}
                className="w-full bg-love text-white py-2 rounded-lg mt-4"
            >
                Generate Link 💖
        </button>

            {link && (
                <p className="mt-4 text-center break-all text-sm">
                    {link}
                </p>
            )}
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

        </div>
    </div>
);
}
