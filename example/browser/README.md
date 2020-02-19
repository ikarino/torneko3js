# ブラウザでの利用
`index.html`を参考にしてください。

1. `torneko3.bunde.js`を読み込む
1. `require('torneko3')`でライブラリを取ってくる
1. 入力JSONを作る（`index.html`はsampleを呼び出しています）
1. `Manager`を生成し、計算を実行させる

```html
<script src="torneko3.bundle.js"></script>
<script type="text/javascript">
  console.log("hello torneko3js");
  var torneko3 = require('torneko3');
  var inp = torneko3.sampleSCSInputs["4キラーマ倍速"];
  var m = new torneko3.Manager(inp);
  m.trial(); // 一回だけ実行
  document.getElementById("input").innerText = JSON.stringify(inp, null, "　　");
  document.getElementById("result").innerText = JSON.stringify(m.toJson(), null , "　　");
</script>

```