// scsMap.ts
// 
import { Place, SCSMapInput } from './interfaces';

export class SCSMap {
  col: number;
  row: number;
  data: number[][];
  constructor(mapInp: SCSMapInput) {
    const col = mapInp.col; 
    const row = mapInp.row;
    const data = mapInp.data;
    console.assert(data.length === col*row, "fucking data length !");
    console.assert(data.filter(
      d => ![0, 1, 9, ...[...Array(10)].map((_, i) => i+10)].includes(d)
    ).length === 0, "invalid number in data !");
        
    this.col = col;
    this.row = row;
      
    this.data = [];
    for (let irow = 0; irow < row; irow++) {
      this.data.push(data.slice(
        irow*col,
        (irow+1)*col
      ));
    }
  }

  setMap(place: Place, num: number): void {
    this.data[place.row][place.col] = num;
  }

  getMap(place: Place): number {
    return this.data[place.row][place.col];
  }

  // TODO
  // any[]ではなく、number[] or Place[] なのだけれど、うまく書く方法は無いのかな？
  findTargets(place: Place, findEmpty=false, includeKado=false): any[] {
    const myNumber = this.getMap(place);
    const rowMe = place.row;
    const colMe = place.col;
    
    const isTarget = findEmpty ? (
      (num: number) => (num === 0)
    ) : myNumber >= 20 ? (
      (num: number) => [...Array(10)].map((_, i) => i+10).includes(num)
    ) : (
      (num: number) => (num >= 20)
    );

    let targets = [];
    for (let drow of [-1, 0, 1]) {
      for (let dcol of [-1, 0, 1]) {
        const tPlace = {row: rowMe+drow, col: colMe+dcol};
        const tNumber = this.getMap(tPlace);
        if (! isTarget(tNumber)) { continue; }       // not target
        if (drow === 0 && dcol === 0) { continue; } // myself

        // 上下左右は無条件で追加
        if (dcol*drow === 0) {
          if (findEmpty) {
            targets.push(tPlace);
          } else {
            targets.push(tNumber);
          }
          continue;
        }

        // 斜めは壁によって角抜けになっているかで場合分け
        const numberUD = this.data[rowMe+drow][colMe];
        const numberLR = this.data[rowMe][colMe+dcol];
        const isPlaceKado = (numberUD === 1 || numberLR === 1);
        if (!isPlaceKado || includeKado) {
          if (findEmpty) { 
            targets.push(tPlace); 
          } else { 
            targets.push(tNumber);
          }
        }
      }
    }
    return targets;
  }

  show(): void {
    let string = "";
    for (const row of this.data) {
      for (const mass of row) {
        if (mass === 0) { string += " "; }
        else if (mass === 1) { string += "#"; }
        else if (mass < 20) { string += (mass-10).toString(10); }
        else { string += "*"; }
      }
      string += "\n";
    }
    console.log(string);
  }

}
      
