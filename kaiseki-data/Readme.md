かなり書きなぐっている Python スクリプトなので注意。

このライブラリでのサポートはやめました。

# 解析データの前処理

生解析データは html なので、Python で前処理する

```bash
# ダウンロード
wget https://img.atwikiimg.com/www37.atwiki.jp/toruneko3/attach/1/1/解析データ.zip

# 展開（unzipでは展開できなかった・・・）
unar 解析データ.zip

# htmlをjson化
python reader.py

# jsonをまとめて.tsに
python toTypescript.py
```

# 処理後の構成

```javascript
{
  dungeonName1: [
    {
      // 1F
      basic: {
        // 店率、MH率、フロアタイプ、罠率等
      },
      monster: {
        // 出現モンスター: [レベル, 出現率]
      },
      trap: {
        // 出現罠: 出現率
      },
      floor: {  // 床落ちアイテム
        "草": {
          probability: 0.0, // 全アイテム中の草カテゴリの出現率
          items: {
            // 出現する草: 草カテゴリの中での出現率
          }
        },
        ...
      },
      monoka: {},    // モノカで出現するアイテム。床落ちアイテムと同じ形式。
      shop: {},      // 店で出現するアイテム。床落ちアイテムと同じ形式。
      wall: {},      // 壁の中に出現するアイテム。床落ちアイテムと同じ形式。
      changePot: {}, // 変化の壺で出現するアイテム。床落ちアイテムと同じ形式。
    },
    {
      // 2F
    },
    ...
  ],
  dungeonName2: [],
  ...
}
```
