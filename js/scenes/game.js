class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Set up camera for eerie atmosphere
        this.cameras.main.setBounds(0, 0, 10000, 1000);
        this.cameras.main.setLerp(0.1, 0);

        // Initialize world systems
        this.chunkManager = new ChunkManager(this);
        this.terrainGenerator = new TerrainGenerator();

        // Create player
        this.player = new Player(this, 512, 200);

        // Set up initial chunks around player
        this.chunkManager.updateChunks(this.player.x, this.player.y);

        // Create ambient atmosphere
        this.createAtmosphere();

        // Input handling
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    }

    update() {
        // Update player movement
        const moveLeft = this.cursors.left.isDown || this.wasd.left.isDown;
        const moveRight = this.cursors.right.isDown || this.wasd.right.isDown;
        const moveUp = this.cursors.up.isDown || this.wasd.up.isDown;
        const moveDown = this.cursors.down.isDown || this.wasd.down.isDown;
        const jump = this.wasd.space.isDown;

        this.player.move(moveLeft, moveRight, moveUp, moveDown, jump);

        // Update camera to follow player
        this.cameras.main.centerOn(this.player.x, this.player.y);

        // Update chunk loading based on player position
        this.chunkManager.updateChunks(this.player.x, this.player.y);
    }

    createAtmosphere() {
        // Add subtle atmospheric effects
        // In a full implementation, this would add ambient sounds, particle effects, etc.
        const fogGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    }
}
