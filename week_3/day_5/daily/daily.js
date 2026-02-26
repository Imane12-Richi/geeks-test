// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory leaderboard
let leaderboard = [];

// Emoji dataset
const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🍎', name: 'Apple' },
    { emoji: '⚽', name: 'Soccer Ball' },
    { emoji: '🚗', name: 'Car' },
    { emoji: '🌞', name: 'Sun' },
    { emoji: '🍕', name: 'Pizza' },
];

// Helper: generate random options
function getRandomOptions(correctIndex, totalOptions = 4) {
    const options = [emojis[correctIndex].name];
    while (options.length < totalOptions) {
        const randIndex = Math.floor(Math.random() * emojis.length);
        const option = emojis[randIndex].name;
        if (!options.includes(option)) options.push(option);
    }
    return options.sort(() => Math.random() - 0.5);
}

// API: get random emoji + options
app.get('/api/emoji', (req, res) => {
    const emojiIndex = Math.floor(Math.random() * emojis.length);
    const emojiObj = emojis[emojiIndex];
    const options = getRandomOptions(emojiIndex);
    res.json({ emoji: emojiObj.emoji, options, correct: emojiObj.name });
});

// API: submit guess
app.post('/api/guess', (req, res) => {
    const { playerName, guess, correct } = req.body;
    const score = guess === correct ? 1 : 0;

    leaderboard.push({ name: playerName || 'Anonymous', score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);

    res.json({
        correct: guess === correct,
        score,
        leaderboard
    });
});

// Serve HTML directly from JS
app.get('/', (req, res) => {
    res.send(`

        
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Emoji Guessing Game</title>
<style>
    body { font-family: sans-serif; text-align: center; margin-top: 50px; }
    button { margin: 5px; padding: 10px 20px; font-size: 16px; }
</style>
</head>
<body>

<h1>Emoji Guessing Game</h1>
<input type="text" id="playerName" placeholder="Enter your name" />
<div id="game">
    <h2 id="emoji" style="font-size: 80px;"></h2>
    <div id="options"></div>
</div>
<h3 id="feedback"></h3>
<h3>Total Score: <span id="score">0</span></h3>
<h3>Leaderboard</h3>
<ol id="leaderboard"></ol>

<script>
let currentCorrect = '';
let totalScore = 0;

async function loadEmoji() {
    const res = await fetch('/api/emoji');
    const data = await res.json();
    currentCorrect = data.correct;
    document.getElementById('emoji').textContent = data.emoji;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    data.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => submitGuess(option);
        optionsDiv.appendChild(btn);
    });
}

async function submitGuess(guess) {
    const playerName = document.getElementById('playerName').value || 'Anonymous';
    const res = await fetch('/api/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, guess, correct: currentCorrect })
    });
    const data = await res.json();

    if (data.correct) {
        totalScore += data.score;
        document.getElementById('feedback').textContent = '✅ Correct!';
    } else {
        document.getElementById('feedback').textContent = \`❌ Wrong! Correct: "\${currentCorrect}"\`;
    }

    document.getElementById('score').textContent = totalScore;

    // Update leaderboard
    const leaderboardEl = document.getElementById('leaderboard');
    leaderboardEl.innerHTML = '';
    data.leaderboard.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = \`\${entry.name}: \${entry.score}\`;
        leaderboardEl.appendChild(li);
    });

    loadEmoji();
}

// Initial load
loadEmoji();
</script>

</body>
</html>
    `);
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));