// scsManager.ts
//

import { Unit, Friend, Enemy } from './unit';
import { SCSField } from './scsField';
import { Place, SCSInput, ProbabilityConfig, SCSConfigInput, SCSSummarizedOutput, SCSTrialOutput } from './interfaces';
import { 
  defaultProbabilityConf,
  monstersSkillAdjacent,
  monstersSkillAdjacentWCorner,
  monstersSkillAdjacentWOCorner,
  logger
} from './config';
import checkInp from './checkInp';
import { mean, std, getMeanAndStdFromArray } from './mathFunctions';

/**
 * 0～N-1のランダムな整数を返す。
 * @param {Integer} n 自然数N
 */
const randint = (n: number): number => {
  return Math.floor(Math.random() * Math.floor(n));
};
  
const addPlace = (place1: Place, place2: Place): Place => {
  return {
    row: place1.row + place2.row,
    col: place1.col + place2.col
  }
};
  
export class Manager {
  inp: SCSInput;
  config: SCSConfigInput;
  pConf: ProbabilityConfig;
  friends: Friend[] = [];
  enemys: Enemy[] = [];
  killCount: number = 0;
  turnNow: number = 0;
  field: SCSField = new SCSField({row: 0, col: 0, data: []});
  trialOutputs: SCSTrialOutput[];
  constructor(inp: SCSInput) {
    checkInp(inp);
    this.inp = inp;
    this.pConf = inp.config.pConf ? inp.config.pConf : defaultProbabilityConf;
    this.config = this.inp.config;
    this.trialOutputs = [];
  }

  protected init(): void {
    this.friends = [];
    this.enemys = [];
    this.killCount = 0;
    this.turnNow = 0;
    this.field = new SCSField(this.inp.field);
    // this.fieldの中身
    // 0:     空き領域
    // 1:     壁
    // 9:     Enemy -> 後で20以降に連番で振る
    // 10-19: Friend
    // Friendの読み込み

    for (const [order, friend] of this.inp.friends.entries()) {
      // placeを探す
      const FieldIndex = this.inp.field.data.findIndex(m => m === order+10);
      const place = {
        row: Math.floor(FieldIndex/this.inp.field.col),
        col: FieldIndex%this.inp.field.col
      };
      this.friends.push(new Friend(friend, order, place, this.pConf));
    }
  
    // Enemyの読み込み
    const enemyFieldIndex = this.inp.field.data.reduce((accumulator: number[], currentValue, index) => {
      if (currentValue === 9) {
        accumulator.push(index);
      }
      return accumulator;
    }, [])
    for (const FieldIndex of enemyFieldIndex) {
      const place = {
        row: Math.floor(FieldIndex/this.inp.field.col), 
        col: FieldIndex%this.inp.field.col
      };
      this.addEnemy(place, 1.0);
    }
  }

  /**
   * sumoの周囲に分裂方向を考慮して分裂させる
   * kompota君の成果(https://twitter.com/neko3mpota/status/970271526703349760/photo/1)
   * @param {Unit} sumo 攻撃されたスモグル（敵味方問わず）
   */
  private divide(sumo: Unit): boolean {
    const dplaceList = [
      {row: -1, col: 0},  // 0: 上
      {row: -1, col: -1}, // 1: 左上
      {row: 0, col: -1},  // 2: 左
      {row: 1, col: -1},  // 3: 左下
      {row: 1, col: 0},   // 4: 下
      {row: 1, col: 1},   // 5: 右下
      {row: 0, col: 1},   // 6: 右
      {row: -1,col: 1},   // 7: 右上
    ];
    
    const initialIndex = randint(4)*2;  // 0, 2, 4, 6 = 上, 左, 下, 右
    for(let relativeIndex = 0; relativeIndex < 8; relativeIndex++ ) {
      let index = relativeIndex + initialIndex;
      index = index > 7 ? index - 8 : index;

      const place = addPlace(sumo.place, dplaceList[index]);
      if (this.field.getField(place) === 0) {
        this.addEnemy(place);
        return true;
      }
    }
    return false;
  };

  getEnemyByNumber(num: number): Enemy {
    return this.enemys.filter(e => e.num === num)[0];
  };

