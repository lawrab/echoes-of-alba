/**
 * BootScene - Loads assets and initializes game
 */
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Display loading text
        const loadingText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'Loading Echoes of Alba...',
            {
                fontSize: '32px',
                fill: '#e8e6e3',
                fontFamily: 'Georgia, serif'
            }
        ).setOrigin(0.5);

        // Load background images
        this.load.image('beach-day', 'images/beach-day.jpg');
        this.load.image('cave-interior', 'images/cave-interior.jpg');
        this.load.image('underwater', 'images/underwater.jpg');
        this.load.image('village', 'images/village.jpg');
        this.load.image('moonlit-shore', 'images/moonlit-shore.jpg');
        this.load.image('menu-bg', 'images/menu-bg.jpg');

        // Load narration audio files
        // Note: Some narrations may not be generated yet, that's okay
        const narrations = [
            'start',
            'path_hide',
            'choice_reveal_immediately',
            'choice_watch_longer',
            'path_transform',
            'path_deep_swim',
            'path_return_shore',
            'path_warning',
            'path_return_investigate',
            'shared_path_moira',
            'ending_grateful_gift',
            'ending_underwater_wonders',
            'ending_cautious_path',
            'ending_guardian',
            'ending_between_worlds'
        ];

        narrations.forEach(key => {
            this.load.audio(key, `audio/narration/${key}.mp3`);
        });

        // Progress bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x1a3a47, 0.8);
        progressBox.fillRect(this.cameras.main.centerX - 320, this.cameras.main.centerY + 50, 640, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x4a7c8c, 1);
            progressBar.fillRect(this.cameras.main.centerX - 310, this.cameras.main.centerY + 60, 620 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Handle missing audio files gracefully
        this.load.on('loaderror', (file) => {
            console.warn(`Failed to load: ${file.key} - This narration may not be generated yet`);
        });
    }

    create() {
        // Initialize game registry for global data
        this.registry.set('debug', window.DEBUG_MODE || false);

        // Transition to menu
        this.scene.start('MenuScene');
    }
}
