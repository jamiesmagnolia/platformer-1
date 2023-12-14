class Player {

    constructor() { // Player has  position property
        this.position = { // position has the properties: x and y
            x: 100,
            y: 100
        }

        this.velocity = { // velocity can have either x or y dimension
            x: 0,
            y: 0
        }

        this.width = 100
        this.height = 100
        this.sides = {
            bottom: this.position.y + this.height
        }

    }

    /**
     * Draws the Player object.
     */
    draw() {
        // player
        context.fillStyle = 'Red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    /**
     * Continuously updates Player state as needed. (same as tick? playTurn?)
     */
    update() {

        this.position.y += this.velocity

        // above bottom of canvas
        // // limits fall to "rock-bottom" (bottom of canvas)
        if (this.sides.bottom < canvas.height) {
            this.velocity.y += 1 // increase velocity as object falls (?) - makes gravity look more realistic
            this.sides.bottom = this.position.y + this.height
        }
        else { // once bottom is reached
            this.velocity.y = 0
        }
    }

}