  private addEnemy(place: Place, probability: number = this.pConf.divide) : void {
    if (Math.random() < probability) {
      this.enemys.push(new Enemy(place, this.killCount, this.pConf));
      this.field.setField(place, this.killCount+20);
      this.killCount += 1;
      logger.debug(`divided into [${place.row}, ${place.col}]`);
    }
  }

  // --------------------------------------------------------------------
  /*
   *  runAllTrial
   *  └── trial
   *      └── turn
   *          ├── turnEnemy
   *          └── turnFriend
   */
  runAllTrial(): void {
    for (let trial = 0; trial < this.config.trial; trial ++) {
      this.trial();
      this.trialOutputs.push(this.toJson());
    }
  }

  trial(): void {
    this.init();
    for (let turn = 0; turn < this.config.turn; turn++) {
      // 1ターン経過
      this.turn();
      // 仲間が倒れていないかチェック
      for (const friend of this.friends) {
        if (friend.chp < 0) {
          return;
        }
      }
      // スモールグールが消えていないかチェック
      if (this.enemys.length === 0) { return; }

      this.turnNow += 1;
    }
  }

  protected turn(): void {
    this.turnEnemy();
    this.turnFriend();
  }

  turnEnemy(): void {
    // 敵の行動
    for (let enemy of this.enemys) {
      this.actionEnemy(enemy);
    }
  }

  protected actionEnemy(enemy: Enemy): void {
    // 1. 攻撃を試みる
    const targets = this.field.findTargets(enemy.place);
    if (targets.length !== 0) {
      const target = targets[randint(targets.length)];
      const friend = this.friends[target-10]
      const result = enemy.attack(friend);
      // 対象がスモールグールだった場合は分裂処理
      if (friend.name === 'スモールグール' && ! friend.isSealed && result) {
        this.divide(this.friends[target-10]);
      }
      return; // 攻撃したら終了
    }
    // 2. 移動を試みる
    const emptyPlaces = this.field.findTargets(enemy.place, true, false);
    if (emptyPlaces.length !== 0) {
      const place = emptyPlaces[randint(emptyPlaces.length)];
      this.field.setField(enemy.place, 0);
      this.field.setField(place, enemy.num+20);
      enemy.place = place;
    }
  }

  turnFriend(): void {
    // 仲間の行動
    for (const speed of [true, false]) {
      for (let friend of this.friends) {
        if (speed || friend.doubleSpeed) {
          const isActed = this.actionFriend(friend);
          if (!isActed) {
            friend.actionLossCount += 1;
          }
          friend.naturalRecovery();
        }
      }
    }
  }

  protected actionFriend(f: Friend): boolean {
    if (f.isSealed) {
      return this.actionNormal(f);
    } else if (f.name === 'キラーマシン' || f.name === 'さそりかまきり') {
      return this.actionKillerMachine(f);
    } else if (f.name === 'ホイミスライム') {
      return this.actionHoimiSlime(f);
    } else if (f.name === 'リリパット' || f.name === 'ドッグスナイパー') {
      return this.actionArrow(f);
    } else if (monstersSkillAdjacent.includes(f.name)) {
      return this.actionSkillAdjacent(f);
    } else {
      return this.actionNormal(f);
    }
  }

  /**
   * 倒れたスモグルをfieldとenemysから取り除く
   * @param enemy 取り除くスモグル
   */
  private removeEnemy(enemy: Enemy) {
    this.field.setField(enemy.place, 0);
    this.enemys = this.enemys.filter(e => e !== enemy);
  }

