import { checkAndDisplayGameClear } from './checkAndDisplayGameClear.js';
import { tileMaps } from './tileMaps.js';
import { draw } from './draw.js';
import { closeClearModal, closeHowToModal, openHowToModal } from './modal.js';
import { moveSound, changeStageSound, systemSound, soundOn, soundOff } from './sound.js';

let playerPosX;
let playerPosY;
let tileMapCopy;
let currentStage = 0;
let moveStack = [];
let playerPosXStack = [];
let playerPosYStack = [];

window.addEventListener('load', () => {

  // ローディング画面の表示
  setTimeout(() => {
    document.getElementById('loading-screen').hidden = true;
  }, 600);

  // 初訪問であればロード後にハウツーモーダルを開く
  if (localStorage.getItem('initialVisit') != 'false') {
    openHowToModal();
  }
  localStorage.setItem('initialVisit', 'false');

  init();
});

window.addEventListener('keydown', (e) => {
  update(e);
});

function init() {

  // マップからプレイヤー位置を特定して変数宣言する
  for (let y = 0; y < tileMaps[currentStage].length; y++) {
    for (let x = 0; x < tileMaps[currentStage][y].length; x++) {
      if (tileMaps[currentStage][y][x] == '@') {
        playerPosX = x;
        playerPosY = y;
      }
    }
  }

  tileMapCopy = structuredClone(tileMaps[currentStage]);
  tileMapCopy[playerPosY][playerPosX] = 0;
  draw(tileMapCopy, playerPosX, playerPosY);
}

function update(e) {
  let x1 = playerPosX;  // 現在のコマからx軸方向に1コマ離れた場所
  let y1 = playerPosY;  // 現在のコマからy軸方向に1コマ離れた場所
  let x2 = playerPosX;  // 現在のコマからx軸方向に2コマ離れた場所
  let y2 = playerPosY;  // 現在のコマからy軸方向に2コマ離れた場所

  // 矢印キーでの操作
  switch (e.code) {
    case 'ArrowUp':
      y1 -= 1;
      y2 -= 2;
      break;
    case 'ArrowLeft':
      x1 -= 1;
      x2 -= 2;
      break;
    case 'ArrowRight':
      x1 += 1;
      x2 += 2;
      break;
    case 'ArrowDown':
      y1 += 1;
      y2 += 2;
      break;
    default:
      return;
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

  moveSound.play();

  moveStack.push(structuredClone(tileMapCopy));
  playerPosXStack.push(playerPosX);
  playerPosYStack.push(playerPosY);

  draw(tileMapCopy, playerPosX, playerPosY);

  checkAndDisplayGameClear(tileMapCopy);
}

function undo() {
  if (moveStack.length > 1) {
    moveStack.pop();
    playerPosXStack.pop();
    playerPosYStack.pop();

    tileMapCopy = structuredClone(moveStack[moveStack.length - 1]);
    playerPosX = structuredClone(playerPosXStack[moveStack.length - 1]);
    playerPosY = structuredClone(playerPosYStack[moveStack.length - 1]);

    draw(tileMapCopy, playerPosX, playerPosY);
  } else {  // 1マス目まで戻ったら
    reset();
  }
}

function reset() {
  moveStack = [];
  playerPosXStack = [];
  playerPosYStack = [];
  init();
}


// ================ スマホ用矢印ボタンのクリックイベント ================

document.getElementById('up-btn').addEventListener('click', () => {
  update({ code: 'ArrowUp' });
});
document.getElementById('left-btn').addEventListener('click', () => {
  update({ code: 'ArrowLeft' });
});
document.getElementById('right-btn').addEventListener('click', () => {
  update({ code: 'ArrowRight' });
});
document.getElementById('down-btn').addEventListener('click', () => {
  update({ code: 'ArrowDown' });
});


// ====================== その他クリックイベント ======================

document.getElementById('undo-btn').addEventListener('click', () => {
  systemSound.play();
  undo();
});

window.addEventListener('keydown', (e) => {
  if (e.code == 'Backspace') {
    systemSound.play();
    undo();
  } else if (e.code == 'KeyR') {
    systemSound.play();
    reset();
  }
});

document.getElementById('reset-btn').addEventListener('click', () => {
  systemSound.play();
  reset();
});

const stageIndex = document.getElementById('stage-index');

document.getElementById('next-stage-btn').addEventListener('click', () => {
  if (currentStage < tileMaps.length - 1) {
    currentStage++;
    stageIndex.textContent = currentStage + 1;
    init();
    reset();
    changeStageSound.play();
  }
});

document.getElementById('prev-stage-btn').addEventListener('click', () => {
  if (currentStage > 0) {
    currentStage--;
    stageIndex.textContent = currentStage + 1;
    init();
    reset();
    changeStageSound.play();
  }
});

document.getElementById('close-btn').addEventListener('click', () => {
  closeClearModal();
  systemSound.play();
});

document.getElementById('clear-next-stage-btn').addEventListener('click', () => {
  currentStage++;
  stageIndex.textContent = currentStage + 1;
  init();
  reset();
  systemSound.play();
  closeClearModal();
});

document.getElementById('play-btn').addEventListener('click', () => {
  systemSound.play();
  closeHowToModal();
});

document.getElementById('how-to-btn').addEventListener('click', () => {
  systemSound.play();
  openHowToModal();
});

document.getElementById('page-title').addEventListener('click', () => {
  currentStage = 0;
  stageIndex.textContent = currentStage + 1;
  init();
  reset();
});

document.getElementById('sound-on-btn').addEventListener('click', () => {
  soundOn();
});

document.getElementById('sound-off-btn').addEventListener('click', () => {
  soundOff();
});