/**
 * 特技のテスト用
 */

import { Manager } from '../../src/lib/manager';
import { SCSFriendInput, SCSInput } from '../../src/lib/interfaces';

let inp: SCSInput = {
  friends: [],
  field: {
    row: 10,
    col: 10,
    data: [
      1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
      1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
      1,  1,  1, 15,  0,  0,  1,  1,  1,  1,
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
      name: "John Doe",
      lv: 30,
    }
  );
}

friends[6].name = "スライムブレス";
friends[7].name = "ドラゴスライム";
friends[8].name = "ドラゴメタル";
friends[9].name = "はねせんにん";



inp.friends = friends;

const m = new Manager(inp);
m.runAllTrial();
console.log(m.summarizeOutputs());
