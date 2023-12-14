const canvas = document.querySelector('canvas')
const context = canvas.getContext("2d") // what API you want

// 16 : 9 ratio
canvas.width = 1024
canvas.height = 576

class Player {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
    }

    draw() {
        context.fillStyle = "red"
        context.fillRect(this.position.x, this.position.y, 100, 100)
    }

    update() {
        this.draw()
        this.position.y++
    }
}

const player = new Player()

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