import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import MovingNoButton from "../components/MovingNoButton";
import { themes } from "../utils/Themes";
import "./valentine.css"; // Import the CSS file

export default function Valentine() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        API.get(`/valentine/${id}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    const respond = async (response) => {
        try {
            await API.post("/valentine/respond", { id, response });
            navigate(`/result/${id}`);
        } catch (err) {
            console.error("Failed to respond:", err);
            alert("Failed to save response. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="valentine-loading">
                <div className="valentine-loading-spinner"></div>
                Loading your Valentine...
            </div>
        );
    }

    if (!data) {
        return (
            <div className="valentine-container">
                <div className="valentine-card">
                    <h1 className="valentine-title">Valentine not found</h1>
                    <p>This Valentine link may have expired or doesn't exist.</p>
                </div>
            </div>
        );
    }

    const theme = themes[data.theme] || themes.rose;

    return (
        <div className="valentine-container" style={{ backgroundColor: theme.bg }}>
            <div className="valentine-card" style={{ 
                backgroundColor: theme.cardBg || 'white',
                color: theme.textColor || '#1f2937',
                border: theme.border ? `1px solid ${theme.border}` : 'none'
            }}>
                <h1 className="valentine-title" style={{ color: theme.titleColor || 'inherit' }}>
                    Hey {data.receiverName}, {data.senderName} has a Valentine for you!
                </h1>
                <h3  style={{ color: theme.titleColor || 'inherit' }}>
                    {data.message}
                </h3>

                <div className="valentine-buttons-container">
                    <button
                        onClick={() => respond("yes")}
                        className="valentine-yes-button"
                        style={{ 
                            backgroundColor: theme.buttonBg || '#ff6b8b',
                            color: theme.buttonText || 'white'
                        }}
                    >
                        Yes ❤️
                    </button>

                    {data.noButtonMode === "move" ? (
                        <MovingNoButton onClick={() => respond("no")} />
                    ) : (
                        <button 
                            onClick={() => respond("no")}
                            className="valentine-no-button"
                        >
                            No 💔
                        </button>
                    )}
                </div>
                
                {data.music && (
                    <div className="valentine-audio">
                        <audio 
                            autoPlay 
                            loop 
                            controls
                            style={{ 
                                width: '100%',
                                maxWidth: '300px',
                                margin: '20px auto 0',
                                borderRadius: '20px'
                            }}
                        >
                            <source src={`/music/${data.music}`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <div className="valentine-music-indicator">
                            <span className="valentine-music-note">♪</span>
                            <span>Now playing: {data.music}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}