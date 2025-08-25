# AI Crypto Advisor

A personalized crypto investor dashboard that curates daily content based on user preferences, using public APIs and AI tools.

## Features

- User Authentication (Signup/Login) with JWT
- Onboarding Quiz to collect user preferences:
  - Crypto assets of interest (e.g., BTC, ETH, SOL)
  - Investor type (e.g., HODLer, Day Trader)
  - Preferred content (Market News, Charts, Fun, etc.)
- Dashboard includes 4 sections:
  1. Market News - via CryptoPanic API
  2. Coin Prices - via CoinGecko API
     - In deployed version, CoinGecko is blocked due to CORS. Works locally.
  3. AI Insight of the Day - powered by OpenRouter / Hugging Face
  4. Crypto Meme - via Reddit or static fallback
     - Reddit access is blocked in production; uses static JSON. Works locally.
- Voting system for each section (stored in DB for future model training)

## Tech Stack

| Layer        | Tech                                       |
|--------------|--------------------------------------------|
| Frontend     | React (Vite), Tailwind CSS                 |
| Backend      | Node.js, Express                           |
| Database     | PostgreSQL, Prisma ORM                     |
| Deployment   | Vercel (frontend), Render (backend + DB)   |
| APIs         | CryptoPanic, CoinGecko, Reddit, OpenRouter |

## Live Demo

Deployed App: https://crypto-advisor-fawn.vercel.app

## Database

The backend is connected to a live PostgreSQL database. API routes persist user data, preferences, and votes.

## Local Development

1. Clone the repo
```
git clone https://github.com/Liorgof/crypto-advisor.git
cd crypto-advisor
```

2. Install dependencies
```
cd server
npm install
cd ../client
npm install
```

3. Set up environment variables  
Create a `.env` file in `/server` with:
```
PORT=5000
JWT_SECRET=your_secret
CLIENT_ORIGIN=http://localhost:5173
CRYPTOPANIC_API_KEY=your_api_key
OPENROUTER_API_KEY=your_openrouter_key
```

4. Run the app locally
```
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```
