const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI audio
const BUTTON_SOUND_SRC = 'data:audio/wav;base64,' + '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';
const buttonSound = new Audio(BUTTON_SOUND_SRC);
buttonSound.preload = 'auto';
buttonSound.volume = 0.35;

function playButtonSound() {
    try {
        buttonSound.currentTime = 0;
        buttonSound.play();
    } catch (err) {
        // Ignore playback issues (e.g., Safari auto-play restrictions)
    }
}

// Canvas setup
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// API configuration
const API_URL = 'https://script.google.com/macros/s/AKfycby8-mQbxKhSyxqIcr2WRs0X4dQdGzUE5DE2Ob0rFbLk7madDPn52TDjG_URPJDJOlDL/exec';

/**
 * GET endpoint
 * Examples:
 * 1) Get highscores:
 *    `${API_URL}?action=getScores&callback=myCallback`
 *
 * 2) Add score via POST:
 *    fetch(API_URL, {
 *      method: 'POST',
 *      headers: { 'Content-Type': 'application/json' },
 *      body: JSON.stringify({ action: 'addScore', name: 'Alice', score: 100 })
 *    })
 *
 * POST endpoint accepts JSON body with `action`, `name`, and `score` fields.
 */

// Game state
let gameRunning = false;
let gameOver = false;
let score = 0;
let highScore = 0;
let gameSpeed = 7; // Start faster (was 5)
let obstacleTimer = 0;
let obstacleInterval = 100;
let animationFrame = 0;
let scoreAccumulator = 0;
let lastFrameTime = null;
let gameStartTime = null;
let darkModeActivated = false;
let darkModeTimerId = null;
darkModeTimerId = setTimeout(activateDarkMode, 120000);

// Speed progression constants - Much faster progression
const MAX_GAME_SPEED = 18;
const SPEED_INCREMENT = 0.004;
const MIN_OBSTACLE_INTERVAL = 40;
const OBSTACLE_INTERVAL_DECREMENT = 0.016;

// Chicken character
const chicken = {
    x: 100,
    y: 0,
    width: 50,
    height: 50,
    normalY: CANVAS_HEIGHT - 100,
    jumpPower: 15,
    velocity: 0,
    gravity: 0.6,
    jumping: false,
    ducking: false,
    duckHeight: 30
};

// Initialize chicken position
chicken.y = chicken.normalY;

// Obstacles array
let obstacles = [];

// Ground
const ground = {
    y: CANVAS_HEIGHT - 50,
    height: 50
};

// Game loop
let animationId;

// Event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
const jumpButton = document.getElementById('jumpBtn');
const duckButton = document.getElementById('duckBtn');
const mainMenu = document.getElementById('mainMenu');
const playAgainButton = document.getElementById('playAgainBtn');
const highscoreButton = document.getElementById('highscoreBtn');
const submitScoreButton = document.getElementById('submitScore');
const backButton = document.getElementById('backBtn');
const playerNameInput = document.getElementById('playerName');
const startGameButton = document.getElementById('startGameBtn');
const menuHighscoreButton = document.getElementById('menuHighscoreBtn');

const handleJumpInput = (e) => {
    e?.preventDefault?.();
    playButtonSound();
    jump();
    if (!gameRunning && !gameOver) {
        startGame();
    }
};

const handleDuckPress = (e) => {
    e?.preventDefault?.();
    playButtonSound();
    duck();
};

const handleDuckRelease = (e) => {
    e?.preventDefault?.();
    unduck();
};

