import { themes } from "../utils/themes";
import { useState } from "react";

export default function ThemePicker({ value, onChange }) {
  const [hoveredTheme, setHoveredTheme] = useState(null);

  const styles = {
    container: {
      marginTop: '20px',
      width: '100%'
    },
    label: {
      display: 'block',
      marginBottom: '12px',
      fontSize: '15px',
      fontWeight: '600',
      color: '#db2777',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    labelIcon: {
      fontSize: '18px'
    },
    themesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '12px'
    },
    themeButton: {
      padding: '12px',
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      outline: 'none',
      position: 'relative',
      overflow: 'hidden'
    },
    themeButtonHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
    },
    themeButtonActive: {
      borderColor: '#db2777',
      boxShadow: '0 0 0 3px rgba(219, 39, 119, 0.2)',
      transform: 'translateY(-2px)'
    },
    colorPreview: {
      width: '100%',
      height: '60px',
      borderRadius: '8px',
      transition: 'transform 0.3s ease'
    },
    themeName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      textTransform: 'capitalize',
      transition: 'color 0.2s ease'
    },
    activeIndicator: {
      position: 'absolute',
      top: '8px',
      right: '8px',
      width: '20px',
      height: '20px',
      backgroundColor: '#db2777',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    tooltip: {
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '400',
      whiteSpace: 'nowrap',
      marginBottom: '8px',
      opacity: '0',
      transition: 'opacity 0.2s ease',
      pointerEvents: 'none',
      zIndex: '100'
    },
    tooltipVisible: {
      opacity: '1'
    },
    tooltipArrow: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: '6px solid #1f2937'
    }
  };

  const getThemeButtonStyle = (theme) => {
    const isActive = value === theme;
    const isHovered = hoveredTheme === theme;
    
    const baseStyle = { ...styles.themeButton };
    
    if (isActive) {
      Object.assign(baseStyle, styles.themeButtonActive);
    }
    
    if (isHovered) {
      Object.assign(baseStyle, styles.themeButtonHover);
    }
    
    return baseStyle;
  };

  const getColorPreviewStyle = (theme) => {
    const themeData = themes[theme] || {};
    return {
      ...styles.colorPreview,
      background: themeData.bg || '#f3f4f6',
      backgroundImage: themeData.bgGradient || `linear-gradient(135deg, ${themeData.bg || '#f3f4f6'} 0%, ${themeData.cardBg || '#ffffff'} 100%)`
    };
  };

  const getTooltipStyle = (theme) => {
    const baseStyle = { ...styles.tooltip };
    if (hoveredTheme === theme) {
      Object.assign(baseStyle, styles.tooltipVisible);
    }
    return baseStyle;
  };

  return (
    <div style={styles.container}>
      <div style={styles.label}>
        <span style={styles.labelIcon}>🎨</span>
        Select Theme
      </div>
      
      <div style={styles.themesGrid}>
        {Object.keys(themes).map(theme => {
          const themeData = themes[theme] || {};
          const isActive = value === theme;
          
          return (
            <button
              key={theme}
              onClick={() => onChange(theme)}
              style={getThemeButtonStyle(theme)}
              onMouseEnter={() => setHoveredTheme(theme)}
              onMouseLeave={() => setHoveredTheme(null)}
              onFocus={() => setHoveredTheme(theme)}
              onBlur={() => setHoveredTheme(null)}
              aria-label={`Select ${theme} theme`}
              aria-pressed={isActive}
            >
              {isActive && (
                <div style={styles.activeIndicator}>
                  ✓
                </div>
              )}
              
              <div style={getColorPreviewStyle(theme)} />
              
              <span style={styles.themeName}>
                {theme}
              </span>
              
              <div style={getTooltipStyle(theme)}>
                {themeData.description || `${theme} theme`}
                <div style={styles.tooltipArrow}></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}