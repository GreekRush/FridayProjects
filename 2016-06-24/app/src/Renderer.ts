import { InputHandler } from "./InputHandler";
import { MouseHandler } from "./MouseHandler";

export class Renderer {

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;


    private camera: THREE.PerspectiveCamera;
    private cMatrix: THREE.Matrix4 = new THREE.Matrix4();

    private inputHandler: InputHandler;
    private controls: MouseHandler;

    // angle of rotation for the camera
    private camXAngle: number = 0.0; // relative to x-axis (i.e. vertical angle)
    private camYAngle: number = 0.0; // relative to y-axis (i.e. horizontal angle)

    // XYZ position of the camera
    private camXPos: number = 0.0; private camYPos: number = 3.0; private camZPos: number = 5.0;

    // movement speed of camera
    private camXSpeed: number = 0.0; private camYSpeed: number = 0.0; private camZSpeed: number = 0.0;

    // adjust to change movement speed
    private speed: number = 0.2;

    // directional movement
    private moveForward: boolean = false; private moveBackward: boolean = false;
    private moveRight: boolean = false; private moveLeft: boolean = false;
    private moveUp: boolean = false; private moveDown: boolean = false;

    public windowHalfX: number; public windowHalfY: number;

    public pointerLock: boolean = false;

    public cube: THREE.Mesh;
    public plane: THREE.Mesh;

    /** Timer */
    private frames: number = 0;
    private startTime: number;

    constructor(public width: number, public height: number) {
        // create renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true });


        // set dimensions
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // bind renderer to DOM
        document.body.appendChild(this.renderer.domElement);

        // create scene
        this.scene = new THREE.Scene();

        // create camera
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);

        // position camera
        // this.camera.position.set(this.camXPos, this.camYPos, this.camZPos);
        // this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        /*
         * add lighting
         */

        // point light
        let pLight = new THREE.PointLight(0xffffff, .7);
        pLight.position.set(3, 10, 3);
        this.scene.add(pLight);

        // ambient light
        let aLight = new THREE.AmbientLight(0xffffff, 0.1);
        this.scene.add(aLight);


        /*
         * add objects
         */

        // add plane
        let planeGeometry = new THREE.PlaneGeometry(10, 10);
        let planeMaterial = new THREE.MeshPhongMaterial({ color: 0x444444, specular: 0x888888, shininess: 20 });

        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 2;
        this.scene.add(this.plane);

        // add cube
        let geometry: THREE.Geometry = new THREE.BoxGeometry(2, 2, 2);
        // let material: THREE.Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        let material: THREE.Material = new THREE.MeshPhongMaterial(
            {
                color: 0x00ff00,
                specular: 0xffffff,
                shininess: 56
            }
        );
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.translateY(1);
        this.scene.add(this.cube);

        // add input handler

        // add mouse controls
        this.controls = new MouseHandler(this.camera);
        this.scene.add(this.controls.getObject());
        this.inputHandler = new InputHandler(<THREE.Camera>this.controls.getObject());

        // add some listeners
        window.addEventListener("resize", this.onWindowResize, false);


        // initialize timer
        this.startTime = Date.now();
    }

    private onWindowResize = () => {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    update() {
        // this.timer();
        this.cube.rotateY(0.01);
        this.inputHandler.update();
    }

    timer() {
        let dt: number = Date.now() - this.startTime;
        if (dt >= 1000) {
            console.log("FPS: " + this.frames);
            this.frames = 0;
            this.startTime = Date.now();
        }
        this.frames++;
    }

    render() {
        this.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
    }

}