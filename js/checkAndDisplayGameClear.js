
export function checkAndDisplayGameClear(tileMap, goalArr) {
  const clearArr = [];
  for (let y = 0; y < tileMap.length; y++) {
    for (let x = 0; x < tileMap[y].length; x++) {
      if (tileMap[y][x] == 0x3) {  // 目的地の上に荷物があったら
        clearArr.push(tileMap[y][x]);
      }
    }
  }

  // 値が3のタイルの数と目的地の数が一致したら、クリア画面を表示
  if (clearArr.length == goalArr.length) {
    document.getElementById('mask').hidden = false;
    document.getElementById('clear-screen').hidden = false;
  }
}