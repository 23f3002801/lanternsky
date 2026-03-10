import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMood } from '../utils/moodConfig'

export default function WishCard({ wish, onSendWarmth, onRelease, onClose }) {
  const [warmed, setWarmed] = useState(false)
  const mood = getMood(wish.mood)

  const handleWarmth = () => {
    if (!warmed) { setWarmed(true); onSendWarmth(wish.id) }
  }

  return (
    <>
      <style>{`
        .wc-wrap { padding: 36px 24px 28px; border-radius: 20px; }
        .wc-quote { font-size: clamp(17px, 4.5vw, 24px); }
        .wc-actions { flex-direction: column; gap: 10px; }
        .wc-btn { padding: 14px; font-size: 13px; }
        @media (min-width: 480px) {
          .wc-wrap { padding: 48px 40px 36px; border-radius: 24px; }
          .wc-actions { flex-direction: row; }
        }
      `}</style>

      <motion.div
        className="wc-wrap"
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 200 }}
        style={{
          width: '100%',
          maxWidth: '500px',
          background: 'rgba(8, 11, 35, 0.97)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: `1px solid ${mood.color}25`,
          boxShadow: `0 0 80px ${mood.shadow}, 0 40px 80px rgba(0,0,0,0.6)`,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button onClick={onClose}
          style={{ position: 'absolute', top: '14px', right: '16px', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
        >×</button>

        {/* Icon */}
        <div style={{ fontSize: '40px', marginBottom: '24px', filter: `drop-shadow(0 0 18px ${mood.color})` }}>🕯️</div>

        {/* Top divider */}
        <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${mood.color}44, transparent)`, marginBottom: '24px' }} />

        {/* Message */}
        <blockquote className="wc-quote" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.75, marginBottom: '24px', padding: '0 4px' }}>
          "{wish.message}"
        </blockquote>

        {/* Bottom divider */}
        <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${mood.color}44, transparent)`, marginBottom: '20px' }} />

        {/* Attribution */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>
            — {wish.name || 'anonymous'}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '12px', padding: '4px 12px', borderRadius: '999px', border: `1px solid ${mood.color}40`, background: mood.color + '12', color: mood.color, display: 'flex', alignItems: 'center', gap: '4px' }}>
            {mood.emoji} {mood.label}
          </span>
        </div>

        {/* Actions */}
        <div className="wc-actions" style={{ display: 'flex' }}>
          <motion.button
            onClick={handleWarmth} whileTap={{ scale: 0.96 }}
            className="wc-btn"
            style={{ flex: 1, borderRadius: '13px', fontFamily: "'Lato', sans-serif", fontWeight: warmed ? 400 : 300, cursor: warmed ? 'default' : 'pointer', transition: 'all 0.3s ease', border: `1px solid ${warmed ? mood.color + '60' : 'rgba(255,255,255,0.1)'}`, background: warmed ? mood.color + '18' : 'rgba(255,255,255,0.04)', color: warmed ? mood.color : 'rgba(255,255,255,0.5)' }}
          >
            <AnimatePresence mode="wait">
              {warmed
                ? <motion.span key="warmed" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>❤️ {(wish.warmth_count || 0) + 1} warmth sent</motion.span>
                : <motion.span key="warm">🤍 Send warmth</motion.span>
              }
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={onRelease} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="wc-btn"
            style={{ flex: 1, borderRadius: '13px', fontFamily: "'Lato', sans-serif", fontWeight: 400, cursor: 'pointer', transition: 'all 0.3s ease', border: `1px solid ${mood.color}55`, background: mood.color + '18', color: mood.color, boxShadow: `0 4px 18px ${mood.shadow}` }}
          >
            🕯️ Release yours
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}