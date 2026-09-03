class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;

        // Create player graphics
        this.graphics = scene.make.graphics({ x: x, y: y, add: true });
        this.drawPlayer();
    }

    drawPlayer() {
        this.graphics.clear();
        this.graphics.fillStyle(0x8899ff, 1);
        this.graphics.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        // Add a simple eye
        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRect(this.x - 1, this.y - 2, 1, 1);
    }

    move(left, right, up, down, jump) {
        // Horizontal movement
        if (left) {
            this.velocityX = -PLAYER_SPEED;
        } else if (right) {
            this.velocityX = PLAYER_SPEED;
        } else {
            this.velocityX *= 0.85; // Friction
        }

        // Vertical movement (floating/swimming in the eerie depths)
        if (up && this.y > 100) {
            this.velocityY = -PLAYER_SPEED * 0.5;
        } else if (down && this.y < 900) {
            this.velocityY = PLAYER_SPEED * 0.5;
        } else {
            this.velocityY *= 0.9; // Air resistance
        }

        // Apply velocity
        this.x += this.velocityX * 0.016; // Assuming 60fps
        this.y += this.velocityY * 0.016;

        // Boundary constraints
        if (this.x < 100) this.x = 100;
        if (this.x > 9900) this.x = 9900;
        if (this.y < 50) this.y = 50;
        if (this.y > 950) this.y = 950;

        this.drawPlayer();
    }
}
