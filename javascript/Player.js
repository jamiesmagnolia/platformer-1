class Player {
    constructor({position}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 100
        this.height = 100
        this.collisionBlocks = collisionBlocks
    }

    draw() {
        context.fillStyle = "red"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.applyGravity()

        this.checkForVerticalCollisions()

        // stops falling via canvas (not col-blocks)
        // if (this.position.y + this.height + this.velocity.y < canvas.height) { // fall keeps accelerating
        //     this.velocity.y += gravity
        // }
        // else {
        //     this.velocity.y = 0 // stops when bottom reached
        // }
    }

    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += gravity
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (collision({object1:this, object2:collisionBlock})) {
                console.log("successful collision")
            }
        }
    }
}