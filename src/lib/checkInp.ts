// checkInp.ts
//

import { SCSInput, SCSFriendInput } from "./interfaces"

const checkInp = (inp: SCSInput): void => {
  // friends
  if (inp.friends.length !== 10) {
    throw new Error("invalid length of friends");
  }
  for (const f of inp.friends) {
    checkFriend(f);
  }

  // field
  const {row, col, data} = inp.field;
  if (row * col !== data.length) {
    throw new Error(`invalid field size: ${col}*${row} !== ${data.length}`);
  }
  const allowedData = [0, 1, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  for (const d of data) {
    if(!allowedData.includes(d)) {
      throw new Error(`invalid data in field: ${d}`);
    }
  }

  // config
  const { turn, trial } = inp.config
  if (!Number.isInteger(trial)) throw new Error('trial must be integer');
  if (trial <= 0) throw new Error('trial must be positive');
  if (!Number.isInteger(turn)) throw new Error('turn must be integer');
  if (turn <= 0) throw new Error('turn must be positive');
}

const checkFriend = (f: SCSFriendInput): void => {
  if (f.name === undefined) {
    throw new Error("name not specified !");
  }
  if (f.lv === undefined) {
    throw new Error("lv not specified !");
  }
  if (!Number.isInteger(f.lv)) {
    throw new Error("");
  }
  if (f.hpDope && (!Number.isInteger(f.hpDope) || f.hpDope < 0)) {
    throw new Error("hpDope must be non-negative integer.");
  }
  if (f.atkDope && (!Number.isInteger(f.atkDope) || f.atkDope < 0)) {
    throw new Error("atkDope must be non-negative integer.");
  }
  if (f.weakenAtk && ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(f.weakenAtk)) {
    throw new Error("weakenAtk must be in [0, 1, 2, 3, 4, 5, 6, 8, 9].");
  }
  if (f.weakenDef && ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(f.weakenDef)) {
    throw new Error("weakenDef must be in [0, 1, 2, 3, 4, 5, 6].");
  }
  if (f.isSticked !== undefined && f.isSticked && f.name !== "ホイミスライム") {
    throw new Error(`${f.name} must be "isSticked: true"`);
  }
}

export default checkInp;