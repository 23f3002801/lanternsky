import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { getMood } from '../utils/moodConfig'

export default function LaunchAnimation({ lantern, onComplete }) {
  const mood = getMood(lantern.mood)
  useEffect(() => { const t = setTimeout(onComplete, 4500); return () => clearTimeout(t) }, [onComplete])

  return (
    <motion.div
      style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '10vh', zIndex: 50, pointerEvents: 'none' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Rising lantern */}
      <motion.div
        initial={{ y: 0, opacity: 1, scale: 0.85 }}
        animate={{ y: -window.innerHeight * 0.88, opacity: 0, scale: 1.3 }}
        transition={{ duration: 4.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ filter: `drop-shadow(0 0 24px ${mood.color}) drop-shadow(0 0 60px ${mood.shadow})`, marginBottom: '28px' }}
      >
        <svg width="60" height="90" viewBox="0 0 40 60" fill="none">
          <line x1="20" y1="0" x2="20" y2="8" stroke={mood.color} strokeWidth="1.5" strokeOpacity="0.7"/>
          <ellipse cx="20" cy="12" rx="8" ry="3" fill={mood.color} fillOpacity="0.3"/>
          <rect x="12" y="12" width="16" height="28" rx="8" fill={mood.color} fillOpacity="0.2"/>
          <rect x="12" y="12" width="16" height="28" rx="8" stroke={mood.color} strokeWidth="1.2" strokeOpacity="0.8"/>
          <ellipse cx="20" cy="26" rx="6" ry="9" fill={mood.color} fillOpacity="0.3"/>
          <ellipse cx="20" cy="34" rx="4" ry="6" fill={mood.color}/>
          <ellipse cx="20" cy="40" rx="8" ry="3" fill={mood.color} fillOpacity="0.3"/>
          <line x1="15" y1="12" x2="15" y2="40" stroke={mood.color} strokeWidth="0.7" strokeOpacity="0.4"/>
          <line x1="25" y1="12" x2="25" y2="40" stroke={mood.color} strokeWidth="0.7" strokeOpacity="0.4"/>
          <line x1="20" y1="40" x2="20" y2="48" stroke={mood.color} strokeWidth="1.2" strokeOpacity="0.5"/>
          <ellipse cx="20" cy="49" rx="2" ry="1.5" fill={mood.color} fillOpacity="0.6"/>
        </svg>
      </motion.div>

      {/* Centered text */}
      <motion.div
        style={{ textAlign: 'center', width: '100%', padding: '0 2rem' }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.2, times: [0, 0.15, 0.75, 1] }}
      >
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', fontStyle: 'italic', fontWeight: 300, color: mood.color, marginBottom: '10px', filter: `drop-shadow(0 0 12px ${mood.shadow})` }}>
          Your lantern is on its way.
        </p>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 'clamp(10px, 2.5vw, 13px)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Somewhere in the sky, your wish now floats.
        </p>
      </motion.div>

      {/* Sparks */}
      {[...Array(10)].map((_, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', bottom: '22%', left: '50%', width: Math.random() * 4 + 2, height: Math.random() * 4 + 2, borderRadius: '50%', background: mood.color, boxShadow: `0 0 6px ${mood.color}` }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: (Math.random() - 0.5) * 130, y: -(Math.random() * 90 + 40), opacity: 0, scale: 0 }}
          transition={{ duration: Math.random() * 1.3 + 0.7, delay: Math.random() * 0.4, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  )
}