import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

// ==========================
// Scene
// ==========================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb8e3ff);

// ==========================
// Camera
// ==========================

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  50000,
);

camera.position.set(80, 50, 80);

// ==========================
// Renderer
// ==========================

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputColorSpace = THREE.SRGBColorSpace;

document.body.appendChild(renderer.domElement);

// ==========================
// Controls
// ==========================

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

// ==========================
// Lights
// ==========================

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x87ceeb, 2);

scene.add(hemiLight);

const sun = new THREE.DirectionalLight(0xffffff, 3);

sun.position.set(100, 100, 100);

scene.add(sun);

const labelRenderer = new CSS2DRenderer();

labelRenderer.setSize(window.innerWidth, window.innerHeight);

labelRenderer.domElement.style.position = "absolute";

labelRenderer.domElement.style.top = "0";

labelRenderer.domElement.style.pointerEvents = "none";

document.body.appendChild(labelRenderer.domElement);

function createNumberMarker(number, markerName) {
  const marker = loadedModel.getObjectByName(markerName);

  if (!marker) return;

  const div = document.createElement("div");

  div.className = "tourist-marker";

  div.innerHTML = number;

  div.style.pointerEvents = "auto";

  div.addEventListener("click", () => {
    goToMarker(markerName);
  });

  const label = new CSS2DObject(div);

  label.position.set(0, 2, 0);

  marker.add(label);
}

// ==========================
// Variables
// ==========================

let loadedModel = null;

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

const cameraTargetPosition = new THREE.Vector3();

const cameraTargetLookAt = new THREE.Vector3();

let movingCamera = false;

// ==========================
// Load GLB
// ==========================

const loader = new GLTFLoader();

loader.load(
  "/SurigaoDelNorteModel.glb",

  (gltf) => {
    loadedModel = gltf.scene;

    loadedModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material && child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
        }
      }
    });

    scene.add(loadedModel);

    console.log("MODEL LOADED");

    const box = new THREE.Box3().setFromObject(loadedModel);

    const center = box.getCenter(new THREE.Vector3());

    loadedModel.position.sub(center);

    controls.target.set(0, 0, 0);

    camera.position.set(80, 50, 80);

    controls.update();

    createNumberMarker("1", "CaveMarker");

    createNumberMarker("2", "BeachMarker");

    createNumberMarker("3", "HutMarker");

    createNumberMarker("4", "MountainMarker");

    createNumberMarker("5", "CoveMarker");

    createNumberMarker("6", "RoadMarker");

    createNumberMarker("7", "BridgeMarker");

    createNumberMarker("8", "WaterfallMarker");

    loadedModel.traverse((obj) => {
      console.log(obj.name);
    });
  },

  undefined,

  (error) => {
    console.error(error);
  },
);

// ==========================
// Tourist Spot Camera
// ==========================

function goToMarker(markerName) {
  if (!loadedModel) return;

  const marker = loadedModel.getObjectByName(markerName);

  if (!marker) {
    console.log(markerName + " not found");

    return;
  }

  const pos = marker.getWorldPosition(new THREE.Vector3());

  cameraTargetLookAt.copy(pos);

  switch (markerName) {
    case "WaterfallMarker":
      cameraTargetPosition.set(pos.x + 2, pos.y + 1, pos.z - 2);

      break;

    case "MountainMarker":
      cameraTargetPosition.set(pos.x + 3, pos.y + 2, pos.z + 3);

      break;

    case "BeachMarker":
      cameraTargetPosition.set(pos.x - 2, pos.y + 1, pos.z + 2);

      break;

    case "BridgeMarker":
      cameraTargetPosition.set(pos.x + 2, pos.y + 1, pos.z);

      break;

    case "CaveMarker":
      cameraTargetPosition.set(pos.x, pos.y + 1, pos.z + 2);

      break;

    case "CoveMarker":
      cameraTargetPosition.set(pos.x - 2, pos.y + 1, pos.z - 2);

      break;

    case "RoadMarker":
      cameraTargetPosition.set(pos.x + 2, pos.y + 1, pos.z);

      break;

    case "HutMarker":
      cameraTargetPosition.set(pos.x + 1, pos.y + 1, pos.z + 1);

      break;

    default:
      cameraTargetPosition.set(pos.x + 2, pos.y + 1, pos.z + 2);
  }

  movingCamera = true;
}

// ==========================
// Click Detection
// ==========================

window.addEventListener(
  "click",

  (event) => {
    if (!loadedModel) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(loadedModel.children, true);

    if (intersects.length === 0) return;

    const clicked = intersects[0].object;

    console.log("Clicked:", clicked.name);
  },
);

// ==========================
// Keyboard Controls
// ==========================

window.addEventListener(
  "keydown",

  (event) => {
    if (event.key === "1") goToMarker("CaveMarker");

    if (event.key === "2") goToMarker("BeachMarker");

    if (event.key === "3") goToMarker("HutMarker");

    if (event.key === "4") goToMarker("MountainMarker");

    if (event.key === "5") goToMarker("CoveMarker");

    if (event.key === "6") goToMarker("RoadMarker");

    if (event.key === "7") goToMarker("BridgeMarker");

    if (event.key === "8") goToMarker("WaterfallMarker");
  },
);

// ==========================
// Animation
// ==========================

function animate() {
  requestAnimationFrame(animate);

  if (movingCamera) {
    camera.position.lerp(cameraTargetPosition, 0.05);

    controls.target.lerp(cameraTargetLookAt, 0.05);

    if (camera.position.distanceTo(cameraTargetPosition) < 0.05) {
      movingCamera = false;
    }
  }

  controls.update();

  renderer.render(scene, camera);

  labelRenderer.render(scene, camera);
}

animate();

// ==========================
// Resize
// ==========================

window.addEventListener(
  "resize",

  () => {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    labelRenderer.setSize(window.innerWidth, window.innerHeight);
  },
);
