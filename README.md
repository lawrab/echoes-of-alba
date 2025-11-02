# Echoes of Alba

An interactive branching story game about Scottish mythology, built for young readers (ages 7-10).

## Current Story: The Seal Wife of Skye

Discover a mysterious seal skin on the shores of Skye and embark on a magical adventure with the Selkie folk. Your choices determine the path of the story through 5 unique endings!

## How to Play

### Quick Start

1. **Open the game:**
   ```bash
   cd echoes-of-alba
   python3 -m http.server 8000
   ```

2. **Open in browser:** http://localhost:8000

3. **Play!** Click choices to navigate through the story.

### Controls

- **Mouse/Touch:** Click choice buttons to make decisions
- **Keyboard:** (not currently implemented)

### Debug Mode

For development and testing, debug tools are enabled by default:

- **Top-right panel** shows current story beat
- **Jump to Beat:** Skip to any part of the story
- **Validate Story:** Check for broken links in story data
- **Reset Story:** Start over from the beginning

To disable: Set `DEBUG_MODE = false` in `js/main.js`

## Story Paths

**The Seal Wife of Skye** has 5 different endings:

1. **The Grateful Gift** - Return the skin immediately and receive a magical pearl
2. **Underwater Wonders** - Explore the Selkie's coral palace beneath the waves
3. **The Cautious Path** - Heed the elder's warning and stay safe
4. **The Guardian** - Become a protector of Selkie secrets
5. **Between Two Worlds** - Receive a calling shell for future adventures

Average playtime: 3-4 minutes per path

## Customization

### Adding Your Own Background Images

Replace the placeholder backgrounds with real images:

1. Create/find images at **1920x1080 resolution** (or similar 16:9 aspect ratio)
2. Save as JPG or PNG in `assets/images/`
3. Edit `js/scenes/BootScene.js`:
   - Replace the `createPlaceholderImages()` function
   - Add standard Phaser image loading:
     ```javascript
     this.load.image('beach-day', 'assets/images/beach-day.jpg');
     this.load.image('cave-interior', 'assets/images/cave-interior.jpg');
     // ... etc
     ```

**Required image keys:**
- `beach-day` - Bright beach scene
- `cave-interior` - Dark cave
- `underwater` - Underwater/ocean scene
- `village` - Scottish village
- `moonlit-shore` - Beach at night
- `menu-bg` - Title screen

### Editing the Story

Story content lives in `js/data/selkieStory.js`. Each story "beat" is an object:

```javascript
{
  id: 'unique_id',
  background: 'image-key',
  text: 'The story text that appears to the player...',
  choices: [
    { text: 'Choice button text', nextId: 'next_beat_id' },
    { text: 'Another choice', nextId: 'different_beat_id' }
  ],
  isEnding: false  // set to true for final beats
}
```

Use the **Validate Story** button in debug mode to check for errors after editing.

### Creating New Stories

1. Create a new story file: `js/data/yourStory.js`
2. Follow the same data structure as `selkieStory.js`
3. Load it in `index.html`
4. Modify `StoryScene` to use the new story data

See `ARCHITECTURE.md` for detailed instructions.

## Technical Details

- **Engine:** Phaser 3.80.1
- **Language:** Vanilla JavaScript (ES6)
- **UI:** Hybrid approach (Phaser + HTML overlay)
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **No build step required** - just open in browser!

## Project Structure

```
echoes-of-alba/
├── index.html              # Main entry point
├── css/style.css          # UI styling
├── js/
│   ├── main.js            # Game config
│   ├── scenes/            # Game scenes
│   ├── data/              # Story content
│   └── utils/             # Helper classes
├── assets/images/         # Background images
└── docs/
    ├── ARCHITECTURE.md    # Technical documentation
    └── README.md          # This file
```

## Roadmap

### Week 1 (Complete ✓)
- [x] Basic Phaser setup
- [x] Story engine with branching
- [x] One complete Selkie story
- [x] 5 distinct endings
- [x] Debug tools

### Future Ideas
- [ ] Additional Scottish mythology stories (Kelpies, Brownies, etc.)
- [ ] Save/load system (LocalStorage)
- [ ] Ambient background music
- [ ] Sound effects for UI interactions
- [ ] Mobile-optimized layout
- [ ] Story tree visualization
- [ ] Achievements/collectibles
- [ ] Unlockable concept art

## Troubleshooting

**Game won't load:**
- Check browser console (F12) for errors
- Ensure you're running a local server (can't open HTML directly)
- Verify all script files are loaded in correct order

**Story jumps to wrong beat:**
- Run "Validate Story" in debug panel
- Check `nextId` values match beat `id` values exactly

**Backgrounds not showing:**
- Check image paths in BootScene.js
- Verify images are in `assets/images/`
- Check browser console for 404 errors

**Text overlaps or cuts off:**
- Adjust `max-width` in CSS for `#story-text-container`
- Consider splitting long text into multiple beats

## Credits

**Story:** Original narrative based on Scottish Selkie folklore
**Development:** Built with Phaser 3
**Target Audience:** Ages 7-10

## License

MIT License - Feel free to adapt and extend for educational purposes!

---

**Questions or Issues?** Check `ARCHITECTURE.md` for detailed technical documentation.
