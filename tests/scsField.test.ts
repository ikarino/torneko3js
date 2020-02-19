import { SCSField } from "../src/lib/scsField";

describe('SCSField', (): void => {
  const f = new SCSField({row: 5, col: 5, data: [
    1,  1,  1,  1,  1, 
    1, 10, 21, 23,  1, 
    1, 22, 11,  1,  1,
    1,  0,  0,  0,  1,
    1,  1,  1,  1,  1, 
  ]});
  test('getField', (): void => {
    expect(f.getField({row: 1, col: 1})).toBe(10);
  });
  test('setField', (): void => {
    f.setField({row: 1, col: 1}, 0);
    expect(f.getField({row: 1, col: 1})).toBe(0);
  });
  test('show', (): void => {
    expect(f.show()).toBe("#####\n# **#\n#*1##\n#   #\n#####\n");
  });
  /*
   *  #####
   *  # **#
   *  #*1##
   *  #   #
   *  #####
   */
  test('findTargets enemy=> friend', (): void => {
    expect(f.findTargets({row: 2, col: 1})).toEqual([11]);
    expect(f.findTargets({row: 1, col: 2})).toEqual([11]);
  });
  test('findTargets friend=> enemy', (): void => {
    expect(f.findTargets({row: 2, col: 2})).toEqual([21, 22]);
  });
  test('findVacants enemy=> empty', (): void => {
    expect(f.findVacants({row: 2, col: 1})).toEqual([
      {row: 1, col: 1},
      {row: 3, col: 1},
      {row: 3, col: 2},
    ]);
  });
  test('findVacants friend=> kadonuke', (): void => {
    expect(f.findVacants({row: 2, col: 2}, true)).toEqual([
      {row: 1, col: 1},
      {row: 3, col: 1},
      {row: 3, col: 2},
      {row: 3, col: 3},
    ]);
  });
  test('findTargets friend=> enemy, kadonuke', (): void => {
    const targets = f.findTargets({row: 2, col: 2}, true);
    expect(targets.length).toBe(3);
    expect(targets).toContain(21);
    expect(targets).toContain(22);
    expect(targets).toContain(23);
  });
});

describe('SCSField => findLineTargets', (): void => {
  const f = new SCSField({row: 7, col: 7, data: [
    1,  1,  1,  1,  1,  1,  1, 
    1, 21,  0, 22,  0, 23,  1, 
    1,  0,  0,  0,  0,  0,  1,
    1, 20,  0, 11,  0, 24,  1,
    1,  0,  0,  0,  0,  0,  1,
    1, 27,  0, 26,  0, 25,  1,
    1,  0,  1,  1,  1,  0,  1, 
  ]});
  test('find left', (): void => {
    expect(f.findLineTarget({row: 3, col: 3}, 1)).toBe(20);
  });
  test('find top left', (): void => {
    f.setField({row: 3, col: 2}, 1);
    expect(f.findLineTarget({row: 3, col: 3}, 1)).toBe(21);
  });
  test('find top', (): void => {
    f.setField({row: 2, col: 2}, 1);
    expect(f.findLineTarget({row: 3, col: 3}, 1)).toBe(22);
  });
  test('find top right', (): void => {
    f.setField({row: 2, col: 3}, 1);
    expect(f.findLineTarget({row: 3, col: 3}, 1)).toBe(23);
  });
  test('find right', (): void => {
    f.setField({row: 2, col: 4}, 1);
    expect(f.findLineTarget({row: 3, col: 3}, 1)).toBe(24);
  });
  test('find bottom right', (): void => {
    f.setField({row: 3, col: 4}, 1);
    expect(f.findLineTarget({row: 3, col: 3}, 1)).toBe(25);
  });
  test('find bottom', (): void => {
    f.setField({row: 4, col: 4}, 1);
    expect(f.findLineTarget({row: 3, col: 3}, 1)).toBe(26);
  });
  test('find bottom left', (): void => {
    f.setField({row: 4, col: 3}, 1);
    expect(f.findLineTarget({row: 3, col: 3}, 1)).toBe(27);
  });

  test('probability 0 => returns 0', (): void => {
    expect(f.findLineTarget({row: 3, col: 3}, 0, 100)).toBe(0);
  });
});