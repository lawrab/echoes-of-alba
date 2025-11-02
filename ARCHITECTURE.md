# Echoes of Alba - Architecture Documentation

## Project Overview
Interactive branching story game featuring Scottish mythology for ages 7-10.

**Tech Stack:**
- Phaser 3.80.1 (2D game engine)
- Vanilla JavaScript
- HTML5/CSS3
- Single-page web app

## Current Status: Week 1 Complete ✓
- ✓ One complete Selkie legend ("The Seal Wife of Skye")
- ✓ 5 distinct story endings through branching paths
- ✓ 2-3 decision points per playthrough
- ✓ Hybrid UI (Phaser backgrounds + HTML text/buttons)
- ✓ Debug tools for testing
- ✓ Placeholder backgrounds (ready for real images)

## File Structure

```
echoes-of-alba/
├── index.html                 # Main HTML entry point
├── css/
│   └── style.css             # Styling for HTML overlay UI
├── js/
│   ├── main.js               # Phaser game configuration
│   ├── scenes/               # Phaser scene classes
│   │   ├── BootScene.js      # Asset loading & initialization
│   │   ├── MenuScene.js      # Title screen & start menu
│   │   ├── StoryScene.js     # Main narrative engine (hybrid UI)
│   │   └── EndingScene.js    # Ending display & replay
│   ├── data/
│   │   └── selkieStory.js    # Complete story data structure
│   └── utils/
│       └── StoryManager.js   # State machine for story navigation
├── assets/
│   └── images/               # Background images (currently placeholders)
├── ARCHITECTURE.md           # This file
└── README.md                 # User-facing documentation
```

## Architecture Decisions

### 1. Hybrid Text Rendering
**Decision:** Phaser for backgrounds/visuals, HTML overlay for text/UI

**Rationale:**
- Phaser Text objects are limited in typography
- HTML/CSS provides better readability and formatting
- Easy to style and maintain
- Better accessibility (screen readers can access HTML)

**Implementation:**
- Phaser canvas renders backgrounds
- `#ui-overlay` div positioned absolutely over canvas
- Story text in `#story-text-container`
- Choice buttons dynamically created in `#choice-buttons-container`

### 2. Single StoryScene vs Multiple Scenes
**Decision:** One `StoryScene` handles all narrative content

**Rationale:**
- Simpler state management
- Avoids complex scene transition logic
- All story data centralized
- Easier to track player choices across branches

**Alternative considered:** One scene per story beat
- Rejected: Too many scenes (20+ beats), harder to maintain state

### 3. Data-Driven Story Structure
**Decision:** Story content in JSON-like data structure (`selkieStory.js`)

**Format:**
```javascript
{
  beatId: {
    id: 'unique_id',
    background: 'image-key',
    text: 'Story text here...',
    choices: [
      { text: 'Choice 1', nextId: 'next_beat_id' },
      { text: 'Choice 2', nextId: 'other_beat_id' }
    ],
    isEnding: false,
    endingTitle: 'Title for endings'
  }
}
```

**Benefits:**
- Easy to add new stories without changing code
- Non-programmers could edit story content
- Validation can check for broken links
- Could load from external JSON files in future

### 4. StoryManager State Machine
**Decision:** Separate utility class handles navigation logic

**Responsibilities:**
- Track current story beat
- Store choice history
- Validate story data structure
- Notify listeners of state changes
- Provide debug navigation

**Why separate class:**
- Keeps StoryScene focused on rendering
- Could be reused for other stories
- Easier to test logic in isolation

## Story Flow: "The Seal Wife of Skye"

```
START: Beach Discovery
│
├─ CHOICE 1: What to do with seal skin?
│  │
│  ├─ Hide & Wait ────────┐
│  │  └─ CHOICE 2A        │
│  │     ├─ Return → END 1│
│  │     └─ Hear story ───┼─┐
│  │                       │ │
│  ├─ Try it on ──────────┤ │
│  │  └─ CHOICE 2B         │ │
│  │     ├─ Go deep → END 2│ │
│  │     └─ Return ────────┼─┤
│  │                       │ │
│  └─ Tell village ────────┤ │
│     └─ CHOICE 2C         │ │
│        ├─ Stay away → END 3
│        └─ Investigate ───┼─┘
│                          │
│                          ▼
│                 SHARED PATH A: Meet Moira
│                          │
│                    CHOICE 3
│                    ├─ Protect → END 4
│                    └─ Visit → END 5
```

