## JavaScript

- 配列操作メソッド

  - reduce()

    ```js
    const arr = [1, 2, 3, 4];

    const sum = arr.reduce((sum, num) => {
      return sum + num;
    }, 0);

    // 0はsumの初期値
    ```

  - concat()

    ```js
    const arr1 = ["a", "b", "c"];
    const arr2 = ["d", "e", "f"];
    const arr3 = arr1.concat(arr2);

    // arr3 = ["a", "b", "c", "d", "e", "f"];
    ```

  - structuredClone()
    - 多次元配列の場合、スプレッド構文ではネストされた配列はクローンされない。
    - `structuredClone()`はネストされた配列まで一気にクローン可能。

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

  - サイドエフェクトインポート
    - ただファイルを実行する
    ```js
    import "./foo.js";
    ```

- localStorage

  - クライアントサイドでのみデータの使用が可能
  - 永続的にデータを保存する

  ```js
  localStorage.setItem("keyName", "value");
  localStorage.getItem("keyName");
  ```

  - 注意点
    - localStorage に set した値はすべて文字列に変換されるので、数字や真偽値を扱う際は注意する

- sessionStorage

  - クライアントサイドでのみデータの使用が可能
  - ブラウザを閉じるとデータは破棄される

- cookie
  - クライアントサイドとサーバーサイドの両方でデータの使用が可能
  - データの保存期間を設定できる

## CSS

- z-index

  - position 指定された要素や flex 要素にしか効かない

- CSS Nest

  - ほとんどのブラウザで使用可能！
  - https://caniuse.com/?search=css%20nest
  - 少し前のバージョンの Safari は未対応なのでユーザーが Safari をアップデートしていない場合、CSS が反映されない

- touch-action: manipulation;

  - スマホでのダブルタップ時にズームされるのを無効にする

- dvh

  - iPhone の Safari で下に URL ボックスが表示され、`vh`が思い通りに機能をしないのを防ぐ
  - https://webrandum.net/ios-safari-dvh/

- -webkit-user-select: none;

  - Safari だと`user-select: none;`が効かない

- -webkit-touch-callout: none;

  - 画像などを長押しした際に出現するポップアップを無効にする

- hidden

  > ウェブブラウザーは display: none を使用して hidden 状態を実装することができ、その場合、その要素はページレイアウトに参加しません。これはまた、hidden 状態の要素で CSS の display プロパティの値を変更すると、その状態が上書きされるということでもあります。例えば、display: block とスタイル設定された要素は、hidden 属性があるにもかかわらず、表示されることになります。

  `display: flex`なども同様で、`flex`を使用している要素に`hidden = true`としても実行されない

- `p .title`
  - p タグの子要素の title クラスを指定
- `p.title`

  - title クラスを持つ p タグを指定

- `@import`を使うメリット

  - html がすっきりする
  - ファイルごとに`@charset: 'UTF-8';`を書かなくて済む

- Autoprefixer

  - サポート対象にしたいブラウザを設定すると自動的にベンダープレフィックス（-webkit-, -moz-, -ms-）を付け、必要であれば構文の変更もしてくれるツール

    | -webkit- | Google Chrome, Safari |
    | -moz- | Firefox |
    | -ms- | IE |

## Sass(SCSS)

- @forward

  - ファイルを呼び出して展開する
  - 中継ファイルなどで使用する

- @use

  - 名前空間を保ったままファイルを呼び出す
  - `@use '<ファイル名>' as *;`でファイルを呼び出すと、`@forward`のような使い方ができる
  - パーシャルファイルは、呼び出し時は`_`と`.scss`を省略できる

- パーシャルファイル

  - `_<ファイル名>.scss`とすることで、css ファイルを吐き出さない sass ファイルになる

- settings.json

  - 吐き出す css ファイルのディレクトリを指定する

- @mixin

  - コンポーネントのような形で css を定義する
  - `@mixin button {...}`と定義する
  - 使用する際は`@include button`と呼び出す
  - `@mixin button($color)`などとして、引数の設定が可能
    - `@mixin button($color: blue)`としてデフォルト値の設定も可能
