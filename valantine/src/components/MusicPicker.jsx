const tracks = [
    { name: "Love", file: "love.mp3" },
    { name: "Soft", file: "soft.mp3" },
    { name: "Heartbeat", file: "heartbeat.mp3" }
  ];
  
  export default function MusicPicker({ value, onChange }) {
    return (
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full mt-4 p-2 border rounded"
      >
        {tracks.map(track => (
          <option key={track.file} value={track.file}>
            {track.name}
          </option>
        ))}
      </select>
    );
  }
  