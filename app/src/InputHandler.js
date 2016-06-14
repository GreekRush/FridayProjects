"use strict";
var Globals = require("./Globals");
var MOUSE_SENSITIVITY = 10;
var Key = {
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
var InputHandler = (function () {
    function InputHandler(camera, player) {
        var _this = this;
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
        this.onKeyDown = function (event) {
            switch (event.keyCode) {
                case Key.UP:
                case Key.W:
                    _this.moveForward = true;
                    break;
                case Key.DOWN:
                case Key.S:
                    _this.moveBackward = true;
                    break;
                case Key.LEFT:
                case Key.A:
                    _this.moveLeft = true;
                    break;
                case Key.RIGHT:
                case Key.D:
                    _this.moveRight = true;
                    break;
            }
        };
        this.onKeyUp = function (event) {
            switch (event.keyCode) {
                case Key.UP:
                case Key.W:
                    _this.moveForward = false;
                    break;
                case Key.DOWN:
                case Key.S:
                    _this.moveBackward = false;
                    break;
                case Key.LEFT:
                case Key.A:
                    _this.moveLeft = false;
                    break;
                case Key.RIGHT:
                case Key.D:
                    _this.moveRight = false;
                    break;
            }
        };
        player = player || camera;
        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);
    }
    InputHandler.prototype.calcPlayerMovement = function () {
        var xMovement = 0.0, yMovement = 0.0, zMovement = 0.0;
        if (this.moveForward) {
            var pitch = Math.cos(this.camXAngle * Globals.DEG_TO_RADS);
            xMovement += this.speed * Math.sin(this.camYAngle * Globals.DEG_TO_RADS) * pitch;
            yMovement += this.speed * -Math.sin(this.camYAngle * Globals.DEG_TO_RADS);
            var yaw = Math.cos(this.camXAngle * Globals.DEG_TO_RADS);
            zMovement = this.speed * -Math.cos(this.camYAngle * Globals.DEG_TO_RADS) * yaw;
        }
        if (this.moveBackward) {
            var pitch = Math.cos(this.camXAngle * Globals.DEG_TO_RADS);
            xMovement += this.speed * -Math.sin(this.camYAngle * Globals.DEG_TO_RADS) * pitch;
            yMovement += this.speed * Math.sin(this.camYAngle * Globals.DEG_TO_RADS);
            var yaw = Math.cos(this.camXAngle * Globals.DEG_TO_RADS);
            zMovement = this.speed * Math.cos(this.camYAngle * Globals.DEG_TO_RADS) * yaw;
        }
        if (this.moveLeft) {
            var camYAngleRad = this.camYAngle * Globals.DEG_TO_RADS;
            xMovement += -this.speed * Math.cos(camYAngleRad);
            zMovement += -this.speed * Math.sin(camYAngleRad);
        }
        if (this.moveRight) {
            var camYAngleRad = this.camYAngle * Globals.DEG_TO_RADS;
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
    };
    InputHandler.prototype.update = function () {
        this.calcPlayerMovement();
    };
    return InputHandler;
}());
exports.InputHandler = InputHandler;
//# sourceMappingURL=InputHandler.js.map