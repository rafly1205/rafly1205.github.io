# 🎮 Interactive Number Guessing Game

A simple yet engaging number guessing game built with Node.js and deployed on Vercel. Players try to guess a random number between 1-100 with hints.

## Features

✨ **Interactive Gameplay**
- Guess a number between 1-100
- Get hints: "higher" or "lower"
- Track attempts and previous guesses
- Beautiful gradient UI with real-time feedback

🎯 **API-Driven**
- RESTful API endpoints for game logic
- Serverless functions on Vercel
- CORS-enabled for cross-origin requests

🚀 **Easy to Deploy**
- One-click deployment on Vercel
- No database required (in-memory state)
- Minimal dependencies

## Project Structure

```
.
├── api/
│   └── index.js              # Serverless game logic API
├── public/
│   └── index.html            # Interactive game UI
├── package.json
├── vercel.json              # Vercel configuration
└── README.md
```

## API Endpoints

### Start New Game
```
GET /api/index.js?action=new
```
Returns: `{ gameId, message }`

### Make a Guess
```
GET /api/index.js?action=guess&gameId=xxx&guess=50
```
Returns: `{ won, message, attempts, hint, guesses }`

### Check Game Status
```
GET /api/index.js?action=status&gameId=xxx
```
Returns: `{ attempts, guesses, gameOver, won }`

## Local Development

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Run locally:**
   ```bash
   vercel dev
   ```
   Access at: `http://localhost:3000`

3. **Test API:**
   ```bash
   # Start new game
   curl "http://localhost:3000/api/index.js?action=new"
   
   # Make guess (replace gameId with actual ID)
   curl "http://localhost:3000/api/index.js?action=guess&gameId=abc123&guess=50"
   ```

## Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git push
   ```

2. **Connect to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Import this GitHub repository
   - Deploy!

3. **Play Online:**
   Access your deployed game at: `https://your-project.vercel.app`

## How to Play

1. Click "Start New Game"
2. Enter a number between 1-100
3. Get hints to narrow down the answer
4. Win when you guess the secret number!
5. Challenge yourself to win in fewer attempts

## Game Logic

- Secret number is generated randomly between 1-100
- Each guess receives a hint: "higher" or "lower"
- Game tracks all attempts and previous guesses
- Game ends when the correct number is guessed
- Each new game gets a unique session ID

## Customization

Edit `api/index.js` to:
- Change the number range (currently 1-100)
- Add leaderboards
- Implement difficulty levels
- Add multiplayer modes

Edit `public/index.html` to:
- Customize styling
- Add animations
- Implement dark mode
- Add sound effects

## License

MIT