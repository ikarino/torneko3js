import checkInp from "../src/checkInp";

describe('checkInp', (): void => {
  test('friend length', (): void => {
    const inp0 = {
      friends: [],
      field: {col: 0, row: 0, data: []},
      config: {trial: 0, turn: 0}
    }
    expect(() => checkInp(inp0)).toThrow(Error);
  });
  test('checkFriend length', (): void => {
    const inp0 = {
      friends: [],
      field: {col: 0, row: 0, data: []},
      config: {trial: 0, turn: 0}
    }
    // inp0.friends = [{fuck: 'fuck'}];
    expect(() => checkInp(inp0)).toThrow(Error);
  });
});