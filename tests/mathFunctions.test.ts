import { sum, mean, std, getMeanAndStdFromArray } from "../src/lib/mathFunctions";

describe('mathFunction', (): void => {
  const arr1 = [1, 2, 3, 4];
  test('sum/mean/std', (): void => {
    expect(mean(arr1)).toBe(2.5);
    expect(sum(arr1)).toBe(10);
    expect(std(arr1)**2).toBeCloseTo(1.25);
  });

  const arr2 = [
    [1, 2, 3, 4],
    [1, 2, 3, 4],
  ]
  test('getMeanAndStdFromArray', (): void => {
    const {mean, std} = getMeanAndStdFromArray(arr2);
    expect(mean).toStrictEqual([1, 2, 3, 4]);
    expect(std).toStrictEqual([0, 0, 0, 0])
  });
});