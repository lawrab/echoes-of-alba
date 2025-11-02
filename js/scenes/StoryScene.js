/**
 * StoryScene - Main narrative engine
 * Uses hybrid approach: Phaser for backgrounds, HTML for text/choices
 */
class StoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StoryScene' });
        this.storyManager = null;
        this.currentBackground = null;
        this.currentNarration = null;
        this.narrationVolume = 1.5; // Default volume at 150%
        this.controlsHideTimer = null;
        this.atmosphereEffects = [];
    }

    create() {
        // Initialize story manager
        this.storyManager = new StoryManager(SELKIE_STORY);

        // Subscribe to story changes
        this.storyManager.onChange((beat) => {
            this.displayBeat(beat);
        });

        // Get HTML overlay elements
        this.storyTextContainer = document.getElementById('story-text-container');
        this.storyTextElement = document.getElementById('story-text');
        this.choiceButtonsContainer = document.getElementById('choice-buttons-container');
        this.debugPanel = document.getElementById('debug-panel');
        this.volumeSlider = document.getElementById('narration-volume');
        this.audioControls = document.getElementById('audio-controls');
        
        // Get audio control buttons
        this.replayButton = document.getElementById('replay-audio');
        this.playPauseButton = document.getElementById('play-pause-audio');
        this.skipButton = document.getElementById('skip-audio');

        // Set up audio controls
        this.setupVolumeControl();
        this.setupAudioControls();

        // Set up debug keyboard shortcut (Shift+D)
        const shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        const dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.input.keyboard.on('keydown-D', (event) => {
            if (shiftKey.isDown) {
                event.preventDefault();
                this.toggleDebug();
            }
        });

        // Set up debug tools if enabled
        if (this.registry.get('debug')) {
            this.setupDebugTools();
        }

        // Display the first beat
        this.displayBeat(this.storyManager.getCurrentBeat());

        // Fade in
        this.cameras.main.fadeIn(500);
    }

    setupVolumeControl() {
        if (!this.volumeSlider) return;

        // Update volume when slider changes
        this.volumeSlider.addEventListener('input', (e) => {
            this.narrationVolume = parseFloat(e.target.value);
            
            // Update currently playing narration
            if (this.currentNarration && this.currentNarration.isPlaying) {
                this.currentNarration.setVolume(this.narrationVolume);
            }
            
            console.log('Volume changed to:', this.narrationVolume);
        });
    }

    setupAudioControls() {
        // Replay button
        if (this.replayButton) {
            this.replayButton.addEventListener('click', () => {
                if (this.currentNarration) {
                    this.currentNarration.stop();
                    this.currentNarration.play();
                    this.updatePlayPauseButton(false); // Show pause icon
                    this.showAudioControls();
                }
            });
        }

        // Play/Pause button
        if (this.playPauseButton) {
            this.playPauseButton.addEventListener('click', () => {
                if (this.currentNarration) {
                    if (this.currentNarration.isPlaying) {
                        this.currentNarration.pause();
                        this.updatePlayPauseButton(true); // Show play icon
                    } else {
                        this.currentNarration.resume();
                        this.updatePlayPauseButton(false); // Show pause icon
                    }
                    this.showAudioControls();
                }
            });
        }

        // Skip button
        if (this.skipButton) {
            this.skipButton.addEventListener('click', () => {
                if (this.currentNarration && this.currentNarration.isPlaying) {
                    this.currentNarration.stop();
                    this.updatePlayPauseButton(true); // Show play icon (disabled state)
                    this.showAudioControls();
                }
            });
        }

        // Update button states initially
        this.updateAudioButtonStates();
    }

    updatePlayPauseButton(isPaused) {
        if (!this.playPauseButton) return;
        
        if (isPaused) {
            this.playPauseButton.textContent = '▶';
            this.playPauseButton.title = 'Play narration';
        } else {
            this.playPauseButton.textContent = '⏸';
            this.playPauseButton.title = 'Pause narration';
        }
    }

    updateAudioButtonStates() {
        const hasNarration = this.currentNarration && this.currentNarration.isPlaying;
        
        if (this.replayButton) {
            this.replayButton.disabled = !hasNarration;
        }
        if (this.playPauseButton) {
            this.playPauseButton.disabled = !this.currentNarration;
        }
        if (this.skipButton) {
            this.skipButton.disabled = !hasNarration;
        }
    }

    showAudioControls() {
        if (!this.audioControls) return;
        
        // Show controls
        this.audioControls.classList.add('show');
        
        // Clear existing timer
        if (this.controlsHideTimer) {
            clearTimeout(this.controlsHideTimer);
        }
        
        // Hide after 3 seconds
        this.controlsHideTimer = setTimeout(() => {
            this.audioControls.classList.remove('show');
        }, 3000);
    }

    displayBeat(beat) {
        if (!beat) {
            console.error('No beat to display');
            return;
        }

        // Stop any currently playing narration
        if (this.currentNarration) {
            this.currentNarration.stop();
            this.currentNarration = null;
        }

        // Update background
        this.updateBackground(beat.background);

        // Display story text
        this.displayText(beat.text);

        // Play narration audio if available
        this.playNarration(beat.id);

        // Handle choices vs ending
        if (beat.isEnding) {
            // For ending scenes, show a continue button after narration finishes
            this.showEndingContinue(beat);
        } else {
            this.displayChoices(beat.choices);
        }

        // Update debug panel if active
        if (this.registry.get('debug')) {
            this.updateDebugInfo();
        }
    }

    showEndingContinue(beat) {
        // Clear any existing choices
        this.choiceButtonsContainer.innerHTML = '';
        this.choiceButtonsContainer.classList.remove('hidden');

        // Create a continue button
        const continueButton = document.createElement('button');
        continueButton.className = 'choice-button ending-continue';
        continueButton.textContent = 'Continue to Ending';
        continueButton.style.opacity = '0';
        continueButton.disabled = true;

        continueButton.onclick = () => {
            this.transitionToEnding(beat);
        };

        this.choiceButtonsContainer.appendChild(continueButton);

        // If there's narration, show button after it completes
        // Otherwise show it after a short delay
        if (this.currentNarration) {
            this.currentNarration.once('complete', () => {
                this.enableContinueButton(continueButton);
            });
        } else {
            this.time.delayedCall(1000, () => {
                this.enableContinueButton(continueButton);
            });
        }
    }

    enableContinueButton(button) {
        button.disabled = false;
        button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
    }

    transitionToEnding(beat) {
        // Fade out and transition to ending scene
        this.cameras.main.fadeOut(500);
        this.time.delayedCall(500, () => {
            this.hideUI();
            // Stop narration when transitioning to ending scene
            if (this.currentNarration) {
                this.currentNarration.stop();
            }
            this.scene.start('EndingScene', {
                endingTitle: beat.endingTitle,
                endingText: beat.text
            });
        });
    }

    playNarration(beatId) {
        // Check if audio exists for this beat
        if (this.cache.audio.exists(beatId)) {
            this.currentNarration = this.sound.add(beatId, {
                volume: this.narrationVolume
            });
            
            // Listen for when narration ends
            this.currentNarration.once('complete', () => {
                this.updatePlayPauseButton(true);
                this.updateAudioButtonStates();
            });
            
            this.currentNarration.play();
            this.updatePlayPauseButton(false);
            this.updateAudioButtonStates();
            
            // Briefly show audio controls when narration starts
            this.showAudioControls();
            
            console.log(`Playing narration: ${beatId} at volume ${this.narrationVolume}`);
        } else {
            console.warn(`Narration audio not found for beat: ${beatId}`);
            this.updateAudioButtonStates();
        }
    }

    updateBackground(backgroundKey) {
        // Remove old background if it exists
        if (this.currentBackground) {
            this.currentBackground.destroy();
        }

        // Clear old atmosphere effects
        this.clearAtmosphere();

        // Add new background at normal size (for smoother movement)
        this.currentBackground = this.add.image(960, 540, backgroundKey)
            .setDisplaySize(1920, 1080)
            .setDepth(-1);

        // Fade in effect
        this.currentBackground.setAlpha(0);
        this.tweens.add({
            targets: this.currentBackground,
            alpha: 1,
            duration: 800,
            ease: 'Power2'
        });

        // Add subtle Ken Burns effect (slow zoom and pan)
        this.addCameraMovement(backgroundKey);

        // Add atmospheric effects based on scene
        this.addAtmosphere(backgroundKey);
    }

    clearAtmosphere() {
        // Destroy all existing atmosphere effects
        this.atmosphereEffects.forEach(effect => {
            if (effect.destroy) effect.destroy();
        });
        this.atmosphereEffects = [];
    }

    addCameraMovement(backgroundKey) {
        // Smoother, simpler movement - just scale, no complex calculations
        const movements = {
            'beach-day': { scaleStart: 1.0, scaleEnd: 1.03, panX: 10, panY: -5, duration: 40000 },
            'cave-interior': { scaleStart: 1.0, scaleEnd: 1.02, panX: -8, panY: 3, duration: 45000 },
            'underwater': { scaleStart: 1.0, scaleEnd: 1.025, panX: 5, panY: 8, duration: 42000 },
            'village': { scaleStart: 1.0, scaleEnd: 1.03, panX: -10, panY: -3, duration: 43000 },
            'moonlit-shore': { scaleStart: 1.0, scaleEnd: 1.03, panX: 8, panY: -8, duration: 48000 },
            'menu-bg': { scaleStart: 1.0, scaleEnd: 1.02, panX: -5, panY: 5, duration: 50000 }
        };

        const movement = movements[backgroundKey] || { scaleStart: 1.0, scaleEnd: 1.02, panX: 0, panY: 0, duration: 45000 };
        
        // Very slow, smooth zoom and pan
        this.tweens.add({
            targets: this.currentBackground,
            scaleX: movement.scaleEnd,
            scaleY: movement.scaleEnd,
            x: 960 + movement.panX,
            y: 540 + movement.panY,
            duration: movement.duration,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }

    addAtmosphere(backgroundKey) {
        console.log('Adding atmosphere for:', backgroundKey);
        
        switch(backgroundKey) {
            case 'beach-day':
                this.addSunStreaks();
                this.addFloatingParticles('#ffffff', 0.3, 3);
                break;
            
            case 'cave-interior':
                this.addMistEffect();
                this.addFloatingParticles('#4a7c8c', 0.2, 5);
                break;
            
            case 'underwater':
                this.addBubbles();
                this.addUnderwaterRays();
                this.addFloatingParticles('#87CEEB', 0.4, 8);
                break;
            
            case 'village':
                this.addLightFog();
                this.addFloatingParticles('#d4a76a', 0.2, 2);
                break;
            
            case 'moonlit-shore':
                this.addMoonbeams();
                this.addFloatingParticles('#b8c6d1', 0.25, 4);
                break;
            
            case 'menu-bg':
                this.addMistEffect();
                break;
        }
        
        console.log('Atmosphere effects added:', this.atmosphereEffects.length);
    }

    addSunStreaks() {
        // Create balanced sun ray effects with more dynamic animation
        for (let i = 0; i < 7; i++) {
            const x = 150 + (i * 300);
            const ray = this.add.rectangle(x, -300, 220, 1700, 0xffd700, 0.15)
                .setRotation(-0.3)
                .setDepth(0)
                .setBlendMode(Phaser.BlendModes.ADD);
            
            // Much more dramatic pulsing
            this.tweens.add({
                targets: ray,
                alpha: { from: 0.08, to: 0.35 },
                y: { from: -300, to: -250 },
                duration: 2000 + (i * 300),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            this.atmosphereEffects.push(ray);
        }
    }

    addMoonbeams() {
        // Moonlight streaks with dramatic pulsing
        for (let i = 0; i < 4; i++) {
            const x = 350 + (i * 450);
            const beam = this.add.rectangle(x, -100, 250, 1500, 0xc8d6e1, 0.12)
                .setRotation(-0.2)
                .setDepth(0)
                .setBlendMode(Phaser.BlendModes.ADD);
            
            // Dramatic pulsing animation
            this.tweens.add({
                targets: beam,
                alpha: { from: 0.05, to: 0.3 },
                y: { from: -100, to: -50 },
                duration: 2800 + (i * 400),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            this.atmosphereEffects.push(beam);
        }
    }

    addUnderwaterRays() {
        // Dramatic underwater god rays with lots of movement
        for (let i = 0; i < 8; i++) {
            const x = 80 + (i * 260);
            const ray = this.add.rectangle(x, -200, 150, 1400, 0x87CEEB, 0.15)
                .setRotation(0.15 - (i * 0.04))
                .setDepth(0)
                .setBlendMode(Phaser.BlendModes.ADD);
            
            // Much more dramatic sway and pulse
            this.tweens.add({
                targets: ray,
                alpha: { from: 0.08, to: 0.38 },
                x: x + (i % 2 === 0 ? 60 : -60),
                rotation: ray.rotation + (i % 2 === 0 ? 0.1 : -0.1),
                duration: 2500 + (i * 250),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            this.atmosphereEffects.push(ray);
        }
    }

    addMistEffect() {
        // Dramatic drifting fog/mist
        for (let i = 0; i < 6; i++) {
            const startX = Math.random() * 1920;
            const mist = this.add.ellipse(
                startX,
                750 + (Math.random() * 250),
                500 + (Math.random() * 400),
                180,
                0x6a7c8c,
                0.25
            ).setDepth(1);
            
            // Much more dramatic drifting and fading
            this.tweens.add({
                targets: mist,
                x: startX + 400,
                alpha: { from: 0.08, to: 0.35 },
                scaleX: { from: 1, to: 1.3 },
                duration: 10000 + (Math.random() * 3000),
                repeat: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
            
            this.atmosphereEffects.push(mist);
        }
    }

    addLightFog() {
        // Dramatic atmospheric fog for village
        for (let i = 0; i < 5; i++) {
            const startX = Math.random() * 1920;
            const fog = this.add.ellipse(
                startX,
                550 + (Math.random() * 350),
                550 + (Math.random() * 250),
                140,
                0xd4a76a,
                0.18
            ).setDepth(1);
            
            // More noticeable drifting and pulsing
            this.tweens.add({
                targets: fog,
                x: startX + 350,
                alpha: { from: 0.05, to: 0.28 },
                scaleX: { from: 1, to: 1.25 },
                duration: 9000 + (Math.random() * 2500),
                repeat: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
            
            this.atmosphereEffects.push(fog);
        }
    }

    addBubbles() {
        // Dramatic bubbles with varied speeds
        for (let i = 0; i < 25; i++) {
            const x = Math.random() * 1920;
            const startY = 1080 + Math.random() * 200;
            const size = 4 + Math.random() * 6;
            const bubble = this.add.circle(x, startY, size, 0x87CEEB, 0.7)
                .setDepth(2)
                .setBlendMode(Phaser.BlendModes.ADD);
            
            // More dynamic rising with wobble
            this.tweens.add({
                targets: bubble,
                y: -80,
                x: x + Math.sin(i) * 120,
                alpha: { from: 0.7, to: 0 },
                scale: { from: 0.4, to: 1.8 },
                duration: 4000 + Math.random() * 2000,
                delay: Math.random() * 3000,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            this.atmosphereEffects.push(bubble);
        }
    }

    addFloatingParticles(color, alpha, count) {
        // Floating particles with more dramatic animation
        const hexColor = typeof color === 'string' ? parseInt(color.replace('#', '0x')) : color;
        
        for (let i = 0; i < count * 8; i++) {
            const x = Math.random() * 1920;
            const y = Math.random() * 1080;
            const size = 4 + Math.random() * 6;
            const particle = this.add.circle(x, y, size, hexColor, alpha * 0.6)
                .setDepth(2)
                .setBlendMode(Phaser.BlendModes.ADD);
            
            // Much more active movement and pulsing
            this.tweens.add({
                targets: particle,
                x: x + (Math.random() * 200 - 100),
                y: y + (Math.random() * 200 - 100),
                alpha: { from: alpha * 0.6, to: alpha * 0.1 },
                scale: { from: 0.5, to: 2.0 },
                duration: 4000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            this.atmosphereEffects.push(particle);
        }
    }

    displayText(text) {
        // Show container
        this.storyTextContainer.classList.remove('hidden');

        // Animate text reveal
        this.storyTextElement.style.opacity = '0';
        this.storyTextElement.innerHTML = text;

        // Fade in
        setTimeout(() => {
            this.storyTextElement.style.transition = 'opacity 0.8s ease';
            this.storyTextElement.style.opacity = '1';
        }, 200);
    }

    displayChoices(choices) {
        // Clear old choices
        this.choiceButtonsContainer.innerHTML = '';

        if (!choices || choices.length === 0) {
            this.choiceButtonsContainer.classList.add('hidden');
            return;
        }

        // Show container
        this.choiceButtonsContainer.classList.remove('hidden');

        // Create choice buttons
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';

            button.onclick = () => {
                this.makeChoice(index);
            };

            this.choiceButtonsContainer.appendChild(button);

            // Stagger animation
            setTimeout(() => {
                button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    }

    makeChoice(choiceIndex) {
        // Disable buttons during transition
        const buttons = this.choiceButtonsContainer.querySelectorAll('.choice-button');
        buttons.forEach(btn => btn.disabled = true);

        // Fade out UI
        this.storyTextContainer.style.transition = 'opacity 0.4s ease';
        this.storyTextContainer.style.opacity = '0';
        this.choiceButtonsContainer.style.transition = 'opacity 0.4s ease';
        this.choiceButtonsContainer.style.opacity = '0';

        // Navigate to next beat
        this.time.delayedCall(400, () => {
            this.storyManager.makeChoice(choiceIndex);

            // Reset opacity for next beat
            this.storyTextContainer.style.opacity = '1';
            this.choiceButtonsContainer.style.opacity = '1';
        });
    }

    hideUI() {
        this.storyTextContainer.classList.add('hidden');
        this.choiceButtonsContainer.classList.add('hidden');
        if (this.debugPanel) {
            this.debugPanel.classList.add('hidden');
        }
    }

    setupDebugTools() {
        this.debugPanel.classList.remove('hidden');
        this.debugPanel.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold; color: #ff0;">DEBUG MODE</div>
            <div>Current Beat: <span id="debug-beat-id"></span></div>
            <div style="margin-top: 10px;">
                <label>Jump to Beat:</label>
                <select id="debug-beat-select">
                    ${this.storyManager.getAllBeatIds().map(id =>
                        `<option value="${id}">${id}</option>`
                    ).join('')}
                </select>
                <button id="debug-jump-btn">Jump</button>
            </div>
            <div style="margin-top: 10px;">
                <button id="debug-validate-btn">Validate Story</button>
                <button id="debug-reset-btn">Reset Story</button>
            </div>
            <div id="debug-validation-results" style="margin-top: 10px; font-size: 11px;"></div>
        `;

        // Wire up debug buttons
        document.getElementById('debug-jump-btn').onclick = () => {
            const beatId = document.getElementById('debug-beat-select').value;
            this.storyManager.navigateTo(beatId);
        };

        document.getElementById('debug-validate-btn').onclick = () => {
            const results = this.storyManager.validateStory();
            const resultsDiv = document.getElementById('debug-validation-results');

            if (results.valid) {
                resultsDiv.innerHTML = '<div style="color: #0f0;">✓ Story structure valid!</div>';
            } else {
                resultsDiv.innerHTML = `
                    <div style="color: #f00;">✗ ${results.errors.length} errors:</div>
                    ${results.errors.map(e => `<div style="color: #f00;">• ${e}</div>`).join('')}
                    ${results.warnings.length > 0 ? `
                        <div style="color: #ff0; margin-top: 5px;">⚠ ${results.warnings.length} warnings:</div>
                        ${results.warnings.map(w => `<div style="color: #ff0;">• ${w}</div>`).join('')}
                    ` : ''}
                `;
            }
        };

        document.getElementById('debug-reset-btn').onclick = () => {
            this.storyManager.reset();
        };
    }

    toggleDebug() {
        const currentDebugState = this.registry.get('debug');
        const newDebugState = !currentDebugState;

        this.registry.set('debug', newDebugState);

        if (newDebugState) {
            // Enable debug mode
            this.setupDebugTools();
            console.log('Debug mode enabled (Shift+D to toggle)');
        } else {
            // Disable debug mode
            this.debugPanel.classList.add('hidden');
            this.debugPanel.innerHTML = '';
            console.log('Debug mode disabled (Shift+D to toggle)');
        }
    }

    updateDebugInfo() {
        const beatIdElement = document.getElementById('debug-beat-id');
        if (beatIdElement) {
            beatIdElement.textContent = this.storyManager.currentBeatId;
        }
    }
}
