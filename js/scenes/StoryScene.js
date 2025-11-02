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

        // Add new background
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

    updateDebugInfo() {
        const beatIdElement = document.getElementById('debug-beat-id');
        if (beatIdElement) {
            beatIdElement.textContent = this.storyManager.currentBeatId;
        }
    }
}
