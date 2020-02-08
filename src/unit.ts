// unit.ts
// モンスター

import { getBasicMonsterStatus } from "./status";
import { Place, ProbabilityConfig } from './interfaces';
import { defaultProbabilityConf } from "./manager";

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
  /*
   * 将来的な拡張
  isDancing: boolean;
  isConfused: boolean;
  isBline: boolean;
   */
  pAttack: number;
  place: Place;
  pconf: Object;
  constructor(name: string, lv: number, weakenAtk: number, weakenDef: number, place: Place, pConf: ProbabilityConfig, ) {
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
    this.pAttack = pConf.attack;     // 確率設定

    this.isSealed = false;

    if (weakenAtk !== 0) { this.setAtk(); }
    if (weakenDef !== 0) { this.setDef(); }
  }

  setAtk(): void {
    this.atk = getBasicMonsterStatus(this.name, this.lv).atk0 * 0.5**this.weakenAtk;
    if (this.weakenAtk === 9) {
      this.atk = 0;
    }
  }

  setDef(): void {
    this.def = getBasicMonsterStatus(this.name, this.lv).def0;
    if (this.weakenDef === 1) {
      this.def *= 0.8;
    } else if (this.weakenDef === 2) {
      this.def *= 0.7;
    } else if (this.weakenDef === 3) {
      this.def *= 0.5;
    } else if (this.weakenDef === 4) {
      this.def *= 0.4;
    } else if (this.weakenDef === 5) {
      this.def *= 0.2;
    } else if (this.weakenDef === 6) {
      this.def *= 0.001;
    }
  }

  attack(enemy: Unit): boolean {
    if (this.atk === 0) {
      return false
    }
    if (Math.random() < this.pAttack) {
      const damage = Math.ceil(this.atk) * 1.3 * Math.pow(35/36, enemy.def) * (112 + Math.floor(Math.random()*32))/128;
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
}

export class Friend extends Unit {
  killCount = 0;
  divisionLossCount = 0;
  actionLossCount = 0;
  hpDope: number;
  atkDope: number;
  doubleSpeed: boolean;

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
    pConf: ProbabilityConfig) {
      super(name, lv, weakenAtk, weakenDef, place, pConf);
      this.isSealed = isSealed;
      this.hpDope = hpDope;
      this.atkDope = atkDope;
      this.doubleSpeed = doubleSpeed;

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
    super("スモールグール", 1, 0, 0, place, pConf);
    this.num = num;
  }
}
export const createFriend = (name: string, lv: number, weakenAtk: number = 0) => {
  return new Friend(name, lv, {row: -1, col: -1}, false, false, weakenAtk, 0, 0, 0, defaultProbabilityConf);
}