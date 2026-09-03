class ChunkManager {
    constructor(scene) {
        this.scene = scene;
        this.loadedChunks = new Map();
        this.terrainGenerator = new TerrainGenerator();
        this.chunkSize = CHUNK_PIXEL_WIDTH;
        this.worldLayer = scene.add.layer();
    }

    getChunkCoords(worldX, worldY) {
        const chunkX = Math.floor(worldX / CHUNK_PIXEL_WIDTH);
        const chunkY = Math.floor(worldY / CHUNK_PIXEL_HEIGHT);
        return { x: chunkX, y: chunkY };
    }

    getChunkKey(chunkX, chunkY) {
        return `${chunkX},${chunkY}`;
    }

    updateChunks(playerX, playerY) {
        const playerChunk = this.getChunkCoords(playerX, playerY);
        const renderDistance = 2; // Load chunks within 2 chunks of player

        // Load chunks within render distance
        for (let x = playerChunk.x - renderDistance; x <= playerChunk.x + renderDistance; x++) {
            for (let y = playerChunk.y - renderDistance; y <= playerChunk.y + renderDistance; y++) {
                const key = this.getChunkKey(x, y);
                if (!this.loadedChunks.has(key)) {
                    this.loadChunk(x, y);
                }
            }
        }

        // Unload chunks beyond render distance
        for (const [key, chunk] of this.loadedChunks.entries()) {
            const [x, y] = key.split(',').map(Number);
            if (Math.abs(x - playerChunk.x) > renderDistance + 1 || 
                Math.abs(y - playerChunk.y) > renderDistance + 1) {
                this.unloadChunk(x, y, key);
            }
        }
    }

    loadChunk(chunkX, chunkY) {
        const key = this.getChunkKey(chunkX, chunkY);
        const terrain = this.terrainGenerator.generateChunk(chunkX, chunkY);
        
        const chunk = {
            x: chunkX,
            y: chunkY,
            terrain: terrain,
            graphics: this.scene.make.graphics({ x: 0, y: 0, add: true })
        };

        this.renderChunk(chunk);
        this.loadedChunks.set(key, chunk);
    }

    unloadChunk(chunkX, chunkY, key) {
        const chunk = this.loadedChunks.get(key);
        if (chunk && chunk.graphics) {
            chunk.graphics.destroy();
        }
        this.loadedChunks.delete(key);
    }

    renderChunk(chunk) {
        const graphics = chunk.graphics;
        graphics.clear();
        const startX = chunk.x * CHUNK_PIXEL_WIDTH;
        const startY = chunk.y * CHUNK_PIXEL_HEIGHT;

        // Render terrain tiles
        for (let y = 0; y < CHUNK_HEIGHT; y++) {
            for (let x = 0; x < CHUNK_WIDTH; x++) {
                const tile = chunk.terrain[y][x];
                const worldX = startX + x * TILE_SIZE;
                const worldY = startY + y * TILE_SIZE;

                this.drawTile(graphics, tile, worldX, worldY);
            }
        }
    }

    drawTile(graphics, tileType, x, y) {
        switch (tileType) {
            case 'stone':
                graphics.fillStyle(0x2a3a4a, 1);
                graphics.fillRect(x, y, TILE_SIZE, TILE_SIZE);
                graphics.lineStyle(1, 0x1a2a3a, 0.3);
                graphics.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
                break;
            case 'mire-clay':
                graphics.fillStyle(0x4a3a2a, 1);
                graphics.fillRect(x, y, TILE_SIZE, TILE_SIZE);
                graphics.lineStyle(1, 0x3a2a1a, 0.3);
                graphics.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
                break;
            case 'ore-coal':
                graphics.fillStyle(0x1a1a1a, 1);
                graphics.fillRect(x, y, TILE_SIZE, TILE_SIZE);
                graphics.fillStyle(0x2a2a2a, 0.6);
                graphics.fillCircle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 2);
                break;
            case 'ore-iron':
                graphics.fillStyle(0x3a3a3a, 1);
                graphics.fillRect(x, y, TILE_SIZE, TILE_SIZE);
                graphics.fillStyle(0x6a6a6a, 0.6);
                graphics.fillCircle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 2);
                break;
            case 'mushroom':
                graphics.fillStyle(0x6a4a8a, 1);
                graphics.fillRect(x, y, TILE_SIZE, TILE_SIZE);
                graphics.fillStyle(0x8a6aaa, 0.8);
                graphics.fillCircle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 3);
                break;
            case 'empty':
            default:
                graphics.fillStyle(0x0a1a1f, 1);
                graphics.fillRect(x, y, TILE_SIZE, TILE_SIZE);
                break;
        }
    }
}
