import * as Globals from "./Globals";
import { MouseHandler } from "./MouseHandler";

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

export class InputHandler {
    // angle of rotation for the camera
    private camXAngle: number = 0.0; // relative to x-axis (i.e. vertical angle)
    private camYAngle: number = 0.0; // relative to y-axis (i.e. horizontal angle)

    // XYZ position of the camera
    private camXPos: number = 0.0; private camYPos: number = 3.0; private camZPos: number = 5.0;

    // movement speed of camera
    private camXSpeed: number = 0.0; private camYSpeed: number = 0.0; private camZSpeed: number = 0.0;

    // adjust to change movement speed
    private speed: number = 0.05;

    // directional movement
    private moveForward: boolean = false; private moveBackward: boolean = false;
    private moveRight: boolean = false; private moveLeft: boolean = false;
    private moveUp: boolean = false; private moveDown: boolean = false;

    public pointerLock: boolean = false;

    constructor(public camera: THREE.Camera, public player?: THREE.Object3D) {
        // if no player is defined, assume the camera is the player (i.e. first person)
        this.player = player || camera;

        // add key listeners
        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);
    }

    destroy() {
        document.removeEventListener("keydown", this.onKeyDown, false);
        document.removeEventListener("keyup", this.onKeyUp, false);
    }

    private onKeyDown = (event: KeyboardEvent) => {

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

        // let mouseX = (event.clientX - this.windowHalfX);
        // let mouseY = (event.clientY - this.windowHalfY);


        // let camXAngle = mouseX / MOUSE_SENSITIVITY;
        // let camYAngle = mouseY / MOUSE_SENSITIVITY;

        // limit vertical rotation (stap at straight up and straight down)
        // if (camXAngle <= -90.0) camXAngle = -89.9;
        // if (camXAngle >= 90.0) camXAngle = 89.9;
        // keep horizontal rotation between -180 and 180 (just so values are easier to interpret)
        // if (camYAngle < -180.0) camYAngle += 360.0;
        // if (camYAngle > 180.0) camYAngle += 360.0;
    };

    private onKeyUp = (event: KeyboardEvent) => {
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

    calcPlayerMovement() {
        let xMovement: number = 0.0, yMovement: number = 0.0, zMovement: number = 0.0;

        // let dir = this.camera.getWorldDirection();
        // this.camXAngle = dir.x;
        // this.camYAngle = dir.z;

        if (this.moveForward) {
            let pitch = Math.cos(this.camXAngle/* * Globals.DEG_TO_RADS*/);
            xMovement += this.speed * Math.sin(this.camYAngle/* * Globals.DEG_TO_RADS*/) * pitch;
            yMovement += this.speed * -Math.sin(this.camYAngle/* * Globals.DEG_TO_RADS*/);
            let yaw = Math.cos(this.camXAngle/* * Globals.DEG_TO_RADS*/);
            zMovement = this.speed * -Math.cos(this.camYAngle/* * Globals.DEG_TO_RADS*/) * yaw;
        }
        if (this.moveBackward) {
            let pitch = Math.cos(this.camXAngle/* * Globals.DEG_TO_RADS*/);
            xMovement += this.speed * -Math.sin(this.camYAngle/* * Globals.DEG_TO_RADS*/) * pitch;
            yMovement += this.speed * Math.sin(this.camYAngle/* * Globals.DEG_TO_RADS*/);
            let yaw = Math.cos(this.camXAngle/* * Globals.DEG_TO_RADS*/);
            zMovement = this.speed * Math.cos(this.camYAngle/* * Globals.DEG_TO_RADS*/) * yaw;
        }
        if (this.moveLeft) {
            let camYAngleRad = this.camYAngle/* * Globals.DEG_TO_RADS*/;
            xMovement += -this.speed * Math.cos(camYAngleRad);
            zMovement += -this.speed * Math.sin(camYAngleRad);
        }
        if (this.moveRight) {
            let camYAngleRad = this.camYAngle/* * Globals.DEG_TO_RADS*/;
            xMovement += this.speed * Math.cos(camYAngleRad);
            zMovement += this.speed * Math.sin(camYAngleRad);
        }

        // limit movement speed (so diagonal doesn't make you go faster)
        if (xMovement > this.speed) xMovement = this.speed;
        if (xMovement < -this.speed) xMovement = -this.speed;
        if (yMovement > this.speed) yMovement = this.speed;
        if (yMovement < -this.speed) yMovement = -this.speed;
        if (zMovement > this.speed) zMovement = this.speed;
        if (zMovement < -this.speed) zMovement = -this.speed;


        // update camera position
        this.camXPos += xMovement;
        this.camYPos += yMovement;
        this.camZPos += zMovement;

        // this.camera.position.set(this.camXPos, this.camYPos, this.camZPos);
        this.camera.translateX(xMovement);
        this.camera.translateY(yMovement);
        this.camera.translateZ(zMovement);
        this.camera.updateMatrix();
    }

    update() {
        this.calcPlayerMovement();
    }
}