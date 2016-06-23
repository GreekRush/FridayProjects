import * as Globals from "./Globals";

const MOUSE_SENSITIVITY: number = 0.002;

export class MouseHandler {

    private _pointerLock: boolean;
    private _pitch: THREE.Object3D;
    private _yaw: THREE.Object3D;

    constructor(public camera: THREE.Camera) {
        this.pointerLock = false;

        this._pitch = new THREE.Object3D();
        this._pitch.add(this.camera);

        this._yaw = new THREE.Object3D();
        this._yaw.position.y = 10;
        this._yaw.add(this._pitch);

        document.body.requestPointerLock();
        this.enablePointerLock();
    }

    destroy() {
        this.disablePointerLock();
    }

    private onMouseMove = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (this._pointerLock) {
            let dx: number = event.movementX || 0;
            let dy: number = event.movementY || 0;

            this._yaw.rotation.y -= dx * MOUSE_SENSITIVITY;
            this._pitch.rotation.x -= dy * MOUSE_SENSITIVITY;

            this._pitch.rotation.x = Math.max( -Globals.PI_2, Math.min( Globals.PI_2, this._pitch.rotation.x));
        }
    };

    get pointerLock(): boolean { return this._pointerLock; }

    set pointerLock(pointerLock: boolean) {
        this._pointerLock = pointerLock;
    }

    enablePointerLock() {
        document.addEventListener("mousemove", this.onMouseMove, false);
        this._pointerLock = true;
    }
    disablePointerLock() {
        document.removeEventListener("mousemove", this.onMouseMove, false);
        this._pointerLock = false;
    }

    calcCameraMovement() {

    }

    getObject() {
        return this._yaw;
    }
    getDirection() {
        // assume camera itself is not rotated
        let dir: THREE.Vector3 = new THREE.Vector3(0, 0, -1);
        let rot: THREE.Euler = new THREE.Euler(0, 0, 0, "YXZ");

        return function direction(v: THREE.Vector3): THREE.Vector3 {
            rot.set(this._pitch.rotation.x, this._yaw.rotation.y, 0);
            v.copy(dir).applyEuler(rot);
            return v;
        };
    }


    update() {
        if (this._pointerLock) {
            this.calcCameraMovement();
        }
    }
}