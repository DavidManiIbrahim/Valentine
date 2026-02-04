import { useState, useRef, useEffect } from "react";

const tracks = [
  { name: "Love Song", file: "love.mp3", emoji: "🎵" },
  { name: "Soft Melody", file: "soft.mp3", emoji: "🎶" },
  { name: "Heartbeat", file: "heartbeat.mp3", emoji: "💓" }
];

export default function MusicPicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const dropdownRef = useRef(null);

  const styles = {
    container: {
      position: 'relative',
      width: '100%',
      marginTop: '16px'
    },
    button: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      fontSize: '16px',
      color: '#1f2937',
      fontWeight: '500'
    },
    optionList: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      marginTop: '4px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      maxHeight: '300px',
      overflowY: 'auto'
    },
    option: {
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    optionHover: {
      backgroundColor: '#fce7f3'
    },
    optionSelected: {
      backgroundColor: '#fce7f3',
      fontWeight: '600'
    },
    emoji: {
      fontSize: '18px'
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const track = tracks.find(t => t.file === value) || tracks[0];
    setSelectedTrack(track);
  }, [value]);

  const handleSelect = (track) => {
    onChange(track.file);
    setIsOpen(false);
  };

  return (
    <div style={styles.container} ref={dropdownRef}>
      <button
        style={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={styles.emoji}>{selectedTrack.emoji}</span>
          <span>{selectedTrack.name}</span>
        </span>
        <span>▼</span>
      </button>
      
      {isOpen && (
        <div style={styles.optionList} role="listbox">
          {tracks.map(track => (
            <div
              key={track.file}
              style={{
                ...styles.option,
                ...(track.file === value ? styles.optionSelected : {})
              }}
              onClick={() => handleSelect(track)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fce7f3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = track.file === value ? '#fce7f3' : 'white'}
              role="option"
              aria-selected={track.file === value}
            >
              <span style={styles.emoji}>{track.emoji}</span>
              <span>{track.name}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Hidden select for form compatibility */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        {tracks.map(track => (
          <option key={track.file} value={track.file}>
            {track.name}
          </option>
        ))}
      </select>
    </div>
  );
}