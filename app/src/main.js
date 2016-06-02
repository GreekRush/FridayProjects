var MOUSE_SENSITIVITY = 10;
var DEG_TO_RADS = 3.141592654 / 180.0;
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
        this.frames = 0;
        this.onWindowResize = function () {
            _this.windowHalfX = window.innerWidth / 2;
            _this.windowHalfY = window.innerHeight / 2;
            _this.camera.aspect = window.innerWidth / window.innerHeight;
            _this.camera.updateProjectionMatrix();
            _this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
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
            var mouseX = (event.clientX - _this.windowHalfX);
            var mouseY = (event.clientY - _this.windowHalfY);
            _this.calcCameraMovement();
            var camXAngle = mouseX / MOUSE_SENSITIVITY;
            var camYAngle = mouseY / MOUSE_SENSITIVITY;
            if (camXAngle <= -90.0)
                camXAngle = -89.9;
            if (camXAngle >= 90.0)
                camXAngle = 89.9;
            if (camYAngle < -180.0)
                camYAngle += 360.0;
            if (camYAngle > 180.0)
                camYAngle += 360.0;
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
        window.addEventListener("resize", this.onWindowResize, false);
        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);
        this.startTime = Date.now();
    }
    Renderer.prototype.calcCameraMovement = function () {
        var xMovement = 0.0, yMovement = 0.0, zMovement = 0.0;
        if (this.moveForward) {
            var pitch = Math.cos(this.camXAngle * DEG_TO_RADS);
            xMovement += this.speed * Math.sin(this.camYAngle * DEG_TO_RADS) * pitch;
            yMovement += this.speed * -Math.sin(this.camYAngle * DEG_TO_RADS);
            var yaw = Math.cos(this.camXAngle * DEG_TO_RADS);
            zMovement = this.speed * -Math.cos(this.camYAngle * DEG_TO_RADS) * yaw;
        }
        if (this.moveBackward) {
            var pitch = Math.cos(this.camXAngle * DEG_TO_RADS);
            xMovement += this.speed * -Math.sin(this.camYAngle * DEG_TO_RADS) * pitch;
            yMovement += this.speed * Math.sin(this.camYAngle * DEG_TO_RADS);
            var yaw = Math.cos(this.camXAngle * DEG_TO_RADS);
            zMovement = this.speed * Math.cos(this.camYAngle * DEG_TO_RADS) * yaw;
        }
        if (this.moveLeft) {
            var camYAngleRad = this.camYAngle * DEG_TO_RADS;
            xMovement += -this.speed * Math.cos(camYAngleRad);
            zMovement += -this.speed * Math.sin(camYAngleRad);
        }
        if (this.moveRight) {
            var camYAngleRad = this.camYAngle * DEG_TO_RADS;
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
    Renderer.prototype.update = function () {
        this.cube.rotateY(0.01);
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
window.onload = function () {
    new Renderer(window.innerWidth, window.innerHeight).render();
};
//# sourceMappingURL=main.js.map