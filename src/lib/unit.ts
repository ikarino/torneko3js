// unit.ts
/**
 * トルネコ3のユニット関連
 * @packageDocumentation
 */

import { getBasicMonsterStatus } from './status';
import { SCSFriendInput, Place, ProbabilityConfig } from './interfaces';
import { logger } from './config';

/**
 * トルネコ3のユニットを表現するabstractクラス
 */
export class Unit {
  readonly name: string;
  lv: number;
  mhp: number = -1;
  chp: number = -1;
  atk: number = -1;
  def: number = -1;
  readonly recovery: number;
  readonly maximumLv: number;
  exp: number;
  readonly hpDope: number;
  readonly atkDope: number;
  weakenAtk: number;
  weakenDef: number;
  isSealed: boolean;
  // 将来的な拡張
  // isDancing: boolean;
  // isConfused: boolean;
  // isBline: boolean;
  place: Place;
  constructor(inp: SCSFriendInput, place: Place, readonly pConf: ProbabilityConfig) {
    this.name = inp.name; // モンスター名
    this.lv = inp.lv; // Lv
    this.weakenAtk = inp.weakenAtk ? inp.weakenAtk : 0; // 攻撃力弱化回数
    this.weakenDef = inp.weakenDef ? inp.weakenDef : 0; // 防御力弱化回数
    this.atkDope = inp.atkDope ? inp.atkDope : 0; // 攻撃力ドーピング
    this.hpDope = inp.hpDope ? inp.hpDope : 0; // HPドーピング
    this.isSealed = inp.isSealed !== undefined ? inp.isSealed : false; // 封印状態
    this.place = place; // 位置座標[row, col]

    const status = getBasicMonsterStatus(inp.name, inp.lv);
    this.recovery = status.recovery; // 回復定数
    this.exp = status.exp; // 現在の経験値
    this.maximumLv = status.maximumLv; // 最大LV

    this.setMHP();
    this.setAtk();
    this.setDef();
    this.chp = this.mhp;
  }

  /**
   * 生成時またはレベルアップに合わせて最大HPをセットする
   * ```
   * 種族とレベルから決まる最大HP + ドーピング量
   * ```
   */
  setMHP(): void {
    let mhp = getBasicMonsterStatus(this.name, this.lv).mhp0 + this.hpDope;
    this.mhp = mhp;
  }

  /**
   * 生成時またはレベルアップに合わせて攻撃力をセットする
   * ```
   * 小数点以下切り上げ{ (種族とレベルから決まる攻撃力 + ドーピング量) × 0.5^(弱化回数) }
   * ```
   */
  setAtk(): void {
    // ステータス表示上の攻撃力を取得
    let atk = getBasicMonsterStatus(this.name, this.lv).atk0 + this.atkDope;
    // 弱化回数に応じて攻撃力を減らす
    if (this.weakenAtk > 0) {
      // 弱化回数分だけ0.5倍する
      atk *= 0.5 ** this.weakenAtk;
    }
    if (this.weakenAtk >= 9) {
      // 9回弱化されている場合は攻撃力0
      atk = 0;
    }
    // 小数点以下を切り上げる
    atk = Math.ceil(atk);
    this.atk = atk;
  }

  /**
   * 生成時またはレベルアップに合わせて防御力をセットする
   * ```
   * 小数点以下切り下げ{ 種族とレベルから決まる防御力 × 弱化回数に応じた係数 }
   * ```
   */
  setDef(): void {
    // ステータス表示上の防御力を取得
    let def = getBasicMonsterStatus(this.name, this.lv).def0;
    // 弱化回数に応じて防御力を減らす
    if (this.weakenDef === 1) {
      def *= 0.8;
    } else if (this.weakenDef === 2) {
      def *= 0.7;
    } else if (this.weakenDef === 3) {
      def *= 0.5;
    } else if (this.weakenDef === 4) {
      def *= 0.4;
    } else if (this.weakenDef === 5) {
      def *= 0.2;
    } else if (this.weakenDef === 6) {
      def *= 0.001;
    } else if (this.weakenDef === 7) {
      def = 0;
    }
    // 小数点以下を切り捨てる
    def = Math.floor(def);
    this.def = def;
  }

