const canvas = document.querySelector('canvas')
const context = canvas.getContext("2d") // what API you want

// 16 : 9 ratio
canvas.width = 1024
canvas.height = 576

context.fillStyle = "red"
context.fillRect(0, 0, canvas.width, canvas.height)