// import {Player} from "./Player.js"

const canvas = document.querySelector('canvas') // we want the content from the canvas tag and above (?)
const context = canvas.getContext('2d') // we want things in 2D, this allows us to do things/use 2D related methods (?)
// tutorial used c and said it stood for 'context'


canvas.width = 1024 // 64 * 16
canvas.height = 576 // 64 * 9

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

        this.gravity = 1 //
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

const player = new Player()

// functions
function animate() { // animation loop (?)
    window.requestAnimationFrame(animate)
    
    // background
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height) // x-pos, y-pos, width, height

    player.draw()
    player.update()
    

    // you need to continuously update teh canvas, which is why we need to call .clearRect()
    // context.clearRect(0, 0, canvas.width, canvas.height) // not needed if you already have bg


}

animate()