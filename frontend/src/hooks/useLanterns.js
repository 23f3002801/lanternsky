import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const API = '/api'

export function useLanterns() {
  const [lanterns, setLanterns] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLanterns = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/lanterns?limit=20`)
      setLanterns(res.data.lanterns)
      setTotalCount(res.data.total)
    } catch (err) {
      console.error('Failed to fetch lanterns:', err)
      // Use demo data if backend isn't running
      setLanterns(demoLanterns)
      setTotalCount(12384)
    }
  }, [])

  useEffect(() => {
    fetchLanterns()
  }, [fetchLanterns])

  const releaseLantern = useCallback(async (wishData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.post(`${API}/lanterns`, wishData)
      setLanterns(prev => [res.data, ...prev])
      setTotalCount(prev => prev + 1)
      return res.data
    } catch (err) {
      // Demo mode: add locally
      const demoLantern = {
        id: `local-${Date.now()}`,
        ...wishData,
        warmth_count: 0,
        created_at: new Date().toISOString()
      }
      setLanterns(prev => [demoLantern, ...prev])
      setTotalCount(prev => prev + 1)
      return demoLantern
    } finally {
      setLoading(false)
    }
  }, [])

  const getRandomLantern = useCallback(async (mood = null) => {
    try {
      const url = mood ? `${API}/lanterns/random?mood=${mood}` : `${API}/lanterns/random`
      const res = await axios.get(url)
      return res.data
    } catch {
      const pool = mood ? demoLanterns.filter(l => l.mood === mood) : demoLanterns
      return pool[Math.floor(Math.random() * pool.length)]
    }
  }, [])

  const sendWarmth = useCallback(async (id) => {
    try {
      await axios.post(`${API}/lanterns/${id}/warmth`)
      setLanterns(prev =>
        prev.map(l => l.id === id ? { ...l, warmth_count: l.warmth_count + 1 } : l)
      )
    } catch {
      setLanterns(prev =>
        prev.map(l => l.id === id ? { ...l, warmth_count: l.warmth_count + 1 } : l)
      )
    }
  }, [])

  return { lanterns, totalCount, loading, error, releaseLantern, getRandomLantern, sendWarmth, refetch: fetchLanterns }
}

// Demo data for offline/no-backend mode
const demoLanterns = [
  { id: '1', message: 'I hope the version of me next year is proud of how hard I tried.', mood: 'hopeful', name: 'anonymous', warmth_count: 42, created_at: '2026-03-10' },
  { id: '2', message: 'To whoever reads this — you are doing better than you think.', mood: 'gratitude', name: 'a stranger', warmth_count: 87, created_at: '2026-03-09' },
  { id: '3', message: 'I miss the version of the world before I knew how complicated everything was.', mood: 'nostalgic', name: 'anonymous', warmth_count: 23, created_at: '2026-03-09' },
  { id: '4', message: 'One day I will live in a city where I know no one and start completely fresh.', mood: 'dream', name: 'wanderer', warmth_count: 61, created_at: '2026-03-08' },
  { id: '5', message: 'I am healing from something I never fully explained to anyone.', mood: 'healing', name: 'anonymous', warmth_count: 119, created_at: '2026-03-08' },
  { id: '6', message: 'I hope someone out there is having the day they deserve.', mood: 'hopeful', name: 'anonymous', warmth_count: 34, created_at: '2026-03-07' },
  { id: '7', message: 'The stars remind me that even light takes time to arrive.', mood: 'nostalgic', name: 'stargazer', warmth_count: 55, created_at: '2026-03-07' },
  { id: '8', message: 'Grateful for the small things: warm tea, soft rain, unexpected kindness.', mood: 'gratitude', name: 'anonymous', warmth_count: 78, created_at: '2026-03-06' },
]