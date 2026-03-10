import { useMemo } from 'react'
import ShootingStar from './ShootingStar'

export default function NightSky() {
  const stars = useMemo(() => Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: `${(Math.random() * 6).toFixed(1)}s`,
    duration: `${(Math.random() * 3 + 2).toFixed(1)}s`,
    opacity: (Math.random() * 0.6 + 0.3).toFixed(2),
  })), [])

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--op); transform: scale(1); }
          50% { opacity: 0.05; transform: scale(0.6); }
        }
        @keyframes drift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 0.7; }
          100% { transform: translateY(-110vh) translateX(var(--dx)); opacity: 0; }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(ellipse at 50% 100%, #1A1040 0%, #0A0E2A 40%, #03071E 100%)',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'auto',
      }}>
        {/* Nebula blobs — CSS only, no JS */}
        <div style={{
          position: 'absolute', width: '60%', height: '50%',
          top: '10%', left: '5%',
          background: 'radial-gradient(ellipse, rgba(26,16,64,0.45) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate3d(0,0,0)',
        }} />
        <div style={{
          position: 'absolute', width: '50%', height: '40%',
          bottom: '15%', right: '0%',
          background: 'radial-gradient(ellipse, rgba(60,15,90,0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate3d(0,0,0)',
        }} />

        {/* Stars — pure CSS animation, zero JS per frame */}
        {stars.map(star => (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              background: '#fff',
              '--op': star.opacity,
              animation: `twinkle ${star.duration} ${star.delay} ease-in-out infinite`,
              willChange: 'opacity, transform',
            }}
          />
        ))}

        <ShootingStar />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px',
          background: 'linear-gradient(to top, #03071E, transparent)',
        }} />
      </div>
    </>
  )
}