# torneko3js
PS2ゲーム「トルネコ3」のJavaScriptライブラリ及びスモコンシミュレータ`scs`です。  
TypeScriptで開発しています。

- [scs](https://github.com/ikarino/scs)の移植
- モンスターの能力値計算
- 行動順補助用の関数
- 解析データ

## インストール

### Nodejsの場合
```shell
npm install --save torneko3js
# or
yarn add torneko3js
```

### ブラウザの場合
[example/browser](https://github.com/ikarino/torneko3js/tree/master/example/browser)を参照してください。  
[browserify](http://browserify.org/)でbundle化しています。

### google spreadsheetの場合
調べています。[clasp](https://github.com/google/clasp)を使うっぽい？

## 使用例
### scs(CLIツール)
```bash
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

## 実装
### システム
- [x] scs移植
- [x] kompotaさんの分裂方向
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
- [ ] ドラゴン
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
- [x] ゆうれいはscsを根本から見直す必要があるので実装しない
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
1. ホイミ発動を判断（ランダム） ← ダメージを負ったユニットごとに判定するモデル
1. 攻撃可能なキャラの数を取得
1. 攻撃を判断（ランダム） ← 攻撃可能なユニットごとに判定するモデル
1. 移動可能なマスの数を取得
1. いっしょにいてね、はぐれ状態の場合、移動を判断（ランダム）

## 入力の構成
入力はJSON形式です。  
詳細は[src/lib/interfaces.ts](https://github.com/ikarino/torneko3js/blob/master/src/lib/interfaces.ts)を参照してください。  
以下の3つのパートに分かれています。
- friends: 仲間の情報（種類・レベル・弱化状態等）
- field: 仲間・壁・種スモの配置を表すフィールド
- config: 試行回数と試行ターン数、確率設定

### friends
以下の項目を行動順に合わせて10匹分、行動順に配列として与えます。
|入力|区分|詳細|
|:---:|:---:|:---|
|name|必須|キラーマシンなどの名前|
|lv|必須|レベル|
|doubleSpeed|オプション|倍速の場合はtrue。デフォルトはfalse（等速）。|
|hpDope   |オプション|HPドーピング量。デフォルトは0。|
|atkDope  |オプション|力ドーピング量。デフォルトは0。|
|weakenAtk|オプション|攻撃力弱化回数。デフォルトは0。|
|weakenDef|オプション|防御力弱化回数。デフォルトは0。|
|isSealed |オプション|封印状態の場合はtrue。デフォルトはfalse。|
|isSticked|オプション|いっしょにいてねの場合はfalse。デフォルトはtrue。ホイミン以外は強制的にtrue。|

### field
|入力|区分|詳細|
|:---:|:---:|:---|
|col|必須|行数（横方向のマスの数）|
|row|必須|列数（縦方向のマスの数）|
|data|必須|空白/壁/種スモ=0/1/9。仲間は10から連番で19まで。|

### config
|入力|区分|詳細|
|:---:|:---:|:---|
|trial|必須|試行回数|
|turn|必須|試行ターン数|
|pconf|オプション|確率設定|

## 出力の構成
1試行あたりの出力もJSON形式です。  
詳細は[src/lib/interfaces.ts](https://github.com/ikarino/torneko3js/blob/master/src/lib/interfaces.ts)を参照してください。  
以下の3つのパートに分かれています。
- result: 終了理由、経過ターン数等
- exp: 経験値関係
- loss: 行動ロス、分裂ロス

### result
|出力|詳細|
|:---:|:---|
|finishState|終状態。無事終了／仲間死亡／敵スモ消滅|
|turnPassed|終了時経過ターン数|
|orderOfKilledFriends|死亡した仲間（達）の行動順|

### exp
|出力|詳細|
|:---:|:---|
|total|全ターン合計の経験値|
|perTurn|ターンあたりの経験値|
|perMonster|モンスターごとの経験値|
|perMonsterPerTurn|ターンあたりのモンスターごとの経験値|

### loss
|出力|詳細|
|:---:|:---|
|action|行動しなかった割合|
|division|攻撃して生き残った試行のうち、分裂スペースが無かった割合|