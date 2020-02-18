// actionOrder.ts
// 行動準補助関数

import { Place } from './interfaces';

const colWeight = (col: number): number => {
  if (col < 0) {
    return -1/col;
  } else {
    return -col;
  }
}

export const createPlaceList = (lap: number): Place[] => {
  let list: Place[] = [];
  for(let col = -lap; col <= lap; col++) {
    for(let row = -lap; row <= lap; row++) {
      if(Math.abs(col) + Math.abs(row) === lap) {
        list.push({row, col})
      }
    }
  }

  return list.sort((p1: Place, p2: Place): number => {
    const cw1 = colWeight(p1.col);
    const cw2 = colWeight(p2.col);
    if (cw1 > cw2) {
      return -1
    }
    if (cw1 < cw2) {
      return 1
    }
    if (cw1 === cw2) {
      if (p1.row > p2.row) {
        return 1;
      } else if (p1.row < p2.row) {
        return -1;
      }
    }
    return 0;
  });
}

export const viewer = (lap: number): string => {
  const list = createPlaceList(lap);
  let log = "";
  for(let row = -lap; row <= lap; row++) {
    for(let col = -lap; col <= lap; col++) {
      const index = list.findIndex(p => p.col === col && p.row === row);
      if (index == -1) {
        log += " ";
      } else {
        log += index.toString();
      }
    }
    log += "\n";
  }
  return log;
}
// ここまでplaceOrderを作成するための関数

const placeOrder: Place[] = [
  // lap = 1
  { row: 0, col: -1 },
  { row: -1, col: 0 },
  { row: 1, col: 0 },
  { row: 0, col: 1 },
  // lap = 2
  { row: -1, col: -1 },
  { row: 1, col: -1 },
  { row: 0, col: -2 },
  { row: -2, col: 0 },
  { row: 2, col: 0 },
  { row: -1, col: 1 },
  { row: 1, col: 1 },
  { row: 0, col: 2 },
  // lap = 3
  { row: -2, col: -1 },
  { row: 2, col: -1 },
  { row: -1, col: -2 },
  { row: 1, col: -2 },
  { row: 0, col: -3 },
  { row: -3, col: 0 },
  { row: 3, col: 0 },
  { row: -2, col: 1 },
  { row: 2, col: 1 },
  { row: -1, col: 2 },
  { row: 1, col: 2 },
  { row: 0, col: 3 },
  // lap = 4
  { row: -3, col: -1 },
  { row: 3, col: -1 },
  { row: -2, col: -2 },
  { row: 2, col: -2 },
  { row: -1, col: -3 },
  { row: 1, col: -3 },
  { row: 0, col: -4 },
  { row: -4, col: 0 },
  { row: 4, col: 0 },
  { row: -3, col: 1 },
  { row: 3, col: 1 },
  { row: -2, col: 2 },
  { row: 2, col: 2 },
  { row: -1, col: 3 },
  { row: 1, col: 3 },
  { row: 0, col: 4 },
  // lap = 5
  { row: -4, col: -1 }, { row: 4, col: -1 },
  { row: -3, col: -2 }, { row: 3, col: -2 },
  { row: -2, col: -3 }, { row: 2, col: -3 },
  { row: -1, col: -4 }, { row: 1, col: -4 },
  { row: 0, col: -5 },  { row: -5, col: 0 },
  { row: 5, col: 0 },   { row: -4, col: 1 },
  { row: 4, col: 1 },   { row: -3, col: 2 },
  { row: 3, col: 2 },   { row: -2, col: 3 },
  { row: 2, col: 3 },   { row: -1, col: 4 },
  { row: 1, col: 4 },   { row: 0, col: 5 },
  // lap = 6
  { row: -5, col: -1 }, { row: 5, col: -1 },
  { row: -4, col: -2 }, { row: 4, col: -2 },
  { row: -3, col: -3 }, { row: 3, col: -3 },
  { row: -2, col: -4 }, { row: 2, col: -4 },
  { row: -1, col: -5 }, { row: 1, col: -5 },
  { row: 0, col: -6 },  { row: -6, col: 0 },
  { row: 6, col: 0 },   { row: -5, col: 1 },
  { row: 5, col: 1 },   { row: -4, col: 2 },
  { row: 4, col: 2 },   { row: -3, col: 3 },
  { row: 3, col: 3 },   { row: -2, col: 4 },
  { row: 2, col: 4 },   { row: -1, col: 5 },
  { row: 1, col: 5 },   { row: 0, col: 6 },
  // lap = 7
  { row: -6, col: -1 }, { row: 6, col: -1 },
  { row: -5, col: -2 }, { row: 5, col: -2 },
  { row: -4, col: -3 }, { row: 4, col: -3 },
  { row: -3, col: -4 }, { row: 3, col: -4 },
  { row: -2, col: -5 }, { row: 2, col: -5 },
  { row: -1, col: -6 }, { row: 1, col: -6 },
  { row: 0, col: -7 },  { row: -7, col: 0 },
  { row: 7, col: 0 },   { row: -6, col: 1 },
  { row: 6, col: 1 },   { row: -5, col: 2 },
  { row: 5, col: 2 },   { row: -4, col: 3 },
  { row: 4, col: 3 },   { row: -3, col: 4 },
  { row: 3, col: 4 },   { row: -2, col: 5 },
  { row: 2, col: 5 },   { row: -1, col: 6 },
  { row: 1, col: 6 },   { row: 0, col: 7 }
];


interface OrderInput {
  data: any,
  place: Place,
}

export const getOrder = (inp: OrderInput[]): OrderInput[] => {
  return inp.sort((inp1: OrderInput, inp2: OrderInput): number => {
    const index1 = placeOrder.findIndex((p: Place) => p.row === inp1.place.row && p.col === inp1.place.col);
    const index2 = placeOrder.findIndex((p: Place) => p.row === inp2.place.row && p.col === inp2.place.col);

    if (index1 === -1) {
      throw new Error(`invalid place: ${inp1.place}`);
    }
    if (index2 === -1) {
      throw new Error(`invalid place: ${inp2.place}`);
    }

    if (index1 > index2) {
      return 1;
    } else if (index1 < index2) {
      return -1;
    }
    return 0;
  });
}
