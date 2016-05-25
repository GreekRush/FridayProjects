class Renderer {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private frame: number = 0;

    constructor(public width: number, public height: number) {
        // create renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true });

        // set dimensions
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 1);

        // bind renderer to DOM
        document.body.appendChild(this.renderer.domElement);

        // create scene
        this.scene = new THREE.Scene();

        // create camera
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);

        // position camera
        this.camera.position.set(0, 0, 20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // add some listeners
        window.addEventListener('resize', this.onWindowResize, false);
        document.addEventListener('mousemove', this.onMouseMove, false);

        let geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
        let material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        let cube: THREE.Mesh = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        event.preventDefault();
    }


    update() {
        let time: number = Date.now() * 0.001;
        this.frame += 0.01;
    }

    render() {
        this.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
    }

}

window.onload = () => {
    new Renderer(window.innerWidth, window.innerHeight).render();
}