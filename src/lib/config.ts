import pino from 'pino';
import { ProbabilityConfig } from './interfaces';

export const DefaultNumSumoLimit = 9;

export const logger = pino({
  level: 'silent',
  base: null,
  timestamp: false,
});

export const defaultProbabilityConf: ProbabilityConfig = {
  basic: {
    attack: 0.92,
    arrow: 0.88,
    divide: 0.25,
  },
  hoimin: {
    skill: 0.3553, // kompota君の成果
    attack: 0.3,
    move: 1.0,
    moveTurn: 50,
  },

  // 隣接角抜けなし特技系
  kinoko: {
    skill: 0.15,
  },
  merumon: {
    skill: 0.1,
  },
  mekira: {
    skill: 0.33,
  },
  haeru: {
    skill: 0.26,
  },
  haneji: {
    skill: 0.26, // 出典なし
  },
  mister: {
    skill: 0.12,
  },
  isshi: {
    skill: 0.1,
  },
  flida: {
    skill: 0.22,
  },
  rangas: {
    skill: 0.22,
  },
  rayman: {
    skill: 0.2, // 出典なし
  },

  // 隣接角抜けあり特技系
  lovelace: {
    skill: 0.2,
  },
  dragosu: {
    skill: 0.2,
  },
  drataru: {
    skill: 0.2,
  },

  // 視界影響なし直線上特技
  lily: {
    skill: 0.5,
    range: 10, // 射程
  },
  niper: {
    skill: 0.37,
    range: 10, // 射程
  },
  drango: {
    skill: 0.25,
    range: Infinity,
  },

  // さつじんきorエリミネーター
  kororin: {
    omoikkiri: 0.2,
    tsukon: 0.2,
  },
  emily: {
    omoikkiri: 0.2,
    tsukon: 0.2,
  },

  // 攻撃+特殊効果系
  baburusu: {
    skill: 0.5,
  },
};

export const monstersSkillAdjacentWOCorner: string[] = [
  'おばけキノコ',
  'メイジももんじゃ',
  'メイジキメラ',
  'ハエまどう',
  'はねせんにん',
  'フライングデビル',
  'ランガー',
  'ミステリードール',
  'いしにんぎょう',
];
export const monstersSkillAdjacentWCorner: string[] = [
  'スライムブレス',
  'ドラゴスライム',
  'ドラゴメタル',
];
export const monstersSkillAdjacent = monstersSkillAdjacentWOCorner.concat(
  monstersSkillAdjacentWCorner
);
