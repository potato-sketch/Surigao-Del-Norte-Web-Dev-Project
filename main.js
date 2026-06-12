import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { TextureLoader } from "three";

// ==========================
// Scene
// ==========================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe8c7a5);
scene.fog = new THREE.Fog(0xffc89c, 120, 1200);

// ==========================
// Camera
// ==========================

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  50000,
);

// closer starting camera and lower angle
camera.position.set(24, 12, 24);

// ==========================
// Renderer
// ==========================

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
document.body.appendChild(renderer.domElement);

// ==========================
// Controls
// ==========================

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.enablePan = true;
controls.screenSpacePanning = false;

// debug access
window.camera = camera;
window.controls = controls;

// keep camera above the island, no under-rotation
controls.minPolarAngle = 0.18;
controls.maxPolarAngle = Math.PI / 2 - 0.02;
controls.minAzimuthAngle = -Infinity;
controls.maxAzimuthAngle = Infinity;

// lower minDistance so 7 and 8 can still be zoomed comfortably
controls.minDistance = 0.5;
controls.maxDistance = 3000;
controls.zoomSpeed = 1.0;
controls.rotateSpeed = 0.9;

// fixed orbit center for the island
const islandCenter = new THREE.Vector3(0, 0, 0);
controls.target.copy(islandCenter);

// ==========================
// Lights
// ==========================

const hemiLight = new THREE.HemisphereLight(0xffe0c2, 0xffb07a, 1.7);
scene.add(hemiLight);

const sun = new THREE.DirectionalLight(0xffd1a1, 2.6);
sun.position.set(120, 55, 80);
scene.add(sun);

// ==========================
// Ocean Water
// ==========================

const waterGeometry = new THREE.PlaneGeometry(10000, 10000, 256, 256);

const waterNormals = new TextureLoader().load(
  "/waternormals.jpg",
  (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  },
);

const water = new Water(waterGeometry, {
  textureWidth: 1024,
  textureHeight: 1024,
  waterNormals,
  sunDirection: sun.position.clone().normalize(),
  sunColor: 0xffd1a1,
  waterColor: 0x234b8d,
  distortionScale: 2.5,
  fog: true,
});

water.rotation.x = -Math.PI / 2;
water.position.y = -1.3;
scene.add(water);

// ==========================
// CSS2D Renderer
// ==========================

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0";
labelRenderer.domElement.style.left = "0";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

// ==========================
// Variables
// ==========================

let loadedModel = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const cameraTargetPosition = new THREE.Vector3();
const cameraTargetLookAt = new THREE.Vector3();

let movingCamera = false;

const spotDetails = {
  CaveMarker: {
    title: "Cave",
    description: "A shaded cavern with limestone formations and island lore.",
    longDescription:
      "Explore the shaded cave with dripping stalactites, cool air, and stories from the island's past.",
    image: "https://via.placeholder.com/280x160?text=Cave",
  },
  BeachMarker: {
    title: "Beach",
    description: "A sandy shoreline with calm waves and scenic views.",
    longDescription:
      "Relax on the beach with white sand, gentle surf, and wide ocean views perfect for sunset walks.",
    image: "https://via.placeholder.com/280x160?text=Beach",
  },
  HutMarker: {
    title: "Hut",
    description:
      "Traditional island huts with local materials and panoramic outlooks.",
    longDescription:
      "Visit the rustic island hut area, where authentic architecture and welcoming charm meet.",
    image: "https://via.placeholder.com/280x160?text=Hut",
  },
  MountainMarker: {
    title: "Mountain",
    description: "A rocky summit offering sweeping views of the island.",
    longDescription:
      "Hike the mountain trail for expansive vistas, rocky ridges, and a fresh breeze at the top.",
    image: "https://via.placeholder.com/280x160?text=Mountain",
  },
  CoveMarker: {
    title: "Cove",
    description: "A quiet cove sheltered by cliffs and calm water.",
    longDescription:
      "Discover the secluded cove, a peaceful spot tucked between cliffs with gentle water and shade.",
    image: "https://via.placeholder.com/280x160?text=Cove",
  },
  RoadMarker: {
    title: "Road",
    description: "A scenic path winding through the island's landscape.",
    longDescription:
      "Follow the island road through lush terrain and scenic viewpoints for a relaxing walk.",
    image: "https://via.placeholder.com/280x160?text=Road",
  },
  BridgeMarker: {
    title: "Bridge",
    description: "A wooden bridge crossing the island's stream.",
    longDescription:
      "Cross the wooden bridge and take in the sounds of flowing water and greenery all around.",
    image: "https://via.placeholder.com/280x160?text=Bridge",
  },
  WaterfallMarker: {
    title: "Waterfall",
    description: "A cascading waterfall with misty pools below.",
    longDescription:
      "Enjoy the waterfall's mist, mossy rocks, and the cool pool area beneath the cascade.",
    image: "https://via.placeholder.com/280x160?text=Waterfall",
  },
};

