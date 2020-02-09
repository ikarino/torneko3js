// scsManager.ts
//

import { Unit, Friend, Enemy } from './unit';
import { SCSMap } from './scsMap';
import { Place, SCSInput, ProbabilityConfig, SCSConfigInput, SCSMapInput, SCSTrialOutput } from './interfaces';



export const defaultProbabilityConf = {
  attack: 0.92,
  divide: 0.25,
  kinoko: 0.10,
  hoimi: 0.3553, // kompota君の成果
  hoimiAttack: 0.30,
  hoimiMove: 0.30,
  hoimiMoveTurn: 300,
}

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
  friends: Friend[];
  enemys: Enemy[];
  killCount: number;
  turnNow: number;
  map: SCSMap;
  trialOutputs: SCSTrialOutput[];
  constructor(inp: SCSInput, pConf: ProbabilityConfig = defaultProbabilityConf) {
    this.inp = inp;
    this.pConf = pConf;
    this.config = this.inp.config;
    this.trialOutputs = [];
    // TODO
    // init()と同じだけど、これを入れておかないとconstructorエラーになる。
    // なんとか回避できないものか。
    this.friends = [];
    this.enemys = [];
    this.killCount = 0;
    this.turnNow = 0;
    this.map = new SCSMap(this.inp.map);
  }

  init(): void {
    this.friends = [];
    this.enemys = [];
    this.killCount = 0;
    this.turnNow = 0;
    this.map = new SCSMap(this.inp.map);
    // this.mapの中身
    // 0:     空き領域
    // 1:     壁
    // 9:     Enemy -> 後で20以降に連番で振る
    // 10-19: Friend
    // Friendの読み込み

    for (const [order, friend] of this.inp.friends.entries()) {
      // placeを探す
      const mapIndex = this.inp.map.data.findIndex(m => m === order+10);
      const place = {
        row: Math.floor(mapIndex/this.inp.map.col),
        col: mapIndex%this.inp.map.col
      };
      this.friends.push(new Friend(
        friend.name,
        friend.lv,
        place,
        friend.isSealed,
        friend.doubleSpeed,
        friend.weakenAtk,
        friend.weakenDef,
        friend.hpDope,
        friend.atkDope ? friend.atkDope : 0,
        this.pConf,
        friend.isSticked !== undefined ? friend.isSticked : true,
      ));
    }
  
    // Enemyの読み込み
    const enemyMapIndex = this.inp.map.data.reduce((accumulator: number[], currentValue, index) => {
      if (currentValue === 9) {
        accumulator.push(index);
      }
      return accumulator;
    }, [])
    for (const mapIndex of enemyMapIndex) {
      const place = {
        row: Math.floor(mapIndex/this.inp.map.col), 
        col: mapIndex%this.inp.map.col
      };
      this.enemys.push(new Enemy(place, this.killCount, this.pConf));
      this.map.setMap(place, this.killCount+20);
      this.killCount += 1;
    }
  }

  /**
   * sumoの周囲に分裂方向を考慮して分裂させる
   * kompota君の成果(https://twitter.com/neko3mpota/status/970271526703349760/photo/1)
   * @param {Unit} sumo 攻撃されたスモグル（敵味方問わず）
   */
  divide(sumo: Unit): boolean {
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
      if (this.map.getMap(place) === 0) {
        this.addEnemy(place);
        return true;
      }
    }
    return false;
  };

  getEnemyByNumber(num: number): Enemy {
    return this.enemys.filter(e => e.num === num)[0];
  };

  addEnemy(place: Place) : void {
    if (Math.random() < this.pConf.divide) {
      this.enemys.push(new Enemy(place, this.killCount, this.pConf));
      this.map.setMap(place, this.killCount+20);
      this.killCount += 1;
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
    this.init();
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

  turn(): void {
    this.turnEnemy();
    this.turnFriend();
  }

  turnEnemy(): void {
    // 敵の行動
    for (let enemy of this.enemys) {
      // 1. 攻撃を試みる
      const targets = this.map.findTargets(enemy.place);
      if (targets.length !== 0) {
        const target = targets[randint(targets.length)];
        const friend = this.friends[target-10]
        const result = enemy.attack(friend);

        // 対象がスモールグールだった場合は分裂処理
        if (friend.name === "スモールグール" && ! friend.isSealed && result) {
          this.divide(this.friends[target-10]);
        }
        continue; // 攻撃したら終了
      }

      // 2. 移動を試みる
      const emptyPlaces = this.map.findTargets(enemy.place, true, false);
      if (emptyPlaces.length !== 0) {
        const place = emptyPlaces[randint(emptyPlaces.length)];
        this.map.setMap(enemy.place, 0);
        this.map.setMap(place, enemy.num+20);
        enemy.place = place;
      }

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

  actionFriend(f: Friend): boolean {
    if (f.isSealed) {
      return this.actionNormal(f);
    } else if (f.name === "キラーマシン") {
      return this.actionKillerMachine(f);
    } else if (f.name === "ホイミスライム") {
      return this.actionHoimiSlime(f);
    } else if (f.name === "おばけキノコ") {
      return this.actionObakeKinoko(f);
    } else {
      return this.actionNormal(f);
    }
  }

  /**
   * 単純な殴り攻撃の実装
   * @param {Friend} friend 攻撃するFriend
   * @param {Enemy} enemy 攻撃されるスモグル
   * @returns {string} 攻撃の終了判定, killed/survived/missed
   */
  attack(friend: Friend, enemy: Enemy): string {
    const result = friend.attack(enemy);

    if (enemy.chp <= 0) {
      // 攻撃後に倒れた場合
      friend.getExp();
      this.map.setMap(enemy.place, 0);
      this.enemys = this.enemys.filter(e => e !== enemy);
      return "killed";
    } else if (result) {
      // 攻撃後に生き残った場合（分裂処理）
      const wasAbleToDivide = this.divide(enemy);
      if (!wasAbleToDivide) {
        friend.divisionLossCount += 1;
      }
      return "survived";
    }
    return "missed";
  }

  actionNormal(f: Friend): boolean {
    const targets = this.map.findTargets(f.place);
    if (targets.length !== 0) {
      const target = targets[randint(targets.length)];
      const enemy = this.getEnemyByNumber(target - 20);
      this.attack(f, enemy);
      return true;
    }
    return false;
  }

  /**
   * おばけキノコの行動
   * @param {Friend} f おばけキノコ
   */
  actionObakeKinoko(f: Friend): boolean {
    const targets = this.map.findTargets(f.place);
    if (targets.length !== 0) {
      // 対象を決定するところまでは同じ
      const target = targets[randint(targets.length)];
      const enemy = this.getEnemyByNumber(target - 20);

      // 特技を使う場合
      if (Math.random() < this.pConf.kinoko ) {
        enemy.weakenAtk += 1;
        enemy.setAtk();
        return true; // ここで抜ける
      }

      // 攻撃する場合
      this.attack(f, enemy);

      return true;
    }
    return false;
  }

  /**
   * キラーマシンの行動
   * @param {Friend} f キラーマシン
   */
  actionKillerMachine(f: Friend): boolean {
    const targets = this.map.findTargets(f.place);
    if (targets.length !== 0) {
      const target = targets[randint(targets.length)];
      const enemy = this.getEnemyByNumber(target - 20);

      const result = this.attack(f, enemy); // 攻撃1回目
      if (result === "killed") return true; // 一回目で倒したら終了
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
  actionHoimiSlime(f: Friend): boolean {
    let returnValue = false;

    // 1.
    let hoimiTargets = [];
    for (let drow of [-1, 0, 1]) {
      for (let dcol of [-1, 0, 1]) {
        const place = addPlace(f.place, {row: drow, col: dcol});
        const number = this.map.getMap(place);
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
    returnValue = returnValue || !!hoimiTargets.length;

    // 2.
    let execSkill = false;
    for (let t = 0; t < hoimiTargets.length; t++) {
      if (Math.random() < this.pConf.hoimi) {
        execSkill = true;
        break;
      }
    }
    if (execSkill) {
      for (let target of hoimiTargets) {
        target.chp += 25;
        if (target.chp > target.mhp) { target.chp = target.mhp; }
      }
      return returnValue;  // ホイミを発動した場合はここで抜ける
    }

    // 3.
    const attackTargets = this.map.findTargets(f.place);
    returnValue = returnValue || !!attackTargets.length;
    // 4.
    for (let enemyId of attackTargets) {
      if (Math.random() < this.pConf.hoimiAttack) {
        let enemy = this.getEnemyByNumber(enemyId - 20);
        this.attack(f, enemy);
        return returnValue;
      }
    }

    // 5.
    const vacantTargets = this.map.findTargets(f.place, true, false);
    if (
      !f.isSticked &&                            // ここで待っててではない
      Math.random() < this.pConf.hoimiMove &&    // 移動確率
      this.turnNow > this.pConf.hoimiMoveTurn && // 移動開始ターン
      !!vacantTargets.length                     // 移動場所がある
      ) {
        const newPlace = vacantTargets[randint(vacantTargets.length)];
        // console.log("moved from ", f.place, " to ", newPlace);
        this.map.setMap(f.place, 0);
        this.map.setMap(newPlace, 10 + this.friends.indexOf(f));
        f.place = newPlace;
        // TODO
        // 移動は「待ち」でなかったと判断すべきだろうか。
        return true;
    }

    return returnValue;
  }

  toJson(): SCSTrialOutput {
    // exp/monster
    let expPerMonster = this.friends.map(f => f.killCount*22);
    let expPerMonsterPer_turn = this.friends.map(f => f.killCount*22/this.config.turn);

    // loss counts
    let divisionLossCount = this.friends.map(f => f.divisionLossCount/this.config.turn);
    let actionLossCount = this.friends.map(f => {
      const turns = f.doubleSpeed ? 2 : 1;
      return f.actionLossCount/this.config.turn/turns;
    });

    // result
    let result = true;
    let reason = "";
    let friendOrderKilled = -1;
    if (this.turnNow < this.config.turn) {
      result = false;
      if (this.enemys.length === 0) {
        reason = "enemys are genocided";
      } else {
        reason = "friends are killed";
        for (let order = 0; order < this.friends.length; order++) {
          if (this.friends[order].chp <= 0) {
            friendOrderKilled = order;
            break;
          }
        }
      }
    }

    this.killCount -= this.enemys.length;
    return {
      result: result,
      reason: reason,
      friendOrderKilled: friendOrderKilled,
      exp: {
        total: this.killCount*22,
        perTurn: this.killCount*22/this.turnNow,
        perMonster: expPerMonster,                
        perMonsterPerTurn: expPerMonsterPer_turn,
      },
      loss: {
        action: actionLossCount,
        division: divisionLossCount,
      },
      turnPassed: this.turnNow,
    };
  }

}