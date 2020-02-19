import { getBasicMonsterStatus } from "../src/lib/status";

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
  test('getBasicMonsterStatus: いたずらもぐらLv1の能力値確認', (): void => {
    const m = getBasicMonsterStatus('いたずらもぐら', 1);
    expect(m.mhp0).toBe(8);
    expect(m.atk0).toBe(6);
    expect(m.def0).toBe(5);
    expect(m.recovery).toBe(50);
    expect(m.exp).toBe(0);
  });  
  test('getBasicMonsterStatus: アトラスLv1の能力値確認', (): void => {
    const m = getBasicMonsterStatus('アトラス', 1);
    expect(m.mhp0).toBe(130);
    expect(m.atk0).toBe(60);
    expect(m.def0).toBe(48);
    expect(m.recovery).toBe(100);
    expect(m.exp).toBe(0);
  });  
  test('getBasicMonsterStatus: あやしいかげLv1の能力値確認', (): void => {
    const m = getBasicMonsterStatus('あやしいかげ', 1);
    expect(m.mhp0).toBe(5);
    expect(m.atk0).toBe(20);
    expect(m.def0).toBe(1);
    expect(m.recovery).toBe(50);
    expect(m.exp).toBe(0);
  });

  test('getBasicMonsterStatus: ゴーレムLv1の能力値確認', (): void => {
    const m = getBasicMonsterStatus('ゴーレム', 1);
    expect(m.mhp0).toBe(50);
    expect(m.atk0).toBe(20);
    expect(m.def0).toBe(20);
    expect(m.recovery).toBe(100);
    expect(m.exp).toBe(0);
  });
  
  test('getBasicMonsterStatus: スカイフロッグLv1の能力値確認', (): void => {
    const m = getBasicMonsterStatus('スカイフロッグ', 1);
    expect(m.mhp0).toBe(38);
    expect(m.atk0).toBe(9);
    expect(m.def0).toBe(10);
    expect(m.recovery).toBe(50);
    expect(m.exp).toBe(0);
  });

  test('getBasicMonsterStatus: あやしいかげLv1の能力値確認', (): void => {
    const m = getBasicMonsterStatus('あやしいかげ', 1);
    expect(m.mhp0).toBe(5);
    expect(m.atk0).toBe(20);
    expect(m.def0).toBe(1);
    expect(m.recovery).toBe(50);
    expect(m.exp).toBe(0);
  });

  test('getBasicMonsterStatus: 異常な入力', (): void => {
    expect(() => getBasicMonsterStatus('fucky', 1)).toThrow(Error);
    expect(() => getBasicMonsterStatus('キラーマシン', 0)).toThrow(Error);
  });

});