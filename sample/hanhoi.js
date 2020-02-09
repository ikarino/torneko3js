/**
 * 半ホイミンの実行サンプル
 */

import { Manager } from '../dist/index';
const inp = {
    friends: [
      {
        name: "キラーマシン",
        lv: 18,
        doubleSpeed: false,
        hpDope: 0,
        weakenAtk: 6,
        weakenDef: 0,
        isSealed: false,
      },
      {
        name: "キラーマシン",
        lv: 18,
        doubleSpeed: false,
        hpDope: 0,
        weakenAtk: 6,
        weakenDef: 0,
        isSealed: false,
      },
      {
        name: "キラーマシン",
        lv: 18,
        doubleSpeed: false,
        hpDope: 0,
        weakenAtk: 6,
        weakenDef: 0,
        isSealed: false,
      },
      {
        name: "キラーマシン",
        lv: 18,
        doubleSpeed: false,
        hpDope: 0,
        weakenAtk: 6,
        weakenDef: 0,
        isSealed: false,
      },
      {
        name: "キラーマシン",
        lv: 18,
        doubleSpeed: false,
        hpDope: 0,
        weakenAtk: 6,
        weakenDef: 0,
        isSealed: false,
      },
      {
        name: "ホイミスライム",
        lv: 30,
        doubleSpeed: false,
        hpDope: 0,
        weakenAtk: 0,
        weakenDef: 0,
        isSealed: false,
        isSticked: false,
      },
      {
        name: "キラーマシン",
        lv: 13,
        doubleSpeed: false,
        hpDope: 0,
        weakenAtk: 0,
        weakenDef: 0,
        isSealed: false,
      },
      {
        name: "キラーマシン",
        lv: 13,
        doubleSpeed: false,
        hpDope: 0,
        weakenAtk: 0,
        weakenDef: 0,
        isSealed: false,
      },
      {
        name: "スモールグール",
        lv: 30,
        doubleSpeed: false,
        hpDope: 0,
        weakenAtk: 0,
        weakenDef: 0,
        isSealed: false,
      },
      {
        name: "キラーマシン",
        lv: 30,
        doubleSpeed: false,
        hpDope: 0,
        weakenAtk: 0,
        weakenDef: 0,
        isSealed: false,
      },
    ],
    map: {
      row: 10,
      col: 10,
      data: [
        1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
        1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
        1,  1,  1,  0, 15,  0,  1,  1,  1,  1,
        1,  1, 10, 11, 12, 13, 14,  1,  1,  1,
        1,  1,  9,  9,  9,  9,  9,  0,  1,  1,
        1,  1,  0,  0,  0,  0,  0,  1,  1,  1,
        1,  1, 19, 16, 17, 18,  1,  1,  1,  1,
        1,  1,  0,  0,  0,  0,  1,  1,  1,  1,
        1,  1,  0,  0,  0,  0,  1,  1,  1,  1,
        1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
      ]
    },
    config: {
      turn: 1500,
      trial: 100,
    }
};

// 確率設定
const probabilityConf = {
  attack: 0.92,
  divide: 0.25,
  kinoko: 0.10,
  hoimi: 0.3553, // kompota君の成果
  hoimiAttack: 0.30,
  hoimiMove: 1.00,
  hoimiMoveTurn: 80,
}
// ホイミン倍速
inp.friends[5].doubleSpeed = true;



const testFunc = () => {
  const m = new Manager(inp, probabilityConf);
  let count = 0;
  for (let i = 0; i < 100; i++ ) {
    m.trial();
    const j = m.toJson();
  
    if (j.reason === "friends are killed") {
      count += 1;
    }
    console.log(j.exp.perTurn);
  }
  return count;
}
testFunc()
/*
for (let hoimiMove = 0.2; hoimiMove <= 1.0; hoimiMove += 0.1) {
  for (let hoimiMoveTurn = 30; hoimiMoveTurn < 100; hoimiMoveTurn += 10) {
    probabilityConf.hoimiMove = hoimiMoveTurn;
    probabilityConf.hoimiMoveTurn = hoimiMoveTurn;
    const count = testFunc();
    console.log(hoimiMove, hoimiMoveTurn, count);
  }
}
*/

