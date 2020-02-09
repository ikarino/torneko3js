# torneko3js
PS2ゲーム「トルネコ3」のJavaScriptライブラリです。

このライブラリは[scs](https://github.com/ikarino/scs)の移植が中心ですが、
モンスターの能力値を計算する等の機能を備えています。

# インストール

## Nodejsの場合
```
npm install --save torneko3js
```

## ブラウザの場合
調べてない

# 使い方の例
```js
import { Manager, sampleSCSInputs } from 'torneko3js';

const inp = sampleSCSInputs['4キラーマ倍速'];
const m = new Manager(inp);
m.trial();
console.log(m.toJson());
```

# 実装
- [x] scs移植
- [x] キラーマ、ホイミン、キノコの特技実装
- [x] kompotaさんの分裂方向実装
- [x] 転ばぬ先の杖さんの半ホイミンスモコン
- [ ] ペンコン
- [ ] その他特技実装
- [ ] 行動順補助用の関数

## ホイミンの行動

1. 周囲の傷ついたキャラの数を取得
1. ホイミ発動を判断（ランダム）
1. 攻撃可能なキャラの数を取得  <= ホイミと同じように攻撃可能なキャラごとに判定するモデル
1. 攻撃を判断（ランダム）
1. 移動可能なマスの数を取得
1. いっしょにいてね、はぐれ状態の場合、移動を判断（ランダム）

## ダメージ計算式

