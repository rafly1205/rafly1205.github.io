// Game state store (in-memory, resets per deployment)
const gameStates = new Map();

const generateGameId = () => Math.random().toString(36).substring(7);

// Initialize new game
const initializeGame = () => {
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  const gameId = generateGameId();
  
  gameStates.set(gameId, {
    secretNumber,
    attempts: 0,
    guesses: [],
    gameOver: false,
    won: false
  });
  
  return gameId;
};

// API handler
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { action, gameId, guess } = req.query;

  if (action === 'new') {
    const newGameId = initializeGame();
    return res.status(200).json({
      success: true,
      gameId: newGameId,
      message: 'Game started! Guess a number between 1-100'
    });
  }

  if (action === 'guess' && gameId && guess) {
    const state = gameStates.get(gameId);

    if (!state) {
      return res.status(404).json({
        success: false,
        message: 'Game not found. Start a new game!'
      });
    }

    if (state.gameOver) {
      return res.status(400).json({
        success: false,
        message: `Game already finished! Secret number was ${state.secretNumber}`
      });
    }

    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      return res.status(400).json({
        success: false,
        message: 'Please guess a number between 1-100'
      });
    }

    state.attempts++;
    state.guesses.push(guessNum);

    if (guessNum === state.secretNumber) {
      state.gameOver = true;
      state.won = true;
      return res.status(200).json({
        success: true,
        won: true,
        message: `🎉 Correct! You won in ${state.attempts} attempts!`,
        attempts: state.attempts,
        secretNumber: state.secretNumber
      });
    }

    const hint = guessNum < state.secretNumber ? 'higher' : 'lower';
    res.status(200).json({
      success: true,
      won: false,
      message: `The number is ${hint}. Try again!`,
      attempts: state.attempts,
      hint: hint,
      guesses: state.guesses
    });
  }

  if (action === 'status' && gameId) {
    const state = gameStates.get(gameId);
    if (!state) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    res.status(200).json({
      success: true,
      attempts: state.attempts,
      guesses: state.guesses,
      gameOver: state.gameOver,
      won: state.won
    });
  }

  res.status(400).json({
    success: false,
    message: 'Available actions: new, guess (with gameId, guess params), status (with gameId)',
    usage: {
      newGame: '/api/index.js?action=new',
      makeGuess: '/api/index.js?action=guess&gameId=xxx&guess=50',
      checkStatus: '/api/index.js?action=status&gameId=xxx'
    }
  });
};
