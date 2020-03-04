<p align="center">
  <img src="https://github.com/ikarino/web-gscs/blob/master/public/logo.png?raw=true" width=40%>
</p>
<h2 align="center">torneko3js</h2>

![license](https://img.shields.io/github/license/ikarino/torneko3js)
![twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Fikarino%2Ftorneko3js)

PS2 ゲーム「トルネコ 3」の JavaScript ライブラリ及びスモコンシミュレータ`scs`です。  
TypeScript で開発しています。

- スモコンシミュレータ`scs`
- モンスターの能力値計算
- 行動順補助用の関数
- ~~解析データ~~

## ☣ インストール

### Nodejs の場合

```sh
npm install --save torneko3js
# or
yarn add torneko3js
```

### ブラウザの場合

[example/browser](https://github.com/ikarino/torneko3js/tree/master/example/browser)を参照してください。  
[browserify](http://browserify.org/)で bundle 化しています。

### google spreadsheet の場合

調べています。[clasp](https://github.com/google/clasp)を使うっぽい？

## ☣ 使用例

### `scs`(CLI ツール)

```sh
$ scs -h
Usage: scs [options]

Options:
  -V, --version      output the version number
  -d --debug         debug mode
  -i --input <path>  specify your json input file
  -h, --help         output usage information
```

### ライブラリ(JavaScript, TypeScript)

```js
import { Manager, sampleSCSInputs } from 'torneko3js';

const inp = sampleSCSInputs['4キラーマ倍速'];
const m = new Manager(inp);
m.trial();
console.log(m.toJson());
```

## ☣ 実装

### システム

- [x] scs 移植
- [x] kompota さんの分裂方向
- [x] はぐれ状態ホイミン
- [x] 行動順補助用の関数
- [x] 解析データ

### 特技

確率が判明していないものも多いので、おいおい実装します。

- [x] キラーマシン／さそりかまきり
- [x] ホイミスライム
- [x] おばけキノコ
- [x] メイジももんじゃ／ハエまどう／はねせんにん
- [x] フライングデビル／ランガー／キングマーマン
- [x] ミステリードール／いしにんぎょう
- [x] スライムブレス／ドラゴスライム／ドラゴメタル
- [ ] さつじんき／エリミネーター
- [ ] シャドーナイト
- [x] リリパット／ドックスナイパー
- [x] ドラゴン
- [ ] 力をためる系（レノファイター／グレートホーン／あくましんかん）
- [ ] 単体状態異常系（タップペンギー／いわとびあくま／だいまどう／ダンスキャロット／あめふらし／テンツク／ラストテンツク／まどうし）
- [ ] おおめだま／キラープラスター
- [ ] デスマシーン
- [ ] 貝系（つのうしがい／しびれマイマイ）
- [ ] 人手系（おばけひとで／マージスター）
- [ ] 氷系（ひょうがまじん／ベビーニュート／ドラゴンキッズ／メラリザード）
- [ ] ギガンテス
- [ ] 敵に効果なし系（ゾンビマスター／シャーマン／がいこつけんし／どろにんぎょう／ベビーサタン）
- [x] きとうし／ようじゅつしは封印が前提となるため実装しない
- [x] カエル系は封印が前提となるため実装しない
- [x] 爆発系（デビルアンカー／リビングハンマー／キラースター／ばくだんいわ／メガザルロック）は実装しない
- [x] ゆうれいは scs を根本から見直す必要があるので実装しない
- [x] げんじゅつしはスモコンに悪影響なので実装しない
- [x] ダースドラゴンはスモコンに悪影響なので実装しない
- [x] コロマージはバイキルトが悪影響なので実装しない
- [x] トロルは意味が無いので実装しない
- [x] 鈍足（アイアンタートル）は面倒なので実装しない
- [x] モシャスナイトは複雑すぎるので実装しない

### 受身形効果

- [x] スモールグール
- [ ] ラリホーアント
- [ ] じごくのよろい
- [ ] モストン／おどるほうせき
- [x] カニ系や魔法無効化系はスモコン／ブラコンに影響しないので実装しない
- [x] ゾンビ系のホイミは確実に倒れるので実装しない

### ホイミンの行動モデル

1. 周囲の傷ついたキャラの数を取得
1. ホイミ発動を判断（ランダム） ← ダメージを負ったユニットごとに判定する
1. 攻撃可能なキャラの数を取得
1. 攻撃を判断（ランダム） ← 攻撃可能なユニットごとに判定する
1. 移動可能なマスの数を取得
1. いっしょにいてね、はぐれ状態の場合、移動を判断（ランダム）

## ☣ 入出力構成

全て JSON 形式です。  
詳細は[src/lib/interfaces.ts](https://github.com/ikarino/torneko3js/blob/master/src/lib/interfaces.ts)を参照してください。

## ☣ JSON validation

[typescript-json-schema](https://github.com/YousefED/typescript-json-schema)で雛形を作って整形した。

あとは[ajv](https://github.com/epoberezkin/ajv)に食わせただけ。
