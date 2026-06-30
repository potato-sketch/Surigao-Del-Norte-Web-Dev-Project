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
renderer.domElement.classList.add("render-canvas");
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
labelRenderer.domElement.classList.add("label-renderer");
document.body.appendChild(labelRenderer.domElement);

const mainScene = document.getElementById("mainScene");
const showcaseBtn = document.getElementById("showcase-btn");
const bookingBtn = document.getElementById("booking-btn");
const loadingScreen = document.getElementById("loadingScreen");
const loadingPercent = document.getElementById("loadingPercent");
const loadingBarFill = document.getElementById("loadingBarFill");
const loadingEnterBtn = document.getElementById("loadingEnterBtn");
const showcaseCameraPosition = new THREE.Vector3(12, 5.5, 13);
const showcaseCameraTarget = new THREE.Vector3(0, 0.1, 0);
const mainSceneTransitionMs = 420;
const loadingScreenTransitionMs = 420;
const skipLoadingFromQuery = new URLSearchParams(window.location.search).get("skipLoading") === "1";
const skipLoadingFromReturn = sessionStorage.getItem("skipMainLoadingOnce") === "1";
const skipLoadingScreen = skipLoadingFromQuery || skipLoadingFromReturn;

let pendingShowcaseZoom = false;
let mainSceneHideTimer = null;
let mainSceneShowTimer = null;
let sceneTransitionInProgress = false;
let loadingProgress = 0;
let loadingReady = false;

window.musicManager?.mountControls({ defaultTrack: "lofi" });

const loadingProgressTimer = window.setInterval(() => {
  if (loadingReady) return;

  loadingProgress = Math.min(92, loadingProgress + (loadingProgress < 60 ? 8 : 4));
  if (loadingPercent) {
    loadingPercent.textContent = `${loadingProgress}%`;
  }

  if (loadingBarFill) {
    loadingBarFill.style.width = `${loadingProgress}%`;
  }
}, 180);

if (skipLoadingScreen) {
  loadingReady = true;
  window.clearInterval(loadingProgressTimer);

  if (skipLoadingFromReturn && mainScene) {
    mainScene.classList.add("is-returning");
  }

  if (loadingScreen) {
    loadingScreen.setAttribute("data-state", "hidden");
  }

  if (loadingPercent) {
    loadingPercent.textContent = "100%";
  }

  if (loadingBarFill) {
    loadingBarFill.style.width = "100%";
  }

  if (loadingEnterBtn) {
    loadingEnterBtn.disabled = false;
  }

  if (skipLoadingFromReturn) {
    sessionStorage.removeItem("skipMainLoadingOnce");
  }

  window.history.replaceState({}, document.title, window.location.pathname);
}

if (skipLoadingFromReturn && mainScene) {
  window.setTimeout(() => {
    mainScene.classList.remove("is-returning");
  }, mainSceneTransitionMs);
}

function hideLoadingScreen() {
  if (!loadingScreen || loadingScreen.dataset.state === "hidden") return;

  window.musicManager?.playTrack("lofi", { forceEnable: true });

  loadingScreen.setAttribute("data-state", "exiting");
  window.setTimeout(() => {
    loadingScreen.setAttribute("data-state", "hidden");
  }, loadingScreenTransitionMs);
}

window.__setLoadingReady = function setLoadingReady() {
  loadingReady = true;
  window.clearInterval(loadingProgressTimer);
  loadingProgress = 100;

  if (loadingPercent) {
    loadingPercent.textContent = "100%";
  }

  if (loadingBarFill) {
    loadingBarFill.style.width = "100%";
  }

  if (loadingScreen && loadingScreen.dataset.state !== "hidden") {
    loadingScreen.setAttribute("data-state", "ready");
  }

  if (loadingEnterBtn) {
    loadingEnterBtn.disabled = false;
  }
};

if (loadingEnterBtn) {
  loadingEnterBtn.addEventListener("click", hideLoadingScreen);
}

function startIslandShowcaseZoom() {
  cameraTargetPosition.copy(showcaseCameraPosition);
  cameraTargetLookAt.copy(showcaseCameraTarget);
  movingCamera = true;
}

