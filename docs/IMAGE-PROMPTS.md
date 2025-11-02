# Image Generation Prompts for Echoes of Alba

## Instructions for Using These Prompts

1. **Platform:** Google Gemini (or similar AI image generator)
2. **Aspect Ratio:** 16:9 landscape (1920x1080 or equivalent)
3. **Style Notes:**
   - Magical but not scary
   - Painterly/illustrative style (not photorealistic)
   - Suitable for children ages 7-10
   - Leave some visual "breathing room" for text overlay
4. **After Generation:**
   - Save images as JPG or PNG
   - Rename to exact filenames below
   - Save in `assets/images/` folder
   - Resize to 1920x1080 if needed

---

## 1. Beach at Day (beach-day.jpg)

**Filename:** `beach-day.jpg`

**Where Used:** Story opening, initial discovery

**Prompt:**
```
A magical Scottish beach on a bright, sunny morning in a painterly illustration style. The Isle of Skye coastline with gentle waves washing onto golden sand, scattered shells and sea glass glinting in the sunlight. Dramatic rocky outcrops frame the scene, with sea caves visible in the distance. The water is crystal clear turquoise fading to deep blue. Wispy clouds in a pale blue sky. Soft, warm lighting. The scene feels inviting and full of possibility, with a hint of magic in the air. Style: watercolor illustration meets Celtic art, suitable for children's fantasy book. No people or creatures. Leave the lower third relatively clear for text overlay. Aspect ratio 16:9.
```

**Mood:** Bright, inviting, beginning of an adventure

---

## 2. Cave Interior (cave-interior.jpg)

**Filename:** `cave-interior.jpg`

**Where Used:** Finding the seal skin, meeting Moira, key decision points

**Prompt:**
```
Interior of a mystical Scottish sea cave, illustrated in a magical realism style. Smooth rocks worn by centuries of tides, pools of crystal-clear water reflecting light from the cave opening. Shafts of soft golden-blue light streaming in from outside, creating dramatic but gentle lighting. The cave walls have subtle iridescent qualities, hints of mother-of-pearl and sea-green colors. Small tide pools with starfish and anemones. The atmosphere is mysterious but not frightening—magical and ancient rather than dark or scary. Suitable for children's fantasy illustration. No people or creatures. Leave space in the lower portion for text. Style: painterly digital illustration with Celtic mystical elements. Aspect ratio 16:9.
```

**Mood:** Mysterious, magical, safe but wondrous

---

## 3. Underwater Scene (underwater.jpg)

**Filename:** `underwater.jpg`

**Where Used:** Swimming with seals, visiting coral palace, underwater adventures

**Prompt:**
```
A magical underwater scene off the coast of Scotland, illustrated in a dreamy, fantastical style. Shafts of bright sunlight streaming down through clear blue-green water, creating god rays. Swaying forests of golden-green kelp, colorful fish swimming in schools, and in the distance, the suggestion of an elegant coral and pearl palace structure with Celtic architectural elements. The water has a ethereal, magical quality with floating particles of light like underwater stars. Smooth rocks covered in gentle corals and sea life. The scene is bright, welcoming, and full of wonder—not dark or scary. Perfect for a children's fantasy adventure. No people or creatures in focus (can have distant suggestions). Leave lower third clear for text overlay. Style: watercolor and digital painting hybrid with luminous, magical qualities. Aspect ratio 16:9.
```

**Mood:** Enchanting, luminous, wondrous

---

## 4. Scottish Village (village.jpg)

**Filename:** `village.jpg`

**Where Used:** Consulting the village elder, warning path

**Prompt:**
```
A charming Scottish coastal village on the Isle of Skye, illustrated in a storybook style. Traditional white-washed stone cottages with slate roofs, small windows with flower boxes. Narrow cobblestone paths winding between buildings. The village sits on a gentle hillside overlooking the sea in the distance. Warm, golden afternoon light creating soft shadows. Fishing nets, small boats, and traditional Scottish details like Celtic crosses or standing stones in the background. The atmosphere is cozy, safe, and timeless—a place where old stories are told. Soft, painterly illustration style suitable for children's literature. No people visible. Leave the lower portion relatively clear for text. Style: watercolor meets Celtic storybook illustration with warm, inviting tones. Aspect ratio 16:9.
```

**Mood:** Cozy, traditional, safe, timeless

---

## 5. Moonlit Shore (moonlit-shore.jpg)

**Filename:** `moonlit-shore.jpg`

**Where Used:** Meeting Moira, shared path conversations, emotional moments

**Prompt:**
```
A Scottish beach at night under a full moon, illustrated in a magical, dreamy style. The large silver moon reflects a shimmering path across calm, dark blue water. The sand is dark but touched with silver moonlight. Gentle waves lap at the shore, creating soft foam. Smooth rocks and tide pools reflect the moonlight. The sky is deep indigo fading to purple, with bright stars visible. The scene is peaceful and magical, not scary—the moonlight creates a sense of wonder and enchantment. In the distance, the silhouette of Scottish highlands. The overall feeling is of secrets shared and magic at work, but gentle and safe. Style: painterly digital illustration with luminous qualities, like a children's fantasy book. No people or creatures. Leave lower third clear for text. Aspect ratio 16:9.
```

**Mood:** Peaceful, magical, intimate, wonder-filled

---

## 6. Menu Background (menu-bg.jpg)

**Filename:** `menu-bg.jpg`

**Where Used:** Title screen, main menu

