import * as THREE from "../build/three.module.js";
import { ARButton } from "../jsm/webxr/ARButton.js";
import { OrbitControls } from "../jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "../jsm/loaders/RGBELoader.js";
import { RoughnessMipmapper } from "../jsm/utils/RoughnessMipmapper.js";

export class ArController {
    constructor() {
      this.container = document.createElement("div");
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.001,
        200
    );
    this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.controller;

        this.reticle = new THREE.Mesh(
          new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
          new THREE.MeshBasicMaterial()
      );

      this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.current_object;
        this.controls = new OrbitControls(
          this.camera,
          this.renderer.domElement
      );

        this.hitTestSource = null;
        this.hitTestSourceRequested = false;
        this.touchDown;
        this.touchX;
        this.touchY;
        this.deltaX;
        this.deltaY;
        this.init();
        this.animate();

        document.getElementById("ARButton").onclick = function () {
            this.current_object.visible = false;
        };

        document.getElementById("place-button").onclick = function () {
            this.arPlace();
        };

        document.getElementsByClassName(".ar-object").onclick = function () {
            if (this.current_object != null) {
                this.scene.remove(this.current_object);
            }
            this.loadModel($(this).attr("id"));
        };
    }

    arPlace() {
        if (this.reticle.visible) {
            this.current_object.position.setFromMatrixPosition(
                this.reticle.matrix
            );
            this.current_object.visible = true;
        }
    }

    loadModel(model) {
        new RGBELoader()
            .setDataType(THREE.UnsignedByteType)
            .setPath("textures/")
            .load("photo_studio_01_1k.hdr", function (texture) {
                var envmap =
                    this.pmremGenerator.fromEquirectangular(texture).texture;

                this.scene.environment = envmap;
                texture.dispose();
                this.pmremGenerator.dispose();
                this.render();

                var loader = new GLTFLoader().setPath("models/");
                loader.load(model + ".glb", function (glb) {
                    this.current_object = glb.scene;
                    this.scene.add(this.current_object);

                    this.arPlace();

                    var box = new THREE.Box3();
                    box.setFromObject(this.current_object);
                    box.center(this.controls.target);

                    this.controls.update();
                    this.render();
                });
            });
    }

    init() {

        document.getElementById("container").appendChild(this.container);





        // const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        // light.position.set(0.5, 1, 0.25);
        // scene.add(light);

        var directionalLight = new THREE.DirectionalLight(0xdddddd, 1);
        directionalLight.position.set(0, 0, 1).normalize();
        this.scene.add(directionalLight);

        var ambientLight = new THREE.AmbientLight(0x222222);
        this.scene.add(ambientLight);

        //

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.xr.enabled = true;
        this.container.appendChild(this.renderer.domElement);


        this.pmremGenerator.compileEquirectangularShader();

        constcontrols = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.controls.addEventListener("change", this.render);
        this.controls.minDistance = 2;
        this.controls.maxDistance = 10;
        this.controls.target.set(0, 0, -0.2);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        //

        let options = {
            requiredFeatures: ["hit-test"],
            optionalFeatures: ["dom-overlay"],
        };

        options.domOverlay = { root: document.getElementById("content") };

        document.body.appendChild(
            ARButton.createButton(this.renderer, options)
        );

        // document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

        //


        this.reticle.matrixAutoUpdate = false;
        this.reticle.visible = false;
        this.scene.add(this.reticle);

        //

        window.addEventListener("resize", this.onWindowResize); // ( , ,false)??

        this.renderer.domElement.addEventListener(
            "touchstart",
            function (e) {
                e.preventDefault();
                this.touchDown = true;
                this.touchX = e.touches[0].pageX;
                this.touchY = e.touches[0].pageY;
            },
            false
        );

        this.renderer.domElement.addEventListener(
            "touchend",
            function (e) {
                e.preventDefault();
                this.touchDown = false;
            },
            false
        );

        this.renderer.domElement.addEventListener(
            "touchmove",
            function (e) {
                e.preventDefault();

                if (!this.touchDown) {
                    return;
                }

                this.deltaX = e.touches[0].pageX - this.touchX;
                this.deltaY = e.touches[0].pageY - this.touchY;
                this.touchX = e.touches[0].pageX;
                this.touchY = e.touches[0].pageY;

                this.rotateObject();
            },
            false
        );
    }

    rotateObject() {
        if (this.current_object && this.reticle.visible) {
            this.current_object.rotation.y += deltaX / 100;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //

    animate() {
        this.renderer.setAnimationLoop(this.render);
        requestAnimationFrame(this.animate);
        this.controls.update();
    }

    render(timestamp, frame) {
        if (frame) {
            const referenceSpace = this.renderer.xr.getReferenceSpace();
            const session = this.renderer.xr.getSession();

            if (this.hitTestSourceRequested === false) {
                session
                    .requestReferenceSpace("viewer")
                    .then(function (referenceSpace) {
                        session
                            .requestHitTestSource({ space: referenceSpace })
                            .then(function (source) {
                                this.hitTestSource = source;
                            });
                    });

                session.addEventListener("end", function () {
                    this.hitTestSourceRequested = false;
                    this.hitTestSource = null;

                    this.reticle.visible = false;

                    var box = new THREE.Box3();
                    box.setFromObject(this.current_object);
                    box.center(this.controls.target);

                    document.getElementById("place-button").style.display =
                        "none";
                });

                this.hitTestSourceRequested = true;
            }

            if (this.hitTestSource) {
                const hitTestResults = frame.getHitTestResults(
                    this.hitTestSource
                );

                if (hitTestResults.length) {
                    const hit = hitTestResults[0];

                    document.getElementById("place-button").style.display =
                        "block";

                    this.reticle.visible = true;
                    this.reticle.matrix.fromArray(
                        hit.getPose(referenceSpace).transform.matrix
                    );
                } else {
                    this.reticle.visible = false;

                    document.getElementById("place-button").style.display =
                        "none";
                }
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}