const hoverCard = createHoverCard();

function createHoverCard() {
  const card = document.createElement("div");
  card.className = "tooltip-card card text-white bg-dark shadow";
  card.innerHTML = `
    <img class="card-img-top" alt="Spot image" />
    <div class="card-body p-2">
      <h6 class="card-title mb-1"></h6>
      <p class="card-text small mb-0"></p>
    </div>
  `;
  document.body.appendChild(card);
  return card;
}

function updateHoverCard(markerName) {
  const info = spotDetails[markerName];
  if (!info) return;
  const image = hoverCard.querySelector("img");
  image.src = info.image;
  image.alt = info.title;
  hoverCard.querySelector(".card-title").textContent = info.title;
  hoverCard.querySelector(".card-text").textContent = info.description;
}

function positionHoverCard(targetElement) {
  hoverCard.style.display = "block";
  const rect = targetElement.getBoundingClientRect();
  const width = hoverCard.offsetWidth;
  const height = hoverCard.offsetHeight;
  const left = Math.min(
    window.innerWidth - width - 12,
    Math.max(12, rect.left + rect.width / 2 - width / 2),
  );
  const top = rect.top - height - 8;
  hoverCard.style.left = `${left}px`;
  hoverCard.style.top = `${top < 8 ? rect.bottom + 8 : top}px`;
}

function showHoverCard(targetElement, markerName) {
  updateHoverCard(markerName);
  positionHoverCard(targetElement);
}

function hideHoverCard() {
  hoverCard.style.display = "none";
}

