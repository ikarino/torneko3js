/**
 * 半ホイミンの実行サンプル
 */

import { Manager } from '../src/manager';
import { defaultProbabilityConf as pConf } from '../src/config';
import { SCSFriendInput, SCSInput } from '../src/interfaces';

const inp: SCSInput = {
    friends: [],
    field: {
      row: 10,
      col: 10,
      data: [
        1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
        1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
        1,  1,  1,  0, 15,  0,  1,  1,  1,  1,
        1,  1, 10, 11, 12, 13, 14,  1,  1,  1,
        1,  1,  9,  9,  9,  9,  9,  0,  1,  1,
        1,  1,  0,  0,  0,  0,  0,  1,  1,  1,
        1,  1, 16, 17, 18, 19,  1,  1,  1,  1,
        1,  1,  0,  0,  0,  0,  1,  1,  1,  1,
        1,  1,  0,  0,  0,  0,  1,  1,  1,  1,
        1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
      ]
    },
    config: {
      turn: 1500,
      trial: 1000,
    }
};

let friends: SCSFriendInput[] = [];
for (let i = 0; i < 5; i++) {
  friends.push({
      name: "キラーマシン",
      lv: 18,
      weakenAtk: 6,
  });
}
friends.push({
  name: "ホイミスライム",
  lv: 30,
  isSticked: false
});

for (let i = 0; i < 4; i++) {
  friends.push({
      name: "キラーマシン",
      lv: 30,
  });
}

// ホイミン倍速
friends[5].doubleSpeed = true;
inp.friends = friends;

const testFunc = (testInp: SCSInput) => {
  const m = new Manager(testInp);
  m.runAllTrial();
  return m.summarizeOutputs();
}

for (let hoimiMove = 0.2; hoimiMove <= 1.0; hoimiMove += 0.1) {
  for (let hoimiMoveTurn = 100; hoimiMoveTurn >= 0; hoimiMoveTurn -= 10) {
    pConf.hoimin.move = hoimiMove;
    pConf.hoimin.moveTurn = hoimiMoveTurn;
    inp.config.pConf = pConf;
    const out = testFunc(inp);
    console.log("移動確率: ", hoimiMove);
    console.log("移動開始ターン: ", hoimiMoveTurn);
    console.log(out)
    if (out.result.reason.killed === 0) {
      break;
    }
  }
}

