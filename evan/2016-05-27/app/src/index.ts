class Renderer {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    private frame: number = 0;
    public windowHalfX: number;
    public windowHalfY: number;

    public cube: THREE.Mesh;

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
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        // position camera
        this.camera.position.set(0, 1, 5);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // add a light
        let pLight = new THREE.DirectionalLight(0xffffff, .7);
        pLight.position.set(10, 10, 0);
        this.scene.add(pLight);
        let aLight = new THREE.AmbientLight(0xffffff, 0.1);
        this.scene.add(aLight);

        // add some listeners
        window.addEventListener("resize", this.onWindowResize, false);
        document.addEventListener("mousemove", this.onMouseMove, false);

        // add an object
        let geometry: THREE.BoxGeometry = new THREE.BoxGeometry(2, 2, 2);
        let material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial(
            {
                color: 0x00ff00,
                specular: 0xffffff,
                shininess: 56
            }
        );
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    private onWindowResize = () => {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // TODO: relegate mouse events to separate class InputHandler
    onMouseMove(event) {
        // event.preventDefault();

        let mouseX = (event.clientX - this.windowHalfX);
        let mouseY = (event.clientY - this.windowHalfY);
    }


    update() {
        let time: number = Date.now() * 0.001;
        this.frame += 0.01;
        this.cube.rotateY(0.01);
    }

    render() {
        this.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
    }

}

window.onload = () => {
    new Renderer(window.innerWidth, window.innerHeight).render();
};