**Prompt:**
```
An atmospheric establishing shot of the Isle of Skye's mystical coastline at dusk, illustrated in a cinematic storybook style. Dramatic rocky cliffs meeting the sea, with waves gently rolling in. The sky transitions from deep blue to purple to hints of gold at the horizon. Ancient Celtic standing stones silhouetted in the mid-ground. Seals can be seen as distant shapes on rocks in the water. The entire scene has a magical, legendary quality—like the opening of an ancient Scottish tale. Mysterious but inviting, with a sense that magic and adventure await. The scene should be atmospheric enough to work as a title screen background, with enough visual interest but not too busy. Style: painterly digital illustration with cinematic composition, inspired by Celtic mythology and Scottish landscapes. Suitable for children's fantasy adventure. Leave the upper-middle area clear enough for title text overlay. Aspect ratio 16:9.
```

**Mood:** Mysterious, legendary, atmospheric, inviting adventure

---

## Alternative Prompt Variations

If the initial prompts don't quite match your vision, try these modifiers:

### For Lighter, More Whimsical Style:
Add: "...in the style of a Pixar concept art, with softer edges and more saturated colors, emphasizing wonder and magic."

### For More Traditional Storybook Feel:
Add: "...in the style of classic children's book illustrations like Arthur Rackham meets modern digital painting, with detailed line work and rich colors."

### For More Celtic/Scottish Emphasis:
Add: "...incorporating traditional Celtic art patterns subtly in the rocks, water, and sky. Include subtle references to Scottish mythology without overwhelming the scene."

### To Reduce Detail (Better for Text Overlay):
Add: "...with a slightly softer focus and more atmospheric depth, ensuring the central areas are less detailed to allow text to be easily readable."

---

## Image Size Recommendations

**Ideal:** 1920x1080 pixels (16:9 ratio)

**Acceptable alternatives:**
- 3840x2160 (4K 16:9 - downscale to 1920x1080)
- 2560x1440 (16:9 - downscale to 1920x1080)
- Any 16:9 ratio that can be scaled down

**File Format:**
- JPG (recommended for final use - smaller file size)
- PNG (if you need transparency, though these backgrounds don't)

**Recommended File Size:** 200-500KB per image (good quality, fast loading)

---

## Testing Your Generated Images

After generating and saving images:

1. **Quick Visual Check:**
   ```bash
   # View all images in folder
   ls -lh assets/images/
   ```

2. **Test in Game:**
   - Edit `js/scenes/BootScene.js` (see QUICK-START.md)
   - Replace placeholder function with image loading
   - Refresh browser and test each scene

3. **Text Readability Check:**
   - Play through the game
   - Ensure story text is readable over each background
   - If text is hard to read, you may need to:
     - Adjust CSS `#story-text-container` opacity
     - Choose a slightly darker/lighter background variant
     - Add more blur to the backdrop-filter

---

## Prompt Template (For Future Stories)

```
A [location/setting] in [time of day/lighting], illustrated in a [art style].

[Main visual elements and composition details].

[Lighting and atmosphere description].

The scene feels [emotional tone] and [mood], suitable for a children's fantasy adventure for ages 7-10.

[Specific style notes]. No people or creatures [unless specified].

Leave the lower third relatively clear for text overlay.

Aspect ratio 16:9.
```

---

## Color Palette Reference

To maintain visual consistency across all images:

**Primary Palette:**
- Ocean Blues: #006994, #4a7c8c, #87ceeb
- Sandy Golds: #d4a76a, #f4e4c1
- Stone Grays: #2f4f4f, #6a7c8c, #b8c6d1
- Magical Accents: Subtle iridescent purples, silver moonlight, golden sunbeams

**Mood Colors:**
- **Day scenes:** Warm golds, bright blues, inviting greens
- **Night scenes:** Deep blues, purples, silver highlights
- **Underwater:** Turquoise, emerald, luminous particles
- **Village:** Warm earth tones, cozy oranges, soft whites

---

## Troubleshooting Common Issues

**"The AI generated people/creatures in the scene"**
- Regenerate and emphasize "No people, no creatures, landscape only"
- Or: "Empty beach/cave/village, no characters visible"

**"The scene is too dark/scary"**
- Add: "bright, welcoming lighting suitable for children"
- Specify: "magical but not frightening, wonder not fear"

**"Too much detail, text isn't readable"**
- Add: "with atmospheric depth and softer focus in areas"
- Request: "leave negative space for UI elements"

**"Doesn't look Scottish/Celtic enough"**
- Add specific landmarks: "Isle of Skye," "Scottish Highlands visible"
- Include: "Celtic standing stones," "traditional Scottish architecture"

**"Style is too photorealistic"**
- Emphasize: "painterly," "illustrated," "storybook style"
- Reference: "watercolor illustration," "digital painting"

---

## Batch Generation Tips

If your AI tool supports batch generation:

1. **Generate all 6 images in one session** for style consistency
2. **Use the same base style description** across all prompts
3. **Adjust only lighting/setting** between prompts
4. **Keep color palette consistent** (reference the palette above)

---

## After Image Integration

Once images are in the game:

1. Test all 5 story paths
2. Check text readability on each background
3. Verify scene atmosphere matches story beats
4. Consider adjusting CSS if needed:
   - `background: rgba(10, 14, 26, 0.85)` in `#story-text-container`
   - Increase opacity if text is hard to read

---

**Generated:** 2025-11-01
**For:** Echoes of Alba - The Seal Wife of Skye
**Target Resolution:** 1920x1080 (16:9)
**Total Images Needed:** 6

Good luck with image generation! 🎨✨
