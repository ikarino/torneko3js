// import { getOrder } from '../src/index';
import { getOrder } from '../src/actionOrder';

const input = [
  {
    data: "キラーマ1",
    place: {row: 0, col: 1}
  },
  {
    data: "キラーマ2",
    place: {row: 0, col: -1}
  },
  {
    data: "キラーマ9",
    place: {row: 4, col: -3}
  },
];

const result = getOrder(input);
console.log(result);