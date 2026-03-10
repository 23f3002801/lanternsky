# 🕯️ LanternSky

> *Release a wish into the sky. Someone, somewhere might read it.*

A beautiful web experience where people release their thoughts as floating lanterns into a shared night sky.

---

## 📁 Project Structure

```
lanternsky/
├── frontend/               # React + Tailwind + Framer Motion
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── NightSky.jsx          # Animated star background
│   │   │   ├── FloatingLantern.jsx   # Individual lantern with glow
│   │   │   ├── LanternModal.jsx      # Write/read wish modal
│   │   │   ├── ReleaseForm.jsx       # Wish creation form
│   │   │   ├── WishCard.jsx          # Display a discovered wish
│   │   │   ├── LaunchAnimation.jsx   # Magical launch moment
│   │   │   └── ShootingStar.jsx      # Occasional shooting star
│   │   ├── pages/
│   │   │   └── Home.jsx              # Main landing experience
│   │   ├── hooks/
│   │   │   └── useLanterns.js        # API data fetching hook
│   │   ├── utils/
│   │   │   └── moodConfig.js         # Mood colors, icons, labels
│   │   ├── styles/
│   │   │   └── globals.css           # Custom animations & fonts
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                # FastAPI + MongoDB
│   ├── main.py             # FastAPI app entry point
│   ├── models.py           # Pydantic data models
│   ├── database.py         # MongoDB connection
│   ├── routes/
│   │   └── lanterns.py     # All lantern API endpoints
│   ├── requirements.txt
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # Add your MongoDB URI
uvicorn main:app --reload
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deploy

| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting |
| **Render** | Backend API |
| **MongoDB Atlas** | Database (free tier works) |

---

## 🎨 Mood Colors

| Mood | Color | Emoji |
|------|-------|-------|
| Hopeful | Warm Yellow `#FFD166` | 💛 |
| Nostalgic | Amber `#F4A261` | 🌙 |
| Healing | Soft Blue `#A8DADC` | 💙 |
| Dream | Lavender `#C77DFF` | ✨ |
| Gratitude | Rose Pink `#FF85A1` | 🌸 |