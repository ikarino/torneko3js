import { getLvByDexp, getBasicMonsterStatus } from "../src/status";

describe('status', (): void => {
  test('getBasicMonsterStatus: キラーマLv13の能力値確認', (): void => {
    const m = getBasicMonsterStatus('キラーマシン', 13);
    expect(m.mhp0).toBe(100);
    expect(m.atk0).toBe(37);
    expect(m.def0).toBe(60);
    expect(m.recovery).toBe(100);
    expect(m.exp).toBe(20000);
  });
  test('getBasicMonsterStatus: スモグルLv1の能力値確認', (): void => {
    const m = getBasicMonsterStatus('スモールグール', 1);
    expect(m.mhp0).toBe(55);
    expect(m.atk0).toBe(17);
    expect(m.def0).toBe(10);
    expect(m.recovery).toBe(50);
    expect(m.exp).toBe(0);
  });
  test('getBasicMonsterStatus: ホイミスライムLv30の能力値確認', (): void => {
    const m = getBasicMonsterStatus('ホイミスライム', 30);
    expect(m.mhp0).toBe(105);
    expect(m.atk0).toBe(71);
    expect(m.def0).toBe(49);
    expect(m.recovery).toBe(50);
    expect(m.exp).toBe(42000);
  });
  test('getBasicMonsterStatus: さそりかまきりLv1の能力値確認', (): void => {
    const m = getBasicMonsterStatus('さそりかまきり', 1);
    expect(m.mhp0).toBe(15);
    expect(m.atk0).toBe(11);
    expect(m.def0).toBe(10);
    expect(m.recovery).toBe(100);
    expect(m.exp).toBe(0);
  });
  
  test('getLvByDexp: 防御晩成は経験値1万でLv10になる', (): void => {
    const newLv = getLvByDexp('キラーマシン', 1, 10000);
    expect(newLv).toBe(10);
  });
});