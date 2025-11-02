// Phaser Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#0a0e1a',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, MenuScene, StoryScene, EndingScene]
};

// Initialize the game
const game = new Phaser.Game(config);

// Global debug flag
window.DEBUG_MODE = true;
