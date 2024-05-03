import { checkAndDisplayGameClear } from './checkAndDisplayGameClear.js';
import { tileMap } from './tileMap.js';
import { draw } from './draw.js';

let goalArr = [];
let playerPosX = 12;
let playerPosY = 8;

window.addEventListener('load', () => {

  for (let i = 0; i < tileMap.length; i++) {
    for (let j = 0; j < tileMap[i].length; j++) {
      if (tileMap[i][j] === 2) {
        goalArr.push(tileMap[i][j]);
      }
    }
  }

  draw(tileMap, playerPosX, playerPosY);
});

window.addEventListener('keydown', (e) => {
  update(e.code);
});

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

  if ((tileMap[y1][x1] & 0x2) == 0) {  // 1コマ先が通路か目的地だったら
    playerPosX = x1;
    playerPosY = y1;

    // 6(110)とAND演算 => 2を返すのは2(010)と3(011)のみ
  } else if ((tileMap[y1][x1] & 0x6) == 2) {  // 1コマ先が荷物(010)か荷物&目的地(011)だったら
    if ((tileMap[y2][x2] & 0x2) == 0) {  // 2コマ先が通路(000)か目的地(001)だったら

      // 1コマ先のデータを再設定
      // 2(101)とXOR演算 => 荷物(010)の場合は0(000)、荷物&目的地(011)の場合は1(001)を代入
      tileMap[y1][x1] ^= 2;  // 

      // 2コマ先のデータを再設定
      // 2(010)とOR演算 => 通路(000)の場合は2(010)、目的地(001)の場合は3(011)を代入
      tileMap[y2][x2] |= 2;  // tileMap[y2][x2] = tileMap[y2][x2] | 2;

      playerPosX = x1;
      playerPosY = y1;
    }
  }

  draw(tileMap, playerPosX, playerPosY);
  checkAndDisplayGameClear(tileMap, goalArr);
}