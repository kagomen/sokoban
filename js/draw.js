import { g, canvas } from './canvas.js';

const tiles = new Image();
tiles.src = 'assets/tiles.png';

export function draw(tileMap, playerPosX, playerPosY) {
  g.fillStyle = 'black';
  g.fillRect(0, 0, canvas.width, canvas.height);

  // 通路: 000(0)
  // 目的地: 001(1)
  // 荷物: 010(2)
  // 壁: 110(6)
  for (let y = 0; y < tileMap.length; y++) {
    for (let x = 0; x < tileMap[y].length; x++) {
      if (tileMap[y][x] & 0x1) {  // 001とAND演算 => 目的地(001)と荷物&目的地(011)のみtrueを返す
        g.drawImage(tiles, 608, 192, 16, 16, x * 24, y * 24, 24, 24);  // 目的地を描画
      }
      if ((tileMap[y][x] & 0x6) == 2) {  // 110とAND演算 => 荷物(010)と荷物&目的地(011)のみ2(010)を返す
        g.drawImage(tiles, 544, 256, 16, 16, x * 24, y * 24, 24, 24);  // 荷物を描画
      }
      if (tileMap[y][x] == 0x6) {  // 6は壁のみ
        g.drawImage(tiles, 16, 272, 16, 16, x * 24, y * 24, 24, 24);  // 壁を描画
      }
    }
  }
  g.drawImage(tiles, 288, 113, 16, 16, playerPosX * 24, playerPosY * 24, 24, 24);  // プレイヤーポジションにプレイヤーを描画
}