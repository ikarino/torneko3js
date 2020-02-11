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
            'floor': basic[0],
            'shop': basic[1],
            'fake': basic[2],
            'cursed': basic[3],
            'goldMin': basic[4],
            'goldMax': basic[5],
            'treasure': basic[6],
            'item': basic[7],
            'itemInWall': basic[8],
            'trap': basic[9],
            'monster': basic[10],
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
    with open("jsons/" + dungeon + "." + suffix + ".json", "w") as f:
        f.write(json.dumps(contents, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': ')))
    with open("jsons/" + dungeon + ".basics.json", "w") as f:
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
    with open("jsons/" + dungeon + ".trap.json", "w") as f:
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
            name = tds[0].decode_contents(formatter="html")
            prob = float(tds[1].decode_contents(formatter="html").replace("%", ""))
            monster[name] = prob
        monsters.append(monster)

        cap = table.findChildren("caption")[0]
        cap = re.findall(pattern, cap.decode_contents(formatter="html"))
        if len(cap) == 2:
            cap.insert(1, '-1')
        elif len(cap) == 1:
            cap.append('-1')
            cap.append('-1')
        print(cap)
        caps.append({
            "pattern": float(cap[1]),
            "house": float(cap[2].replace("%", "")),
        })
        
    dungeon = os.path.basename(fname).split("_")[0]
    with open("jsons/" + dungeon + ".monster.json", "w") as f:
        f.write(json.dumps(monsters, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': ')))
    with open("jsons/" + dungeon + ".pattern.json", "w") as f:
        f.write(json.dumps(caps, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': ')))

if __name__ == "__main__":
    # for pot in glob("解析データ/*変化の壷.html"):
    #     read_items(pot, "changePot")
    # for trap in glob("解析データ/*罠一覧.html"):
    #     read_traps(trap)
    for monster in glob("解析データ/*敵一覧.html"):
        print(monster)
        read_monsters(monster)
