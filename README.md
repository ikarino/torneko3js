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

# Todo
- [x] scs移植
- [x] キラーマ、ホイミン、キノコの特技実装
- [x] kompotaさんの分裂方向実装
- [ ] 転ばぬ先の杖さんの半ホイミンスモコン
- [ ] 部屋スモコン
- [ ] ペンコン
- [ ] その他特技実装
- [ ] 行動順補助用の関数