function enterShowcase() {
  if (sceneTransitionInProgress) return;
  sceneTransitionInProgress = true;

  window.musicManager?.playTrack("beach", { forceEnable: true });

  if (mainSceneHideTimer) {
    clearTimeout(mainSceneHideTimer);
    mainSceneHideTimer = null;
  }

  if (mainSceneShowTimer) {
    clearTimeout(mainSceneShowTimer);
    mainSceneShowTimer = null;
  }

  document.body.classList.remove("pre-render-active");
  if (mainScene) {
    mainScene.classList.add("is-exiting");

    mainSceneHideTimer = setTimeout(() => {
      mainScene.classList.add("is-hidden");
      mainScene.classList.remove("is-exiting");
      sceneTransitionInProgress = false;
      mainSceneHideTimer = null;
    }, mainSceneTransitionMs);
  } else {
    sceneTransitionInProgress = false;
  }

  if (loadedModel) {
    startIslandShowcaseZoom();
  } else {
    pendingShowcaseZoom = true;
  }
}

function enterBooking() {
  if (sceneTransitionInProgress) return;
  sceneTransitionInProgress = true;

  if (mainSceneHideTimer) {
    clearTimeout(mainSceneHideTimer);
    mainSceneHideTimer = null;
  }

  if (mainSceneShowTimer) {
    clearTimeout(mainSceneShowTimer);
    mainSceneShowTimer = null;
  }

  if (mainScene) {
    mainScene.classList.add("is-exiting");
  }

  window.setTimeout(() => {
    window.location.href = "/landing.html";
  }, mainSceneTransitionMs);
}

function returnToMainScene() {
  if (sceneTransitionInProgress) return;
  sceneTransitionInProgress = true;

  if (window.musicManager?.getEnabled()) {
    window.musicManager.playTrack("lofi");
  } else {
    window.musicManager?.setTrackName("lofi");
  }

  if (mainSceneHideTimer) {
    clearTimeout(mainSceneHideTimer);
    mainSceneHideTimer = null;
  }

  if (mainSceneShowTimer) {
    clearTimeout(mainSceneShowTimer);
    mainSceneShowTimer = null;
  }

  closeSpotFrame();

  if (mainScene) {
    mainScene.classList.remove("is-hidden");
    mainScene.classList.add("is-exiting");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        mainScene.classList.remove("is-exiting");
      });
    });

    mainSceneShowTimer = setTimeout(() => {
      document.body.classList.add("pre-render-active");
      sceneTransitionInProgress = false;
      mainSceneShowTimer = null;
    }, mainSceneTransitionMs);
  } else {
    document.body.classList.add("pre-render-active");
    sceneTransitionInProgress = false;
  }
}

if (showcaseBtn) {
  showcaseBtn.addEventListener("click", enterShowcase);
}

