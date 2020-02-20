// mathFunctions.ts
// 数学関数
// https://qiita.com/phi/items/3b10288b02c87057c006

export const sum = (arr: number[]): number => {
  return arr.reduce((prev, current) => {
    return prev + current;
  });
};

export const mean = (arr: number[]): number => {
  return sum(arr) / arr.length;
};

export const std = (arr: number[]): number => {
  const m: number = mean(arr);
  const variance =
    arr
      .map(current => (current - m) ** 2)
      .reduce((prev, current) => {
        return prev + current;
      }) / arr.length;
  return Math.sqrt(variance);
};

type MeanAndStd = {
  mean: number[];
  std: number[];
};

export const getMeanAndStdFromArray = (arrs: number[][]): MeanAndStd => {
  let arrM: number[] = [];
  let arrS: number[] = [];
  for (let index = 0; index < arrs[0].length; index++) {
    arrM.push(mean(arrs.map(arr => arr[index])));
    arrS.push(std(arrs.map(arr => arr[index])));
  }
  return {
    mean: arrM,
    std: arrS,
  };
};
