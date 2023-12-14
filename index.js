const canvas = document.querySelector('canvas')
const context = canvas.getContext("2d") // what API you want

// 16 : 9 ratio
canvas.width = 1024
canvas.height = 576

const gravity = 0.5 // global

class Player {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1
        }
        this.height = 100
    }

    draw() {
        context.fillStyle = "red"
        context.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y < canvas.height) { // fall keeps accelerating
            this.velocity.y += gravity
        }
        else {
            this.velocity.y = 0 // stops when bottom reached
        }
    }
}

const player = new Player({x:0, y:0})

let y = 100

function animate() { // animation loop
    window.requestAnimationFrame(animate)

    // bg
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // player
    player.update()
}

animate() // calls loop