if (bookingBtn) {
  bookingBtn.addEventListener("click", enterBooking);
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
let markerTourIndex = 0;

const markerTourOrder = [
  "CaveMarker",
  "BeachMarker",
  "HutMarker",
  "MountainMarker",
  "CoveMarker",
  "RoadMarker",
  "BridgeMarker",
  "WaterfallMarker",
];

const videoSources = {
  cave: "/vids/hagukan%20cave/03D2F7A8-60DA-4BC1-B424-B9100738EE17.mov",
  beach: "/vids/alegria%20beach/AFC2AECF-E004-4F37-B368-4D3E030A3A0D.mov",
  hut: "/vids/corregidor%20island/A7E31CC2-0684-40D4-B0A6-4D73D5C05B19.mov",
  mountain: "/vids/red%20mountain/9FC4AD3C-9123-475A-97AE-44236B49869F.mov",
  cove: "/vids/sohoton%20cove/AQNm3-Da0XREmmpALQDJfBs5AiD8YRLzbuaotPGGHh08jRPHqJwhqMe5pTtiUls-Ov28L3vmHSlqpLzxd84GYm9o_4_W_wgEWEzCk6OUXAsxyQ.mp4",
  road: "/vids/coconut%20road/AQNK0diYNYFekk499X7SAmQ_sHwK5_h-WMxaAKFV0wKFZyOHRPMYM-wHtNNVmDh6o_nD0b5kxB5hdJhfD0iuvEwehTjwOm-G9pb8DLc.mp4",
  bridge: "/vids/lumondo%20hanging%20bridge/421DE710-B395-400D-9DEF-725A71C3DE2C.mov",
  waterfall: "/vids/togonan%20falls/33A655CC-490B-44C9-A2E2-9D9843E0F463.mov",
};

const spotDetails = {
  CaveMarker: {
    title: "Hagukan Cave",
    description: "A shaded cavern with limestone formations and island lore.",
    longDescription:
      "Explore the shaded cave with dripping stalactites, cool air, and stories from the island's past.",
    video: videoSources.cave,
    image: "https://via.placeholder.com/280x160?text=Cave",
  },
  BeachMarker: {
    title: "Alegria Beach",
    description: "A sandy shoreline with calm waves and scenic views.",
    longDescription:
      "Relax on the beach with white sand, gentle surf, and wide ocean views perfect for sunset walks.",
    video: videoSources.beach,
    image: "https://via.placeholder.com/280x160?text=Beach",
  },
  HutMarker: {
    title: "Corregidor Island",
    description:
      "Traditional island huts with local materials and panoramic outlooks.",
    longDescription:
      "Visit the rustic island hut area, where authentic architecture and welcoming charm meet.",
    video: videoSources.hut,
    image: "https://via.placeholder.com/280x160?text=Hut",
  },
  MountainMarker: {
    title: "Red Mountain",
    description: "A rocky summit offering sweeping views of the island.",
    longDescription:
      "Hike the mountain trail for expansive vistas, rocky ridges, and a fresh breeze at the top.",
    video: videoSources.mountain,
    image: "https://via.placeholder.com/280x160?text=Mountain",
  },
  CoveMarker: {
    title: "Sohoton Cove",
    description: "A quiet cove sheltered by cliffs and calm water.",
    longDescription:
      "Discover the secluded cove, a peaceful spot tucked between cliffs with gentle water and shade.",
    video: videoSources.cove,
    image: "https://via.placeholder.com/280x160?text=Cove",
  },
  RoadMarker: {
    title: "Coconut Road",
    description: "A scenic path winding through the island's landscape.",
    longDescription:
      "Follow the island road through lush terrain and scenic viewpoints for a relaxing walk.",
    video: videoSources.road,
    image: "https://via.placeholder.com/280x160?text=Road",
  },
  BridgeMarker: {
    title: "Lumondo Hanging Bridge",
    description: "A wooden bridge crossing the island's stream.",
    longDescription:
      "Cross the wooden bridge and take in the sounds of flowing water and greenery all around.",
    video: videoSources.bridge,
    image: "https://via.placeholder.com/280x160?text=Bridge",
  },
  WaterfallMarker: {
    title: "Togonan Falls",
    description: "A cascading waterfall with misty pools below.",
    longDescription:
      "Enjoy the waterfall's mist, mossy rocks, and the cool pool area beneath the cascade.",
    video: videoSources.waterfall,
    image: "https://via.placeholder.com/280x160?text=Waterfall",
  },
};

const spotModalElement = document.getElementById("spotDetailsModal");
const spotModalCloseButton = document.getElementById("spotDetailsClose");
let activeSpotMarkerName = null;
const goFrameTransitionMs = 180;
let goFrameTransitionTimer = null;

function getMusicSafeBounds() {
  const controls = document.getElementById("sdnMusicControls");
  if (!controls) return null;

  const rect = controls.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;

  return {
    right: rect.right,
    bottom: rect.bottom,
  };
}

function applyMusicSafeBounds(position, frameWidth, frameHeight, margin) {
  const safeBounds = getMusicSafeBounds();
  if (!safeBounds) return position;

  const overlapsMusicArea =
    position.left < safeBounds.right + margin &&
    position.top < safeBounds.bottom + margin;

  if (!overlapsMusicArea) return position;

  const pushRightLeft = safeBounds.right + margin;
  const pushDownTop = safeBounds.bottom + margin;
  const canPushRight = pushRightLeft <= window.innerWidth - frameWidth - margin;
  const canPushDown = pushDownTop <= window.innerHeight - frameHeight - margin;

  if (canPushRight) {
    position.left = pushRightLeft;
  }

  if (canPushDown) {
    position.top = pushDownTop;
  }

  return position;
}

function positionSpotFrame(markerName) {
  const margin = 14;
  const frameWidth = spotModalElement.offsetWidth || Math.min(420, window.innerWidth - 32);
  const frameHeight = spotModalElement.offsetHeight || 360;

  if (markerName === "CaveMarker") {
    const position = applyMusicSafeBounds(
      { left: margin + 80, top: margin },
      frameWidth,
      frameHeight,
      margin,
    );
    spotModalElement.style.left = `${position.left}px`;
    spotModalElement.style.top = `${position.top}px`;
    spotModalElement.style.right = "auto";
    return;
  }

  if (markerName === "BeachMarker") {
    const position = applyMusicSafeBounds(
      { left: margin, top: margin },
      frameWidth,
      frameHeight,
      margin,
    );
    spotModalElement.style.left = `${position.left}px`;
    spotModalElement.style.top = `${position.top}px`;
    spotModalElement.style.right = "auto";
    return;
  }

  if (markerName === "HutMarker") {
    const position = applyMusicSafeBounds(
      { left: margin, top: margin },
      frameWidth,
      frameHeight,
      margin,
    );
    spotModalElement.style.left = `${position.left}px`;
    spotModalElement.style.top = `${position.top}px`;
    spotModalElement.style.right = "auto";
    return;
  }

  if (markerName === "MountainMarker") {
    spotModalElement.style.left = `${window.innerWidth - frameWidth - margin}px`;
    spotModalElement.style.top = `${window.innerHeight - frameHeight - margin}px`;
    spotModalElement.style.right = "auto";
    return;
  }

  if (markerName === "CoveMarker") {
    spotModalElement.style.left = `${window.innerWidth - frameWidth - margin}px`;
    spotModalElement.style.top = `${margin}px`;
    spotModalElement.style.right = "auto";
    return;
  }

  if (markerName === "RoadMarker") {
    const position = applyMusicSafeBounds(
      { left: margin, top: margin },
      frameWidth,
      frameHeight,
      margin,
    );
    spotModalElement.style.left = `${position.left}px`;
    spotModalElement.style.top = `${position.top}px`;
    spotModalElement.style.right = "auto";
    return;
  }

  if (markerName === "WaterfallMarker") {
    const position = applyMusicSafeBounds(
      { left: margin, top: margin },
      frameWidth,
      frameHeight,
      margin,
    );
    spotModalElement.style.left = `${position.left}px`;
    spotModalElement.style.top = `${position.top}px`;
    spotModalElement.style.right = "auto";
    return;
  }

  let left = window.innerWidth - frameWidth - margin;
  let top = margin;

  if (loadedModel) {
    const marker = loadedModel.getObjectByName(markerName);
    if (marker) {
      const markerScreenPos = marker
        .getWorldPosition(new THREE.Vector3())
        .project(camera);

      const screenX = (markerScreenPos.x * 0.5 + 0.5) * window.innerWidth;
      const screenY = (-markerScreenPos.y * 0.5 + 0.5) * window.innerHeight;

      left = screenX < window.innerWidth * 0.55
        ? screenX + 28
        : screenX - frameWidth - 28;
      top = screenY - frameHeight * 0.35;
    }
  }

  if (markerName === "BridgeMarker") {
    left += 240;
  }

  const adjustedPosition = applyMusicSafeBounds(
    { left, top },
    frameWidth,
    frameHeight,
    margin,
  );

  left = adjustedPosition.left;
  top = adjustedPosition.top;

  left = Math.min(window.innerWidth - frameWidth - margin, Math.max(margin, left));
  top = Math.min(window.innerHeight - frameHeight - margin, Math.max(margin, top));

  spotModalElement.style.left = `${left}px`;
  spotModalElement.style.top = `${top}px`;
  spotModalElement.style.right = "auto";
}

function autoplaySpotVideo(videoElement) {
  videoElement.autoplay = true;
  videoElement.muted = false;
  const playResult = videoElement.play();

  if (playResult && typeof playResult.catch === "function") {
    playResult.catch(() => {
      videoElement.muted = true;
      videoElement.play().catch(() => {});
    });
  }
}

function closeSpotFrame() {
  const videoElement = spotModalElement.querySelector("#spotDetailsVideo");
  videoElement.pause();
  videoElement.currentTime = 0;
  activeSpotMarkerName = null;
  if (goFrameTransitionTimer) {
    clearTimeout(goFrameTransitionTimer);
    goFrameTransitionTimer = null;
  }
  spotModalElement.classList.remove("is-open");
  spotModalElement.setAttribute("aria-hidden", "true");
}

function showSpotModalWithTransition(markerName) {
  const videoElement = spotModalElement.querySelector("#spotDetailsVideo");

  if (!spotModalElement.classList.contains("is-open")) {
    showSpotModal(markerName);
    return;
  }

  if (goFrameTransitionTimer) {
    clearTimeout(goFrameTransitionTimer);
    goFrameTransitionTimer = null;
  }

  videoElement.pause();
  spotModalElement.classList.remove("is-open");

  goFrameTransitionTimer = setTimeout(() => {
    showSpotModal(markerName);
    goFrameTransitionTimer = null;
  }, goFrameTransitionMs);
}

if (spotModalCloseButton) {
  spotModalCloseButton.addEventListener("click", closeSpotFrame);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && spotModalElement.classList.contains("is-open")) {
    closeSpotFrame();
  }
});

