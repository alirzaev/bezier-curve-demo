import { dragElement } from "./drag-element.js";
import { drawBezierCurve } from "./bezier-curve.js";

function updatePointerPos(el, x, y) {
  const offsetX = el.offsetWidth / 2;
  const offsetY = el.offsetHeight / 2;

  el.style.top = `${y - offsetY}px`;
  el.style.left = `${x - offsetX}px`;
}

function updatePosInput(el, x, y) {
  el.value = `${x}, ${y}`;
}

function updateCurve(canvas, curve) {
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBezierCurve(ctx, curve, 100);
}

const canvas = document.querySelector("#canvas");
const width = canvas.width;
const height = canvas.height;

const curve = [
  [0, 0],
  [width, 0],
  [width, height],
  [0, height],
];

updateCurve(canvas, curve);

for (let i = 0; i < 4; ++i) {
  const el = document.querySelector(`#point${i + 1}`);
  const offsetX = el.offsetWidth / 2;
  const offsetY = el.offsetHeight / 2;

  const input = document.querySelector(`#point-${i + 1}-value`);
  updatePosInput(input, curve[i][0], curve[i][1]);
  updatePointerPos(el, curve[i][0], curve[i][1]);

  dragElement(el, (x, y) => {
    const posX = x + offsetX;
    const posY = y + offsetY;
    curve[i] = [posX, posY];

    updatePosInput(input, posX, posY);
    updateCurve(canvas, curve);
  });
}

const resetBtn = document.querySelector("#reset-curve");
resetBtn.onclick = () => {
  curve[0] = [0, 0];
  curve[1] = [width, 0];
  curve[2] = [width, height];
  curve[3] = [0, height];

  for (let i = 0; i < 4; ++i) {
    const el = document.querySelector(`#point${i + 1}`);
    const input = document.querySelector(`#point-${i + 1}-value`);

    updatePosInput(input, curve[i][0], curve[i][1]);
    updatePointerPos(el, curve[i][0], curve[i][1]);
  }

  updateCurve(canvas, curve);
};
