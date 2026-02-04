import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import MovingNoButton from "../components/MovingNoButton";
import { themes } from "../utils/themes";


export default function Valentine() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const theme = themes[data.theme] || themes.rose;


    useEffect(() => {
        API.get(`/valentine/${id}`).then(res => setData(res.data));
    }, []);

    const respond = async (response) => {
        await API.post("/valentine/respond", { id, response });
        navigate(`/result/${id}`);
    };

    if (!data) return null;

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center bg-pink-200 text-center ${theme.bg}`}>
            <div className={`p-8 rounded-xl ${theme.card}`}>
                <h1 className="text-3xl font-bold mb-6">
                    {data.message}
                </h1>

                <div className="flex gap-6">
                    <button
                        onClick={() => respond("yes")}
                        className={`bg-love text-white px-6 py-3 rounded-xl text-xl ${theme.button}`}
                    >
                        Yes ❤️
        </button>

                    {data.noButtonMode === "move" ? (
                        <MovingNoButton onClick={() => respond("no")} />
                    ) : (
                            <button onClick={() => respond("no")}>No 💔</button>
                        )}
                </div>
                {data.music && (
                    <audio autoPlay loop>
                        <source src={`/music/${data.music}`} />
                    </audio>
                )}
  
  .c;,;d,cde
  [pl;
            </div>
        </div>
    );
}
