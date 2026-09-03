// Game Configuration
const GAME_CONFIG = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [BootScene, GameScene],
    backgroundColor: '#0a1a1f',
    render: {
        pixelArt: true,
        antialias: false,
        smoothStep: false
    }
};

// Game Constants
const TILE_SIZE = 8;
const CHUNK_WIDTH = 16; // 16 tiles wide per chunk
const CHUNK_HEIGHT = 16; // 16 tiles tall per chunk
const CHUNK_PIXEL_WIDTH = CHUNK_WIDTH * TILE_SIZE;
const CHUNK_PIXEL_HEIGHT = CHUNK_HEIGHT * TILE_SIZE;

// Player Constants
const PLAYER_WIDTH = 8;
const PLAYER_HEIGHT = 8;
const PLAYER_SPEED = 60;
const PLAYER_JUMP_VELOCITY = -150;

// Atmospheric Constants
const FOG_COLOR = 0x0a1a1f;
const GLOW_COLOR = 0x64c8ff;
const EERIE_ALPHA = 0.1;
