import { Manager } from "../src/lib/manager";
import { SCSInput } from "../src/lib/interfaces";

describe('manager constructor', (): void => {
  let template: SCSInput = {
    friends: [{name: "スモールグール", lv: 99}],
    field: {col: 3, row: 4, data: [1, 1, 1, 1, 9, 1, 1, 10, 1, 1, 1, 1]},
    config: {turn: 1, trial: 1}
  }
  test('変なkey valueの確率で上書きしようとするとエラー', (): void => {
    template.config.pConf = {fuck: {fuck: 1.0}};
    expect(() => {
      const m = new Manager(template);
    }).toThrow(Error);
  });

});