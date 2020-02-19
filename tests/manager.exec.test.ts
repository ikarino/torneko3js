import { Manager } from "../src/lib/manager";
import { SCSInput } from "../src/lib/interfaces";
import { sampleInputs } from '../src/lib/sampleInputs';

describe('manager exec', (): void => {
  let template: SCSInput = {
    friends: [{name: "スモールグール", lv: 99}],
    field: {col: 3, row: 4, data: [1, 1, 1, 1, 9, 1, 1, 10, 1, 1, 1, 1]},
    config: {turn: 1, trial: 1}
  }
  test('ヒット確率を100%にするとkillCountは確実に1', (): void => {
    template.config.pConf = {basic: {attack: 1.0}};
    const m = new Manager(template);
    for(let i = 0; i < 100; i++) {
      m.trial();
      expect(m.killCount).toBe(1);
    }
  });

  test('ヒット確率を0%にするとkillCountは確実に0', (): void => {
    template.config.pConf = {basic: {attack: 0.0}};
    const m = new Manager(template);
    for(let i = 0; i < 100; i++) {
      m.trial();
      expect(m.killCount).toBe(0);
    }
  });

  test('サンプル実行', (): void => {
    for(let [name, inp] of Object.entries(sampleInputs)) {
      inp.config.trial = 1;
      const m = new Manager(inp);
      m.runAllTrial();
      m.summarizeOutputs();
    }
  });

  

});