jumpButton.addEventListener('touchstart', handleJumpInput, { passive: false });
jumpButton.addEventListener('click', handleJumpInput);
duckButton.addEventListener('touchstart', handleDuckPress, { passive: false });
duckButton.addEventListener('click', handleDuckPress);
duckButton.addEventListener('touchend', handleDuckRelease, { passive: false });
duckButton.addEventListener('mouseup', handleDuckRelease);
duckButton.addEventListener('mouseleave', handleDuckRelease);
startGameButton.addEventListener('click', () => { playButtonSound(); startGame(); });
menuHighscoreButton.addEventListener('click', () => { playButtonSound(); showHighscores(); });
playAgainButton.addEventListener('click', () => { playButtonSound(); restartGame(); });
highscoreButton.addEventListener('click', () => { playButtonSound(); showHighscores(); });
submitScoreButton.addEventListener('click', () => { playButtonSound(); submitScore(); });
backButton.addEventListener('click', () => { playButtonSound(); hideHighscores(); });
playerNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        playButtonSound();
        submitScore();
    }
});
canvas.addEventListener('click', () => {
    if (!gameRunning && !gameOver) {
        playButtonSound();
        startGame();
    }
});

function showMainMenu() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    mainMenu.classList.add('active');
    document.getElementById('highscoreScreen').classList.remove('active');
    document.getElementById('gameOverScreen').classList.remove('active');
    gameRunning = false;
    gameOver = false;
}

function hideMainMenu() {
    mainMenu.classList.remove('active');
}

// Keyboard controls
function handleKeyDown(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        playButtonSound();
        jump();
        if (!gameRunning && !gameOver) {
            startGame();
        }
    } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        playButtonSound();
        duck();
    }
}

function handleKeyUp(e) {
    if (e.code === 'ArrowDown') {
        e.preventDefault();
        unduck();
    }
}

function jump() {
    if (!chicken.jumping && !chicken.ducking) {
        chicken.jumping = true;
        chicken.velocity = -chicken.jumpPower;
    }
}

function duck() {
    if (!chicken.jumping) {
        chicken.ducking = true;
    }
}

function unduck() {
    chicken.ducking = false;
}

// Start game
function startGame() {
    hideMainMenu();
    document.getElementById('highscoreScreen').classList.remove('active');
    gameRunning = true;
    gameOver = false;
    score = 0;
    gameSpeed = 7; // Start faster
    obstacleInterval = 100;
    obstacles = [];
    obstacleTimer = 0;
    animationFrame = 0;
    scoreAccumulator = 0;
    lastFrameTime = null;
    gameStartTime = Date.now();
    chicken.y = chicken.normalY;
    chicken.velocity = 0;
    chicken.jumping = false;
    chicken.ducking = false;
    document.getElementById('gameOverScreen').classList.remove('active');
    updateScore(); // Reset score display
    if (!darkModeTimerId) {
        darkModeTimerId = setTimeout(activateDarkMode, 120000);
    }
    animationId = requestAnimationFrame(gameLoop);
}

// Restart game
function restartGame() {
    startGame();
}

function getElapsedSeconds() {
    if (!gameStartTime) return 0;
    return (Date.now() - gameStartTime) / 1000;
}

function activateDarkMode() {
    if (darkModeActivated) return;
    darkModeActivated = true;
    document.body.classList.add('dark-mode');
}

// Update chicken physics
function updateChicken() {
    if (chicken.jumping) {
        chicken.velocity += chicken.gravity;
        chicken.y += chicken.velocity;

        if (chicken.y >= chicken.normalY) {
            chicken.y = chicken.normalY;
            chicken.velocity = 0;
            chicken.jumping = false;
        }
    }
}

