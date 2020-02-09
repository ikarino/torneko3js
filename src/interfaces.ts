// interfaces.ts
// 

export interface SCSMapInput {
  row: number,
  col: number,
  data: number[],
}

export interface SCSFriendInput {
  name: string,
  lv: number,
  doubleSpeed: boolean,
  hpDope: number,
  atkDope?: number,
  weakenAtk: number,
  weakenDef: number,
  isSealed: boolean,
  isSticked?: boolean,
}

export interface SCSConfigInput {
  turn: number,
  trial: number,
}

export interface SCSInput {
  friends: SCSFriendInput[],
  map: SCSMapInput,
  config: SCSConfigInput,
}

export interface SCSTrialOutput {
  result: boolean,
  reason: string,
  friendOrderKilled: number,
  exp: {
    total: number,
    perTurn: number,
    perMonster: number[],
    perMonsterPerTurn: number[],
  },
  loss: {
    action: number[],
    division: number[],
  },
  turnPassed: number,
}

export interface Place {
  row: number,
  col: number,
}

export interface ProbabilityConfig {
  attack: number,        // 通常攻撃があたる確率
  divide: number,        // スモールグールの分裂確率
  kinoko: number,        // おばけキノコの特技使用率
  hoimi: number,         // ホイミスライムの特技使用率
  hoimiAttack: number,   // ホイミスライムの非封印時攻撃確率
  hoimiMove: number,     // [半ホイミン用]ホイミスライムの移動確率
  hoimiMoveTurn: number, // [半ホイミン用]ホイミスライムの移動開始ターン
}
  