var Renderer = (function () {
    function Renderer(width, height) {
        this.width = width;
        this.height = height;
        this.frame = 0;
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 1);
        document.body.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
        this.camera.position.set(0, 0, 20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        window.addEventListener("resize", this.onWindowResize, false);
        document.addEventListener("mousemove", this.onMouseMove, false);
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
    }
    Renderer.prototype.onWindowResize = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    Renderer.prototype.onMouseMove = function (event) {
        event.preventDefault();
    };
    Renderer.prototype.update = function () {
        var time = Date.now() * 0.001;
        this.frame += 0.01;
    };
    Renderer.prototype.render = function () {
        var _this = this;
        this.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(function () { return _this.render(); });
    };
    return Renderer;
}());
window.onload = function () {
    new Renderer(window.innerWidth, window.innerHeight).render();
};
//# sourceMappingURL=index.js.map