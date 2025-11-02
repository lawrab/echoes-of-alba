/**
 * EndingScene - Displays story ending and play again option
 */
class EndingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndingScene' });
    }

    init(data) {
        this.endingTitle = data.endingTitle || 'The End';
        this.endingText = data.endingText || 'Thank you for playing!';
    }

    create() {
        // Dark overlay background
        this.add.rectangle(960, 540, 1920, 1080, 0x0a0e1a, 0.95);

        // Decorative border with Celtic-style corners
        const border = this.add.graphics();
        border.lineStyle(4, 0x4a7c8c);
        border.strokeRoundedRect(150, 180, 1620, 720, 16);

        // Inner glow border
        border.lineStyle(2, 0x6ac4dc, 0.3);
        border.strokeRoundedRect(160, 190, 1600, 700, 14);

        // Ending title
        this.add.text(960, 380, this.endingTitle, {
            fontSize: '56px',
            fill: '#e8e6e3',
            fontFamily: 'Georgia, serif',
            fontStyle: 'bold',
            stroke: '#2d5a6c',
            strokeThickness: 3,
            wordWrap: { width: 1400 },
            align: 'center'
        }).setOrigin(0.5);

        // Subtitle / completion message
        this.add.text(960, 490, 'Your story has reached its conclusion', {
            fontSize: '26px',
            fill: '#b8c6d1',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            align: 'center'
        }).setOrigin(0.5);

        // Decorative wave separator
        const wave = this.add.graphics();
        wave.lineStyle(2, 0x4a7c8c, 0.5);
        const waveY = 560;
        const waveWidth = 400;
        wave.beginPath();
        wave.moveTo(960 - waveWidth/2, waveY);
        for (let i = 0; i <= 20; i++) {
            const x = (960 - waveWidth/2) + (i * waveWidth/20);
            const y = waveY + Math.sin(i * 0.5) * 8;
            wave.lineTo(x, y);
        }
        wave.strokePath();

        // "Play Again" button
        const playAgainButton = this.add.text(960, 670, 'Play Again', {
            fontSize: '34px',
            fill: '#e8e6e3',
            fontFamily: 'Georgia, serif',
            backgroundColor: '#2d5a6c',
            padding: { x: 50, y: 18 },
            stroke: '#4a7c8c',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Hover effects
        playAgainButton.on('pointerover', () => {
            playAgainButton.setStyle({
                backgroundColor: '#3d7a8c',
                stroke: '#6ac4dc',
                fontSize: '36px'
            });
        });

        playAgainButton.on('pointerout', () => {
            playAgainButton.setStyle({
                backgroundColor: '#2d5a6c',
                stroke: '#4a7c8c',
                fontSize: '34px'
            });
        });

        playAgainButton.on('pointerdown', () => {
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                this.scene.start('MenuScene');
            });
        });

        // Return to menu option
        const menuButton = this.add.text(960, 750, 'Return to Menu', {
            fontSize: '22px',
            fill: '#b8c6d1',
            fontFamily: 'Georgia, serif',
            padding: { x: 30, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        menuButton.on('pointerover', () => {
            menuButton.setStyle({ fill: '#6ac4dc' });
        });

        menuButton.on('pointerout', () => {
            menuButton.setStyle({ fill: '#b8c6d1' });
        });

        menuButton.on('pointerdown', () => {
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                this.scene.start('MenuScene');
            });
        });

        // Credits
        this.add.text(960, 830, 'The Seal Wife of Skye', {
            fontSize: '20px',
            fill: '#6a7c8c',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        this.add.text(960, 860, 'An Echoes of Alba Tale', {
            fontSize: '17px',
            fill: '#4a7c8c',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // Fade in
        this.cameras.main.fadeIn(1000);
    }
}
