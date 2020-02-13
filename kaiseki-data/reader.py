#!/usr/bin/env python
from glob import glob
from bs4 import BeautifulSoup
from pprint import pprint
import re
import json
import os

pattern = r'([+-]?[0-9]+\.?[0-9]*)'

def read_items(fname, suffix):
    with open(fname, encoding="shift_jis") as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    
    tables = soup.find_all("table")
    contents = []
    basics = []
    for table in tables:
        cap = table.findChildren("caption")[0]
        basic = re.findall(pattern, cap.decode_contents(formatter="html"))
        if len(basic) == 10:
            basic.insert(6, '0')
        basic = {
            'floor': int(basic[0]),
            'shop': float(basic[1]),
            'fake': float(basic[2]),
            'cursed': float(basic[3]),
            'goldMin': int(basic[4]),
            'goldMax': int(basic[5]),
            'treasure': int(basic[6]),
            'item': int(basic[7]),
            'itemInWall': int(basic[8]),
            'trap': int(basic[9]),
            'monster': int(basic[10]),
        }
        content = {}
        for tr in table.findChildren("tr"):
            tds = tr.findChildren("td")
            category = tds[0].decode_contents(formatter="html").split()
            itemlist = tds[1].decode_contents(formatter="html").split()

            items = {}
            for c in itemlist:
                item, itemp = c.replace(")", "").split("(")
                items[item] = float(itemp.replace("%", ""))
            content[category[0]] = {
                "probability": float(category[1].replace("%", "")),
                "items": items
            }
        contents.append(content)
        basics.append(basic)

    dungeon = os.path.basename(fname).split("_")[0]
    os.makedirs("jsons/"+dungeon, exist_ok=True)
    with open("jsons/" + dungeon + "/" + suffix + ".json", "w") as f:
        f.write(json.dumps(contents, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': ')))
    with open("jsons/" + dungeon + "/basics.json", "w") as f:
        f.write(json.dumps(basics, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': ')))

def read_traps(fname):
    with open(fname, encoding="shift_jis") as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    
    tables = soup.find_all("table")
    traps = []
    for table in tables:
        trap = {}
        for tr in table.findChildren("tr"):
            tds = tr.findChildren("td")
            name = tds[0].decode_contents(formatter="html")
            prob = float(tds[1].decode_contents(formatter="html").replace("%", ""))
            trap[name] = prob
        traps.append(trap)
        
    dungeon = os.path.basename(fname).split("_")[0]
    with open("jsons/" + dungeon + "/trap.json", "w") as f:
        f.write(json.dumps(traps, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': ')))
        
def read_monsters(fname):
    with open(fname, encoding="shift_jis") as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    
    tables = soup.find_all("table")
    monsters = []
    caps = []
    for table in tables:
        monster = {}
        for tr in table.findChildren("tr"):
            tds = tr.findChildren("td")
            name = tr.findChildren("th")[0].decode_contents(formatter="html")
            lv = int(tds[0].decode_contents(formatter="html").replace("Lv", ""))
            prob = float(tds[1].decode_contents(formatter="html").replace("%", ""))
            if name == "":
                print(tr)
                continue
            monster[name] = [lv, prob]



        monsters.append(monster)

        caption = table.findChildren("caption")[0]
        cap = re.findall(pattern, caption.decode_contents(formatter="html"))
        if "通常マップ" in str(caption):
            cap.insert(1, '-1')
        elif "大部屋MH" in str(caption):
            cap.append('-2')
            cap.append('100')

        if len(cap) != 3:
            print(cap)
            print(caption)

        caps.append({
            "pattern": int(cap[1]),
            "house": float(cap[2].replace("%", "")),
        })
        
    dungeon = os.path.basename(fname).split("_")[0]
    with open("jsons/" + dungeon + "/monster.json", "w") as f:
        f.write(json.dumps(monsters, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': ')))
    with open("jsons/" + dungeon + "/pattern.json", "w") as f:
        f.write(json.dumps(caps, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': ')))

if __name__ == "__main__":
    for f in glob("解析データ/*フロア.html"):
        read_items(f, "floor")
    for f in glob("解析データ/*モノカの杖.html"):
        read_items(f, "monoka")
    for f in glob("解析データ/*店.html"):
        read_items(f, "shop")
    for f in glob("解析データ/*壁の中.html"):
        read_items(f, "wall")
    for f in glob("解析データ/*変化の壷.html"):
        read_items(f, "changePot")
    for trap in glob("解析データ/*罠一覧.html"):
        read_traps(trap)
    for monster in glob("解析データ/*敵一覧.html"):
        read_monsters(monster)
