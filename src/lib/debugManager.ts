// debugManager.ts
import chalk from 'chalk';
import readlineSync from 'readline-sync';

import { Manager } from './manager';
import { SCSInput, Place } from './interfaces';
import { logger } from './config';

const padInt = (chp: number): string => {
  let pad = Math.floor(chp).toFixed(0);
  if (pad.length > 3) {
    throw new Error("could not pad: " + pad);
  }
  for(let i = 0; pad.length < 3; i++) {
    pad = " " + pad;
  }
  return pad;
}

export class DebugManager extends Manager {
  stdoutCol: number;
  stdoutRow: number;
  constructor(inp: SCSInput) {
    logger.level = 'debug';
    super(inp);
    this.stdoutRow = process.stdout.rows;
    this.stdoutCol = process.stdout.columns;
  }

  showHeader(headers: string[], clear: boolean = true, bgColor="red") {
    if(clear) {
      console.clear();
    }
    for(const h of headers) {
      let header = h;
      while (header.length < process.stdout.columns) {
        header += ' ';
      }
      if (bgColor === "red") {
        console.log(chalk.white.bgRed.bold(header));
      } else if (bgColor === "blue") {
        console.log(chalk.white.bgBlue.bold(header));
      }
    }
  }

  trial() {
    this.init();
    if (!readlineSync.keyInYN('proceed ?')) {
      return;
    }
    for (let turn = 0; turn < this.config.turn; turn++) {
      this.turn();
      for (const friend of this.friends) {
        if (friend.chp < 0) {
          return;
        }
      }
      if (this.enemys.length === 0) { return; }
      this.turnNow += 1;
    }
    this.killCount -= this.enemys.length;
  }

  turnEnemy(): void {
    // 敵の行動
    const enemys = this.enemys.map(e => `${e.num}`).join(', ');
    for (let enemy of this.enemys) {
      this.showHeader([`[Debug Mode]`]);
      [
        `Turn: ${this.turnNow}/${this.config.turn}`,
        `Enemys: [${enemys}]`,
        `acted: Enemy(${enemy.num}) at [row, col] = [${enemy.place.row}, ${enemy.place.col}]`,
      ].map(line => console.log(line));

      this.showColorMap(["[Field Before]"], enemy.place);

      this.showHeader(["[Action Logs]"], false, "blue")
      this.actionEnemy(enemy);
      console.log('');

      this.showColorMap(["[Field After]"], enemy.place);

      if (!readlineSync.keyInYN('proceed ?')) {
        process.exit(0);
      }
    }
  }

  turnFriend(): void {
    // 仲間の行動
    const friends = this.friends.map(f => `${f.order}`).join(', ')
    for (const speed of [true, false]) {
      for (let friend of this.friends) {
        if (!speed && !friend.doubleSpeed) {
          continue
        }
        let speedStr = friend.doubleSpeed ? "倍速" : "等速";
        speedStr += speed ? "(1行動目)" : "(2行動目)"; 
        this.showHeader([`[Debug Mode]`]);
        [
          `Turn: ${this.turnNow}/${this.config.turn}`,
          `Friends: [${friends}]`,
          `acted: Friend(${friend.order}: ${friend.name}, ${speedStr}) at [row, col] = [${friend.place.row}, ${friend.place.col}]`,
        ].map(line => console.log(line));

        this.showColorMap(["[Field Before]"], friend.place);

        this.showHeader(["[Action Logs]"], false, "blue")
        const isActed = this.actionFriend(friend);
        if (!isActed) {
          friend.actionLossCount += 1;
        }
        friend.naturalRecovery();
        console.log('');

        this.showColorMap(["[Field After]"], friend.place);
        if (!readlineSync.keyInYN('proceed ?')) {
          process.exit(0);
        }
      }
    }
  }

  showColorMap(headers: string[], spotlight: Place = {row: -1, col: -1}) {
    const field = this.field;

    let fieldStr: string = "   ";
    for(let col = 0; col < field.col; col++) {
      fieldStr += chalk.black.bgWhite(padInt(col));
    }
    fieldStr += "\n";
    for(let row = 0; row < field.row; row++) {
      fieldStr += chalk.black.bgWhite(padInt(row));
      for(let col = 0; col < field.col; col++) {
        const d = field.data[row][col];
        if(d === 0) {
          fieldStr += chalk.bgWhite("   ");
        } else if (d === 1) {
          fieldStr += chalk.bgGray("   ");
        } else if (d < 20) {
          if (row === spotlight.row && col === spotlight.col) {
            fieldStr += chalk.white.bgBlue(padInt(this.friends[d-10].chp));
          } else {
            fieldStr += chalk.white.bgBlueBright(padInt(this.friends[d-10].chp));
          }
        } else {
          if (row === spotlight.row && col === spotlight.col) {
            fieldStr += chalk.white.bgRed(padInt(this.getEnemyByNumber(d-20).chp));
          } else {
            fieldStr += chalk.white.bgRedBright(padInt(this.getEnemyByNumber(d-20).chp));
          }
        }
      }
      fieldStr += "\n";
    }

    this.showHeader(headers, false, "blue");
    console.log(fieldStr);
  }
}