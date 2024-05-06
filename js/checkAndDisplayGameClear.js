import { clearSound } from './sound.js';

export function checkAndDisplayGameClear(tileMap) {

  let GoalIsLeft = false;

  for (let y = 0; y < tileMap.length; y++) {
    for (let x = 0; x < tileMap[y].length; x++) {
      if (tileMap[y][x] == 0x1) {  // 目的地(1)のコマがあるか調べる
        GoalIsLeft = true;
        return;
      }
    }
  }
  if (GoalIsLeft == false) {
    // クリア画面を表示
    document.getElementById('clear-mask').hidden = false;
    document.getElementById('clear-modal').hidden = false;

    clearSound.play();
  }
}