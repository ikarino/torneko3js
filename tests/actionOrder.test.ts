import { getOrder, createPlaceList, viewer } from "../src/actionOrder";

describe('status', (): void => {
  test('行動順の並び替え確認', (): void => {
    const input = [
      {
        data: "キラーマ1",
        place: {row: 0, col: 1}
      },
      {
        data: "キラーマ2",
        place: {row: 0, col: -1}
      },
      {
        data: "キラーマ9",
        place: {row: 4, col: -3}
      },
    ];
    
    const result = getOrder(input);
    expect(result[0].data).toBe("キラーマ2");
    expect(result[1].data).toBe("キラーマ1");
    expect(result[2].data).toBe("キラーマ9");
  });
  test('createList', (): void => {
    const list1 = createPlaceList(1);
    expect(list1.length).toBe(4);
    expect(list1[0]).toStrictEqual({row: 0, col: -1});
    expect(list1[1]).toStrictEqual({row: -1, col: 0});
    expect(list1[2]).toStrictEqual({row: 1, col: 0});
    expect(list1[3]).toStrictEqual({row: 0, col: 1});
  });

  test('viewer', (): void => {
    const log = viewer(1);
    expect(log).toBe(" 1 \n0 3\n 2 \n");
  }); 
});