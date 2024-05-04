export const canvas = document.querySelector('canvas');
export const g = canvas.getContext('2d');

const dpr = window.devicePixelRatio || 1; // dprに対応していないPCの場合、1を返す
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
canvas.width = CANVAS_WIDTH * dpr;
canvas.height = CANVAS_HEIGHT * dpr;
g.scale(dpr, dpr);
canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;