import { checkAndDisplayGameClear, closeClearScreen } from './checkAndDisplayGameClear.js';
import { tileMaps } from './tileMaps.js';
import { draw } from './draw.js';

let playerPosX = 12;
let playerPosY = 8;
let tileMapCopy;
let currentStage = 0;

window.addEventListener('load', () => {
  init();
});

window.addEventListener('keydown', (e) => {
  update(e.code);
});

function init() {

  // 後で消す
  for (let i = 0; i < tileMaps.length; i++) {
    console.log(`ステージ${i}の長さ: `, tileMaps[i].length);
    for (let x = 0; x < tileMaps[i].length; x++) {
      console.log(tileMaps[i][x].length);
    }
  }

  for (let y = 0; y < tileMaps[currentStage].length; y++) {
    for (let x = 0; x < tileMaps[currentStage][y].length; x++) {
      if (tileMaps[currentStage][y][x] == '@') {
        playerPosX = x;
        playerPosY = y;
      }
    }
  }
  tileMapCopy = structuredClone(tileMaps[currentStage]);
  tileMapCopy[playerPosX][playerPosY] = 0;
  draw(tileMapCopy, playerPosX, playerPosY);
}

function update(pressedKey) {
  let x1 = playerPosX;  // 現在のコマからx軸方向に1コマ離れた場所
  let y1 = playerPosY;  // 現在のコマからy軸方向に1コマ離れた場所
  let x2 = playerPosX;  // 現在のコマからx軸方向に2コマ離れた場所
  let y2 = playerPosY;  // 現在のコマからy軸方向に2コマ離れた場所
  switch (pressedKey) {
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

  if ((tileMapCopy[y1][x1] & 0x2) == 0) {  // 1コマ先が通路か目的地だったら
    playerPosX = x1;
    playerPosY = y1;

    // 6(110)とAND演算 => 2を返すのは2(010)と3(011)のみ
  } else if ((tileMapCopy[y1][x1] & 0x6) == 2) {  // 1コマ先が荷物(010)か荷物&目的地(011)だったら
    if ((tileMapCopy[y2][x2] & 0x2) == 0) {  // 2コマ先が通路(000)か目的地(001)だったら

      // 1コマ先のデータを再設定
      // 2(101)とXOR演算 => 荷物(010)の場合は0(000)、荷物&目的地(011)の場合は1(001)を代入
      tileMapCopy[y1][x1] ^= 2;  // 

      // 2コマ先のデータを再設定
      // 2(010)とOR演算 => 通路(000)の場合は2(010)、目的地(001)の場合は3(011)を代入
      tileMapCopy[y2][x2] |= 2;  // tileMapCopy[y2][x2] = tileMapCopy[y2][x2] | 2;

      playerPosX = x1;
      playerPosY = y1;
    }
  }

  draw(tileMapCopy, playerPosX, playerPosY);
  checkAndDisplayGameClear(tileMapCopy);
}


document.getElementById('restart-btn').addEventListener('click', () => {
  init();
});

document.getElementById('next-stage-btn').addEventListener('click', () => {
  currentStage++;
  init();
  closeClearScreen();
});

document.getElementById('close-btn').addEventListener('click', () => {
  closeClearScreen();
});