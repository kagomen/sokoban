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

## CSS

- z-index
  - position 指定された要素や flex 要素にしか効かない
