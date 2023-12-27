// canvas set up
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "images/warrior/Attack1.png";

const playerWidth = 160;
const playerHeight = 150;

let frameX = 0;

let gameFrame = 0;
let staggerFrames = 4; // slows frame rate? no better way?
let mainModulo = 4;

// player data
const idleRight = new Sprite("images/warrior/Idle.png", 160, 150, 8, 5, 7);
const idleLeft = new Sprite("images/warrior/IdleLeft.png", 160, 150, 8, 5, 7);
const atk1 = new Sprite("images/warrior/Attack1.png", 160, 150, 4, 5, 4);
let playerState = idleRight;


// event listeners

window.addEventListener("keydown", (event) => {
    // console.log("pressed");
    switch (event.key) {
        case 'a': // left
            console.log("Idle Left");
            playerState = idleLeft;
            break;
        case 'd': // right
            console.log("Idle Right");
            playerState = idleRight;
            break;
        case ' ':
            console.log("Space - Attack 1");
            playerState = atk1;
            break;
    }
    playerImage.src = playerState.image;
    staggerFrames = playerState.stagger;
    mainModulo = playerState.modulo
});



// functions

function animate() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // per frame square: width = 160, height = 111 (approx 150 to prevent height stretch)
    let position = Math.floor(gameFrame/staggerFrames) % mainModulo;
    frameX = playerWidth * position;
    context.drawImage(playerImage, frameX, 0, playerWidth, playerHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();