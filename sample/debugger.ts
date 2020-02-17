import { DebugManager } from '../src/debugManager';
import { sampleInputs } from '../src/sampleInputs';
 
const inp = sampleInputs["4キラーマ倍速"];
inp.friends[8].name = "ドッグスナイパー";
inp.config.turn = 5;

const m = new DebugManager(inp);
m.trial();