**5 Endings:**
1. The Grateful Gift (immediate return → pearl gift)
2. Underwater Wonders (explore coral palace)
3. The Cautious Path (avoid magic, stay safe)
4. The Guardian (become protector of Selkies)
5. Between Two Worlds (calling shell for future adventures)

## Debug Tools

When `DEBUG_MODE = true` (in `main.js`):

**Features:**
- Current beat ID display
- Jump to any beat (dropdown menu)
- Story structure validation
- Reset story button

**Debug Panel Location:** Top-right corner of screen

**Validation checks:**
- All `nextId` references exist
- Endings don't have choices
- Non-endings have at least one choice
- Required fields present

## How to Add New Stories

1. **Create story data file** in `js/data/` (e.g., `kelpieStory.js`)
2. **Follow the structure:**
   ```javascript
   const KELPIE_STORY = {
     start: { id: 'start', background: '...', text: '...', choices: [...] },
     // ... more beats
   };
   ```
3. **Update StoryScene** to accept story data as parameter
4. **Add scene transition** from MenuScene with story selection

## How to Replace Placeholder Backgrounds

1. **Create images** at 1920x1080 resolution (or similar aspect ratio)
2. **Save as JPG/PNG** in `assets/images/`
3. **Update BootScene.js:**
   - Replace `createPlaceholderImages()` with real `this.load.image()` calls
   - Example:
     ```javascript
     this.load.image('beach-day', 'assets/images/beach-day.jpg');
     ```
4. **Image keys used in story:**
   - `beach-day` - Bright daytime beach
   - `cave-interior` - Dark cave with rocks
   - `underwater` - Blue underwater scene
   - `village` - Scottish village setting
   - `moonlit-shore` - Beach at night
   - `menu-bg` - Title screen background

## Known Limitations & Future Considerations

### Text Overflow
- **Current:** CSS word-wrap and fixed max-width
- **Issue:** Very long text might overflow container
- **Solution:** Add scroll or split into multiple beats

### Mobile Responsiveness
- **Current:** Fixed 1920x1080 with FIT scale mode
- **Issue:** Text might be small on phones
- **Solution:** Could add breakpoints for mobile-specific layouts

### Save/Load System
- **Not implemented** in Week 1
- **Future:** Use LocalStorage to serialize gameState
- **Architecture supports it:** Just need to save/restore StoryManager state

### Multiple Stories
- **Current:** Hardcoded to Selkie story
- **Future:** Menu could offer story selection
- **Implementation:** Pass story data to StoryScene.init()

### Audio
- **Not implemented** in Week 1
- **Future:** Ambient sounds per background, UI sound effects
- **Phaser has built-in audio:** Easy to add with WebAudio API

## Testing Checklist

- [ ] All 5 endings reachable
- [ ] No broken story beat links
- [ ] Text readable and formatted correctly
- [ ] Choice buttons respond to hover
- [ ] Transitions smooth between beats
- [ ] Play Again returns to menu
- [ ] Debug tools work (if enabled)
- [ ] Works in Chrome, Firefox, Safari
- [ ] Placeholder backgrounds load
- [ ] Can swap in real images

## Performance Notes

- Phaser Scale.FIT handles different screen sizes
- Canvas backgrounds are destroyed/recreated per beat (no memory leak)
- HTML overlays use CSS transitions (GPU-accelerated)
- Story data is small (~20KB) - loads instantly
- No external API calls - works offline

## Code Style Notes

- ES6 class syntax for scenes
- Camelcase for variables/functions
- Capitalized for class names
- Comments explain "why" not "what"
- Scene lifecycle: init() → preload() → create() → update()

---

**Last Updated:** 2025-11-01
**Version:** 1.0 (Week 1 Complete)
