export class MouseHandler {

    private _pointerLock: boolean;

    constructor(public camera: THREE.Camera) {
        this.pointerLock = false;


    }

    private onMouseMove = (event) => {
        event.preventDefault();
        event.stopPropagation();

        // var dx = event.
    };

    get pointerLock(): boolean { return this._pointerLock; }

    set pointerLock(pointerLock: boolean) {
        this._pointerLock = pointerLock;
    }

    calcCameraMovement() {
    }


    update() {
        if (this._pointerLock) {
            this.calcCameraMovement();
        }
    }
}