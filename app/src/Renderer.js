"use strict";
var InputHandler_1 = require("./InputHandler");
var Renderer = (function () {
    function Renderer(width, height) {
        var _this = this;
        this.width = width;
        this.height = height;
        this.cMatrix = new THREE.Matrix4();
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
        this.frames = 0;
        this.onWindowResize = function () {
            _this.windowHalfX = window.innerWidth / 2;
            _this.windowHalfY = window.innerHeight / 2;
            _this.camera.aspect = window.innerWidth / window.innerHeight;
            _this.camera.updateProjectionMatrix();
            _this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        this.camera.position.set(this.camXPos, this.camYPos, this.camZPos);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        var pLight = new THREE.PointLight(0xffffff, .7);
        pLight.position.set(3, 10, 3);
        this.scene.add(pLight);
        var aLight = new THREE.AmbientLight(0xffffff, 0.1);
        this.scene.add(aLight);
        var planeGeometry = new THREE.PlaneGeometry(10, 10);
        var planeMaterial = new THREE.MeshPhongMaterial({ color: 0x444444, specular: 0x888888, shininess: 20 });
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 2;
        this.scene.add(this.plane);
        var geometry = new THREE.BoxGeometry(2, 2, 2);
        var material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            specular: 0xffffff,
            shininess: 56
        });
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.translateY(1);
        this.scene.add(this.cube);
        this.inputHandler = new InputHandler_1.InputHandler(this.camera);
        window.addEventListener("resize", this.onWindowResize, false);
        this.startTime = Date.now();
    }
    Renderer.prototype.update = function () {
        this.cube.rotateY(0.01);
        this.inputHandler.update();
    };
    Renderer.prototype.timer = function () {
        var dt = Date.now() - this.startTime;
        if (dt >= 1000) {
            this.frames = 0;
            this.startTime = Date.now();
        }
        this.frames++;
    };
    Renderer.prototype.render = function () {
        var _this = this;
        this.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(function () { return _this.render(); });
    };
    return Renderer;
}());
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map