// scsField.ts
//

import { Place, SCSFieldInput } from './interfaces';

export class SCSField {
  col: number;
  row: number;
  data: number[][];
  constructor(fieldInp: SCSFieldInput) {
    const col = fieldInp.col;
    const row = fieldInp.row;
    const data = fieldInp.data;

    this.col = col;
    this.row = row;

    this.data = [];
    for (let irow = 0; irow < row; irow++) {
      this.data.push(data.slice(irow * col, (irow + 1) * col));
    }
  }

  setField(place: Place, num: number): void {
    this.data[place.row][place.col] = num;
  }

  getField(place: Place): number {
    return this.data[place.row][place.col];
  }

  /**
   * 周囲から特技等の対象を探す
   * @param place 対象を探すキャラの場所
   * @param withCorner 角抜け位置を含めるかどうか
   */
  findTargets(place: Place, withCorner = false): number[] {
    const myNumber = this.getField(place);
    const rowMe = place.row;
    const colMe = place.col;

    const isTarget =
      myNumber >= 20
        ? (num: number) => [...Array(10)].map((_, i) => i + 10).includes(num)
        : (num: number) => num >= 20;

    let targets = [];
    for (let drow of [-1, 0, 1]) {
      for (let dcol of [-1, 0, 1]) {
        const tPlace = { row: rowMe + drow, col: colMe + dcol };
        const tNumber = this.getField(tPlace);
        if (!isTarget(tNumber)) {
          continue;
        } // not target
        // if (drow === 0 && dcol === 0) { continue; }  // myself

        // 上下左右は無条件で追加
        if (dcol * drow === 0) {
          targets.push(tNumber);
          continue;
        }

        // 斜めは壁によって角抜けになっているかで場合分け
        const numberUD = this.data[rowMe + drow][colMe];
        const numberLR = this.data[rowMe][colMe + dcol];
        const isPlaceKado = numberUD === 1 || numberLR === 1;
        if (!isPlaceKado || withCorner) {
          targets.push(tNumber);
        }
      }
    }
    return targets;
  }

