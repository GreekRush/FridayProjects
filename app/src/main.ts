class Renderer {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    private frame: number = 0;
    public windowHalfX: number;
    public windowHalfY: number;

    public cube: THREE.Mesh;
    public plane: THREE.Mesh;

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
        this.camera.position.set(0, 3, 5);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

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


        // add some listeners
        window.addEventListener("resize", this.onWindowResize, false);
        document.addEventListener("mousemove", this.onMouseMove, false);
    }

    private onWindowResize = () => {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

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