  /**
   * 単純な殴り攻撃の実装
   * @param {Friend} friend 攻撃するFriend
   * @param {Enemy} enemy 攻撃されるスモグル
   * @param {number} damage 固定ダメージの場合は与える
   * @returns {string} 攻撃の終了判定, killed/survived/missed
   */
  private attack(friend: Friend, enemy: Enemy, fixedDamage: number = 0): string {
    const result = friend.attack(enemy, fixedDamage);

    if (enemy.chp <= 0) {
      // 攻撃後に倒れた場合
      friend.getExp();
      this.removeEnemy(enemy);
      return 'killed';
    } else if (result) {
      // 攻撃後に生き残った場合（分裂処理）
      const wasAbleToDivide = this.divide(enemy);
      if (!wasAbleToDivide) {
        friend.divisionLossCount += 1;
      }
      return 'survived';
    }
    return 'missed';
  }
  /**
   * 通常攻撃の行動
   * @param {Friend} f 仲間
   */
  private actionNormal(f: Friend): boolean {
    const targets = this.field.findTargets(f.place);
    if (targets.length !== 0) {
      const target = targets[randint(targets.length)];
      const enemy = this.getEnemyByNumber(target - 20);
      this.attack(f, enemy);
      return true;
    }
    return false;
  }

  /**
   * 隣接特技を持つキャラの行動
   * @param {Friend} f 隣接特技を持つキャラ
   */
  private actionSkillAdjacent(f: Friend): boolean {
    logger.debug('# monster with skill adjacent');
    // 特技の実施判定
    const wCorner = monstersSkillAdjacentWCorner.includes(f.name);
    const skillTargets = this.field.findTargets(f.place, false, wCorner);
    if (skillTargets.length !== 0) {
      const target = skillTargets[randint(skillTargets.length)];
      const enemy = this.getEnemyByNumber(target - 20);

      // 特技を使う場合
      switch(f.name) {
        case 'おばけキノコ':
          if (Math.random() < this.pConf.kinoko.skill ) {
            enemy.weakenAtk += 1;
            enemy.setAtk();
            return true;
          }
          break;
        case 'メイジももんじゃ':
          if (Math.random() < this.pConf.merumon.skill ) {
            enemy.isSealed = true;
            return true;
          }
          break;
        case 'メイジキメラ':
          if (Math.random() < this.pConf.mekira.skill ) {
            enemy.isSealed = true;
            return true;
          }
          break;
        case 'ハエまどう':
          if (Math.random() < this.pConf.haeru.skill ) {
            enemy.chp = Math.ceil(enemy.chp/4);
            return true;
          }
          break;
        case 'はねせんにん':
          if (Math.random() < this.pConf.haneji.skill ) {
            enemy.chp = Math.ceil(enemy.chp/2);
            return true;
          }
          break;
        case 'フライングデビル':
          if (Math.random() < f.pConf.flida.skill) {
            this.attack(f, enemy, 25);
            return true;
          }
          break;
        case 'ランガー':
          if (Math.random() < f.pConf.rangas.skill) {
            this.attack(f, enemy, 25);
            return true;
          }
          break;
        case 'ミステリードール':
          if (Math.random() < f.pConf.mister.skill) {
            if (randint(2) === 0) {
              enemy.chp = Math.ceil(enemy.chp/2);
            } else {
              enemy.weakenAtk += 1;
              enemy.setAtk();
            }
            return true;
          }
          break;
        case 'いしにんぎょう':
          if (Math.random() < f.pConf.isshi.skill) {
            if (randint(2) === 0) {
              enemy.chp = 1;
            } else {
              enemy.weakenAtk += 1;
              enemy.setAtk();
            }
            return true;
          }
          break;
        case 'スライムブレス':
          if (Math.random() < f.pConf.lovelace.skill) {
            enemy.chp -= 10;
            if (enemy.chp <= 0) {
              f.getExp();
              this.removeEnemy(enemy);
            } 
            return true;
          }
          break;
        case 'ドラゴスライム':
          if (Math.random() < f.pConf.dragosu.skill) {
            enemy.chp -= 10;
            if (enemy.chp <= 0) {
              f.getExp();
              this.removeEnemy(enemy);
            } 
            return true;
          }
          break
        case 'ドラゴメタル':
          if (Math.random() < f.pConf.drataru.skill) {
            enemy.chp -= 20;
            if (enemy.chp <= 0) {
              f.getExp();
              this.removeEnemy(enemy);
            } 
            return true;
          }
          break
        default:
          throw new Error("skill not implemented: "+ f.name);
      }
    }

    // 通常攻撃
    return this.actionNormal(f);
  }

