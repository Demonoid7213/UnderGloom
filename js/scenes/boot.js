class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Placeholder for asset loading
        // In production, load all tile and sprite assets here
    }

    create() {
        this.scene.start('GameScene');
    }
}
