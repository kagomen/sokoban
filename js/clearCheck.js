'use strict';

const mask = document.getElementById('mask');
const clearScreen = document.getElementById('clear-screen');

function checkAndDisplayGameClear() {
  const clearArr = [];
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] == 0x3) {  // 目的地の上に荷物があったら
        clearArr.push(data[y][x]);
      }
    }
  }
  if (clearArr.length == goalArr.length) {
    mask.hidden = false;
    clearScreen.hidden = false;
  }
}

document.getElementById('next-stage-btn').addEventListener('click', () => {
  mask.hidden = true;
  clearScreen.hidden = true;
});