  /**
   * リリパットまたはドッグスナイパーの行動
   * @param f リリパットまたはドッグスナイパー
   */
  private actionArrow(f: Friend): boolean {
    logger.debug('# monster with arrow skill');
    const skillInfo = f.name === "リリパット" ? this.pConf.lily : this.pConf.niper;
    const arrowPower = f.name === "リリパット" ? 0 : 3; // TODO

    const num = this.field.findLineTarget(f.place, skillInfo.skill, skillInfo.range);

    // 1. 確率的に矢を打たなかった、もしくは矢の対象が見つからなかったとき
    if (num === 0) {
      logger.debug("  => skill not triggered or target not found");
      return this.actionNormal(f);
    }
    // 2. 矢が外れた時
    if (Math.random() > this.pConf.arrow) {
      logger.debug("  => but missed");
      return true;
    }

    // 3. 矢が当たった時
    logger.debug(`  => targetNumber: ${num}`);
    const target = num < 20 ? this.friends[num-10] : this.getEnemyByNumber(num-20);
    logger.debug(`    - target: ${num} at [${target.place.row}, ${target.place.col}]`);

    // 4. ダメージ計算
    // TODO(投擲系の計算式が不明。適当実装。)
    let damage = f.atk * (1 + (arrowPower-8)/16) * Math.pow(35/36, target.def);
    damage = Math.round(damage * (Math.random()/4 + 7/8));
    target.chp -= damage;
    logger.debug(`    - damage: ${damage}`);

    // 5. 経験値処理
    if (target.chp < 0) {
      f.getExp();
      this.removeEnemy(this.getEnemyByNumber(num-20));
      return true;
    }

    // 6. 分裂処理
    if (target.name !== 'スモールグール') {
      return true;
    }
    const wasAbleToDivide = this.divide(target);
    if (!wasAbleToDivide) {
      f.divisionLossCount += 1;
    }
    return true;
  }

  /**
   * キラーマシンまたはさそりかまきりの行動
   * @param {Friend} f キラーマシンまたはさそりかまきり
   */
  private actionKillerMachine(f: Friend): boolean {
    const targets = this.field.findTargets(f.place);
    if (targets.length !== 0) {
      const target = targets[randint(targets.length)];
      const enemy = this.getEnemyByNumber(target - 20);

      const result = this.attack(f, enemy); // 攻撃1回目
      if (result === 'killed') return true; // 一回目で倒したら終了
      this.attack(f, enemy);                // 攻撃2回目
      return true;
    }
    return false;
  }

