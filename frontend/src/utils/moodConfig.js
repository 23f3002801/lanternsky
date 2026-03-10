export const MOODS = [
  {
    id: 'hopeful',
    label: 'Hopeful',
    emoji: '💛',
    color: '#FFD166',
    shadow: 'rgba(255, 209, 102, 0.6)',
    tailwind: 'text-yellow-300',
    description: 'Looking forward with hope'
  },
  {
    id: 'nostalgic',
    label: 'Nostalgic',
    emoji: '🌙',
    color: '#F4A261',
    shadow: 'rgba(244, 162, 97, 0.6)',
    tailwind: 'text-orange-300',
    description: 'Missing something beautiful'
  },
  {
    id: 'healing',
    label: 'Healing',
    emoji: '💙',
    color: '#A8DADC',
    shadow: 'rgba(168, 218, 220, 0.6)',
    tailwind: 'text-cyan-300',
    description: 'Finding peace slowly'
  },
  {
    id: 'dream',
    label: 'Dream',
    emoji: '✨',
    color: '#C77DFF',
    shadow: 'rgba(199, 125, 255, 0.6)',
    tailwind: 'text-purple-300',
    description: 'Reaching for something more'
  },
  {
    id: 'gratitude',
    label: 'Gratitude',
    emoji: '🌸',
    color: '#FF85A1',
    shadow: 'rgba(255, 133, 161, 0.6)',
    tailwind: 'text-pink-300',
    description: 'Thankful to be here'
  }
]

export const getMood = (id) => MOODS.find(m => m.id === id) || MOODS[0]

export const getMoodColor = (id) => getMood(id).color
export const getMoodShadow = (id) => getMood(id).shadow