// Create obstacle
function createObstacle() {
    const types = ['cactus', 'box', 'flyingBox'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let obstacle = {
        x: CANVAS_WIDTH,
        type: type
    };

    if (type === 'cactus') {
        obstacle.width = 30;
        obstacle.height = 60;
        obstacle.y = ground.y - obstacle.height;
    } else if (type === 'box') {
        const elapsedSeconds = getElapsedSeconds();
        obstacle.width = 40;
        obstacle.height = 32 + Math.min(26, Math.floor(elapsedSeconds / 8) * 4) + Math.floor(Math.random() * 6);
        obstacle.y = ground.y - obstacle.height;
    } else if (type === 'flyingBox') {
        const elapsedSeconds = getElapsedSeconds();
        obstacle.width = 40;
        obstacle.height = 32 + Math.min(26, Math.floor(elapsedSeconds / 10) * 4) + Math.floor(Math.random() * 6);
        // Much more height variation - from very low to very high
        const heights = [
            ground.y - 65,   // Very low - must duck
            ground.y - 75,   // Low - must duck
            ground.y - 90,   // Medium-low - can duck or jump
            ground.y - 105,  // Medium - should jump
            ground.y - 120,  // High - must jump
            ground.y - 135,  // Very high - must jump high
            ground.y - 145   // Extremely high - maximum jump needed
        ];
        obstacle.y = heights[Math.floor(Math.random() * heights.length)];
    }

    obstacles.push(obstacle);
}

// Update obstacles
function updateObstacles() {
    obstacleTimer++;
    
    if (obstacleTimer > obstacleInterval) {
        createObstacle();
        obstacleTimer = 0;
    }

    obstacles.forEach((obstacle, index) => {
        obstacle.x -= gameSpeed;

        // Remove off-screen obstacles
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
        }
    });

    // Increase difficulty over time gradually
    if (gameSpeed < MAX_GAME_SPEED) {
        gameSpeed = Math.min(MAX_GAME_SPEED, gameSpeed + SPEED_INCREMENT);
    }

    if (obstacleInterval > MIN_OBSTACLE_INTERVAL) {
        obstacleInterval = Math.max(MIN_OBSTACLE_INTERVAL, obstacleInterval - OBSTACLE_INTERVAL_DECREMENT);
    }
}

// Check collision
function checkCollision() {
    const chickenCurrentHeight = chicken.ducking ? chicken.duckHeight : chicken.height;
    const chickenCurrentY = chicken.ducking ? chicken.normalY + (chicken.height - chicken.duckHeight) : chicken.y;

    for (let obstacle of obstacles) {
        if (
            chicken.x < obstacle.x + obstacle.width &&
            chicken.x + chicken.width > obstacle.x &&
            chickenCurrentY < obstacle.y + obstacle.height &&
            chickenCurrentY + chickenCurrentHeight > obstacle.y
        ) {
            return true;
        }
    }
    return false;
}

