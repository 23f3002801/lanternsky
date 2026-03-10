import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NightSky from '../components/NightSky'
import FloatingLantern from '../components/FloatingLantern'
import ReleaseForm from '../components/ReleaseForm'
import WishCard from '../components/WishCard'
import LaunchAnimation from '../components/LaunchAnimation'
import { useLanterns } from '../hooks/useLanterns'
import { MOODS } from '../utils/moodConfig'

const SCREEN = { LANDING: 'landing', WRITING: 'writing', LAUNCHING: 'launching', READING: 'reading' }

export default function Home() {
  const { lanterns, totalCount, loading, releaseLantern, getRandomLantern, sendWarmth } = useLanterns()
  const [screen, setScreen] = useState(SCREEN.LANDING)
  const [activeLantern, setActiveLantern] = useState(null)
  const [justReleased, setJustReleased] = useState(null)

  const handleRelease = useCallback(async (wishData) => {
    const newLantern = await releaseLantern(wishData)
    setJustReleased(newLantern)
    setScreen(SCREEN.LAUNCHING)
  }, [releaseLantern])

  const handleLaunchDone = useCallback(() => {
    setJustReleased(null)
    setScreen(SCREEN.LANDING)
  }, [])

  const handleLanternClick = useCallback(async (lantern) => {
    setActiveLantern(lantern)
    setScreen(SCREEN.READING)
  }, [])

  const handleRandomLantern = useCallback(async () => {
    const wish = await getRandomLantern()
    setActiveLantern(wish)
    setScreen(SCREEN.READING)
  }, [getRandomLantern])

  const handleMoodRead = useCallback(async (moodId) => {
    const wish = await getRandomLantern(moodId)
    setActiveLantern(wish)
    setScreen(SCREEN.READING)
  }, [getRandomLantern])

  const visibleLanterns = useMemo(() =>
    lanterns.slice(0, 6).map((l, i) => ({
      ...l,
      left: `${(i / 6) * 82 + 6}%`,
    })), [lanterns])

  const formattedCount = useMemo(() => totalCount.toLocaleString(), [totalCount])

  return (
    <>
      <style>{`
        .ls-landing { padding: 2rem 1.5rem; }
        .ls-title { font-size: clamp(3rem, 14vw, 7rem); }
        .ls-subtitle { font-size: clamp(1rem, 3.5vw, 1.3rem); margin-bottom: 2.5rem; }
        .ls-btns { flex-direction: column; gap: 10px; width: 100%; max-width: 320px; }
        .ls-btn { width: 100%; padding: 15px 24px; font-size: 12px; }
        .ls-moods { gap: 8px; }
        .ls-mood-btn { font-size: 12px; padding: 7px 14px; }
        @media (min-width: 480px) {
          .ls-btns { flex-direction: row; max-width: none; width: auto; }
          .ls-btn { width: auto; }
        }
        @media (min-width: 768px) {
          .ls-landing { padding: 2rem; }
          .ls-subtitle { margin-bottom: 3rem; }
        }
      `}</style>

      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <NightSky />

        {screen === SCREEN.LANDING && visibleLanterns.map((l, i) => (
          <FloatingLantern key={l.id || i} lantern={l} style={{ left: l.left }} onClick={() => handleLanternClick(l)} />
        ))}

        {/* LANDING */}
        <AnimatePresence>
          {screen === SCREEN.LANDING && (
            <motion.div
              key="landing"
              className="ls-landing"
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20, textAlign: 'center' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            >
              <motion.p
                style={{ fontFamily: "'Lato', sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '1.2rem' }}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              >
                🕯️ {formattedCount} wishes floating tonight
              </motion.p>

              <motion.h1
                className="ls-title"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, color: '#fff', marginBottom: '0.6rem', lineHeight: 1.05, letterSpacing: '-0.02em' }}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9 }}
              >
                LanternSky
              </motion.h1>

              <motion.p
                className="ls-subtitle"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.38)', lineHeight: 1.85, maxWidth: '340px' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.9 }}
              >
                Release a wish into the sky.<br />
                <span style={{ color: 'rgba(255,255,255,0.22)' }}>Someone, somewhere might read it.</span>
              </motion.p>

              <motion.div
                className="ls-btns"
                style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              >
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setScreen(SCREEN.WRITING)}
                  className="ls-btn"
                  style={{ borderRadius: '14px', fontFamily: "'Lato', sans-serif", fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', background: 'rgba(255,209,102,0.12)', border: '1px solid rgba(255,209,102,0.38)', color: '#FFD166', boxShadow: '0 0 28px rgba(255,209,102,0.13)', cursor: 'pointer' }}
                >
                  ✨ Release a Lantern
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={handleRandomLantern}
                  className="ls-btn"
                  style={{ borderRadius: '14px', fontFamily: "'Lato', sans-serif", fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)', cursor: 'pointer' }}
                >
                  🔍 Read a Random Wish
                </motion.button>
              </motion.div>

              <motion.div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              >
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  or find a lantern from someone who felt like you
                </p>
                <div className="ls-moods" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {MOODS.map(m => (
                    <motion.button
                      key={m.id}
                      whileTap={{ scale: 0.93 }} whileHover={{ scale: 1.06 }}
                      onClick={() => handleMoodRead(m.id)}
                      className="ls-mood-btn"
                      style={{ borderRadius: '999px', fontFamily: "'Lato', sans-serif", fontWeight: 300, border: `1px solid ${m.color}44`, color: m.color, background: m.color + '0e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <span>{m.emoji}</span> {m.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WRITING */}
        <AnimatePresence>
          {screen === SCREEN.WRITING && (
            <motion.div key="writing"
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30, backdropFilter: 'blur(4px)', padding: '1rem', overflowY: 'auto' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <ReleaseForm onSubmit={handleRelease} onClose={() => setScreen(SCREEN.LANDING)} loading={loading} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* LAUNCHING */}
        <AnimatePresence>
          {screen === SCREEN.LAUNCHING && justReleased && (
            <LaunchAnimation key="launching" lantern={justReleased} onComplete={handleLaunchDone} />
          )}
        </AnimatePresence>

        {/* READING */}
        <AnimatePresence>
          {screen === SCREEN.READING && activeLantern && (
            <motion.div key="reading"
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30, backdropFilter: 'blur(4px)', padding: '1rem', overflowY: 'auto' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <WishCard wish={activeLantern} onSendWarmth={sendWarmth} onRelease={() => setScreen(SCREEN.WRITING)} onClose={() => setScreen(SCREEN.LANDING)} />
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to top, #03071E, transparent)', pointerEvents: 'none', zIndex: 15 }} />
      </div>
    </>
  )
}