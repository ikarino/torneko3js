import { Manager } from '../../src/lib/manager';
import { sampleInputs } from '../../src/lib/sampleInputs';

const inp = sampleInputs['4キラーマ倍速'];
inp.config.pConf = {
  basic: {
    attack: 0,
  },
};
const m = new Manager(inp);
m.trial();
console.log(m.toJson());
