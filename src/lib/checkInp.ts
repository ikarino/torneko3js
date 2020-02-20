// checkInp.ts
//

import { SCSInput, SCSFriendInput } from './interfaces';

const checkInp = (inp: SCSInput): void => {
  // friends
  if (inp.friends.length < 1 || inp.friends.length > 10) {
    throw new Error('length of friend must be in 1..10');
  }
  for (const f of inp.friends) {
    checkFriend(f);
  }

  // field
  const { row, col, data } = inp.field;
  if (!Number.isInteger(row) || row < 1) {
    throw new Error('field.row must be positive integer.');
  }
  if (!Number.isInteger(col) || col < 1) {
    throw new Error('field.col must be positive integer.');
  }
  if (row * col !== data.length) {
    throw new Error(`invalid field size: ${col}*${row} !== ${data.length}`);
  }
  const allowedData = [0, 1, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  for (const d of data) {
    if (!allowedData.includes(d)) {
      throw new Error(`invalid input in field.data: ${d}`);
    }
  }
  for (let friendIndex = 0; friendIndex < inp.friends.length; friendIndex++) {
    if (!data.includes(friendIndex + 10)) {
      throw new Error(`${10 + friendIndex} not in field.data`);
    }
  }

  // config
  const { turn, trial } = inp.config;
  if (!Number.isInteger(trial)) throw new Error('config.trial must be integer');
  if (trial <= 0) throw new Error('config.trial must be positive');
  if (!Number.isInteger(turn)) throw new Error('config.turn must be integer');
  if (turn <= 0) throw new Error('config.turn must be positive');
};

const checkFriend = (f: SCSFriendInput): void => {
  if (!Number.isInteger(f.lv) || f.lv < 1 || f.lv > 99) {
    throw new Error('lv must be in 1..99');
  }
  if (f.hpDope && (!Number.isInteger(f.hpDope) || f.hpDope < 0)) {
    throw new Error('hpDope must be non-negative integer.');
  }
  if (f.atkDope && (!Number.isInteger(f.atkDope) || f.atkDope < 0)) {
    throw new Error('atkDope must be non-negative integer.');
  }
  if (f.weakenAtk && ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(f.weakenAtk)) {
    throw new Error('weakenAtk must be in [0, 1, 2, 3, 4, 5, 6, 8, 9].');
  }
  if (f.weakenDef && ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(f.weakenDef)) {
    throw new Error('weakenDef must be in [0, 1, 2, 3, 4, 5, 6].');
  }
  if (f.isSticked !== undefined && !f.isSticked && f.name !== 'ホイミスライム') {
    throw new Error(`${f.name} must be "isSticked: true"`);
  }
};

export default checkInp;
