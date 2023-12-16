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

// convert to 2D array lol
const floorCollisions2D = [] // 27 rows, 36 cols
for (let i = 0; i < floorCollisions.length; i+=36) { // 36 cols per row
    floorCollisions2D.push(floorCollisions.slice(i, (i+36))) // add row
}

// floor collisions
collisionBlocks = [] // stores all collision blocks
floorCollisions2D.forEach((row, y) => { // y: row index
    row.forEach((symbol, x) => { // x: col index
        if (symbol === 202) {
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 16,
                    y: y * 16
                }
            }))
        }
        })
})

// platform collisions
const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i+=36) {
    platformCollisions2D.push(platformCollisions.slice(i, i+36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        platformCollisionBlocks.push(
            new CollisionBlock({
                position: {
                    x: x * 16,
                    y: y * 16
                }
            })
        )
    })
})

const gravity = 0.5 // global

// player object
const player = new Player({
    position: {
        x: 500,
        y: 0
    },
    collisionBlocks: collisionBlocks
})

// keys -- outside of Player
const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
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

    // floor
    collisionBlocks.forEach((collisionBlocks) => {
        collisionBlocks.update()
    })

    // platform
    collisionBlocks.forEach((block) => {
        block.update()
    })

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

animate() // calls loop -- game loop?

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
            keys.w.pressed = true
            // if (player.velocity.y === 0) { // no double jump
            //     player.velocity.y = -15
            // }

            // allows double jumps
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
        case 'w':
            keys.w.pressed = false
            break
    }
})