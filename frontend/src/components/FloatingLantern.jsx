import { useState, useMemo } from 'react'
import { getMoodColor, getMoodShadow } from '../utils/moodConfig'

export default function FloatingLantern({ lantern, onClick, style = {} }) {
  const [hovered, setHovered] = useState(false)
  const color = getMoodColor(lantern.mood)
  const shadow = getMoodShadow(lantern.mood)

  const drift = useMemo(() => Math.round((Math.random() - 0.5) * 100), [])
  const duration = useMemo(() => (Math.random() * 12 + 16).toFixed(0), [])
  const delay = useMemo(() => (Math.random() * 10).toFixed(1), [])
  const size = useMemo(() => Math.round(Math.random() * 12 + 28), [])

  const animId = useMemo(() => `lantern-${Math.random().toString(36).slice(2)}`, [])

  return (
    <>
      <style>{`
        @keyframes ${animId} {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          5%   { opacity: 0.9; }
          95%  { opacity: 0.7; }
          100% { transform: translateY(-110vh) translateX(${drift}px); opacity: 0; }
        }
        @keyframes flame-${animId} {
          0%,100% { transform: scaleY(1) scaleX(1); }
          33%     { transform: scaleY(0.85) scaleX(1.1); }
          66%     { transform: scaleY(1.1) scaleX(0.9); }
        }
      `}</style>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        aria-label="Read a wish"
        style={{
          position: 'absolute',
          bottom: '-80px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          zIndex: 10,
          animation: `${animId} ${duration}s ${delay}s linear infinite`,
          willChange: 'transform, opacity',
          ...style,
        }}
      >
        <div style={{
          filter: `drop-shadow(0 0 ${hovered ? 18 : 8}px ${color}) drop-shadow(0 0 ${hovered ? 36 : 18}px ${shadow})`,
          transition: 'filter 0.3s ease',
          transform: 'translate3d(0,0,0)',
        }}>
          <svg width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none">
            <line x1="20" y1="0" x2="20" y2="8" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
            <ellipse cx="20" cy="12" rx="8" ry="3" fill={color} fillOpacity="0.3"/>
            <rect x="12" y="12" width="16" height="28" rx="8" fill={color} fillOpacity="0.15"/>
            <rect x="12" y="12" width="16" height="28" rx="8" stroke={color} strokeWidth="1.2" strokeOpacity="0.6"/>
            <ellipse cx="20" cy="26" rx="6" ry="9" fill={color} fillOpacity="0.2"/>
            <ellipse
              cx="20" cy="34" rx="4" ry="6"
              fill={color}
              style={{ animation: `flame-${animId} 2s ease-in-out infinite`, transformOrigin: '20px 34px' }}
            />
            <ellipse cx="20" cy="40" rx="8" ry="3" fill={color} fillOpacity="0.3"/>
            <line x1="15" y1="12" x2="15" y2="40" stroke={color} strokeWidth="0.7" strokeOpacity="0.35"/>
            <line x1="25" y1="12" x2="25" y2="40" stroke={color} strokeWidth="0.7" strokeOpacity="0.35"/>
            <line x1="20" y1="40" x2="20" y2="48" stroke={color} strokeWidth="1.2" strokeOpacity="0.5"/>
            <ellipse cx="20" cy="49" rx="2" ry="1.5" fill={color} fillOpacity="0.6"/>
          </svg>
        </div>
      </button>
    </>
  )
}