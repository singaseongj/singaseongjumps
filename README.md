# 🐔 Singaseong Jumps

A fun and challenging endless runner game where you control a chicken jumping and ducking through obstacles!

![Game Preview](https://img.shields.io/badge/Status-Active-success)
![Platform](https://img.shields.io/badge/Platform-Web-blue)
![Mobile Friendly](https://img.shields.io/badge/Mobile-Optimized-green)

## 🎮 Game Features

- **Endless Runner Gameplay**: Jump and duck to avoid obstacles
- **Progressive Difficulty**: Game gets faster as you play
- **Online Leaderboard**: Compete with players worldwide
- **Mobile Optimized**: Touch controls for mobile devices
- **Retro Arcade Style**: Colorful pixel art aesthetics
- **Smooth Animations**: Animated chicken with running legs

## 🕹️ How to Play

### Desktop Controls
- **SPACE** or **Click**: Jump
- **DOWN ARROW**: Duck

### Mobile Controls
- **JUMP Button**: Make the chicken jump
- **DUCK Button**: Make the chicken duck

### Obstacles
- 🌵 **Cactus**: Jump to avoid
- 📦 **Ground Box**: Jump to avoid
- 📦 **Flying Box**: Duck OR jump depending on height
  - Low boxes: Duck
  - High boxes: Jump

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Google Sheets account (for leaderboard functionality)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/singaseong-jumps.git
   cd singaseong-jumps
   ```

2. **Set up Google Apps Script** (for leaderboard)
   - Create a new Google Spreadsheet
   - Open `Extensions` → `Apps Script`
   - Copy the contents of `webapp-script.gs`
   - Replace `API_SECRET` with your own secret key
   - Deploy as Web App (Execute as: Me, Access: Anyone)
   - Copy the deployment URL

3. **Configure the game**
   - Open `game.js`
   - Update `API_URL` with your Google Apps Script deployment URL
   - Update `DEFAULT_SCORE_HASH` with your secret key hash

4. **Open the game**
   - Simply open `index.html` in your web browser
   - Or host on any web server (GitHub Pages, Netlify, Vercel, etc.)

## 📁 Project Structure

```
singaseong-jumps/
├── index.html          # Main HTML file
├── style.css           # Game styling and animations
├── game.js             # Game logic and mechanics
├── webapp-script.gs    # Google Apps Script for leaderboard
├── README.md           # This file
└── agents.md           # Developer documentation
```

## 🎨 Features Breakdown

### Game Mechanics
- **Dynamic Speed**: Starts at speed 7, increases to max 18
- **Obstacle Variety**: 7 different flying box heights
- **Score System**: +10 points per obstacle passed
- **High Score**: Stored locally and synced with server

### Mobile Optimization
- Full-screen game on mobile devices
- Compact touch controls
- Optimized canvas size
- Responsive design for tablets

### Visual Design
- Retro pixel art fonts (Press Start 2P)
- Smooth gradient backgrounds
- Animated clouds
- Walking chicken with moving legs
- Scanline effect for retro feel

## 🔧 Configuration

### Game Speed Settings
Located in `game.js`:
```javascript
const MAX_GAME_SPEED = 18;           // Maximum game speed
const SPEED_INCREMENT = 0.002;       // Speed increase per frame
const MIN_OBSTACLE_INTERVAL = 40;    // Minimum frames between obstacles
const OBSTACLE_INTERVAL_DECREMENT = 0.008; // How fast intervals decrease
```

### API Configuration
In `game.js`, configure your API:
```javascript
const API_URL = 'YOUR_GOOGLE_SCRIPT_URL';
const DEFAULT_SCORE_HASH = 'YOUR_SECRET_HASH';
```

**Important**: Never commit your actual API URL or secret hash to public repositories!

### Google Sheets Setup
1. Create a sheet named `SingaseongJumps`
2. Headers: `Name`, `Score`, `Timestamp`
3. Deploy the Apps Script as described above

## 🌐 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to Settings → Pages
3. Select branch and folder
4. Your game will be live at `https://yourusername.github.io/singaseong-jumps`

### Netlify
1. Drag and drop your folder to Netlify
2. Game is instantly deployed

### Vercel
```bash
vercel --prod
```

## 🎯 Game Statistics

| Metric | Value |
|--------|-------|
| Starting Speed | 7 |
| Maximum Speed | 18 |
| Flying Box Heights | 7 variations |
| Score per Obstacle | 10 points |
| Top Leaderboard Spots | 10 |

## 🐛 Troubleshooting

### Leaderboard Not Working
- Check if Google Apps Script is deployed correctly
- Verify the API URL in `game.js`
- Check browser console for errors (F12)
- Ensure secret hash matches between game and script

### Game Too Fast/Slow
- Adjust `SPEED_INCREMENT` in game.js
- Modify `MAX_GAME_SPEED` constant
- Change initial `gameSpeed` value

### Mobile Controls Not Showing
- Clear browser cache (Ctrl + F5)
- Test on actual mobile device (not just browser resize)
- Check if touch events are supported

## 📱 Browser Compatibility

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Opera | ✅ | ✅ |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by classic Chrome Dino game
- Fonts from Google Fonts
- Built with vanilla JavaScript
- Retro gaming aesthetic

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Enjoy the game! 🐔💨**

Made with ❤️ and JavaScript
