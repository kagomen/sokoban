'use strict';

const tiles = new Image();
tiles.src = 'assets/tiles.png';

const data = [
  // 迷路データ（0：通路、1：目的地、2：荷物、6：壁 ）
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 2, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 0, 0, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 0, 0, 2, 0, 0, 2, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 0, 6, 0, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 0, 0, 0, 6, 0, 6, 6, 6, 0, 6, 6, 6, 6, 0, 0, 1, 1, 6, 6],
  [6, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 6, 6],
  [6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 0, 6, 0, 6, 0, 0, 1, 1, 6, 6],
  [6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];

let goalArr = [];
const goalEl = 2;

let playerPosX = 12;
let playerPosY = 8;

const canvas = document.querySelector('canvas');
const g = canvas.getContext('2d');

const dpr = window.devicePixelRatio || 1; // dprに対応していないPCの場合、1を返す
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
canvas.width = CANVAS_WIDTH * dpr;
canvas.height = CANVAS_HEIGHT * dpr;
g.scale(dpr, dpr);
canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;

window.addEventListener('load', () => {

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === goalEl) {
        goalArr.push(data[i][j]);
      }
    }
  }

  draw();
});

window.addEventListener('keydown', (e) => {
  pressKey(e.code);
});

function pressKey(key) {
  let x1 = playerPosX;  // 現在のコマからx軸方向に1コマ離れた場所
  let y1 = playerPosY;  // 現在のコマからy軸方向に1コマ離れた場所
  let x2 = playerPosX;  // 現在のコマからx軸方向に2コマ離れた場所
  let y2 = playerPosY;  // 現在のコマからy軸方向に2コマ離れた場所
  switch (key) {
    case 'ArrowLeft':
      x1 -= 1;
      x2 -= 2;
      break;
    case 'ArrowRight':
      x1 += 1;
      x2 += 2;
      break;
    case 'ArrowUp':
      y1 -= 1;
      y2 -= 2;
      break;
    case 'ArrowDown':
      y1 += 1;
      y2 += 2;
      break;
  }

  if ((data[y1][x1] & 0x2) == 0) {  // 1コマ先が通路か目的地だったら
    playerPosX = x1;
    playerPosY = y1;
  } else if ((data[y1][x1] & 0x6) == 2) {  // 1コマ先が荷物だったら
    if ((data[y2][x2] & 0x2) == 0) {  // 2コマ先が通路か目的地だったら
      data[y1][x1] ^= 2;  // 2 => 2以外にする
      data[y2][x2] |= 2;  // 0か1 => 2にする
      playerPosX = x1;
      playerPosY = y1;
    }
  }

  draw();
  checkAndDisplayGameClear();
}

function draw() {
  g.fillStyle = 'black';
  g.fillRect(0, 0, canvas.width, canvas.height);

  // 通路: 000(0)
  // 目的地: 001(1)
  // 荷物: 010(2)
  // 壁: 110(6)
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] & 0x1) {  // 001とAND演算 => 目的地(001)のみtrueを返す
        g.drawImage(tiles, 608, 192, 16, 16, x * 20, y * 20, 20, 20);
      }
      if ((data[y][x] & 0x6) == 2) {  // 110とAND演算 => 荷物(010)のみ2(010)を返す
        g.drawImage(tiles, 544, 256, 16, 16, x * 20, y * 20, 20, 20);
      }
      if (data[y][x] == 0x6) {  // 6は壁のみ
        g.drawImage(tiles, 16, 272, 16, 16, x * 20, y * 20, 20, 20);
      }
    }
  }
  g.drawImage(tiles, 288, 113, 16, 16, playerPosX * 20, playerPosY * 20, 20, 20);  // プレイヤーポジションに描画
}