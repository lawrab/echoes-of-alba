/**
 * MenuScene - Title screen and start menu
 */
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Background
        this.add.image(960, 540, 'menu-bg').setDisplaySize(1920, 1080);

        // Title
        this.add.text(960, 300, 'Echoes of Alba', {
            fontSize: '84px',
            fill: '#e8e6e3',
            fontFamily: 'Georgia, serif',
            fontStyle: 'bold',
            stroke: '#2d5a6c',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(960, 420, 'The Seal Wife of Skye', {
            fontSize: '42px',
            fill: '#b8c6d1',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // Start button (Phaser-based, but styled to match HTML buttons)
        const startButton = this.add.text(960, 650, 'Begin Your Story', {
            fontSize: '36px',
            fill: '#e8e6e3',
            fontFamily: 'Georgia, serif',
            backgroundColor: '#2d5a6c',
            padding: { x: 40, y: 20 },
            stroke: '#4a7c8c',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Hover effects
        startButton.on('pointerover', () => {
            startButton.setStyle({
                backgroundColor: '#3d7a8c',
                stroke: '#6ac4dc'
            });
        });

        startButton.on('pointerout', () => {
            startButton.setStyle({
                backgroundColor: '#2d5a6c',
                stroke: '#4a7c8c'
            });
        });

        startButton.on('pointerdown', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('StoryScene');
            });
        });

        // Credits
        this.add.text(960, 950, 'A tale of Scottish mythology', {
            fontSize: '20px',
            fill: '#6a7c8c',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // Fade in
        this.cameras.main.fadeIn(500);
    }
}
