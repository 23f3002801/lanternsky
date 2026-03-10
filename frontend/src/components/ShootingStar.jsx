import { useState, useEffect, useRef } from 'react'

export default function ShootingStar() {
  const [stars, setStars] = useState([])
  const timerRef = useRef(null)

  useEffect(() => {
    const spawn = () => {
      const id = Date.now()
      setStars(prev => [...prev, {
        id,
        x: Math.random() * 60 + 10,
        y: Math.random() * 35 + 5,
        angle: Math.random() * 25 + 20,
        length: Math.random() * 80 + 60,
      }])
      setTimeout(() => setStars(prev => prev.filter(s => s.id !== id)), 1600)
      timerRef.current = setTimeout(spawn, Math.random() * 8000 + 9000)
    }
    timerRef.current = setTimeout(spawn, 4000)
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <>
      <style>{`
        @keyframes shoot {
          0%   { opacity: 0; transform: scaleX(0); }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; transform: scaleX(1); }
        }
      `}</style>
      {stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`,
          top: `${s.y}%`,
          pointerEvents: 'none',
        }}>
          <div style={{
            width: s.length,
            height: 1.5,
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.85), white)',
            transform: `rotate(${s.angle}deg)`,
            transformOrigin: 'left center',
            borderRadius: '2px',
            boxShadow: '0 0 6px rgba(255,255,255,0.4)',
            animation: 'shoot 1.4s ease-out forwards',
          }} />
        </div>
      ))}
    </>
  )
}