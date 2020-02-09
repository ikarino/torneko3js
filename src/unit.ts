// unit.ts
// モンスター

import { getBasicMonsterStatus } from "./status";
import { Place, ProbabilityConfig } from './interfaces';
import { defaultProbabilityConf } from "./manager";
import { REFUSED } from "dns";

export class Unit {
  name: string;
  lv: number;
  mhp: number;
  chp: number;
  atk: number;
  def: number;
  recovery: number;
  exp: number;
  weakenAtk: number;
  weakenDef: number;
  isSealed: boolean;
  atkDope: number;
  /*
   * 将来的な拡張
  isDancing: boolean;
  isConfused: boolean;
  isBline: boolean;
   */
  pAttack: number;
  place: Place;
  pconf: Object;
  constructor(name: string, lv: number, weakenAtk: number, weakenDef: number, atkDope:number, place: Place, pConf: ProbabilityConfig) {
    const status = getBasicMonsterStatus(name, lv);

    this.name = name;
    this.lv = lv;
    this.place = place;
    this.pconf = pConf;
    this.weakenAtk = weakenAtk;
    this.weakenDef = weakenDef;

    this.mhp = status.mhp0;           // 最大HP
    this.chp = status.mhp0;           // 現在HP
    this.atk = status.atk0;           // 弱化前攻撃力
    this.def = status.def0;           // 弱化前防御力
    this.recovery = status.recovery;  // 回復定数
    this.place = place;               // 位置座標[row, col]
    this.exp = status.exp;            // 現在の経験値
    this.pAttack = pConf.attack;      // 確率設定
    this.atkDope = atkDope;           // 攻撃力ドーピング

    this.isSealed = false;

    if (weakenAtk !== 0) { this.setAtk(); }
    if (weakenDef !== 0) { this.setDef(); }
  }

  setAtk(): void {
    // ステータス表示上の攻撃力を取得
    let atk = getBasicMonsterStatus(this.name, this.lv).atk0 + this.atkDope;
    // 弱化回数に応じて攻撃力を減らす
    if (this.weakenAtk < 9) {
      // 弱化回数分だけ0.5倍する
      atk *= 0.5**this.weakenAtk;
    } else if (this.weakenAtk === 9) {
      // 9回弱化されている場合は攻撃力0
      atk = 0;
    }
    // 小数点以下を切り上げる
    atk = Math.ceil(atk);
    this.atk = atk
  }

  setDef(): void {
    // ステータス表示上の防御力を取得
    let def = getBasicMonsterStatus(this.name, this.lv).def0;
    // 弱化回数に応じて防御力を減らす
    if (this.weakenDef === 0 ) {
      def *= 1;
    } else if (this.weakenDef === 1) {
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
    } else {
      throw new Error("invalid input of weakenDef: " + this.weakenDef);
    }
    // 小数点以下を切り捨てる
    def = Math.ceil(def);
    this.def = def;
  }

  attack(enemy: Unit): boolean {
    if (this.atk === 0) {
      return false
    }
    if (Math.random() < this.pAttack) {
      const damage = Math.ceil(this.atk) * 1.3 * Math.pow(35/36, enemy.def) * (448 + Math.floor(Math.random()*128))/512;
      if (Math.round(damage) < 1.0) {
        enemy.chp -= 1.0;
      } else {
        enemy.chp -= Math.round(damage);
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * 与えるダメージ分布を連想配列として返す関数。
   * scs内では使用していない。
   * @param enemy 攻撃対象
   * @returns ダメージ分布の連想配列
   */
  getDamagesDistribution(enemy: Unit): {[index: number]: number} {
    let result: {[index: number]: number} = {};
    for(let rand = 0; rand < 128; rand++) {
      let damage = Math.round(Math.ceil(this.atk) * 1.3 * Math.pow(35/36, enemy.def) * (448 + rand)/512);
      if (damage < 1.0) {
        damage = 1.0
      }
      if (result[damage] === undefined) {
        result[damage] = 1
      } else {
        result[damage] += 1;
      }
    }
    return result;
  }
}

export class Friend extends Unit {
  killCount = 0;
  divisionLossCount = 0;
  actionLossCount = 0;
  hpDope: number;
  doubleSpeed: boolean;
  isSticked: boolean;

  constructor(
    name: string, 
    lv: number, 
    place: Place,
    isSealed: boolean,
    doubleSpeed: boolean, 
    weakenAtk: number,
    weakenDef: number, 
    hpDope: number,
    atkDope: number,
    pConf: ProbabilityConfig,
    isSticked: boolean = true) {
      // name: string, lv: number, weakenAtk: number, weakenDef: number, atkDope:number, place: Place, pConf: ProbabilityConfig
      super(name, lv, weakenAtk, weakenDef, atkDope, place, pConf);
      this.isSealed = isSealed;
      this.hpDope = hpDope;
      this.doubleSpeed = doubleSpeed;
      this.isSticked = isSticked;

      this.mhp += hpDope;
      this.atk += atkDope;
  }

  getExp(exp=22): void {
    this.killCount += 1;
    this.exp += exp;

    while(getBasicMonsterStatus(this.name, this.lv).exp < this.exp) {
      const status0 = getBasicMonsterStatus(this.name, this.lv);
      const status1 = getBasicMonsterStatus(this.name, this.lv+1);

      this.lv += 1;
      this.mhp = status1.mhp0 + this.hpDope;
      this.chp += status1.mhp0 - status0.mhp0;
      this.setAtk();
      this.setDef();
    }
  }

  naturalRecovery(): void {
    this.chp += this.mhp / this.recovery;
    if (this.chp > this.mhp) {
      this.chp = this.mhp;
    }
  }
}

export class Enemy extends Unit {
  num: number;
  constructor(place: Place, num: number, pConf: ProbabilityConfig) {
    // name: string, lv: number, weakenAtk: number, weakenDef: number, atkDope:number, place: Place, pConf: ProbabilityConfig
    super("スモールグール", 1, 0, 0, 0, place, pConf);
    this.num = num;
  }
}
export const createFriend = (name: string, lv: number, weakenAtk: number = 0) => {
  return new Friend(name, lv, {row: -1, col: -1}, false, false, weakenAtk, 0, 0, 0, defaultProbabilityConf);
}