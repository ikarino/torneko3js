// unit.ts
// モンスター

import { getBasicMonsterStatus } from "./status";
import { SCSFriendInput, Place, ProbabilityConfig } from './interfaces';
import { defaultProbabilityConf } from "./config";

export class Unit {
  readonly name: string;
  lv: number;
  mhp: number = -1;
  chp: number = -1;
  atk: number = -1;
  def: number = -1;
  readonly recovery: number;
  exp: number;
  weakenAtk: number;
  weakenDef: number;
  isSealed: boolean;
  readonly hpDope: number;
  readonly atkDope: number;
  /*
   * 将来的な拡張
  isDancing: boolean;
  isConfused: boolean;
  isBline: boolean;
   */
  place: Place;
  pConf: ProbabilityConfig;
  constructor(inp: SCSFriendInput, place: Place, pConf: ProbabilityConfig) {
    this.name = inp.name;                                // モンスター名
    this.lv = inp.lv;                                    // Lv
    this.weakenAtk = inp.weakenAtk ? inp.weakenAtk : 0;  // 攻撃力弱化回数
    this.weakenDef = inp.weakenDef ? inp.weakenDef : 0;  // 防御力弱化回数
    this.atkDope = inp.atkDope ? inp.atkDope : 0;        // 攻撃力ドーピング
    this.hpDope = inp.hpDope ? inp.hpDope : 0;           // HPドーピング
    this.isSealed = inp.isSealed !== undefined ? inp.isSealed : false; // 封印状態
    this.place = place;                                  // 位置座標[row, col]
    this.pConf = pConf;                                  // 確率設定

    const status = getBasicMonsterStatus(inp.name, inp.lv);
    this.recovery = status.recovery;  // 回復定数
    this.exp = status.exp;            // 現在の経験値

    this.setHP();
    this.setAtk();
    this.setDef();
    this.chp = this.mhp;
  }

  setHP(): void {
    let mhp = getBasicMonsterStatus(this.name, this.lv).mhp0 + this.hpDope;
    this.mhp = mhp;
  }

  setAtk(): void {
    // ステータス表示上の攻撃力を取得
    let atk = getBasicMonsterStatus(this.name, this.lv).atk0 + this.atkDope;
    // 弱化回数に応じて攻撃力を減らす
    if (this.weakenAtk > 0) {
      // 弱化回数分だけ0.5倍する
      atk *= 0.5**this.weakenAtk;
    }
    if (this.weakenAtk === 9) {
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
    }
    // 小数点以下を切り捨てる
    def = Math.floor(def);
    this.def = def;
  }

  attack(enemy: Unit, fixedDamage: number = 0): boolean {
    if (this.atk === 0) {
      return false
    }
    if (Math.random() < this.pConf.attack) {
      const damage = fixedDamage === 0 ? (
        Math.round(Math.ceil(this.atk) * 1.3 * Math.pow(35/36, enemy.def) * (Math.random()/4 + 7.0/8)) 
      ) : fixedDamage;
      if (damage < 1.0) {
        enemy.chp -= 1.0;
      } else {
        enemy.chp -= damage;
      }
      return true;
    } else {
      return false;
    }
  }
  
  getMinAndMaxDamage(enemy: Unit): [number, number] {
    let minDamage = Math.round(Math.ceil(this.atk) * 1.3 * Math.pow(35/36, enemy.def) * 7.0/8);
    let maxDamage = Math.round(Math.ceil(this.atk) * 1.3 * Math.pow(35/36, enemy.def) * 9.0/8);
    minDamage = minDamage === 0 ? 1 : minDamage;
    maxDamage = maxDamage === 0 ? 1 : maxDamage;
    return [minDamage, maxDamage];
  }
}

export class Friend extends Unit {
  killCount:number = 0;
  divisionLossCount:number = 0;
  actionLossCount:number = 0;
  readonly doubleSpeed: boolean;
  readonly isSticked: boolean;

  constructor(inp: SCSFriendInput, place: Place, pConf: ProbabilityConfig) {
      super(inp, place, pConf);
      this.doubleSpeed = inp.doubleSpeed !== undefined ? inp.doubleSpeed : false;
      this.isSticked = inp.isSticked !== undefined ? inp.isSticked : true;
  }

  getExp(exp:number = 22): void {
    this.killCount += 1;
    this.exp += exp;

    while(getBasicMonsterStatus(this.name, this.lv+1).exp < this.exp) {
      const status0 = getBasicMonsterStatus(this.name, this.lv);
      const status1 = getBasicMonsterStatus(this.name, this.lv+1);

      this.lv += 1;
      this.mhp = status1.mhp0 + this.hpDope;
      this.chp += status1.mhp0 - status0.mhp0;
      this.setAtk();
      this.setDef();
    }
  }

  getDamage(damage: number) {
    this.chp -= damage;
  }

  naturalRecovery(): void {
    this.chp += this.mhp / this.recovery;
    if (this.chp > this.mhp) {
      this.chp = this.mhp;
    }
  }
}

export class Enemy extends Unit {
  readonly num: number;
  constructor(place: Place, num: number, pConf: ProbabilityConfig) {
    super({ name: "スモールグール", lv: 1 }, place, pConf);
    this.num = num;
  }
}
