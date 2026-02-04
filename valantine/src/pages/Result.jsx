import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// CSS-in-JS styles object
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fce7f3',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 182, 193, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 182, 193, 0.1) 0%, transparent 50%)'
  },
  message: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#ff6b8b',
    textAlign: 'center',
    lineHeight: '1.25',
    animation: 'fadeInUp 0.6s ease-out',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  idBadge: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '14px',
    color: '#9d174d',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontFamily: "'Monaco', 'Menlo', monospace",
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  }
};

// Animation keyframes
const keyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

// Add keyframes to document head
const styleSheet = document.createElement("style");
styleSheet.textContent = keyframes;
document.head.appendChild(styleSheet);

export default function Result() {
  const { id } = useParams();
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti effect on mount
    setConfetti(true);
    
    // Cleanup
    return () => {
      const styleSheets = document.head.getElementsByTagName("style");
      for (let sheet of styleSheets) {
        if (sheet.textContent.includes('fadeInUp')) {
          document.head.removeChild(sheet);
          break;
        }
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      {id && (
        <div style={styles.idBadge}>
          ID: {id}
        </div>
      )}
      
      <h1 style={styles.message}>
        Response saved <span style={{ 
          display: 'inline-block',
          animation: 'heartbeat 1.2s ease-in-out infinite, float 3s ease-in-out infinite' 
        }}>💖</span>
      </h1>
      
      {/* Optional decorative elements */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        color: '#f472b6',
        fontSize: '14px',
        opacity: 0.7
      }}>
        You can close this window
      </div>
    </div>
  );
}