  /**
   * ユニット間の攻撃の実装
   * ダメージ計算は以下の通り。ただし、計算結果が0となる場合は1に変わる。
   * ```
   * 整数に四捨五入{ 攻撃力 × 1.3 × (35/36)^防御力 × (7/8～9/8の一様乱数) }
   * ```
   * @param enemy 攻撃対象ユニット
   * @param fixedDamage 固定ダメージ(固定ダメージ特技の場合)
   * @returns 攻撃がヒットしたかどうか(分裂判定のフラグとして使用)
   */
  attack(enemy: Unit, fixedDamage: number = 0): boolean {
    // 1. 攻撃力が0の場合はおしまい
    if (this.atk === 0) {
      logger.debug(`様子を見ている because ${this.name}'s atk is 0`);
      return false;
    }
    // 2. 攻撃が外れた場合もおしまい
    if (Math.random() > this.pConf.basic.attack) {
      logger.debug(
        `attacked ${enemy.name} at [${enemy.place.row}, ${enemy.place.col}]: but missed.`
      );
      return false;
    }
    // 3. 攻撃が当たった場合のダメージ計算。
    // 固定ダメージかどうかで場合分け
    const damage =
      fixedDamage === 0
        ? Math.round(this.atk * 1.3 * Math.pow(35 / 36, enemy.def) * (Math.random() / 4 + 7 / 8))
        : fixedDamage;
    // 最終的なダメージが0の場合は1に変更
    if (damage < 1.0) {
      enemy.chp -= 1.0;
    } else {
      enemy.chp -= damage;
    }
    logger.debug(
      `attacked ${enemy.name} at [${enemy.place.row}, ${enemy.place.col}]: damage(${damage})`
    );
    return true;
  }

  /**
   * ダメージ計算確認用の関数。
   * @param enemy 攻撃対象ユニット
   * @returns [最小ダメージ, 最大ダメージ, 乱数を含めた平均ダメージ]
   */
  getMinAndMaxDamage(enemy: Unit): [number, number, number] {
    const RANDMAX = 256; // 乱数はとりあえず256分割
    const calc = (rand: number): number => {
      const damage = Math.round(
        Math.ceil(this.atk) * 1.3 * Math.pow(35 / 36, enemy.def) * (7 / 8 + rand / RANDMAX / 4)
      );
      return damage === 0 ? 1 : damage;
    };
    const minDamage = calc(0);
    const maxDamage = calc(RANDMAX - 1);
    let meanDamage = 0;
    for (let rand = 0; rand < RANDMAX; rand++) {
      meanDamage += calc(rand) / RANDMAX;
    }
    return [minDamage, maxDamage, meanDamage];
  }
}

/**
 * トルネコ3の仲間モンスターを表現するクラス
 */
export class Friend extends Unit {
  order: number;
  killCount: number = 0;
  divisionLossCount: number = 0;
  actionLossCount: number = 0;
  readonly doubleSpeed: boolean;
  readonly isSticked: boolean;

  constructor(inp: SCSFriendInput, order: number, place: Place, pConf: ProbabilityConfig) {
    super(inp, place, pConf);
    this.order = order;
    this.doubleSpeed = inp.doubleSpeed !== undefined ? inp.doubleSpeed : false;
    this.isSticked = inp.isSticked !== undefined ? inp.isSticked : true;
    logger.debug({
      name: this.name,
      mhp: this.mhp,
      atk: this.atk,
      def: this.def,
    });
  }

  getExp(exp: number = 22): void {
    this.killCount += 1;
    this.exp += exp;
    logger.debug(`get EXP`);
    if (this.lv === this.maximumLv) return;

    // レベルアップ処理
    while (getBasicMonsterStatus(this.name, this.lv + 1).exp < this.exp) {
      const status0 = getBasicMonsterStatus(this.name, this.lv);
      const status1 = getBasicMonsterStatus(this.name, this.lv + 1);

      this.lv += 1;
      this.mhp = status1.mhp0 + this.hpDope;
      this.chp += status1.mhp0 - status0.mhp0;
      this.setAtk();
      this.setDef();
      logger.debug(`lv up: ${this.lv - 1} -> ${this.lv}`);
    }
  }

  getDamage(damage: number) {
    this.chp -= damage;
  }

  naturalRecovery(): void {
    logger.debug(`natural recovery: ${(this.mhp / this.recovery).toFixed(2)}`);
    this.chp += this.mhp / this.recovery;
    if (this.chp > this.mhp) {
      this.chp = this.mhp;
    }
  }
}

/**
 * トルネコ3の敵スモグルを表現するクラス
 */
export class Enemy extends Unit {
  readonly num: number;
  constructor(place: Place, num: number, pConf: ProbabilityConfig) {
    super({ name: 'スモールグール', lv: 1 }, place, pConf);
    this.num = num;
  }
}
