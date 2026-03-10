import { useState } from 'react'
import { motion } from 'framer-motion'
import { MOODS } from '../utils/moodConfig'

const PLACEHOLDERS = [
  'I hope the version of me next year is proud of how hard I tried.',
  'I want to find a place where I feel like I truly belong.',
  'To anyone reading this — you are not as alone as you feel.',
  'I hope I remember this feeling when things get hard again.',
  'Somewhere out there is the life I am still building.',
]

export default function ReleaseForm({ onSubmit, onClose, loading }) {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [mood, setMood] = useState('hopeful')
  const [placeholder] = useState(() => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)])

  const selectedMood = MOODS.find(m => m.id === mood)
  const charLimit = 280
  const isReady = message.trim().length > 3
  const charPercent = (message.length / charLimit) * 100

  return (
    <>
      <style>{`
        .rf-wrap {
          width: 100%;
          max-width: 560px;
          max-height: 92vh;
          overflow-y: auto;
          padding: 32px 24px;
          border-radius: 20px;
        }
        .rf-title { font-size: clamp(26px, 6vw, 36px); }
        .rf-textarea { font-size: clamp(16px, 4vw, 20px); min-height: 90px; }
        .rf-moods { gap: 8px; }
        .rf-mood-btn { font-size: 12px; padding: 8px 14px; }
        .rf-submit { font-size: 12px; padding: 16px; }
        @media (min-width: 520px) {
          .rf-wrap { padding: 44px 40px; border-radius: 24px; }
          .rf-mood-btn { font-size: 13px; padding: 10px 18px; }
          .rf-submit { padding: 18px; }
        }
      `}</style>

      <motion.div
        className="rf-wrap"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 200 }}
        style={{
          background: 'rgba(8, 11, 35, 0.97)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: `1px solid ${selectedMood.color}22`,
          boxShadow: `0 0 80px ${selectedMood.shadow}, 0 40px 80px rgba(0,0,0,0.7)`,
          position: 'relative',
          transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
        >×</button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px', filter: `drop-shadow(0 0 16px ${selectedMood.color})` }}>🕯️</div>
          <h2 className="rf-title" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, color: '#fff', marginBottom: '6px', letterSpacing: '-0.01em' }}>
            Release a Lantern
          </h2>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            your wish floats into the night sky
          </p>
        </div>

        {/* Textarea */}
        <div style={{ background: `${selectedMood.color}08`, border: `1px solid ${selectedMood.color}30`, borderRadius: '14px', padding: '16px 18px', marginBottom: '14px', transition: 'all 0.3s' }}>
          <textarea
            className="rf-textarea"
            value={message}
            onChange={e => setMessage(e.target.value.slice(0, charLimit))}
            placeholder={placeholder}
            rows={4}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.88)', lineHeight: 1.7, caretColor: selectedMood.color }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginRight: '10px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${charPercent}%`, background: charPercent > 90 ? '#ff6b6b' : selectedMood.color, borderRadius: '2px', transition: 'width 0.2s ease' }} />
            </div>
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '11px', color: charPercent > 90 ? '#ff6b6b' : 'rgba(255,255,255,0.2)' }}>
              {charLimit - message.length}
            </span>
          </div>
        </div>

        {/* Name */}
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name  ·  or stay anonymous"
          style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '13px 18px', fontFamily: "'Lato', sans-serif", fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', outline: 'none', marginBottom: '24px', boxSizing: 'border-box' }}
          onFocus={e => e.target.style.borderColor = selectedMood.color + '55'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
        />

        {/* Mood */}
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '12px' }}>
          How are you feeling?
        </p>
        <div className="rf-moods" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '28px' }}>
          {MOODS.map(m => (
            <motion.button
              key={m.id}
              onClick={() => setMood(m.id)}
              whileTap={{ scale: 0.93 }}
              className="rf-mood-btn"
              style={{ borderRadius: '999px', fontFamily: "'Lato', sans-serif", fontWeight: mood === m.id ? 400 : 300, cursor: 'pointer', transition: 'all 0.25s ease', border: `1px solid ${mood === m.id ? m.color + '80' : 'rgba(255,255,255,0.1)'}`, background: mood === m.id ? m.color + '20' : 'transparent', color: mood === m.id ? m.color : 'rgba(255,255,255,0.35)', boxShadow: mood === m.id ? `0 0 18px ${m.shadow}` : 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <span style={{ fontSize: '15px' }}>{m.emoji}</span> {m.label}
            </motion.button>
          ))}
        </div>

        {/* Submit */}
        <motion.button
          onClick={() => isReady && !loading && onSubmit({ message: message.trim(), name: name.trim() || 'anonymous', mood })}
          whileHover={isReady ? { scale: 1.02 } : {}}
          whileTap={isReady ? { scale: 0.98 } : {}}
          className="rf-submit"
          style={{ width: '100%', borderRadius: '14px', fontFamily: "'Lato', sans-serif", fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: isReady ? 'pointer' : 'not-allowed', transition: 'all 0.3s ease', border: 'none', background: isReady ? `linear-gradient(135deg, ${selectedMood.color}, ${selectedMood.color}cc)` : 'rgba(255,255,255,0.06)', color: isReady ? '#0A0E2A' : 'rgba(255,255,255,0.2)', boxShadow: isReady ? `0 8px 28px ${selectedMood.shadow}` : 'none' }}
        >
          {loading ? '✨ Releasing...' : '🕯️ Release into the sky'}
        </motion.button>
      </motion.div>
    </>
  )
}