/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** ./app/src/main.ts ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Renderer_1 = __webpack_require__(/*! ./Renderer */ 1);
	window.onload = function () {
	    new Renderer_1.Renderer(window.innerWidth, window.innerHeight).render();
	};


/***/ },
/* 1 */
/*!*****************************!*\
  !*** ./app/src/Renderer.ts ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var InputHandler_1 = __webpack_require__(/*! ./InputHandler */ 2);
	var MouseHandler_1 = __webpack_require__(/*! ./MouseHandler */ 4);
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
	        this.controls = new MouseHandler_1.MouseHandler(this.camera);
	        this.scene.add(this.controls.getObject());
	        this.inputHandler = new InputHandler_1.InputHandler(this.controls.getObject());
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
	            console.log("FPS: " + this.frames);
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


/***/ },
/* 2 */
/*!*********************************!*\
  !*** ./app/src/InputHandler.ts ***!
  \*********************************/
/***/ function(module, exports) {

	"use strict";
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
	var InputHandler = (function () {
	    function InputHandler(camera, player) {
	        var _this = this;
	        this.camera = camera;
	        this.player = player;
	        this.camXAngle = 0.0;
	        this.camYAngle = 0.0;
	        this.camXPos = 0.0;
	        this.camYPos = 3.0;
	        this.camZPos = 5.0;
	        this.camXSpeed = 0.0;
	        this.camYSpeed = 0.0;
	        this.camZSpeed = 0.0;
	        this.speed = 0.05;
	        this.moveForward = false;
	        this.moveBackward = false;
	        this.moveRight = false;
	        this.moveLeft = false;
	        this.moveUp = false;
	        this.moveDown = false;
	        this.pointerLock = false;
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
	        this.player = player || camera;
	        document.addEventListener("keydown", this.onKeyDown, false);
	        document.addEventListener("keyup", this.onKeyUp, false);
	    }
	    InputHandler.prototype.destroy = function () {
	        document.removeEventListener("keydown", this.onKeyDown, false);
	        document.removeEventListener("keyup", this.onKeyUp, false);
	    };
	    InputHandler.prototype.calcPlayerMovement = function () {
	        var xMovement = 0.0, yMovement = 0.0, zMovement = 0.0;
	        if (this.moveForward) {
	            var pitch = Math.cos(this.camXAngle);
	            xMovement += this.speed * Math.sin(this.camYAngle) * pitch;
	            yMovement += this.speed * -Math.sin(this.camYAngle);
	            var yaw = Math.cos(this.camXAngle);
	            zMovement = this.speed * -Math.cos(this.camYAngle) * yaw;
	        }
	        if (this.moveBackward) {
	            var pitch = Math.cos(this.camXAngle);
	            xMovement += this.speed * -Math.sin(this.camYAngle) * pitch;
	            yMovement += this.speed * Math.sin(this.camYAngle);
	            var yaw = Math.cos(this.camXAngle);
	            zMovement = this.speed * Math.cos(this.camYAngle) * yaw;
	        }
	        if (this.moveLeft) {
	            var camYAngleRad = this.camYAngle;
	            xMovement += -this.speed * Math.cos(camYAngleRad);
	            zMovement += -this.speed * Math.sin(camYAngleRad);
	        }
	        if (this.moveRight) {
	            var camYAngleRad = this.camYAngle;
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
	        this.camera.translateX(xMovement);
	        this.camera.translateY(yMovement);
	        this.camera.translateZ(zMovement);
	        this.camera.updateMatrix();
	    };
	    InputHandler.prototype.update = function () {
	        this.calcPlayerMovement();
	    };
	    return InputHandler;
	}());
	exports.InputHandler = InputHandler;


/***/ },
/* 3 */
/*!****************************!*\
  !*** ./app/src/Globals.ts ***!
  \****************************/
/***/ function(module, exports) {

	"use strict";
	exports.DEG_TO_RADS = 3.141592654 / 180.0;
	exports.PI_2 = Math.PI / 2;
	exports.DEBUG_MODE = false;


/***/ },
/* 4 */
/*!*********************************!*\
  !*** ./app/src/MouseHandler.ts ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Globals = __webpack_require__(/*! ./Globals */ 3);
	var MOUSE_SENSITIVITY = 0.002;
	var MouseHandler = (function () {
	    function MouseHandler(camera) {
	        var _this = this;
	        this.camera = camera;
	        this.pointerLockChange = function (event) {
	            if (document.pointerLockElement === document.body || document["mozPointerLockElement"] === document.body || document["webkitPointerLockElement"] === document.body) {
	                _this.enablePointerLock();
	                document.getElementById("blocker").style.display = "none";
	            }
	            else {
	                _this.disablePointerLock();
	                document.getElementById("blocker").style.display = "flex";
	            }
	        };
	        this.onMouseMove = function (event) {
	            event.preventDefault();
	            event.stopPropagation();
	            if (_this._pointerLock) {
	                var dx = event.movementX || 0;
	                var dy = event.movementY || 0;
	                _this._yaw.rotation.y -= dx * MOUSE_SENSITIVITY;
	                _this._pitch.rotation.x -= dy * MOUSE_SENSITIVITY;
	                _this._pitch.rotation.x = Math.max(-Globals.PI_2, Math.min(Globals.PI_2, _this._pitch.rotation.x));
	            }
	        };
	        this.pointerLock = false;
	        this._pitch = new THREE.Object3D();
	        this._pitch.add(this.camera);
	        this._yaw = new THREE.Object3D();
	        this._yaw.position.y = 2;
	        this._yaw.add(this._pitch);
	        this._pointerLockButton = document.getElementById("pointerLockButton");
	        var havePointerLock = "pointerLockElement" in document ||
	            "mozPointerLockElement" in document ||
	            "webkitPointerLockElement" in document;
	        if (havePointerLock) {
	            var element = document.body;
	            document.addEventListener('pointerlockchange', this.pointerLockChange, false);
	            this._pointerLockButton.addEventListener("click", function (event) {
	                _this._pointerLockButton.style.display = "none";
	                document.body.requestPointerLock();
	            });
	        }
	    }
	    MouseHandler.prototype.destroy = function () {
	        this.disablePointerLock();
	    };
	    Object.defineProperty(MouseHandler.prototype, "pointerLock", {
	        get: function () { return this._pointerLock; },
	        set: function (pointerLock) {
	            this._pointerLock = pointerLock;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MouseHandler.prototype.enablePointerLock = function () {
	        var element = document.body;
	        element.requestPointerLock();
	        document.addEventListener("mousemove", this.onMouseMove, false);
	        this._pointerLock = true;
	    };
	    MouseHandler.prototype.disablePointerLock = function () {
	        document.removeEventListener("mousemove", this.onMouseMove, false);
	        this._pointerLock = false;
	    };
	    MouseHandler.prototype.calcCameraMovement = function () {
	    };
	    MouseHandler.prototype.getObject = function () {
	        return this._yaw;
	    };
	    MouseHandler.prototype.getDirection = function () {
	        var dir = new THREE.Vector3(0, 0, -1);
	        var rot = new THREE.Euler(0, 0, 0, "YXZ");
	        return function direction(v) {
	            rot.set(this._pitch.rotation.x, this._yaw.rotation.y, 0);
	            v.copy(dir).applyEuler(rot);
	            return v;
	        };
	    };
	    MouseHandler.prototype.update = function () {
	        if (this._pointerLock) {
	        }
	    };
	    return MouseHandler;
	}());
	exports.MouseHandler = MouseHandler;


/***/ }
/******/ ]);
//# sourceMappingURL=threets.js.map