const canvas = document.querySelector('canvas')
const context = canvas.getContext("2d") // what API you want

// 16 : 9 ratio
canvas.width = 1024
canvas.height = 576

// scaled down
const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const gravity = 0.5 // global

class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        if (!this.image) {
            return
        }
        context.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
    }
}

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

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y < canvas.height) { // fall keeps accelerating
            this.velocity.y += gravity
        }
        else {
            this.velocity.y = 0 // stops when bottom reached
        }
    }
}

// player object
const player = new Player({x:0, y:0})

// keys -- outside of Player
const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
}

// background sprite
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './images/background.png',
})

// functions
function animate() { // animation loop
    window.requestAnimationFrame(animate)

    // bg
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // scaling once
    context.save()
    context.scale(4, 4)
    context.translate(0, -background.image.height + scaledCanvas.height)

    // bg sprite
    background.update()
    context.restore() // scales only once

    // player
    player.update()

    player.velocity.x = 0

    if (keys.d.pressed) { // player horizontal movement
        player.velocity.x = 5
    }
    else if (keys.a.pressed) {
        player.velocity.x = -5
    }
}

animate() // calls loop

// event listeners

window.addEventListener('keydown', (event)=> {
    switch(event.key) {
        // WASD
        case 'd':
            keys.d.pressed = true // keys pressed == keydown
            break
        case 'a':
            keys.a.pressed = true // keys pressed == keydown
            break
        case 'w':
            player.velocity.y = -15
            break
    }
})

window.addEventListener('keyup', (event)=> {
    switch(event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
})