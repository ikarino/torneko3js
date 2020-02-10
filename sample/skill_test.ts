/**
 * 半ホイミンの実行サンプル
 */

import { Manager } from '../src/Manager';
import { SCSFriendInput, SCSInput } from '../src/interfaces';
import { defaultProbabilityConf } from '../src/config';

let inp: SCSInput = {
  friends: [],
  field: {
    row: 10,
    col: 10,
    data: [
      1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
      1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
      1,  1,  1,  0, 15,  0,  1,  1,  1,  1,
      1,  1, 10, 11, 12, 13, 14,  1,  1,  1,
      1,  1,  9,  9,  9,  9,  1,  1,  1,  1,
      1,  1,  0,  0,  0,  0,  1,  1,  1,  1,
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

let friends: SCSFriendInput[] = [];
for (let i = 0; i < 4; i++) {
  friends.push(
    {
      name: "キラーマシン",
      lv: 18,
      weakenAtk: 6,
    }
  );
}
for (let j = 0; j < 2; j++) {
  friends.push(
    {
      name: "ホイミスライム",
      lv: 30,
    }
  );
}
for (let i = 0; i < 4; i++) {
  friends.push(
    {
      name: "キラーマシン",
      lv: 30,
    }
  );
}

friends[6].name = "スライムブレス";
friends[7].name = "ドラゴスライム";
friends[8].name = "ドラゴメタル";
friends[9].name = "はねせんにん";



inp.friends = friends;

const m = new Manager(inp, defaultProbabilityConf);
for (let i = 0; i < 10; i++ ) {
  m.trial();
  const j = m.toJson();
  console.log(j.exp.perTurn);
}
