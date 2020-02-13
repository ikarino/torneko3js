from glob import glob
import os
import json
import sys

DESTINATION = "../src/kaisekiData.ts"
if len(sys.argv) == 2:
  DESTINATION = sys.argv[1]

def json2dict(fname):
  with open(fname) as f:
    text = f.read()
  return json.loads(text)

whole_dict = {}
for dname in glob("jsons/*"):
  dungeon = os.path.basename(dname).replace(" ", "_")
  print(dungeon)

  basics = json2dict(os.path.join(dname, "basics.json"))
  patterns = json2dict(os.path.join(dname, "pattern.json"))
  traps =  json2dict(os.path.join(dname, "trap.json"))
  monsters = json2dict(os.path.join(dname, "monster.json"))
  floors = json2dict(os.path.join(dname, "floor.json"))
  monokas = json2dict(os.path.join(dname, "monoka.json"))
  walls = json2dict(os.path.join(dname, "wall.json"))
  shops = json2dict(os.path.join(dname, "shop.json"))
  changePots = json2dict(os.path.join(dname, "changePot.json"))
  
  byFloor = []
  for (b, p, t, mo, f, m, c, w, s) in zip(basics, patterns, traps, monsters, floors, monokas, changePots, walls, shops):
    byFloor.append({
      "basic": {**b, **p},
      "trap": t,
      "monster": mo,
      "floor": f,
      "monoka": m,
      "wall": w,
      "shop": s,
      "changePot": c
    })

  whole_dict[dungeon] = byFloor

with open(DESTINATION, "w", encoding="utf-8") as f:
  f.write('''import { KaisekiDataFloor } from './interfaces';
export const kaisekiData: { [dugeon: string]: KaisekiDataFloor[] } = ''')
  f.write(json.dumps(whole_dict, ensure_ascii=False, indent=2, sort_keys=True, separators=(',', ': ')))