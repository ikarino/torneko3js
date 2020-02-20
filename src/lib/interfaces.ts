// interfaces.ts
// 

export interface SCSFieldInput {
  row: number,
  col: number,
  data: number[],
}

export interface SCSFriendInput {
  name: string,
  lv: number,
  doubleSpeed?: boolean,
  hpDope?: number,
  atkDope?: number,
  weakenAtk?: number,
  weakenDef?: number,
  isSealed?: boolean,
  isSticked?: boolean,
}

export interface SCSConfigInput {
  turn: number,
  trial: number,
  numSumoLimit?: number,
  pConf?: OverWriter,
}

export interface SCSInput {
  friends: SCSFriendInput[],
  field: SCSFieldInput,
  config: SCSConfigInput,
}

export interface SCSTrialOutput {
  result: {
    finishState: string,
    turnPassed: number,
    orderOfKilledFriends: number[],
  },
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
}

export interface SCSSummarizedOutput {
  result: {
    finishState: {
      success: number,
      killed: number,
      genocided: number,
    },
    turnPassed: {
      mean: number,
      std: number,
    },
    countOfKilledFriends: number[],
  },
  exp: {
    total: {
      mean: number,
      std: number,
    },
    perMonster: {
      mean: number[],
      std: number[],      
    }
  },
  loss: {
    action: {
      mean: number[],
      std: number[],      
    },
    division: {
      mean: number[],
      std: number[],      
    },
  }
}

export interface Place {
  row: number,
  col: number,
}

interface KaisekiDataItem {
  items: {[index: string]: number},
  probability: number,
}
interface KaisekiDataBasic {
  cursed: number,
  fake: number,
  floor: number,
  goldMax: number,
  goldMin: number,
  house: number,
  item: number,
  itemInWall: number,
  monster: number,
  pattern: number,
  shop: number,
  trap: number,
  treasure: number
}

export interface KaisekiDataFloor {
  basic: KaisekiDataBasic,
  floor: {[category: string]: KaisekiDataItem},
  wall: {[category: string]: KaisekiDataItem},
  monoka: {[category: string]: KaisekiDataItem},
  shop: {[category: string]: KaisekiDataItem},
  changePot: {[category: string]: KaisekiDataItem},
  monster: {[name: string]: number[]},
  trap: {[name: string]: number}
}

export interface OverWriter {
  [key: string]: {[index: string]: number}
}

export interface ProbabilityConfig {
  [key: string]: {[index: string]: number},
  basic: {
    attack: number,        // 通常攻撃があたる確率
    arrow: number,         // 投擲攻撃があたる確率
    divide: number,        // スモールグールの分裂確率
  },
  hoimin: {              // ホイミスライム
    skill: number,       // 特技使用率
    attack: number,      // ホイミスライムの非封印時攻撃確率
    move: number,        // [半ホイミン用]ホイミスライムの移動確率
    moveTurn: number,    // [半ホイミン用]ホイミスライムの移動開始ターン
  }

  // 隣接角抜けなし特技系
  kinoko: {              // おばけキノコ
    skill: number,
  },
  merumon: {             // メイジももんじゃ
    skill: number,
  },
  mekira: {              // メイジキメラ
    skill: number,
  },
  haeru: {               // ハエまどう
    skill: number,
  },
  haneji: {               // はねせんにん
    skill: number,
  },
  mister: {              // ミステリードール
    skill: number,
  },
  isshi: {               // いしにんぎょう
    skill: number,
  },
  flida: {               // フライングデビル
    skill: number,
  },
  rangas: {              // ランガー
    skill: number,
  },
  rayman: {              // キングマーマン
    skill: number,
  },

  // 隣接角抜けあり特技系
  lovelace: {
    skill: number,
  },
  dragosu: {
    skill: number
  },
  drataru: {
    skill: number
  },

  // 視界影響なし直線上特技
  lily: {
    skill: number,
    range: number,  // 射程
  },
  niper: {
    skill: number,
    range: number,  // 射程
  },
  drango: {
    skill: number,
    range: number
  },

  // さつじんきorエリミネーター
  kororin: {
    omoikkiri: number,
    tsukon: number, 
  },
  emily: {
    omoikkiri: number,
    tsukon: number, 
  },  
  
  // 攻撃+特殊効果系
  baburusu: {
    skill: number,
  },
}