  /**
   * ホイミスライムの行動
   * 1. 周囲の傷ついたキャラの数を取得
   * 2. ホイミ発動を判断
   * 3. 攻撃可能なキャラの数を取得  <= ホイミと同じように攻撃可能なキャラごとに判定するモデルとする
   * 4. 攻撃を判断
   * 5. いっしょにいてね（!isSticked）の場合、移動を判断
   * @param {Friend} f ホイミスライム
   */
  private actionHoimiSlime(f: Friend): boolean {
    logger.debug(`# monster hoimin`);
    let returnValue = false;

    // 1.
    let hoimiTargets = [];
    for (let drow of [-1, 0, 1]) {
      for (let dcol of [-1, 0, 1]) {
        const place = addPlace(f.place, {row: drow, col: dcol});
        const number = this.field.getField(place);
        if (drow === 0 && dcol === 0) { continue; }  // me

        if (10 <= number && number <= 19) {          // friends
          let unit = this.friends[number-10];
          if (unit.chp < unit.mhp) { hoimiTargets.push(unit); }
        } else if (number >= 20) {                   // enemys
          let unit = this.getEnemyByNumber(number-20);
          if (unit.chp < unit.mhp) { hoimiTargets.push(unit); }
        }
      }
    }
    logger.debug(`Hoimi targets: ${hoimiTargets.length}`);
    returnValue = returnValue || !!hoimiTargets.length;

    // 2.
    let execSkill = false;
    for (let t = 0; t < hoimiTargets.length; t++) {
      if (Math.random() < this.pConf.hoimin.skill) {
        execSkill = true;
        break;
      }
    }
    if (execSkill) {
      logger.debug(`  => did Hoimi`);
      for (let target of hoimiTargets) {
        logger.debug(`  - target@[${target.place.row}, ${target.place.col}]`)
        target.chp += 25;
        if (target.chp > target.mhp) { target.chp = target.mhp; }
      }
      return returnValue;  // ホイミを発動した場合はここで抜ける
    }

    // 3.
    const attackTargets = this.field.findTargets(f.place);
    returnValue = returnValue || !!attackTargets.length;
    logger.debug(`Attack targets: ${attackTargets.length}`);

    // 4.
    for (let enemyId of attackTargets) {
      if (Math.random() < this.pConf.hoimin.attack) {
        let enemy = this.getEnemyByNumber(enemyId - 20);
        this.attack(f, enemy);
        logger.log(`  => attacked : @[${enemy.place.row}, ${enemy.place.col}]`);
        return returnValue;
      }
      logger.debug(`not attacked.`);
    }

    // 5.
    const vacantTargets = this.field.findTargets(f.place, true, false);
    returnValue = returnValue || !!vacantTargets.length;
    logger.debug(`Vacant places: ${vacantTargets.length}`);
    if (
      !f.isSticked &&                            // ここで待っててではない
      Math.random() < this.pConf.hoimin.move &&    // 移動確率
      this.turnNow > this.pConf.hoimin.moveTurn && // 移動開始ターン
      !!vacantTargets.length                     // 移動場所がある
      ) {
        const newPlace = vacantTargets[randint(vacantTargets.length)];
        logger.debug(`  => moved from [${f.place.row}, ${f.place.col}] to [${newPlace.row}, ${newPlace.col}]`);
        this.field.setField(f.place, 0);
        this.field.setField(newPlace, 10 + this.friends.indexOf(f));
        f.place = newPlace;
        // TODO
        // 移動は「待ち」でなかったと判断すべきだろうか。
        return returnValue;
    }

    return returnValue;
  }

  toJson(): SCSTrialOutput {
    // result
    let finishState: string = 'success';
    if (this.turnNow < this.config.turn) {
      if (this.enemys.length === 0) {
        finishState = 'genocided';
      } else {
        finishState = 'killed';
      }
    }

    this.killCount -= this.enemys.length;
    return {
      result: {
        finishState,
        turnPassed: this.turnNow,
        orderOfKilledFriends: this.friends.filter(f => f.chp < 0).map(f => f.order),
      },
      exp: {
        total: this.killCount*22,
        perTurn: this.killCount*22/this.turnNow,
        perMonster: this.friends.map(f => f.killCount*22),                
        perMonsterPerTurn: this.friends.map(f => f.killCount*22/this.turnNow),
      },
      loss: {
        action: this.friends.map(f => f.actionLossCount),
        division: this.friends.map(f => f.divisionLossCount),
      }
    };
  }

  /**
   * 計算結果を集計する
   */
  summarizeOutputs(): SCSSummarizedOutput {
    let countOfKilledFriends = new Array<number>(this.friends.length).fill(0);
    for(const output of this.trialOutputs) {
      for(const order of output.result.orderOfKilledFriends) {
        countOfKilledFriends[order]++;
      }
    }

    return {
      result: {
        finishState: {
          success: this.trialOutputs.filter(o => o.result.finishState === 'success').length,
          killed: this.trialOutputs.filter(o => o.result.finishState === 'killed').length,
          genocided: this.trialOutputs.filter(o => o.result.finishState === 'genocided').length,
        },
        turnPassed: {
          mean: mean(this.trialOutputs.map(o => o.result.turnPassed)),
          std: std(this.trialOutputs.map(o => o.result.turnPassed)),
        },
        countOfKilledFriends
      },
      exp: {
        total: {
          mean: mean(this.trialOutputs.map(o => o.exp.total)),
          std: std(this.trialOutputs.map(o => o.exp.total)),
        },
        perMonster: getMeanAndStdFromArray(this.trialOutputs.map(o => o.exp.perMonster))
      },
      loss: {
        action: getMeanAndStdFromArray(this.trialOutputs.map(o => o.loss.action)),
        division: getMeanAndStdFromArray(this.trialOutputs.map(o => o.loss.division)),
      }
    }
  }

}