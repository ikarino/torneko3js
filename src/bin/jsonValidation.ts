import * as t from 'io-ts'

export const JSCSInput = t.type({
  friends: t.array(t.type({
    name: t.string,
    lv: t.number,
    weakenAtk: t.union([t.number, t.undefined]),
    doubleSpeed: t.union([t.boolean, t.undefined]),
  })),
  field: t.type({
    row: t.number,
    col: t.number,
    data: t.array(t.number)
  }),
  config: t.type({
    turn: t.number,
    trial: t.number
  })
});