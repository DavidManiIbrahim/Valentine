import { useState } from "react";

export default function MovingNoButton({ onClick }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const move = () => {
    setPos({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100
    });
  };

  return (
    <button
      onMouseEnter={move}
      onClick={onClick}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`
      }}
      className="px-4 py-2 bg-gray-300 rounded-lg transition"
    >
      No 💔
    </button>
  );
}
