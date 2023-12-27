class Sprite {
    /**
     *
     * @param image image for animation.
     * @param frames number of frames for animation.
     * @param stagger stagger frames.
     * @param framesModulo for (gameFrame / staggerFrames) % modulo
     */
    constructor(image, width, height, frames, stagger, framesModulo) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.frames = frames;
        this.stagger = stagger;
        this.modulo = framesModulo;
        this.gameFrame = 0;
    }

    animate() {
        let position = Math.floor(this.gameFrame / this.stagger) % this.modulo;

    }

}