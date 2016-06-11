"use strict";
const Globals = require("./Globals");
const MOUSE_SENSITIVITY = 10;
const Key = {
    W: 87,
    S: 83,
    A: 65,
    D: 68,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32
};
class InputHandler {
    constructor(camera, player) {
        this.camera = camera;
        this.player = player;
        this.camXAngle = 0.0;
        this.camYAngle = 0.0;
        this.camXPos = 0.0;
        this.camYPos = 3.0;
        this.camZPos = 5.0;
        this.camXSpeed = 0.0;
        this.camYSpeed = 0.0;
        this.camZSpeed = 0.0;
        this.speed = 0.2;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveRight = false;
        this.moveLeft = false;
        this.moveUp = false;
        this.moveDown = false;
        this.pointerLock = false;
        this.onKeyDown = (event) => {
            switch (event.keyCode) {
                case Key.UP:
                case Key.W:
                    this.moveForward = true;
                    break;
                case Key.DOWN:
                case Key.S:
                    this.moveBackward = true;
                    break;
                case Key.LEFT:
                case Key.A:
                    this.moveLeft = true;
                    break;
                case Key.RIGHT:
                case Key.D:
                    this.moveRight = true;
                    break;
            }
        };
        this.onKeyUp = (event) => {
            switch (event.keyCode) {
                case Key.UP:
                case Key.W:
                    this.moveForward = false;
                    break;
                case Key.DOWN:
                case Key.S:
                    this.moveBackward = false;
                    break;
                case Key.LEFT:
                case Key.A:
                    this.moveLeft = false;
                    break;
                case Key.RIGHT:
                case Key.D:
                    this.moveRight = false;
                    break;
            }
        };
        player = player || camera;
        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);
    }
    calcPlayerMovement() {
        let xMovement = 0.0, yMovement = 0.0, zMovement = 0.0;
        if (this.moveForward) {
            let pitch = Math.cos(this.camXAngle * Globals.DEG_TO_RADS);
            xMovement += this.speed * Math.sin(this.camYAngle * Globals.DEG_TO_RADS) * pitch;
            yMovement += this.speed * -Math.sin(this.camYAngle * Globals.DEG_TO_RADS);
            let yaw = Math.cos(this.camXAngle * Globals.DEG_TO_RADS);
            zMovement = this.speed * -Math.cos(this.camYAngle * Globals.DEG_TO_RADS) * yaw;
        }
        if (this.moveBackward) {
            let pitch = Math.cos(this.camXAngle * Globals.DEG_TO_RADS);
            xMovement += this.speed * -Math.sin(this.camYAngle * Globals.DEG_TO_RADS) * pitch;
            yMovement += this.speed * Math.sin(this.camYAngle * Globals.DEG_TO_RADS);
            let yaw = Math.cos(this.camXAngle * Globals.DEG_TO_RADS);
            zMovement = this.speed * Math.cos(this.camYAngle * Globals.DEG_TO_RADS) * yaw;
        }
        if (this.moveLeft) {
            let camYAngleRad = this.camYAngle * Globals.DEG_TO_RADS;
            xMovement += -this.speed * Math.cos(camYAngleRad);
            zMovement += -this.speed * Math.sin(camYAngleRad);
        }
        if (this.moveRight) {
            let camYAngleRad = this.camYAngle * Globals.DEG_TO_RADS;
            xMovement += this.speed * Math.cos(camYAngleRad);
            zMovement += this.speed * Math.sin(camYAngleRad);
        }
        if (xMovement > this.speed)
            xMovement = this.speed;
        if (xMovement < -this.speed)
            xMovement = -this.speed;
        if (yMovement > this.speed)
            yMovement = this.speed;
        if (yMovement < -this.speed)
            yMovement = -this.speed;
        if (zMovement > this.speed)
            zMovement = this.speed;
        if (zMovement < -this.speed)
            zMovement = -this.speed;
        this.camXPos += xMovement;
        this.camYPos += yMovement;
        this.camZPos += zMovement;
        this.camera.position.set(this.camXPos, this.camYPos, this.camZPos);
    }
    update() {
        this.calcPlayerMovement();
    }
}
exports.InputHandler = InputHandler;
//# sourceMappingURL=InputHandler.js.map