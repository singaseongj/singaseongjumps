const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas setup
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// API configuration
const API_URL = 'https://script.google.com/macros/s/AKfycbyXBKcJcKVfT1IppcvNEUu-bQxiaUoNJLN2WMffGWJ-b80lMBAobrnSUXI-NuYIwjNu/exec';
const DEFAULT_SCORE_HASH = 'ef9b9dd5820f4a98c58cb19a2da0f8a1c0f9084acecaabbea620dd6fb2e52cb4';
const SECRET = document.body?.dataset?.scoreHash || DEFAULT_SCORE_HASH;

// Debug: Log the secret being used
console.log('Using SECRET:', SECRET);

// Game state
let gameRunning = false;
let gameOver = false;
let score = 0;
let highScore = 0;
let gameSpeed = 5;
let obstacleTimer = 0;
let obstacleInterval = 100;
let animationFrame = 0;

// Speed progression constants
const MAX_GAME_SPEED = 15;
const SPEED_INCREMENT = 0.001;
const MIN_OBSTACLE_INTERVAL = 50;
const OBSTACLE_INTERVAL_DECREMENT = 0.005;

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
document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    jump();
});
document.getElementById('duckBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    duck();
});
document.getElementById('duckBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    unduck();
});
document.getElementById('playAgainBtn').addEventListener('click', restartGame);
document.getElementById('highscoreBtn').addEventListener('click', showHighscores);
document.getElementById('submitScore').addEventListener('click', submitScore);
document.getElementById('backBtn').addEventListener('click', hideHighscores);
canvas.addEventListener('click', () => {
    if (!gameRunning && !gameOver) {
        startGame();
    }
});

// Keyboard controls
function handleKeyDown(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        jump();
        if (!gameRunning && !gameOver) {
            startGame();
        }
    } else if (e.code === 'ArrowDown') {
        e.preventDefault();
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
    gameRunning = true;
    gameOver = false;
    score = 0;
    gameSpeed = 5;
    obstacleInterval = 100;
    obstacles = [];
    obstacleTimer = 0;
    chicken.y = chicken.normalY;
    chicken.velocity = 0;
    chicken.jumping = false;
    chicken.ducking = false;
    document.getElementById('gameOverScreen').classList.remove('active');
    gameLoop();
}

// Restart game
function restartGame() {
    startGame();
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
        obstacle.width = 40;
        obstacle.height = 40;
        obstacle.y = ground.y - obstacle.height;
    } else if (type === 'flyingBox') {
        obstacle.width = 40;
        obstacle.height = 40;
        // Random height variation: sometimes low (duck), sometimes medium-high (jump)
        const heights = [
            ground.y - 70,   // Low - must duck
            ground.y - 75,   // Low-medium - must duck
            ground.y - 95,   // Medium - can duck or jump
            ground.y - 110,  // Medium-high - should jump
            ground.y - 120   // High - must jump
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
            score += 10;
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

// Draw ground
function drawGround() {
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(0, ground.y, CANVAS_WIDTH, ground.height);
    
    // Ground pattern
    ctx.fillStyle = '#6F5C4A';
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
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
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
function gameLoop() {
    if (!gameRunning) return;

    // Increment animation frame
    animationFrame++;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

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

// Submit score to API using JSONP to avoid CORS
function submitScore() {
    const playerName = document.getElementById('playerName').value.trim();

    if (!playerName) {
        alert('Please enter your name!');
        return;
    }
    
    const submitBtn = document.getElementById('submitScore');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Create unique callback name
    const callbackName = 'jsonpCallback_' + Date.now();
    
    // Define callback function
    window[callbackName] = function(data) {
        // Cleanup
        delete window[callbackName];
        const script = document.getElementById(callbackName);
        if (script) script.remove();
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Score';
        
        console.log('Score submission response:', data);
        
        if (data.success) {
            alert('Score submitted successfully!');
            document.getElementById('playerName').value = '';
            loadHighScoreFromAPI();
        } else {
            alert('Failed to submit score: ' + (data.error || 'Unknown error'));
        }
    };
    
    // Create script tag for JSONP
    const script = document.createElement('script');
    script.id = callbackName;
    const url = `${API_URL}?action=addScore&name=${encodeURIComponent(playerName)}&score=${Math.floor(score)}&secret=${encodeURIComponent(SECRET)}&callback=${callbackName}`;
    
    console.log('Submitting score to:', url);
    script.src = url;
    
    // Handle errors
    script.onerror = function() {
        delete window[callbackName];
        script.remove();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Score';
        console.error('Script loading failed');
        alert('Failed to submit score. Please try again.');
    };
    
    document.head.appendChild(script);
}

// Load high score from API using JSONP
function loadHighScoreFromAPI() {
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
    script.src = `${API_URL}?action=getScores&secret=${encodeURIComponent(SECRET)}&callback=${callbackName}`;
    script.onerror = function() {
        delete window[callbackName];
        script.remove();
        loadHighScoreFromLocal();
    };
    
    document.head.appendChild(script);
}

// Show highscores using JSONP
function showHighscores() {
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
    script.src = `${API_URL}?action=getScores&secret=${encodeURIComponent(SECRET)}&callback=${callbackName}`;
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
    document.getElementById('gameOverScreen').classList.add('active');
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
ctx.fillStyle = '#87CEEB';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
drawClouds();
drawGround();
drawChicken();

// Start message
ctx.fillStyle = '#2D3142';
ctx.font = 'bold 24px Fredoka, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Press SPACE or Click to Start!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
ctx.font = '16px Fredoka, sans-serif';
ctx.fillText('SPACE/TAP: Jump | DOWN/TAP: Duck', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