  /**
   * 周囲から空白の場所を探す
   * @param place 対象を探すキャラの場所
   * @param withCorner 角抜け位置を含めるかどうか
   */
  findVacants(place: Place, withCorner = false): Place[] {
    const rowMe = place.row;
    const colMe = place.col;

    const isTarget = (num: number) => num === 0;

    let targets = [];
    for (let drow of [-1, 0, 1]) {
      for (let dcol of [-1, 0, 1]) {
        const tPlace = { row: rowMe + drow, col: colMe + dcol };
        const tNumber = this.getField(tPlace);
        if (!isTarget(tNumber)) {
          continue;
        } // not target
        // if (drow === 0 && dcol === 0) { continue; }  // myself

        // 上下左右は無条件で追加
        if (dcol * drow === 0) {
          targets.push(tPlace);
          continue;
        }

        // 斜めは壁によって角抜けになっているかで場合分け
        const numberUD = this.data[rowMe + drow][colMe];
        const numberLR = this.data[rowMe][colMe + dcol];
        const isPlaceKado = numberUD === 1 || numberLR === 1;
        if (!isPlaceKado || withCorner) {
          targets.push(tPlace);
        }
      }
    }
    return targets;
  }
  /**
   * 射程の長い特技を使用するキャラの、特技適用先を返す。
   * [TODO]左、左上、上、・・・の順に判定しているが、この順序が正しいか要調査。
   * 特技の貫通はしない前提で、誤射も考慮した最近接している特技適用先1体を返す。
   * @param place 特技を使うモンスターの座標
   * @param probability 特技使用率（1体当たり）
   * @param range 射程
   * @returns 特技適用キャラの番号、または0
   */
  findLineTarget(place: Place, probability: number, range: number = Infinity): number {
    const rowMe = place.row;
    const colMe = place.col;
    let target = -1;
    /**
     * 現状、敵キャラが射程のある技を使う予定は無い。
    const isTarget = myNumber >= 20 ? (
      (num: number) => [...Array(10)].map((_, i) => i+10).includes(num)
    ) : (
      (num: number) => (num >= 20)
    );
     */
    const isTarget = (num: number) => num >= 20;

    // 左方向
    target = -1;
    for (let col = colMe - 1; col >= Math.max(0, colMe - range); col--) {
      const numField = this.getField({ row: rowMe, col: col });
      if (numField === 1) break;
      if (target === -1 && numField > 9) target = numField;
      if (isTarget(numField) && Math.random() < probability) return target;
    }

    // 左上方向
    target = -1;
    for (
      let dd = 1;
      colMe - dd >= Math.max(0, colMe - range) && rowMe - dd >= Math.max(0, rowMe - range);
      dd++
    ) {
      const numField = this.getField({ row: rowMe - dd, col: colMe - dd });
      if (numField === 1) break;
      if (target === -1 && numField > 9) target = numField;
      if (isTarget(numField) && Math.random() < probability) return target;
    }

    // 上方向
    target = -1;
    for (let row = rowMe - 1; row >= Math.max(0, rowMe - range); row--) {
      const numField = this.getField({ row: row, col: colMe });
      if (numField === 1) break;
      if (target === -1 && numField > 9) target = numField;
      if (isTarget(numField) && Math.random() < probability) return target;
    }

    // 右上方向
    target = -1;
    for (
      let dd = 1;
      colMe + dd <= Math.min(this.col, colMe + range) && rowMe - dd >= Math.max(0, rowMe - range);
      dd++
    ) {
      const numField = this.getField({ row: rowMe - dd, col: colMe + dd });
      if (numField === 1) break;
      if (target === -1 && numField > 9) target = numField;
      if (isTarget(numField) && Math.random() < probability) return target;
    }

    // 右方向
    target = -1;
    for (let col = colMe + 1; col <= Math.min(this.col, colMe + range); col++) {
      const numField = this.getField({ row: rowMe, col: col });
      if (numField === 1) break;
      if (target === -1 && numField > 9) target = numField;
      if (isTarget(numField) && Math.random() < probability) return target;
    }

    // 右下方向
    target = -1;
    for (
      let dd = 1;
      colMe + dd <= Math.min(this.col, colMe + range) &&
      rowMe + dd <= Math.min(this.row, rowMe + range);
      dd++
    ) {
      const numField = this.getField({ row: rowMe + dd, col: colMe + dd });
      if (numField === 1) break;
      if (target === -1 && numField > 9) target = numField;
      if (isTarget(numField) && Math.random() < probability) return target;
    }

    // 下方向
    target = -1;
    for (let row = rowMe + 1; row <= Math.min(this.row, rowMe + range); row++) {
      const numField = this.getField({ row: row, col: colMe });
      if (numField === 1) break;
      if (target === -1 && numField > 9) target = numField;
      if (isTarget(numField) && Math.random() < probability) return target;
    }

    // 左下方向
    target = -1;
    for (
      let dd = 1;
      colMe - dd >= Math.max(0, colMe - range) && rowMe + dd <= Math.min(this.row, rowMe + range);
      dd++
    ) {
      const numField = this.getField({ row: rowMe + dd, col: colMe - dd });
      if (numField === 1) break;
      if (target === -1 && numField > 9) target = numField;
      if (isTarget(numField) && Math.random() < probability) return target;
    }

    return 0;
  }

  /**
   * 角抜け位置関係にあるユニット間の壁／空白の情報を得る。
   * ただし、少なくとも片方は壁である前提。
   * 移動可能であれば移動先の位置、不可能であれば{col: -1, row: -1}を返す
   * @param p1 ユニット1の位置
   * @param p2 ユニット2の位置
   */
  getCorner(p1: Place, p2: Place): Place {
    let p = { col: -1, row: -1 };

    if (this.getField({ col: p1.col, row: p2.row }) === 0) {
      p = { col: p1.col, row: p2.row };
    } else if (this.getField({ col: p2.col, row: p1.row }) === 0) {
      p = { col: p2.col, row: p1.row };
    }
    return p;
  }

  show(): string {
    let string = '';
    for (const row of this.data) {
      for (const mass of row) {
        if (mass === 0) {
          string += ' ';
        } else if (mass === 1) {
          string += '#';
        } else if (mass < 20) {
          string += (mass - 10).toString(10);
        } else {
          string += '*';
        }
      }
      string += '\n';
    }
    return string;
  }
}
