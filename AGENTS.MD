# 🤖 Singaseong Jumps - Developer & Agent Documentation

This document provides technical information about the Singaseong Jumps game for AI agents and developers working on the codebase.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [File Structure](#file-structure)
- [Core Systems](#core-systems)
- [Game Logic](#game-logic)
- [API Integration](#api-integration)
- [Collision Detection](#collision-detection)
- [Rendering Pipeline](#rendering-pipeline)
- [Mobile Optimization](#mobile-optimization)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Rendering**: HTML5 Canvas API
- **Styling**: CSS3 with Flexbox
- **Backend**: Google Apps Script (serverless)
- **Storage**: Google Sheets (database)
- **State Management**: Local variables + localStorage

### Design Patterns
- **Game Loop**: RequestAnimationFrame-based rendering
- **Event-Driven**: Keyboard and touch event handlers
- **JSONP**: Cross-origin API communication
- **Responsive Design**: Mobile-first approach

## 📁 File Structure

```
singaseong-jumps/
│
├── index.html              # DOM structure
│   ├── Game container
│   ├── Header (score display)
│   ├── Canvas element
│   ├── Mobile controls
│   └── Modal screens
│
├── style.css               # Visual styling
│   ├── Color variables
│   ├── Animations
│   ├── Responsive breakpoints
│   └── Mobile optimizations
│
├── game.js                 # Game logic
│   ├── Game state management
│   ├── Physics engine
│   ├── Collision detection
│   ├── Rendering functions
│   ├── API communication
│   └── Event handlers
│
└── webapp-script.gs        # Backend API
    ├── Score submission
    ├── Leaderboard retrieval
    ├── Data validation
    └── JSONP responses
```

## 🎮 Core Systems

### 1. Game State Management

```javascript
// Core state variables
let gameRunning = false;      // Is game active?
let gameOver = false;         // Game ended?
let score = 0;                // Current score
let highScore = 0;            // Best score
let gameSpeed = 7;            // Current speed (7-18)
let obstacleInterval = 100;   // Frames between obstacles
let animationFrame = 0;       // Animation counter
```

### 2. Configuration Constants

```javascript
// Speed progression
const MAX_GAME_SPEED = 18;
const SPEED_INCREMENT = 0.002;
const MIN_OBSTACLE_INTERVAL = 40;
const OBSTACLE_INTERVAL_DECREMENT = 0.008;

// Canvas dimensions
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
```

### 3. Game Objects

#### Chicken (Player)
```javascript
const chicken = {
    x: 100,                 // X position (fixed)
    y: normalY,             // Y position (dynamic)
    width: 50,              // Collision box width
    height: 50,             // Collision box height
    normalY: CANVAS_HEIGHT - 100,  // Ground position
    jumpPower: 15,          // Initial jump velocity
    velocity: 0,            // Current Y velocity
    gravity: 0.6,           // Gravity acceleration
    jumping: false,         // Is jumping?
    ducking: false,         // Is ducking?
    duckHeight: 30          // Height when ducking
};
```

#### Obstacles
```javascript
// Obstacle types: 'cactus', 'box', 'flyingBox'
const obstacle = {
    x: CANVAS_WIDTH,        // Spawn at right edge
    y: calculatedY,         // Height based on type
    width: 30-40,           // Depends on type
    height: 40-60,          // Depends on type
    type: 'cactus'          // Obstacle type
};
```

## 🎯 Game Logic

### Game Loop Flow

```
gameLoop()
├── Increment animationFrame
├── Clear canvas
├── Draw background
│   ├── drawClouds()
│   └── drawGround()
├── Update player
│   └── updateChicken()
├── Draw player
│   └── drawChicken()
├── Update obstacles
│   └── updateObstacles()
│       ├── Move obstacles left
│       ├── Remove off-screen
│       ├── Increase difficulty
│       └── Spawn new obstacles
├── Draw obstacles
│   └── forEach(drawObstacle)
├── Check collisions
│   └── checkCollision()
│       └── endGame() if collision
├── Update score display
│   └── updateScore()
└── requestAnimationFrame(gameLoop)
```

### Obstacle Generation

```javascript
// Flying box height variations (7 levels)
const heights = [
    ground.y - 65,   // Very low - duck required
    ground.y - 75,   // Low - duck required
    ground.y - 90,   // Medium-low - choice
    ground.y - 105,  // Medium - jump recommended
    ground.y - 120,  // High - jump required
    ground.y - 135,  // Very high - jump required
    ground.y - 145   // Extreme - max jump needed
];
```

### Difficulty Progression

```javascript
// Continuous difficulty increase (every frame)
if (gameSpeed < MAX_GAME_SPEED) {
    gameSpeed += SPEED_INCREMENT;
}

if (obstacleInterval > MIN_OBSTACLE_INTERVAL) {
    obstacleInterval -= OBSTACLE_INTERVAL_DECREMENT;
}
```

## 🌐 API Integration

### JSONP Communication

The game uses JSONP to avoid CORS issues with Google Apps Script.

#### Submit Score
```javascript
function submitScore() {
    const callbackName = 'jsonpCallback_' + Date.now();
    
    window[callbackName] = function(data) {
        // Handle response
        delete window[callbackName];
        // Cleanup script tag
    };
    
    const script = document.createElement('script');
    script.src = `${API_URL}?action=addScore&name=${name}&score=${score}&secret=${secret}&callback=${callbackName}`;
    document.head.appendChild(script);
}
```

#### Get Highscores
```javascript
function loadHighScoreFromAPI() {
    const callbackName = 'jsonpHighscore_' + Date.now();
    
    window[callbackName] = function(data) {
        if (data.success && data.highscores.length > 0) {
            highScore = data.highscores[0].score;
        }
    };
    
    // Create and append script tag
}
```

### Backend API Structure

```javascript
// Google Apps Script endpoints
GET  ?action=getScores&secret=HASH&callback=FUNC
GET  ?action=addScore&name=NAME&score=NUM&secret=HASH&callback=FUNC

// Response format
{
    success: true/false,
    highscores: [
        { name: "Player", score: 1000 },
        ...
    ],
    error: "Error message" // if success=false
}
```

## 💥 Collision Detection

### AABB (Axis-Aligned Bounding Box) Algorithm

```javascript
function checkCollision() {
    const chickenCurrentHeight = chicken.ducking ? 
        chicken.duckHeight : chicken.height;
    const chickenCurrentY = chicken.ducking ? 
        chicken.normalY + (chicken.height - chicken.duckHeight) : 
        chicken.y;

    for (let obstacle of obstacles) {
        if (
            chicken.x < obstacle.x + obstacle.width &&
            chicken.x + chicken.width > obstacle.x &&
            chickenCurrentY < obstacle.y + obstacle.height &&
            chickenCurrentY + chickenCurrentHeight > obstacle.y
        ) {
            return true; // Collision detected
        }
    }
    return false;
}
```

### Collision Boxes

```
Chicken (Standing):
┌─────────┐
│  50x50  │
│         │
└─────────┘

Chicken (Ducking):
┌─────────┐
│  50x30  │
└─────────┘

Cactus:
┌──┐
│30│
│x │
│60│
└──┘

Box:
┌────┐
│40x │
│ 40 │
└────┘
```

## 🎨 Rendering Pipeline

### Drawing Order (Z-Index)

1. **Background Sky** (gradient)
2. **Clouds** (animated, transparent)
3. **Ground** (static pattern)
4. **Obstacles** (cactus/boxes)
5. **Chicken** (player character)

### Animation System

```javascript
// Leg animation (5-frame cycle)
const legCycle = Math.floor(animationFrame / 5) % 2;
legOffset1 = legCycle === 0 ? -3 : 3;
legOffset2 = legCycle === 0 ? 3 : -3;

// Cloud animation (time-based)
const time = Date.now() * 0.0001;
const x = ((time * 20 + i * 250) % (CANVAS_WIDTH + 100)) - 50;
```

## 📱 Mobile Optimization

### Responsive Breakpoints

```css
/* Desktop: 901px+ */
.game-container {
    width: 90vw;
    max-width: 800px;
}

/* Tablet: 601px - 900px */
@media (min-width: 601px) and (max-width: 900px) {
    .game-container {
        width: 95vw;
        height: 90vh;
    }
}

/* Mobile: ≤600px */
@media (max-width: 600px) {
    .game-container {
        width: 100vw;
        height: 100vh;
    }
}
```

### Touch Controls Detection

```css
/* Show buttons only on touch devices */
@media (hover: none) and (pointer: coarse) {
    .mobile-controls {
        display: flex;
    }
}
```

## 🛠️ Development Guidelines

### Adding New Obstacles

1. Define obstacle type in `createObstacle()`:
```javascript
} else if (type === 'newObstacle') {
    obstacle.width = 35;
    obstacle.height = 50;
    obstacle.y = ground.y - obstacle.height;
}
```

2. Add drawing logic in `drawObstacle()`:
```javascript
if (obstacle.type === 'newObstacle') {
    ctx.fillStyle = '#COLOR';
    // Draw obstacle shape
}
```

3. Add to obstacle types array:
```javascript
const types = ['cactus', 'box', 'flyingBox', 'newObstacle'];
```

### Adjusting Difficulty

```javascript
// Make game easier
const MAX_GAME_SPEED = 15;          // Lower max speed
const SPEED_INCREMENT = 0.001;      // Slower acceleration
const MIN_OBSTACLE_INTERVAL = 60;   // More space between obstacles

// Make game harder
const MAX_GAME_SPEED = 20;          // Higher max speed
const SPEED_INCREMENT = 0.003;      // Faster acceleration
const MIN_OBSTACLE_INTERVAL = 30;   // Less space between obstacles
```

### Adding Animations

```javascript
// CSS Animation
@keyframes customAnimation {
    0% { /* start state */ }
    100% { /* end state */ }
}

.element {
    animation: customAnimation 2s ease-in-out infinite;
}

// Canvas Animation
function drawAnimatedElement() {
    const time = Date.now() * 0.001;
    const offset = Math.sin(time) * 10;
    ctx.fillRect(x, y + offset, width, height);
}
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Desktop keyboard controls (Space, Down Arrow)
- [ ] Mobile touch controls (Jump, Duck buttons)
- [ ] Canvas click to start game
- [ ] Score submission with valid name
- [ ] Highscore loading on game start
- [ ] Collision detection accuracy
- [ ] Game over screen display
- [ ] Play Again functionality
- [ ] Highscores modal display
- [ ] Different screen sizes (mobile/tablet/desktop)

### Debug Mode

Add to `game.js` for debugging:

```javascript
// Show collision boxes
function drawDebugBoxes() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    
    // Chicken box
    ctx.strokeRect(chicken.x, chicken.y, chicken.width, chicken.height);
    
    // Obstacle boxes
    obstacles.forEach(obs => {
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
    });
}

// Call in gameLoop()
drawDebugBoxes();
```

### Console Logging

```javascript
// Enable debug logs
console.log('Game Speed:', gameSpeed);
console.log('Obstacle Interval:', obstacleInterval);
console.log('Current Score:', score);
console.log('Obstacles on screen:', obstacles.length);
```

## 🔐 Security Considerations

### API Security
- Never hardcode secret keys in client code
- Use environment variables or data attributes
- Validate all inputs on server side
- Implement rate limiting for API calls

### Data Validation
```javascript
// Example validation in Google Apps Script
const name = (params.name || '').trim();
const score = Number(params.score);

if (!name || name.length > 20) {
    return jsonResponse({ success: false, error: 'Invalid name' });
}

if (isNaN(score) || score < 0 || score > 1000000) {
    return jsonResponse({ success: false, error: 'Invalid score' });
}
```

## 📊 Performance Optimization

### Canvas Optimization
- Clear only necessary areas (if needed)
- Use `requestAnimationFrame` for smooth 60fps
- Minimize state changes in render loop
- Use object pooling for obstacles

### Memory Management
```javascript
// Remove off-screen obstacles immediately
if (obstacle.x + obstacle.width < 0) {
    obstacles.splice(index, 1);
}

// Cleanup JSONP callbacks
delete window[callbackName];
script.remove();
```

## 🚀 Future Enhancements

### Potential Features
- [ ] Power-ups (invincibility, slow motion)
- [ ] Multiple chicken characters (skins)
- [ ] Sound effects and background music
- [ ] Particle effects on collision
- [ ] Daily challenges
- [ ] Achievement system
- [ ] Multiplayer mode
- [ ] Progressive Web App (PWA) support
- [ ] Social media sharing
- [ ] Replay system

### Code Improvements
- [ ] Migrate to TypeScript
- [ ] Add unit tests (Jest)
- [ ] Implement state management library
- [ ] Use Canvas sprite sheets
- [ ] Add service worker for offline play
- [ ] Implement WebGL for better performance

## 📚 Resources

### Learning Materials
- [HTML5 Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Game Loop Patterns](https://gameprogrammingpatterns.com/game-loop.html)
- [Collision Detection](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
- [Google Apps Script Docs](https://developers.google.com/apps-script)

### Tools
- Chrome DevTools (F12) - Debugging
- Lighthouse - Performance auditing
- BrowserStack - Cross-browser testing
- Google PageSpeed Insights - Optimization

---

**Happy Coding! 🚀**

This documentation is maintained for AI agents and developers working on Singaseong Jumps.
