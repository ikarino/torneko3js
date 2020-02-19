import { Friend, Enemy } from "../src/lib/unit";
import { defaultProbabilityConf } from '../src/lib/config';

describe('status', (): void => {
  test('Friend: 普通のキラーマLv13', (): void => {
    const km = new Friend(
      {
        name: 'キラーマシン',
        lv: 13,
      },
      0,
      {
        row: 0,
        col: 0,
      },
      defaultProbabilityConf
    );
    expect(km.mhp).toBe(100);
    expect(km.atk).toBe(37);
    expect(km.def).toBe(60);

    km.getDamage(20);
    expect(km.chp).toBe(80)
    km.naturalRecovery();
    expect(km.chp).toBe(81);
  });

  test('Friend: 弱化6回キラーマLv13', (): void => {
    const km = new Friend(
      {
        name: 'キラーマシン',
        lv: 13,
        weakenAtk: 6
      },
      0,
      {
        row: 0,
        col: 0,
      },
      defaultProbabilityConf
    );
    expect(km.mhp).toBe(100);
    expect(km.atk).toBe(1);
    expect(km.def).toBe(60);
  });

  test('Friend: ドーピングキラーマLv13', (): void => {
    const km = new Friend(
      {
        name: 'キラーマシン',
        lv: 13,
        hpDope: 5,
        atkDope: 15,
      },
      0,
      {
        row: 0,
        col: 0,
      },
      defaultProbabilityConf
    );
    expect(km.mhp).toBe(100+5);
    expect(km.atk).toBe(37+15);
    expect(km.def).toBe(60);

    km.getDamage(20);
    expect(km.chp).toBe(85)
    km.naturalRecovery();
    expect(km.chp).toBe(86.05);
  });

  test('Friend: 8, 9回弱化キラーマLv13', (): void => {
    defaultProbabilityConf.basic.attack = 1.0;
    const km1 = new Friend(
      {
        name: 'キラーマシン',
        lv: 13,
        weakenAtk: 9
      },
      0,
      {
        row: 0,
        col: 0,
      },
      defaultProbabilityConf
    );
    expect(km1.atk).toBe(0);
    
    const sm1 = new Enemy({row: 0, col: 0}, 0, defaultProbabilityConf);
    expect(km1.attack(sm1)).toBeFalsy();
    expect(sm1.chp).toBe(55);

    const km2 = new Friend(
      {
        name: 'キラーマシン',
        lv: 1,
        weakenAtk: 8
      },
      0,
      {
        row: 0,
        col: 0,
      },
      defaultProbabilityConf
    );
    expect(km2.atk).toBe(1);
    
    const sm2 = new Friend(
      {
        name: 'キラーマシン',
        lv: 99,
      },
      0,
      {
        row: 0,
        col: 0,
      },
      defaultProbabilityConf
    );;
    expect(km2.attack(sm2)).toBeTruthy();
    expect(sm2.chp).toBe(145);

  });
  test('Friend: キラーマLv13防御力弱化', (): void => {
    const km = new Friend(
      {
        name: 'キラーマシン',
        lv: 13,
        weakenDef: 1,
      },
      0,
      {
        row: 0,
        col: 0,
      },
      defaultProbabilityConf
    );
    expect(km.def).toBe(60*0.8);
    km.weakenDef += 1; km.setDef();
    expect(km.def).toBe(60*0.7);
    km.weakenDef += 1; km.setDef();
    expect(km.def).toBe(60*0.5);
    km.weakenDef += 1; km.setDef();
    expect(km.def).toBe(60*0.4);
    km.weakenDef += 1; km.setDef();
    expect(km.def).toBe(60*0.2);
    km.weakenDef += 1; km.setDef();
    expect(km.def).toBe(0);
  });

  test('Friend: キラーマLv1はスモグル3匹でレベルアップ', (): void => {
    const km = new Friend(
      {
        name: 'キラーマシン',
        lv: 1,
      },
      0,
      {
        row: 0,
        col: 0,
      },
      defaultProbabilityConf
    );

    km.getExp();
    km.getExp();
    km.getExp(22);
    
    km.getDamage(5);
    expect(km.killCount).toBe(3);
    expect(km.exp).toBe(66);
    expect(km.lv).toBe(2);
    expect(km.mhp).toBe(68);
    expect(km.chp).toBe(63);  // レベルアップでHP増えた分だけ回復しているか
  });
  test('attack hit', (): void => {
    defaultProbabilityConf.basic.attack = 1.0;
    const sm0 = new Enemy({row: 0, col: 0}, 0, defaultProbabilityConf);
    const sm1 = new Enemy({row: 0, col: 0}, 0, defaultProbabilityConf);
    expect(sm0.attack(sm1)).toBeTruthy;
  });
  test('attack not hit', (): void => {
    defaultProbabilityConf.basic.attack = 0.0;
    const sm0 = new Enemy({row: 0, col: 0}, 0, defaultProbabilityConf);
    const sm1 = new Enemy({row: 0, col: 0}, 0, defaultProbabilityConf);
    expect(sm0.attack(sm1)).toBeFalsy;
  });

  test('fixed damgae', (): void => {
    defaultProbabilityConf.basic.attack = 1.0;
    const sm0 = new Enemy({row: 0, col: 0}, 0, defaultProbabilityConf);
    const sm1 = new Enemy({row: 0, col: 0}, 0, defaultProbabilityConf);
    sm0.attack(sm1, 25);
    expect(sm1.chp).toBe(55-25);
  });

  test('get min and max damgae', (): void => {
    defaultProbabilityConf.basic.attack = 1.0;
    const sm0 = new Enemy({row: 0, col: 0}, 0, defaultProbabilityConf);
    const sm1 = new Enemy({row: 0, col: 0}, 0, defaultProbabilityConf);
    const [minDamage, maxDamage, meanDamage] = sm0.getMinAndMaxDamage(sm1);
    expect(minDamage).toBe(Math.round(17*1.3*(35/36)**10*7/8));
    expect(maxDamage).toBe(Math.round(17*1.3*(35/36)**10*9/8));
  });

  test('get min and max damgae', (): void => {
    defaultProbabilityConf.basic.attack = 1.0;
    const km1 = new Friend(
      {
        name: 'キラーマシン',
        lv: 1,
        weakenAtk: 8
      },
      0,
      {
        row: 0,
        col: 0,
      },
      defaultProbabilityConf
    );
    const km2 = new Friend(
      {
        name: 'キラーマシン',
        lv: 99,
      },
      0,
      {
        row: 0,
        col: 0,
      },
      defaultProbabilityConf
    );
    const [minDamage, maxDamage, meanDamage] = km1.getMinAndMaxDamage(km2);
    expect(minDamage).toBe(1);
    expect(meanDamage).toBe(1);
    expect(maxDamage).toBe(1);
  });

});