// Draw chicken
function drawChicken() {
    const chickenCurrentHeight = chicken.ducking ? chicken.duckHeight : chicken.height;
    const chickenCurrentY = chicken.ducking ? chicken.normalY + (chicken.height - chicken.duckHeight) : chicken.y;

    // Chicken body
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(chicken.x, chickenCurrentY, chicken.width, chickenCurrentHeight);
    
    // Chicken head
    if (!chicken.ducking) {
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.arc(chicken.x + chicken.width - 10, chickenCurrentY + 10, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(chicken.x + chicken.width - 5, chickenCurrentY + 8, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Beak
        ctx.fillStyle = '#FF6347';
        ctx.beginPath();
        ctx.moveTo(chicken.x + chicken.width, chickenCurrentY + 12);
        ctx.lineTo(chicken.x + chicken.width + 8, chickenCurrentY + 10);
        ctx.lineTo(chicken.x + chicken.width, chickenCurrentY + 14);
        ctx.fill();
    }
    
    // Animated Legs
    ctx.strokeStyle = '#FF8C00';
    ctx.lineWidth = 3;
    
    // Calculate leg movement based on animation frame (only when game is running)
    let legOffset1 = 0;
    let legOffset2 = 0;
    
    if (gameRunning && !chicken.jumping) {
        const legCycle = Math.floor(animationFrame / 5) % 2;
        legOffset1 = legCycle === 0 ? -3 : 3;
        legOffset2 = legCycle === 0 ? 3 : -3;
    }
    
    // Left leg
    ctx.beginPath();
    ctx.moveTo(chicken.x + 15, chickenCurrentY + chickenCurrentHeight);
    ctx.lineTo(chicken.x + 15 + legOffset1, chickenCurrentY + chickenCurrentHeight + 8);
    ctx.stroke();
    
    // Right leg
    ctx.beginPath();
    ctx.moveTo(chicken.x + 35, chickenCurrentY + chickenCurrentHeight);
    ctx.lineTo(chicken.x + 35 + legOffset2, chickenCurrentY + chickenCurrentHeight + 8);
    ctx.stroke();
}

// Draw obstacle
function drawObstacle(obstacle) {
    if (obstacle.type === 'cactus') {
        // Cactus
        ctx.fillStyle = '#2ECC71';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.fillRect(obstacle.x - 10, obstacle.y + 15, 10, 20);
        ctx.fillRect(obstacle.x + obstacle.width, obstacle.y + 15, 10, 20);
        
        // Cactus spikes
        ctx.fillStyle = '#27AE60';
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(obstacle.x + 5, obstacle.y + i * 12, 3, 8);
            ctx.fillRect(obstacle.x + 22, obstacle.y + i * 12, 3, 8);
        }
    } else if (obstacle.type === 'box' || obstacle.type === 'flyingBox') {
        // Box
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Box lines
        ctx.beginPath();
        ctx.moveTo(obstacle.x, obstacle.y);
        ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
        ctx.moveTo(obstacle.x + obstacle.width, obstacle.y);
        ctx.lineTo(obstacle.x, obstacle.y + obstacle.height);
        ctx.stroke();
    }
}

function getSkyColor() {
    return darkModeActivated ? '#0b1224' : '#87CEEB';
}

function getGroundColors() {
    return darkModeActivated
        ? { base: '#1f2937', accent: '#0f172a' }
        : { base: '#8B7355', accent: '#6F5C4A' };
}

function getTextColor() {
    return darkModeActivated ? '#E5E7EB' : '#2D3142';
}

// Draw ground
function drawGround() {
    const groundColors = getGroundColors();
    ctx.fillStyle = groundColors.base;
    ctx.fillRect(0, ground.y, CANVAS_WIDTH, ground.height);

    // Ground pattern
    ctx.fillStyle = groundColors.accent;
    for (let i = 0; i < CANVAS_WIDTH; i += 20) {
        ctx.fillRect(i, ground.y, 10, 5);
        ctx.fillRect(i + 10, ground.y + 10, 10, 5);
    }
}

// Draw clouds
function drawClouds() {
    const time = Date.now() * 0.0001;

    for (let i = 0; i < 3; i++) {
        const x = ((time * 20 + i * 250) % (CANVAS_WIDTH + 100)) - 50;
        const y = 50 + i * 40;

        const cloudAlpha = darkModeActivated ? 0.35 : 0.8;
        ctx.fillStyle = `rgba(255, 255, 255, ${cloudAlpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.arc(x + 25, y, 30, 0, Math.PI * 2);
        ctx.arc(x + 50, y, 25, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = Math.floor(score);
}

// Game loop
function gameLoop(timestamp) {
    if (!gameRunning) return;

    if (!lastFrameTime) {
        lastFrameTime = timestamp;
    }

    const deltaSeconds = (timestamp - lastFrameTime) / 1000;
    lastFrameTime = timestamp;

    scoreAccumulator += deltaSeconds;
    while (scoreAccumulator >= 0.2) {
        score += 1;
        scoreAccumulator -= 0.2;
    }

    // Increment animation frame
    animationFrame++;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = getSkyColor();
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background
    drawClouds();
    drawGround();

    // Update and draw chicken
    updateChicken();
    drawChicken();

    // Update and draw obstacles
    updateObstacles();
    obstacles.forEach(drawObstacle);

    // Check collision
    if (checkCollision()) {
        endGame();
        return;
    }

    // Update score
    updateScore();

    // Continue loop
    animationId = requestAnimationFrame(gameLoop);
}

// End game
function endGame() {
    gameRunning = false;
    gameOver = true;
    cancelAnimationFrame(animationId);
    
    // Update high score
    if (Math.floor(score) > highScore) {
        highScore = Math.floor(score);
        document.getElementById('highscore').textContent = highScore;
        localStorage.setItem('highScore', highScore);
    }
    
    // Show game over screen
    document.getElementById('finalScore').textContent = Math.floor(score);
    document.getElementById('gameOverScreen').classList.add('active');
    document.getElementById('playerName').value = '';
}

// Submit score to API using POST
async function submitScore() {
    const playerName = document.getElementById('playerName').value.trim();

    if (!playerName) {
        alert('Please enter your name!');
        return;
    }

    const submitBtn = document.getElementById('submitScore');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    showHighscores();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'addScore',
                name: playerName,
                score: Math.floor(score)
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log('Score submission response:', data);

        if (data.success) {
            alert('Score submitted successfully!');
            document.getElementById('playerName').value = '';
            loadHighScoreFromAPI();
            showHighscores();
        } else {
            alert('Failed to submit score: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Failed to submit score', error);
        alert('Failed to submit score. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Score';
    }
}

// Load high score from API using JSONP
async function loadHighScoreFromAPI() {
    const callbackName = 'jsonpHighscore_' + Date.now();
    
    window[callbackName] = function(data) {
        delete window[callbackName];
        const script = document.getElementById(callbackName);
        if (script) script.remove();
        
        if (data.success && data.highscores && data.highscores.length > 0) {
            const topScore = data.highscores[0].score;
            highScore = topScore;
            document.getElementById('highscore').textContent = highScore;
            localStorage.setItem('highScore', highScore);
        } else {
            loadHighScoreFromLocal();
        }
    };
    
    const script = document.createElement('script');
    script.id = callbackName;
    script.src = `${API_URL}?action=getScores&callback=${callbackName}`;
    script.onerror = function() {
        delete window[callbackName];
        script.remove();
        loadHighScoreFromLocal();
    };
    
    document.head.appendChild(script);
}

// Show highscores using JSONP
async function showHighscores() {
    hideMainMenu();
    document.getElementById('highscoreScreen').classList.add('active');
    document.getElementById('gameOverScreen').classList.remove('active');

    const listContainer = document.getElementById('highscoreList');
    listContainer.innerHTML = '<div class="loading">Loading highscores...</div>';

    const callbackName = 'jsonpScores_' + Date.now();
    
    window[callbackName] = function(data) {
        delete window[callbackName];
        const script = document.getElementById(callbackName);
        if (script) script.remove();
        
        if (data.success && data.highscores && data.highscores.length > 0) {
            listContainer.innerHTML = '';
            data.highscores.slice(0, 10).forEach((item, index) => {
                const scoreItem = document.createElement('div');
                scoreItem.className = 'highscore-item' + (index < 3 ? ' top-3' : '');
                scoreItem.innerHTML = `
                    <span class="highscore-rank">#${index + 1}</span>
                    <span class="highscore-name">${escapeHtml(item.name)}</span>
                    <span class="highscore-score">${item.score}</span>
                `;
                listContainer.appendChild(scoreItem);
            });
        } else {
            listContainer.innerHTML = '<div class="loading">No highscores yet!</div>';
        }
    };
    
    const script = document.createElement('script');
    script.id = callbackName;
    script.src = `${API_URL}?action=getScores&callback=${callbackName}`;
    script.onerror = function() {
        delete window[callbackName];
        script.remove();
        listContainer.innerHTML = '<div class="loading">Failed to load highscores</div>';
    };
    
    document.head.appendChild(script);
}

// Hide highscores
function hideHighscores() {
    document.getElementById('highscoreScreen').classList.remove('active');
    showMainMenu();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load high score from localStorage (fallback)
function loadHighScoreFromLocal() {
    const saved = localStorage.getItem('highScore');
    if (saved) {
        highScore = parseInt(saved);
        document.getElementById('highscore').textContent = highScore;
    }
}

// Initialize
// Try to load from API first, fall back to localStorage
loadHighScoreFromAPI();

// Draw initial screen
ctx.fillStyle = getSkyColor();
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
drawClouds();
drawGround();
drawChicken();

// Start message
ctx.fillStyle = getTextColor();
ctx.font = 'bold 24px Fredoka, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Press SPACE or Click to Start!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
ctx.font = '16px Fredoka, sans-serif';
ctx.fillText('SPACE/TAP: Jump | DOWN/TAP: Duck', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
