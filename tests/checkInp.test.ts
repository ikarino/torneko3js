import checkInp from "../src/lib/checkInp";
import { SCSInput, SCSFieldInput } from "../src/lib/interfaces";

describe('checkInp', (): void => {
  test('friend length', (): void => {
    const inp0 = {
      friends: [],
      field: {col: 0, row: 0, data: []},
      config: {trial: 0, turn: 0}
    }
    expect(() => checkInp(inp0)).toThrow(Error);
  });
  test('checkFriend', (): void => {
    const inp0: SCSInput = {
      friends: [{name: "スモールグール", lv: 1}],
      field: {col: 1, row: 1, data: [10]},
      config: {trial: 1, turn: 1}
    }
    inp0.friends = [{name: "スモールグール", lv: -1}];
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.friends = [{name: "スモールグール", lv: 1, hpDope: -1}];
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.friends = [{name: "スモールグール", lv: 1, atkDope: -1}];
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.friends = [{name: "スモールグール", lv: 1, weakenAtk: 0.5}];
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.friends = [{name: "スモールグール", lv: 1, weakenDef: -1}];
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.friends = [{name: "スモールグール", lv: 1, isSticked: false}];
    expect(() => checkInp(inp0)).toThrow(Error);

  });
  test('checkField', (): void => {
    const inp0 = {
      friends: [{name: "スモールグール", lv: 1}],
      field: {col: 0, row: 0, data: [0]},
      config: {trial: 0, turn: 0}
    }

    inp0.field = {col: -1, row: 1, data: [10]};
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.field = {col: 1, row: -1, data: [10]};
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.field = {col: 1, row: 1, data: [0, 0]};
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.field = {col: 1, row: 1, data: [3]};
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.field = {col: 1, row: 1, data: [0]};
    expect(() => checkInp(inp0)).toThrow(Error);
  });

  test('checkConfig', (): void => {
    const inp0 = {
      friends: [{name: "スモールグール", lv: 1}],
      field: {col: 1, row: 1, data: [10]},
      config: {trial: 0, turn: 0}
    }

    inp0.config = {trial: -1, turn: 10};
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.config = {trial: 10, turn: -1};
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.config = {trial: 0.5, turn: 10};
    expect(() => checkInp(inp0)).toThrow(Error);
    inp0.config = {trial: 10, turn: 0.5};
    expect(() => checkInp(inp0)).toThrow(Error);
  });
});