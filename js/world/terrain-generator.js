class TerrainGenerator {
    constructor() {
        this.seed = 12345; // Fixed seed for consistent generation
    }

    // Simple seeded random number generator
    seededRandom(x, y, seed = this.seed) {
        const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
        return n - Math.floor(n);
    }

    generateChunk(chunkX, chunkY) {
        const terrain = [];

        for (let y = 0; y < CHUNK_HEIGHT; y++) {
            terrain[y] = [];
            for (let x = 0; x < CHUNK_WIDTH; x++) {
                const worldX = chunkX * CHUNK_WIDTH + x;
                const worldY = chunkY * CHUNK_HEIGHT + y;
                terrain[y][x] = this.generateTile(worldX, worldY);
            }
        }

        return terrain;
    }

    generateTile(worldX, worldY) {
        const rand = this.seededRandom(worldX, worldY);
        const heightNoise = this.seededRandom(worldX, worldY * 0.5);
        const oreNoise = this.seededRandom(worldX * 1.5, worldY * 1.5);

        // Simple height-based terrain
        // Surface layer (y < 3)
        if (worldY < 3) {
            if (rand < 0.3) return 'mire-clay';
            if (rand < 0.5) return 'mushroom';
            return 'empty';
        }

        // Upper ground layer (y 3-8)
        if (worldY < 8) {
            if (rand < 0.6) return 'mire-clay';
            if (rand < 0.75 && oreNoise > 0.7) return 'ore-coal';
            if (rand < 0.85 && oreNoise > 0.8) return 'ore-iron';
            return 'empty';
        }

        // Deep underground (y >= 8)
        if (rand < 0.4) return 'stone';
        if (oreNoise > 0.75) {
            if (oreNoise > 0.9) return 'ore-iron';
            if (oreNoise > 0.85) return 'ore-coal';
            return 'ore-coal';
        }

        return 'empty';
    }
}
