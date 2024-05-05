import { g, canvas } from './canvas.js';

const goal = new Image();
goal.src = 'assets/tiles/goal.png';
const cheese = new Image();
cheese.src = 'assets/tiles/cheese.png';
const wall = new Image();
wall.src = 'assets/tiles/wall.png';
const mouse = new Image();
mouse.src = 'assets/tiles/mouse.png';

export function draw(tileMap, playerPosX, playerPosY) {
  g.fillStyle = '#000000';
  g.fillRect(0, 0, canvas.width, canvas.height);

  // 通路: 000(0)
  // 目的地: 001(1)
  // 荷物: 010(2)
  // 壁: 110(6)
  for (let y = 0; y < tileMap.length; y++) {
    for (let x = 0; x < tileMap[y].length; x++) {
      if (tileMap[y][x] & 0x1) {  // 001とAND演算 => 目的地(001)と荷物&目的地(011)のみtrueを返す
        g.drawImage(goal, x * 24, y * 24, 24, 24);  // 目的地を描画
      }
      if ((tileMap[y][x] & 0x6) == 2) {  // 110とAND演算 => 荷物(010)と荷物&目的地(011)のみ2(010)を返す
        g.drawImage(cheese, x * 24, y * 24, 24, 24);  // 荷物を描画
      }
      if (tileMap[y][x] == 0x6) {  // 6は壁のみ
        g.drawImage(wall, x * 24, y * 24, 24, 24);  // 壁を描画
      }
    }
  }
  g.drawImage(mouse, playerPosX * 24, playerPosY * 24, 24, 24);  // プレイヤーポジションにプレイヤーを描画
}