const hoverCard = createHoverCard();

const markerTourButton = createMarkerTourButton();
const backSceneButton = createBackSceneButton();

function createMarkerTourButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "marker-tour-button";
  button.setAttribute("aria-label", "Go to the next place marker");
  button.title = "Go to the next place marker";
  button.textContent = "Go";
  button.disabled = true;

  button.addEventListener("click", () => {
    if (!loadedModel) return;

    const markerName = markerTourOrder[markerTourIndex % markerTourOrder.length];
    markerTourIndex += 1;
    goToMarker(markerName);
    showSpotModalWithTransition(markerName);
  });

  document.body.appendChild(button);
  return button;
}

function createBackSceneButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "scene-back-button";
  button.setAttribute("aria-label", "Back to main menu");
  button.title = "Back to Main Menu";
  button.textContent = "← Back to Main Menu";

  button.addEventListener("click", returnToMainScene);

  document.body.appendChild(button);
  return button;
}

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

  const videoElement = spotModalElement.querySelector("#spotDetailsVideo");
  const fallbackElement = spotModalElement.querySelector("#spotDetailsVideoFallback");

  spotModalElement.querySelector("#spotDetailsModalLabel").textContent = info.title;

  if (info.video) {
    videoElement.src = info.video;
    videoElement.poster = info.image || "";
    videoElement.style.display = "block";
    fallbackElement.textContent = "";
  } else {
    videoElement.removeAttribute("src");
    videoElement.load();
    videoElement.poster = info.image || "";
    videoElement.style.display = "none";
    fallbackElement.textContent = "No video available for this marker yet.";
  }

  spotModalElement.querySelector("#spotDetailsDescription").textContent =
    info.longDescription || info.description;

  activeSpotMarkerName = markerName;
  videoElement.currentTime = 0;
  spotModalElement.classList.add("is-open");
  spotModalElement.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => positionSpotFrame(markerName));

  if (info.video) {
    autoplaySpotVideo(videoElement);
    videoElement.onloadedmetadata = () => {
      if (activeSpotMarkerName) {
        positionSpotFrame(activeSpotMarkerName);
      }
    };
  }
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

    // loading is complete: enable enter button
    if (typeof window.__setLoadingReady === "function") window.__setLoadingReady();


    const box = new THREE.Box3().setFromObject(loadedModel);
    const center = box.getCenter(new THREE.Vector3());
    loadedModel.position.sub(center);

    controls.target.copy(islandCenter);
    camera.position.set(40, 0, 50);
    controls.update();

    if (pendingShowcaseZoom) {
      startIslandShowcaseZoom();
      pendingShowcaseZoom = false;
    }

    markerTourButton.disabled = false;

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
    // allow user to proceed even if model failed
    if (typeof window.__setLoadingReady === "function") window.__setLoadingReady();
    const loader = document.getElementById("loadingScreen");
    if (loader) loader.setAttribute("data-state", "exiting");
  },
);

