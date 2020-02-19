import { DebugManager } from '../../src/lib/debugManager';
import { sampleInputs } from '../../src/lib/sampleInputs';
 
const inp = sampleInputs["4キラーマ倍速"];
inp.friends[8].name = "ドッグスナイパー";
inp.config.turn = 5;

const m = new DebugManager(inp);
m.trial();