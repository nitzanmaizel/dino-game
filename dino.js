import { incrementCustomProperty, setCustomProperty, getCustomProperty } from "./updateCustomProperty.js";

const dinoElem = document.querySelector("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;

export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `imgs/dino-stationary.png`;
    return;
  }
  // After FRAME_TIME is passed change the dino source image
  if (currentFrameTime >= FRAME_TIME) {
    // dinoFrame will change between 1 and 0
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT; // (0+1) % 2 = 1 || (1+1) % 2 = 0
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME; // reset frame time
  }

  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) {
    return;
  }

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}