// Once the model is loaded, enable enter button and hide loader after a short delay
// (The GLB callback sets loadedModel, so we hook into it below.)
const __origLoaderCallback = loader.load;

// Note: we don't replace loader.load; we instead rely on the GLTF success callback where we set loadedModel.


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
  if (event.key === "1") {
    goToMarker("CaveMarker");
    showSpotModalWithTransition("CaveMarker");
  }
  if (event.key === "2") {
    goToMarker("BeachMarker");
    showSpotModalWithTransition("BeachMarker");
  }
  if (event.key === "3") {
    goToMarker("HutMarker");
    showSpotModalWithTransition("HutMarker");
  }
  if (event.key === "4") {
    goToMarker("MountainMarker");
    showSpotModalWithTransition("MountainMarker");
  }
  if (event.key === "5") {
    goToMarker("CoveMarker");
    showSpotModalWithTransition("CoveMarker");
  }
  if (event.key === "6") {
    goToMarker("RoadMarker");
    showSpotModalWithTransition("RoadMarker");
  }
  if (event.key === "7") {
    goToMarker("BridgeMarker");
    showSpotModalWithTransition("BridgeMarker");
  }
  if (event.key === "8") {
    goToMarker("WaterfallMarker");
    showSpotModalWithTransition("WaterfallMarker");
  }
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

  if (activeSpotMarkerName && spotModalElement.classList.contains("is-open")) {
    positionSpotFrame(activeSpotMarkerName);
  }
});
