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
  attack: number,
  divide: number,
  kinoko: number,
  hoimi: number,
  hoimiAttack: number,
}
  