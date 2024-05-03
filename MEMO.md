## JavaScript

- 配列操作メソッド

  - reduce

    ```js
    const arr = [1, 2, 3, 4];

    const sum = arr.reduce((sum, num) => {
      return sum + num;
    }, 0);

    // 0はsumの初期値
    ```

  - concat

    ```js
    const arr1 = ["a", "b", "c"];
    const arr2 = ["d", "e", "f"];
    const arr3 = arr1.concat(arr2);

    // arr3 = ["a", "b", "c", "d", "e", "f"];
    ```

- ES Module

  - 便利な特徴
    - `'use strict';`を宣言せずに strict モードが適用される
    - `defer`がデフォルトで適用される
    - モジュール空間
    - import 文が使える
  - 注意点

    - ファイルの階層が同じでも明示する必要がある
      ```
      // 同一階層の foo.js を取得
      import foo from './foo.js';
      // 上の階層の bar.js を取得
      import bar from '../bar.js';
      // ルートパスの baz.js を取得
      import baz from '/baz.js';
      // 以下は無効
      import foo from 'foo.js';
      ```
    - webpack を導入しないと import 時のファイルの拡張子は省略不可
    - `var`は使用不可

  - 単にファイルを実行する場合

## CSS

- z-index

  - position 指定された要素や flex 要素にしか効かない

- CSS Nest
  - ほとんどのブラウザで使用可能！
  - https://caniuse.com/?search=css%20nest