function showSpotModal(markerName) {
  const info = spotDetails[markerName];
  if (!info) return;

  const modalElement = document.getElementById("spotDetailsModal");
  modalElement.querySelector("#spotDetailsModalLabel").textContent = info.title;
  modalElement.querySelector("#spotDetailsImage").src = info.image;
  modalElement.querySelector("#spotDetailsImage").alt = info.title;
  modalElement.querySelector("#spotDetailsDescription").textContent =
    info.longDescription || info.description;

  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

// ==========================
// Helpers
// ==========================

function getMarkerView(markerName, markerPos) {
  const dirFromCenter = markerPos.clone().sub(islandCenter);
  if (dirFromCenter.lengthSq() < 0.0001) {
    dirFromCenter.set(0, 0, 1);
  } else {
    dirFromCenter.normalize();
  }

  const horizontalDir = dirFromCenter.clone();
  horizontalDir.y = 0;

  if (horizontalDir.lengthSq() < 0.0001) {
    horizontalDir.set(0, 0, 1);
  } else {
    horizontalDir.normalize();
  }

  switch (markerName) {
    case "BridgeMarker":
      return {
        position: markerPos.clone().add(new THREE.Vector3(2.5, 0.8, 2.5)),
        target: markerPos.clone(),
      };

    case "WaterfallMarker":
      return {
        position: markerPos.clone().add(new THREE.Vector3(-1, 1, 1.9)),
        target: markerPos.clone().add(new THREE.Vector3(0, -0.2, 0)),
      };

    case "MountainMarker":
      return {
        position: markerPos
          .clone()
          .add(horizontalDir.clone().multiplyScalar(4.2))
          .add(new THREE.Vector3(0, 1.8, 0)),
        target: markerPos.clone().add(new THREE.Vector3(0, 0.2, 0)),
      };

    case "BeachMarker":
      return {
        position: markerPos
          .clone()
          .add(horizontalDir.clone().multiplyScalar(3.0))
          .add(new THREE.Vector3(0, 1.0, 0)),
        target: markerPos.clone().add(new THREE.Vector3(0, 0.1, 0)),
      };

    case "CaveMarker":
      return {
        position: markerPos
          .clone()
          .add(horizontalDir.clone().multiplyScalar(2.3))
          .add(new THREE.Vector3(0, 0.2, 0.1)),
        target: markerPos.clone().add(new THREE.Vector3(0, 0.1, 0)),
      };

    case "CoveMarker":
      return {
        position: markerPos
          .clone()
          .add(horizontalDir.clone().multiplyScalar(2.8))
          .add(new THREE.Vector3(0, 1.0, 0)),
        target: markerPos.clone().add(new THREE.Vector3(0, 0.1, 0)),
      };

    case "RoadMarker":
      return {
        position: markerPos.clone().add(new THREE.Vector3(-1, 0.7, -1)),

        target: markerPos.clone(),
      };

    case "HutMarker":
      return {
        position: markerPos
          .clone()
          .add(horizontalDir.clone().multiplyScalar(2.4))
          .add(new THREE.Vector3(0, 0.9, 0)),
        target: markerPos.clone().add(new THREE.Vector3(0, 0.05, 0)),
      };

    default:
      return {
        position: markerPos
          .clone()
          .add(horizontalDir.clone().multiplyScalar(3.5))
          .add(new THREE.Vector3(0, 1.2, 0)),
        target: markerPos.clone().add(new THREE.Vector3(0, 0.1, 0)),
      };
  }
}

// ==========================
// Marker Creator
// ==========================

function createNumberMarker(labelText, markerName) {
  if (!loadedModel) return;

  const marker = loadedModel.getObjectByName(markerName);
  if (!marker) return;

  const div = document.createElement("div");
  div.className = "tourist-marker";
  div.style.pointerEvents = "auto";

  const dot = document.createElement("span");
  dot.className = "marker-dot";
  div.appendChild(dot);

  div.addEventListener("mouseenter", () => {
    showHoverCard(div, markerName);
  });

  div.addEventListener("mouseleave", () => {
    hideHoverCard();
  });

  div.addEventListener("click", (e) => {
    e.stopPropagation();
    showSpotModal(markerName);
  });

  const markerObject = new CSS2DObject(div);
  markerObject.position.set(0, 0.9, 0);
  marker.add(markerObject);
}

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

    controls.target.copy(islandCenter);
    camera.position.set(40, 0, 50);
    controls.update();

    createNumberMarker("Cave", "CaveMarker");
    createNumberMarker("Beach", "BeachMarker");
    createNumberMarker("Hut", "HutMarker");
    createNumberMarker("Mountain", "MountainMarker");
    createNumberMarker("Cove", "CoveMarker");
    createNumberMarker("Road", "RoadMarker");
    createNumberMarker("Bridge", "BridgeMarker");
    createNumberMarker("Waterfall", "WaterfallMarker");

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
  const view = getMarkerView(markerName, pos);

  cameraTargetLookAt.copy(view.target);
  cameraTargetPosition.copy(view.position);

  movingCamera = true;
}

// ==========================
// Click Detection
// ==========================

window.addEventListener("click", (event) => {
  if (!loadedModel) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(loadedModel.children, true);

  if (intersects.length === 0) return;

  const clicked = intersects[0].object;
  console.log("Clicked:", clicked.name);
});

// ==========================
// Keyboard Controls
// ==========================

window.addEventListener("keydown", (event) => {
  if (event.key === "1") goToMarker("CaveMarker");
  if (event.key === "2") goToMarker("BeachMarker");
  if (event.key === "3") goToMarker("HutMarker");
  if (event.key === "4") goToMarker("MountainMarker");
  if (event.key === "5") goToMarker("CoveMarker");
  if (event.key === "6") goToMarker("RoadMarker");
  if (event.key === "7") goToMarker("BridgeMarker");
  if (event.key === "8") goToMarker("WaterfallMarker");
});

// ==========================
// Animation
// ==========================

function animate() {
  requestAnimationFrame(animate);

  if (movingCamera) {
    camera.position.lerp(cameraTargetPosition, 0.08);
    controls.target.lerp(cameraTargetLookAt, 0.08);

    const cameraDone = camera.position.distanceTo(cameraTargetPosition) < 0.05;
    const targetDone = controls.target.distanceTo(cameraTargetLookAt) < 0.05;

    if (cameraDone && targetDone) {
      camera.position.copy(cameraTargetPosition);
      controls.target.copy(cameraTargetLookAt);
      movingCamera = false;
    }
  }

  controls.update();

  if (water && water.material && water.material.uniforms) {
    water.material.uniforms["time"].value += 0.003;
  }

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();

// ==========================
// Resize
// ==========================

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
});
