const mask = document.getElementById('mask');
const clearScreen = document.getElementById('clear-screen');

export function checkAndDisplayGameClear(tileMap, goalArr) {
  const clearArr = [];
  for (let y = 0; y < tileMap.length; y++) {
    for (let x = 0; x < tileMap[y].length; x++) {
      if (tileMap[y][x] == 0x3) {  // 目的地の上に荷物があったら
        clearArr.push(tileMap[y][x]);
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