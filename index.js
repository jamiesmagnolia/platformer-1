// import {Player} from "./Player.js"

const canvas = document.querySelector('canvas') // we want the content from the canvas tag and above (?)
const context = canvas.getContext('2d') // we want things in 2D, this allows us to do things/use 2D related methods (?)
// tutorial used c and said it stood for 'context'


canvas.width = 1024 // 64 * 16
canvas.height = 576 // 64 * 9

const player = new Player()

// functions
function animate() { // animation loop (?)
    window.requestAnimationFrame(animate)
    
    // background
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height) // x-pos, y-pos, width, height

    player.draw()
    player.update()

}

animate()