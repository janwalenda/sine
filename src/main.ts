import { Percent } from "./class/Percent.ts";
import { SineWave } from "./class/SineWave.ts";
import './style.css'
import { viewPort } from "./helper/viewPort.ts";

const canvas = document.createElement('canvas');

let tmp: number;
let t = 0;
function createCanvas(canvas: HTMLCanvasElement, t: number) {
  const vp = viewPort(3);
  canvas.width = vp.vw;
  canvas.height = vp.vh;
  const vh = new Percent({ max: vp.vh, percent: 50 });
  const ctx = canvas.getContext('2d')!;

  const y0 = new SineWave({
    r: vp.vh,
    frequency: 0.003,
    index: t,
    y: viewPort(1.5).vw
  }).getPoint();

  const y1 = new SineWave({
    r: vp.vh,
    frequency: 0.007,
    index: t, y: viewPort(1.5).vw
  }).getPoint();

  const gradient = ctx.createLinearGradient(
    0,
    y0,
    vp.vw,
    y1
  );
  gradient.addColorStop(0, '#9b51e0');
  gradient.addColorStop(new SineWave({ r: 0.15, frequency: 0.07, index: t, y: 0.25 }).getPoint(), '#f543b8');
  gradient.addColorStop(0.5, '#ff5e8a');
  gradient.addColorStop(new SineWave({ r: 0.15, frequency: 0.04, index: t, y: 0.75 }).getPoint(), '#ff9263');
  gradient.addColorStop(1, '#ffc855');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, vp.vw, vp.vh);
  ctx.beginPath();
  const i = 10;
  const p80 = new Percent({ max: vp.vw, percent: 80 }).value;
  const sine = new SineWave({
    x: 0,
    y: new Percent({ max: vp.vh, percent: 50 }).value,
    r: 50,
    frequency: new SineWave({ r: 5, frequency: 0.005, index: t }).getPoint(),
    start: new Percent({ max: vp.vw, percent: 20 }).value,
    end: p80,
    resolution: 40,
  });
  sine.toCanvas(ctx);
  ctx.miterLimit = 1;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
}
function init() {
  createCanvas(canvas, t);
  tmp = requestAnimationFrame(init);
  t += 10;
}
document.body.appendChild(canvas);
tmp = requestAnimationFrame(init);
const a = document.querySelector('a')!;
let clicked = false;
const div = document.querySelector('div')!;
canvas.onclick = function (e) {
  if (!clicked) {
    cancelAnimationFrame(tmp);
    div.style.animation = 'fromRight 1s ease-in forwards';
    a.href = canvas.toDataURL('image/png', 1);
    a.download = `${Date.now()}_canvas.png`;
    a.title = "Download";
    clicked = true;
  } else {
    tmp = requestAnimationFrame(init);
    a.href = "";
    a.download = "";
    a.title = "";
    div.style.animation = 'fromLeft 1s ease-in forwards';
    clicked = false;
  }
};
onresize = function () {
  if (clicked) {
    createCanvas(canvas, t);
    a.href = canvas.toDataURL('image/png', 1);
    a.download = `${Date.now()}_canvas.png`;
    a.title = "Download";
  }
};
