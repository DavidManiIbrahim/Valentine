import { useState, useRef } from "react";

export default function MovingNoButton({ onClick }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const buttonRef = useRef(null);

  const move = () => {
    // Get button dimensions to ensure it stays in view
    const button = buttonRef.current;
    if (!button) return;
    
    const buttonRect = button.getBoundingClientRect();
    const parentRect = button.parentElement?.getBoundingClientRect() || {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // Calculate max movement to keep button visible
    const maxX = parentRect.width - buttonRect.width - 20;
    const maxY = parentRect.height - buttonRect.height - 20;
    
    setPos({
      x: Math.random() * maxX * 0.5 - maxX * 0.25,
      y: Math.random() * maxY * 0.5 - maxY * 0.25
    });
    
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 300);
  };

  const styles = {
    button: {
      padding: '10px 20px',
      backgroundColor: '#ef4444', // Red color for "No"
      color: 'white',
      borderRadius: '12px',
      border: 'none',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      position: 'relative',
      boxShadow: '0 4px 6px rgba(239, 68, 68, 0.3)',
      transform: `translate(${pos.x}px, ${pos.y}px)`,
      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease',
      userSelect: 'none',
      outline: 'none',
      minWidth: '120px',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    },
    buttonHover: {
      backgroundColor: '#dc2626',
      boxShadow: '0 6px 12px rgba(239, 68, 68, 0.4)',
      transform: `translate(${pos.x}px, ${pos.y}px) scale(1.05)`
    },
    buttonActive: {
      backgroundColor: '#b91c1c',
      transform: `translate(${pos.x}px, ${pos.y}px) scale(0.95)`,
      boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
    },
    buttonMoving: {
      animation: 'shake 0.3s ease-in-out'
    },
    tooltip: {
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#374151',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '400',
      whiteSpace: 'nowrap',
      opacity: '0',
      transition: 'opacity 0.2s ease',
      pointerEvents: 'none',
      marginBottom: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      zIndex: '100'
    },
    tooltipVisible: {
      opacity: '1'
    }
  };

  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const getButtonStyle = () => {
    const baseStyle = { ...styles.button };
    
    if (isHovering) {
      Object.assign(baseStyle, styles.buttonHover);
    }
    
    if (isActive) {
      Object.assign(baseStyle, styles.buttonActive);
    }
    
    if (isMoving) {
      Object.assign(baseStyle, styles.buttonMoving);
    }
    
    return baseStyle;
  };

  const getTooltipStyle = () => {
    const baseStyle = { ...styles.tooltip };
    if (showTooltip) {
      Object.assign(baseStyle, styles.tooltipVisible);
    }
    return baseStyle;
  };

  // Add keyframes for shake animation
  const keyframes = `
    @keyframes shake {
      0%, 100% { transform: translate(${pos.x}px, ${pos.y}px) rotate(0deg); }
      25% { transform: translate(${pos.x}px, ${pos.y}px) rotate(-5deg); }
      50% { transform: translate(${pos.x}px, ${pos.y}px) rotate(5deg); }
      75% { transform: translate(${pos.x}px, ${pos.y}px) rotate(-3deg); }
    }
  `;

  // Inject keyframes once
  useState(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  });

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={buttonRef}
        onMouseEnter={() => {
          move();
          setIsHovering(true);
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          setShowTooltip(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onTouchStart={() => {
          setIsActive(true);
          move();
        }}
        onTouchEnd={() => setIsActive(false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
        style={getButtonStyle()}
        aria-label="No - This button moves when you try to click it"
      >
        No 💔
      </button>
      
      <div style={getTooltipStyle()}>
        Try to catch me!
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid #374151'
        }}></div>
      </div>
    </div>
  );
}