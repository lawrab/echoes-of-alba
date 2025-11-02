# Echoes of Alba - Quick Start Guide

## Start Playing

```bash
cd /home/lrabbets/repos/echoes-of-alba
python3 -m http.server 8000
# Open: http://localhost:8000
```

## What Works Right Now ✅

- Complete Selkie story with 5 endings
- Interactive choice-based gameplay
- Debug tools (top-right corner)
- Smooth scene transitions
- Placeholder backgrounds (solid colors with labels)

## Story Paths to Test

1. **Hide & Return Immediately** → Ending: "The Grateful Gift"
2. **Try it on → Go deeper** → Ending: "Underwater Wonders"
3. **Tell village → Stay away** → Ending: "The Cautious Path"
4. **Any path → Meet Moira → Protect** → Ending: "The Guardian"
5. **Any path → Meet Moira → Visit** → Ending: "Between Two Worlds"

## Debug Tools (Top-Right Panel)

- **Current Beat:** Shows where you are in the story
- **Jump to Beat:** Skip to any story section
- **Validate Story:** Check for errors (should show ✓)
- **Reset Story:** Start over

## Next Steps

### To Replace Placeholder Backgrounds:

1. Add images (1920x1080) to `assets/images/`:
   - `beach-day.jpg`
   - `cave-interior.jpg`
   - `underwater.jpg`
   - `village.jpg`
   - `moonlit-shore.jpg`
   - `menu-bg.jpg`

2. Edit `js/scenes/BootScene.js`:
   - Replace `createPlaceholderImages()` with `this.load.image()` calls
   - See line 22 for the function to replace

### To Edit Story Text:

1. Open `js/data/selkieStory.js`
2. Find the beat by its `id`
3. Edit the `text` field
4. Save and refresh browser

### To Add New Story Beats:

1. Add new object to `SELKIE_STORY` in `js/data/selkieStory.js`
2. Format:
   ```javascript
   new_beat_id: {
       id: 'new_beat_id',
       background: 'beach-day',
       text: 'Your story text here...',
       choices: [
           { text: 'Choice 1', nextId: 'next_beat' },
           { text: 'Choice 2', nextId: 'other_beat' }
       ]
   }
   ```
3. Click "Validate Story" in debug panel

## Files You Might Edit

| File | Purpose |
|------|---------|
| `js/data/selkieStory.js` | All story text and choices |
| `js/scenes/BootScene.js` | Loading images |
| `css/style.css` | Button and text styling |
| `index.html` | Add new scripts |

## Files You Probably Won't Edit

| File | Purpose |
|------|---------|
| `js/main.js` | Phaser configuration |
| `js/utils/StoryManager.js` | Story navigation logic |
| `js/scenes/StoryScene.js` | Main game scene |
| `js/scenes/MenuScene.js` | Title screen |
| `js/scenes/EndingScene.js` | Ending display |

## Troubleshooting

**Game won't load:**
- Check browser console (F12)
- Ensure server is running
- Try: `pkill -f "http.server" && python3 -m http.server 8000`

**Images not showing:**
- Check file paths in BootScene.js
- Verify images are in `assets/images/`
- Check browser console for 404 errors

**Story validation errors:**
- Click "Validate Story" in debug panel
- Check all `nextId` values match beat `id` values
- Ensure endings have `isEnding: true`

**Text too small/large:**
- Edit `#story-text` in `css/style.css`
- Change `font-size` (currently 20px)

## Validation Quick Check

```bash
# Run from project directory
python3 << 'EOF'
import re
with open('js/data/selkieStory.js', 'r') as f:
    content = f.read()
beat_ids = set(re.findall(r'^\s*(\w+):\s*{', content, re.MULTILINE))
next_ids = re.findall(r'nextId:\s*[\'"](\w+)[\'"]', content)
broken = [n for n in next_ids if n not in beat_ids]
endings = len(re.findall(r'endingTitle:', content))
print(f"Beats: {len(beat_ids)}, Endings: {endings}")
print("✅ Valid!" if not broken else f"❌ Broken links: {broken}")
EOF
```

## Current Story Stats

- **15 story beats** total
- **5 endings** (all reachable)
- **17 choices** (all valid links)
- **3-4 min** average playtime per path

## Week 1 Goals: ✅ COMPLETE

- ✅ One complete Selkie story
- ✅ 3-5 branching paths (we have 5!)
- ✅ 2-3 decision points (we have 3!)
- ✅ Simple button UI
- ✅ Age-appropriate tone
- ✅ Placeholder backgrounds

## Documentation

- **README.md** - User guide and features
- **ARCHITECTURE.md** - Technical deep dive
- **SESSION-NOTES.md** - Development log
- **QUICK-START.md** - This file!

---

**Made with Phaser 3 + ❤️ for Scottish Mythology**
