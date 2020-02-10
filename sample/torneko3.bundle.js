require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
// checkInp.ts
//
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var checkInp = function (inp) {
    var e_1, _a, e_2, _b;
    // friends
    if (inp.friends.length !== 10) {
        throw new Error("invalid length of friends !");
    }
    try {
        for (var _c = __values(inp.friends), _d = _c.next(); !_d.done; _d = _c.next()) {
            var f = _d.value;
            checkFriend(f);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // field
    var _e = inp.field, row = _e.row, col = _e.col, data = _e.data;
    if (row * col !== data.length) {
        throw new Error("invalid field size: " + col + "*" + row + " !== " + data.length);
    }
    var allowedData = [0, 1, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var d = data_1_1.value;
            if (!allowedData.includes(d)) {
                throw new Error("invalid data in field: " + d);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_b = data_1.return)) _b.call(data_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    // config
    var _f = inp.config, turn = _f.turn, trial = _f.trial;
    if (!Number.isInteger(trial))
        throw new Error('trial must be integer');
    if (trial <= 0)
        throw new Error('trial must be positive');
    if (!Number.isInteger(turn))
        throw new Error('turn must be integer');
    if (turn <= 0)
        throw new Error('turn must be positive');
};
var checkFriend = function (f) {
    if (f.name === undefined) {
        throw new Error("name not specified !");
    }
    if (f.lv === undefined) {
        throw new Error("lv not specified !");
    }
    if (!Number.isInteger(f.lv)) {
        throw new Error("");
    }
    if (f.hpDope && (!Number.isInteger(f.hpDope) || f.hpDope < 0)) {
        throw new Error("hpDope must be non-negative integer.");
    }
    if (f.atkDope && (!Number.isInteger(f.atkDope) || f.atkDope < 0)) {
        throw new Error("atkDope must be non-negative integer.");
    }
    if (f.weakenAtk && ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(f.weakenAtk)) {
        throw new Error("weakenAtk must be in [0, 1, 2, 3, 4, 5, 6, 8, 9].");
    }
    if (f.weakenDef && ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(f.weakenDef)) {
        throw new Error("weakenDef must be in [0, 1, 2, 3, 4, 5, 6].");
    }
    if (f.isSticked !== undefined && f.isSticked && f.name !== "ホイミスライム") {
        throw new Error(f.name + " must be \"isSticked: true\"");
    }
};
exports.default = checkInp;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProbabilityConf = {
    attack: 0.92,
    divide: 0.25,
    hoimin: {
        skill: 0.3553,
        attack: 0.30,
        move: 0.30,
        moveTurn: 300,
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
    mister: {
        skill: 0.12,
    },
    isshi: {
        skill: 0.10,
    },
    flida: {
        skill: 0.22,
    },
    rangas: {
        skill: 0.22,
    },
    // 隣接角抜けあり特技系
    lovelace: {
        skill: 0.2,
    },
    dragosu: {
        skill: 0.2
    },
    drataru: {
        skill: 0.2
    },
    // 視界影響なし直線上特技
    lily: {
        skill: 0.5,
        range: 10,
    },
    dog: {
        skill: 0.37,
        range: 10,
    },
    drango: {
        skill: 0.25,
        range: Infinity
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

},{}],3:[function(require,module,exports){
"use strict";
// scsManager.ts
//
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var unit_1 = require("./unit");
var scsField_1 = require("./scsField");
var config_1 = require("./config");
var checkInp_1 = __importDefault(require("./checkInp"));
/**
 * 0～N-1のランダムな整数を返す。
 * @param {Integer} n 自然数N
 */
var randint = function (n) {
    return Math.floor(Math.random() * Math.floor(n));
};
var addPlace = function (place1, place2) {
    return {
        row: place1.row + place2.row,
        col: place1.col + place2.col
    };
};
var namesSkillAdjacentWOCorner = [
    'おばけキノコ',
    'メイジももんじゃ',
    'メイジキメラ',
    'ハエまどう',
    'はねせんにん',
    'フライングデビル',
    'ランガー',
    'ミステリードール',
    'いしにんぎょう'
];
var namesSkillAdjacentWCorner = [
    'スライムブレス',
    'ドラゴスライム',
    'ドラゴメタル'
];
var namesSkillAdjacent = namesSkillAdjacentWOCorner.concat(namesSkillAdjacentWCorner);
var Manager = /** @class */ (function () {
    function Manager(inp, pConf) {
        if (pConf === void 0) { pConf = config_1.defaultProbabilityConf; }
        this.friends = [];
        this.enemys = [];
        this.killCount = 0;
        this.turnNow = 0;
        this.field = new scsField_1.SCSField({ row: 0, col: 0, data: [] });
        checkInp_1.default(inp);
        this.inp = inp;
        this.pConf = pConf;
        this.config = this.inp.config;
        this.trialOutputs = [];
        this.init();
    }
    Manager.prototype.init = function () {
        var e_1, _a, e_2, _b;
        this.friends = [];
        this.enemys = [];
        this.killCount = 0;
        this.turnNow = 0;
        this.field = new scsField_1.SCSField(this.inp.field);
        var _loop_1 = function (order, friend) {
            // placeを探す
            var FieldIndex = this_1.inp.field.data.findIndex(function (m) { return m === order + 10; });
            var place = {
                row: Math.floor(FieldIndex / this_1.inp.field.col),
                col: FieldIndex % this_1.inp.field.col
            };
            this_1.friends.push(new unit_1.Friend(friend, place, this_1.pConf));
        };
        var this_1 = this;
        try {
            // this.fieldの中身
            // 0:     空き領域
            // 1:     壁
            // 9:     Enemy -> 後で20以降に連番で振る
            // 10-19: Friend
            // Friendの読み込み
            for (var _c = __values(this.inp.friends.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), order = _e[0], friend = _e[1];
                _loop_1(order, friend);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Enemyの読み込み
        var enemyFieldIndex = this.inp.field.data.reduce(function (accumulator, currentValue, index) {
            if (currentValue === 9) {
                accumulator.push(index);
            }
            return accumulator;
        }, []);
        try {
            for (var enemyFieldIndex_1 = __values(enemyFieldIndex), enemyFieldIndex_1_1 = enemyFieldIndex_1.next(); !enemyFieldIndex_1_1.done; enemyFieldIndex_1_1 = enemyFieldIndex_1.next()) {
                var FieldIndex = enemyFieldIndex_1_1.value;
                var place = {
                    row: Math.floor(FieldIndex / this.inp.field.col),
                    col: FieldIndex % this.inp.field.col
                };
                this.enemys.push(new unit_1.Enemy(place, this.killCount, this.pConf));
                this.field.setField(place, this.killCount + 20);
                this.killCount += 1;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (enemyFieldIndex_1_1 && !enemyFieldIndex_1_1.done && (_b = enemyFieldIndex_1.return)) _b.call(enemyFieldIndex_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    /**
     * sumoの周囲に分裂方向を考慮して分裂させる
     * kompota君の成果(https://twitter.com/neko3mpota/status/970271526703349760/photo/1)
     * @param {Unit} sumo 攻撃されたスモグル（敵味方問わず）
     */
    Manager.prototype.divide = function (sumo) {
        var dplaceList = [
            { row: -1, col: 0 },
            { row: -1, col: -1 },
            { row: 0, col: -1 },
            { row: 1, col: -1 },
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 0, col: 1 },
            { row: -1, col: 1 },
        ];
        var initialIndex = randint(4) * 2; // 0, 2, 4, 6 = 上, 左, 下, 右
        for (var relativeIndex = 0; relativeIndex < 8; relativeIndex++) {
            var index = relativeIndex + initialIndex;
            index = index > 7 ? index - 8 : index;
            var place = addPlace(sumo.place, dplaceList[index]);
            if (this.field.getField(place) === 0) {
                this.addEnemy(place);
                return true;
            }
        }
        return false;
    };
    ;
    Manager.prototype.getEnemyByNumber = function (num) {
        return this.enemys.filter(function (e) { return e.num === num; })[0];
    };
    ;
    Manager.prototype.addEnemy = function (place) {
        if (Math.random() < this.pConf.divide) {
            this.enemys.push(new unit_1.Enemy(place, this.killCount, this.pConf));
            this.field.setField(place, this.killCount + 20);
            this.killCount += 1;
        }
    };
    // --------------------------------------------------------------------
    /*
     *  runAllTrial
     *  └── trial
     *      └── turn
     *          ├── turnEnemy
     *          └── turnFriend
     */
    Manager.prototype.runAllTrial = function () {
        this.init();
        for (var trial = 0; trial < this.config.trial; trial++) {
            this.trial();
            this.trialOutputs.push(this.toJson());
        }
    };
    Manager.prototype.trial = function () {
        var e_3, _a;
        this.init();
        for (var turn = 0; turn < this.config.turn; turn++) {
            // 1ターン経過
            this.turn();
            try {
                // 仲間が倒れていないかチェック
                for (var _b = (e_3 = void 0, __values(this.friends)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var friend = _c.value;
                    if (friend.chp < 0) {
                        return;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            // スモールグールが消えていないかチェック
            if (this.enemys.length === 0) {
                return;
            }
            this.turnNow += 1;
        }
    };
    Manager.prototype.turn = function () {
        this.turnEnemy();
        this.turnFriend();
    };
    Manager.prototype.turnEnemy = function () {
        var e_4, _a;
        try {
            // 敵の行動
            for (var _b = __values(this.enemys), _c = _b.next(); !_c.done; _c = _b.next()) {
                var enemy = _c.value;
                // 1. 攻撃を試みる
                var targets = this.field.findTargets(enemy.place);
                if (targets.length !== 0) {
                    var target = targets[randint(targets.length)];
                    var friend = this.friends[target - 10];
                    var result = enemy.attack(friend);
                    // 対象がスモールグールだった場合は分裂処理
                    if (friend.name === 'スモールグール' && !friend.isSealed && result) {
                        this.divide(this.friends[target - 10]);
                    }
                    continue; // 攻撃したら終了
                }
                // 2. 移動を試みる
                var emptyPlaces = this.field.findTargets(enemy.place, true, false);
                if (emptyPlaces.length !== 0) {
                    var place = emptyPlaces[randint(emptyPlaces.length)];
                    this.field.setField(enemy.place, 0);
                    this.field.setField(place, enemy.num + 20);
                    enemy.place = place;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    Manager.prototype.turnFriend = function () {
        var e_5, _a, e_6, _b;
        try {
            // 仲間の行動
            for (var _c = __values([true, false]), _d = _c.next(); !_d.done; _d = _c.next()) {
                var speed = _d.value;
                try {
                    for (var _e = (e_6 = void 0, __values(this.friends)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var friend = _f.value;
                        if (speed || friend.doubleSpeed) {
                            var isActed = this.actionFriend(friend);
                            if (!isActed) {
                                friend.actionLossCount += 1;
                            }
                            friend.naturalRecovery();
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    Manager.prototype.actionFriend = function (f) {
        if (f.isSealed) {
            return this.actionNormal(f);
        }
        else if (f.name === 'キラーマシン' || f.name === 'さそりかまきり') {
            return this.actionKillerMachine(f);
        }
        else if (f.name === 'ホイミスライム') {
            return this.actionHoimiSlime(f);
        }
        else if (namesSkillAdjacent.includes(f.name)) {
            return this.actionSkillAdjacent(f);
        }
        else {
            return this.actionNormal(f);
        }
    };
    /**
     * 単純な殴り攻撃の実装
     * @param {Friend} friend 攻撃するFriend
     * @param {Enemy} enemy 攻撃されるスモグル
     * @param {number} damage 固定ダメージの場合は与える
     * @returns {string} 攻撃の終了判定, killed/survived/missed
     */
    Manager.prototype.attack = function (friend, enemy, fixedDamage) {
        if (fixedDamage === void 0) { fixedDamage = 0; }
        var result = friend.attack(enemy, fixedDamage);
        if (enemy.chp <= 0) {
            // 攻撃後に倒れた場合
            friend.getExp();
            this.field.setField(enemy.place, 0);
            this.enemys = this.enemys.filter(function (e) { return e !== enemy; });
            return 'killed';
        }
        else if (result) {
            // 攻撃後に生き残った場合（分裂処理）
            var wasAbleToDivide = this.divide(enemy);
            if (!wasAbleToDivide) {
                friend.divisionLossCount += 1;
            }
            return 'survived';
        }
        return 'missed';
    };
    Manager.prototype.actionNormal = function (f) {
        var targets = this.field.findTargets(f.place);
        if (targets.length !== 0) {
            var target = targets[randint(targets.length)];
            var enemy = this.getEnemyByNumber(target - 20);
            this.attack(f, enemy);
            return true;
        }
        return false;
    };
    /**
     * 隣接特技を持つキャラの行動
     * @param {Friend} f 隣接特技を持つキャラ
     */
    Manager.prototype.actionSkillAdjacent = function (f) {
        // 角抜けが対象かどうかで対象を場合分け
        var wCorner = namesSkillAdjacentWCorner.includes(f.name);
        var targets = this.field.findTargets(f.place, false, wCorner);
        if (targets.length !== 0) {
            var target = targets[randint(targets.length)];
            var enemy = this.getEnemyByNumber(target - 20);
            // 特技を使う場合
            switch (f.name) {
                case 'おばけキノコ':
                    if (Math.random() < this.pConf.kinoko.skill) {
                        enemy.weakenAtk += 1;
                        enemy.setAtk();
                        return true;
                    }
                    break;
                case 'メイジももんじゃ':
                    if (Math.random() < this.pConf.merumon.skill) {
                        enemy.isSealed = true;
                        return true;
                    }
                    break;
                case 'メイジキメラ':
                    if (Math.random() < this.pConf.mekira.skill) {
                        enemy.isSealed = true;
                        return true;
                    }
                    break;
                case 'ハエまどう':
                    if (Math.random() < this.pConf.haeru.skill) {
                        enemy.chp = Math.ceil(enemy.chp / 4);
                        return true;
                    }
                    break;
                case 'はねせんにん':
                    if (Math.random() < this.pConf.haeru.skill) {
                        enemy.chp = Math.ceil(enemy.chp / 2);
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
                            enemy.chp = Math.ceil(enemy.chp / 2);
                        }
                        else {
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
                        }
                        else {
                            enemy.weakenAtk += 1;
                            enemy.setAtk();
                        }
                        return true;
                    }
                    break;
                case 'スライムブレス':
                    if (Math.random() < f.pConf.lovelace.skill) {
                        this.attack(f, enemy, 10);
                        return true;
                    }
                    break;
                case 'ドラゴスライム':
                    if (Math.random() < f.pConf.lovelace.skill) {
                        this.attack(f, enemy, 10);
                        return true;
                    }
                    break;
                case 'ドラゴメタル':
                    if (Math.random() < f.pConf.lovelace.skill) {
                        this.attack(f, enemy, 20);
                        return true;
                    }
                    break;
                default:
                    throw new Error("skill not implemented: " + f.name);
            }
            // 特技を使わなかったら攻撃する
            this.attack(f, enemy);
            return true;
        }
        return false;
    };
    /**
     * キラーマシンまたはさそりかまきりの行動
     * @param {Friend} f キラーマシンまたはさそりかまきり
     */
    Manager.prototype.actionKillerMachine = function (f) {
        var targets = this.field.findTargets(f.place);
        if (targets.length !== 0) {
            var target = targets[randint(targets.length)];
            var enemy = this.getEnemyByNumber(target - 20);
            var result = this.attack(f, enemy); // 攻撃1回目
            if (result === 'killed')
                return true; // 一回目で倒したら終了
            this.attack(f, enemy); // 攻撃2回目
            return true;
        }
        return false;
    };
    /**
     * ホイミスライムの行動
     * 1. 周囲の傷ついたキャラの数を取得
     * 2. ホイミ発動を判断
     * 3. 攻撃可能なキャラの数を取得  <= ホイミと同じように攻撃可能なキャラごとに判定するモデルとする
     * 4. 攻撃を判断
     * 5. いっしょにいてね（!isSticked）の場合、移動を判断
     * @param {Friend} f ホイミスライム
     */
    Manager.prototype.actionHoimiSlime = function (f) {
        var e_7, _a, e_8, _b, e_9, _c, e_10, _d;
        var returnValue = false;
        // 1.
        var hoimiTargets = [];
        try {
            for (var _e = __values([-1, 0, 1]), _f = _e.next(); !_f.done; _f = _e.next()) {
                var drow = _f.value;
                try {
                    for (var _g = (e_8 = void 0, __values([-1, 0, 1])), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var dcol = _h.value;
                        var place = addPlace(f.place, { row: drow, col: dcol });
                        var number = this.field.getField(place);
                        if (drow === 0 && dcol === 0) {
                            continue;
                        } // me
                        if (10 <= number && number <= 19) { // friends
                            var unit = this.friends[number - 10];
                            if (unit.chp < unit.mhp) {
                                hoimiTargets.push(unit);
                            }
                        }
                        else if (number >= 20) { // enemys
                            var unit = this.getEnemyByNumber(number - 20);
                            if (unit.chp < unit.mhp) {
                                hoimiTargets.push(unit);
                            }
                        }
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_7) throw e_7.error; }
        }
        returnValue = returnValue || !!hoimiTargets.length;
        // 2.
        var execSkill = false;
        for (var t = 0; t < hoimiTargets.length; t++) {
            if (Math.random() < this.pConf.hoimin.skill) {
                execSkill = true;
                break;
            }
        }
        if (execSkill) {
            try {
                for (var hoimiTargets_1 = __values(hoimiTargets), hoimiTargets_1_1 = hoimiTargets_1.next(); !hoimiTargets_1_1.done; hoimiTargets_1_1 = hoimiTargets_1.next()) {
                    var target = hoimiTargets_1_1.value;
                    target.chp += 25;
                    if (target.chp > target.mhp) {
                        target.chp = target.mhp;
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (hoimiTargets_1_1 && !hoimiTargets_1_1.done && (_c = hoimiTargets_1.return)) _c.call(hoimiTargets_1);
                }
                finally { if (e_9) throw e_9.error; }
            }
            return returnValue; // ホイミを発動した場合はここで抜ける
        }
        // 3.
        var attackTargets = this.field.findTargets(f.place);
        returnValue = returnValue || !!attackTargets.length;
        try {
            // 4.
            for (var attackTargets_1 = __values(attackTargets), attackTargets_1_1 = attackTargets_1.next(); !attackTargets_1_1.done; attackTargets_1_1 = attackTargets_1.next()) {
                var enemyId = attackTargets_1_1.value;
                if (Math.random() < this.pConf.hoimin.attack) {
                    var enemy = this.getEnemyByNumber(enemyId - 20);
                    this.attack(f, enemy);
                    return returnValue;
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (attackTargets_1_1 && !attackTargets_1_1.done && (_d = attackTargets_1.return)) _d.call(attackTargets_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
        // 5.
        var vacantTargets = this.field.findTargets(f.place, true, false);
        if (!f.isSticked && // ここで待っててではない
            Math.random() < this.pConf.hoimin.move && // 移動確率
            this.turnNow > this.pConf.hoimin.moveTurn && // 移動開始ターン
            !!vacantTargets.length // 移動場所がある
        ) {
            var newPlace = vacantTargets[randint(vacantTargets.length)];
            // console.log('moved from ', f.place, ' to ', newPlace);
            this.field.setField(f.place, 0);
            this.field.setField(newPlace, 10 + this.friends.indexOf(f));
            f.place = newPlace;
            // TODO
            // 移動は「待ち」でなかったと判断すべきだろうか。
            return true;
        }
        return returnValue;
    };
    Manager.prototype.toJson = function () {
        var _this = this;
        // exp/monster
        var expPerMonster = this.friends.map(function (f) { return f.killCount * 22; });
        var expPerMonsterPer_turn = this.friends.map(function (f) { return f.killCount * 22 / _this.config.turn; });
        // loss counts
        var divisionLossCount = this.friends.map(function (f) { return f.divisionLossCount / _this.config.turn; });
        var actionLossCount = this.friends.map(function (f) {
            var turns = f.doubleSpeed ? 2 : 1;
            return f.actionLossCount / _this.config.turn / turns;
        });
        // result
        var result = true;
        var reason = '';
        var friendOrderKilled = -1;
        if (this.turnNow < this.config.turn) {
            result = false;
            if (this.enemys.length === 0) {
                reason = 'enemys are genocided';
            }
            else {
                reason = 'friends are killed';
                for (var order = 0; order < this.friends.length; order++) {
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
                total: this.killCount * 22,
                perTurn: this.killCount * 22 / this.turnNow,
                perMonster: expPerMonster,
                perMonsterPerTurn: expPerMonsterPer_turn,
            },
            loss: {
                action: actionLossCount,
                division: divisionLossCount,
            },
            turnPassed: this.turnNow,
        };
    };
    return Manager;
}());
exports.Manager = Manager;

},{"./checkInp":1,"./config":2,"./scsField":5,"./unit":7}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleInputs = {
    "4キラーマ等速": {
        friends: [
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "ホイミスライム",
                lv: 30,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "スモールグール",
                lv: 30,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "ホイミスライム",
                lv: 30,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
        ],
        field: {
            row: 10,
            col: 10,
            data: [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
                1, 1, 0, 19, 0, 0, 0, 1, 1, 1,
                1, 1, 10, 11, 12, 13, 14, 1, 1, 1,
                1, 1, 9, 9, 9, 9, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 1, 15, 16, 17, 18, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            ]
        },
        config: {
            turn: 1500,
            trial: 100,
        }
    },
    "4キラーマ倍速": {
        friends: [
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: true,
                hpDope: 1,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: true,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: true,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: true,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "ホイミスライム",
                lv: 30,
                doubleSpeed: true,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: true,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: true,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: true,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "スモールグール",
                lv: 30,
                doubleSpeed: true,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "ホイミスライム",
                lv: 30,
                doubleSpeed: true,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
        ],
        field: {
            row: 10,
            col: 10,
            data: [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
                1, 1, 0, 19, 0, 0, 0, 1, 1, 1,
                1, 1, 10, 11, 12, 13, 14, 1, 1, 1,
                1, 1, 9, 9, 9, 9, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 1, 15, 16, 17, 18, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            ]
        },
        config: {
            turn: 1500,
            trial: 100,
        }
    },
    "3キラーマ等速": {
        friends: [
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "ホイミスライム",
                lv: 30,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "スモールグール",
                lv: 30,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "ホイミスライム",
                lv: 30,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
        ],
        field: {
            row: 10,
            col: 10,
            data: [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 1, 0, 19, 0, 0, 1, 1, 1, 1,
                1, 1, 10, 11, 12, 14, 1, 1, 1, 1,
                1, 1, 0, 0, 9, 1, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
                1, 1, 15, 16, 17, 1, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
                1, 1, 13, 18, 0, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            ]
        },
        config: {
            turn: 1500,
            trial: 100,
        }
    },
    "キノコtest": {
        friends: [
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 6,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "ホイミスライム",
                lv: 30,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "キラーマシン",
                lv: 13,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "おばけキノコ",
                lv: 20,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "スモールグール",
                lv: 30,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
            {
                name: "ホイミスライム",
                lv: 30,
                doubleSpeed: false,
                hpDope: 0,
                weakenAtk: 0,
                weakenDef: 0,
                isSealed: false,
            },
        ],
        field: {
            row: 10,
            col: 10,
            data: [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 1, 0, 19, 0, 0, 1, 1, 1, 1,
                1, 1, 10, 11, 12, 14, 1, 1, 1, 1,
                1, 1, 0, 0, 9, 1, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
                1, 1, 15, 16, 17, 1, 1, 1, 1, 1,
                1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
                1, 1, 13, 18, 0, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            ]
        },
        config: {
            turn: 1500,
            trial: 100,
        }
    },
};

},{}],5:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var SCSField = /** @class */ (function () {
    function SCSField(fieldInp) {
        var col = fieldInp.col;
        var row = fieldInp.row;
        var data = fieldInp.data;
        this.col = col;
        this.row = row;
        this.data = [];
        for (var irow = 0; irow < row; irow++) {
            this.data.push(data.slice(irow * col, (irow + 1) * col));
        }
    }
    SCSField.prototype.setField = function (place, num) {
        this.data[place.row][place.col] = num;
    };
    SCSField.prototype.getField = function (place) {
        return this.data[place.row][place.col];
    };
    // TODO
    // any[]は実際number[] or Place[] なのだけれど、うまく書く方法は無いのかな？
    SCSField.prototype.findTargets = function (place, findEmpty, includeKado) {
        var e_1, _a, e_2, _b;
        if (findEmpty === void 0) { findEmpty = false; }
        if (includeKado === void 0) { includeKado = false; }
        var myNumber = this.getField(place);
        var rowMe = place.row;
        var colMe = place.col;
        var isTarget = findEmpty ? (function (num) { return (num === 0); }) : myNumber >= 20 ? (function (num) { return __spread(Array(10)).map(function (_, i) { return i + 10; }).includes(num); }) : (function (num) { return (num >= 20); });
        var targets = [];
        try {
            for (var _c = __values([-1, 0, 1]), _d = _c.next(); !_d.done; _d = _c.next()) {
                var drow = _d.value;
                try {
                    for (var _e = (e_2 = void 0, __values([-1, 0, 1])), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var dcol = _f.value;
                        var tPlace = { row: rowMe + drow, col: colMe + dcol };
                        var tNumber = this.getField(tPlace);
                        if (!isTarget(tNumber)) {
                            continue;
                        } // not target
                        if (drow === 0 && dcol === 0) {
                            continue;
                        } // myself
                        // 上下左右は無条件で追加
                        if (dcol * drow === 0) {
                            if (findEmpty) {
                                targets.push(tPlace);
                            }
                            else {
                                targets.push(tNumber);
                            }
                            continue;
                        }
                        // 斜めは壁によって角抜けになっているかで場合分け
                        var numberUD = this.data[rowMe + drow][colMe];
                        var numberLR = this.data[rowMe][colMe + dcol];
                        var isPlaceKado = (numberUD === 1 || numberLR === 1);
                        if (!isPlaceKado || includeKado) {
                            if (findEmpty) {
                                targets.push(tPlace);
                            }
                            else {
                                targets.push(tNumber);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return targets;
    };
    /**
     * 射程の長い特技を使用するキャラの、特技適用先を返す。
     * 左、左上、上、・・・の順に判定しているが、この順序が正しいか要調査。
     * 特技の貫通はしない前提で、誤射も考慮した最近接している特技適用先1体を返す。
     *
     * @param place 特技を使うモンスターの座標
     * @param probability 特技使用率（1体当たり）
     * @param range 射程
     * @returns 特技適用キャラの番号、または0
     */
    SCSField.prototype.findLineTarget = function (place, probability, range) {
        if (range === void 0) { range = Infinity; }
        var myNumber = this.getField(place);
        var rowMe = place.row;
        var colMe = place.col;
        var target = -1;
        var isTarget = myNumber >= 20 ? (function (num) { return __spread(Array(10)).map(function (_, i) { return i + 10; }).includes(num); }) : (function (num) { return (num >= 20); });
        // 左方向
        target = -1;
        for (var col = colMe - 1; col >= Math.max(0, colMe - range); col--) {
            var numField = this.getField({ row: rowMe, col: col });
            if (numField === 1)
                break;
            if (target === -1 && numField > 9)
                target = numField;
            if (isTarget(numField) && Math.random() < probability)
                return target;
        }
        // 左上方向
        target = -1;
        for (var dd = 1; (colMe - dd) >= Math.max(0, colMe - range) && (rowMe - dd) >= Math.max(0, rowMe - range); dd++) {
            var numField = this.getField({ row: rowMe - dd, col: colMe - dd });
            if (numField === 1)
                break;
            if (target === -1 && numField > 9)
                target = numField;
            if (isTarget(numField) && Math.random() < probability)
                return target;
        }
        // 上方向
        target = -1;
        for (var row = rowMe - 1; row >= Math.max(0, rowMe - range); row--) {
            var numField = this.getField({ row: row, col: colMe });
            if (numField === 1)
                break;
            if (target === -1 && numField > 9)
                target = numField;
            if (isTarget(numField) && Math.random() < probability)
                return target;
        }
        // 右上方向
        target = -1;
        for (var dd = 1; (colMe + dd) <= Math.min(this.col, colMe + range) && (rowMe - dd) >= Math.max(0, rowMe - range); dd++) {
            var numField = this.getField({ row: rowMe - dd, col: colMe + dd });
            if (numField === 1)
                break;
            if (target === -1 && numField > 9)
                target = numField;
            if (isTarget(numField) && Math.random() < probability)
                return target;
        }
        // 右方向
        target = -1;
        for (var col = colMe + 1; col <= Math.min(this.col, colMe + range); col++) {
            var numField = this.getField({ row: rowMe, col: col });
            if (numField === 1)
                break;
            if (target === -1 && numField > 9)
                target = numField;
            if (isTarget(numField) && Math.random() < probability)
                return target;
        }
        // 右下方向
        target = -1;
        for (var dd = 1; (colMe + dd) <= Math.min(this.col, colMe + range) && (rowMe + dd) <= Math.min(this.row, rowMe + range); dd++) {
            var numField = this.getField({ row: rowMe + dd, col: colMe + dd });
            if (numField === 1)
                break;
            if (target === -1 && numField > 9)
                target = numField;
            if (isTarget(numField) && Math.random() < probability)
                return target;
        }
        // 下方向
        target = -1;
        for (var row = rowMe + 1; row <= Math.min(this.row, rowMe + range); row++) {
            var numField = this.getField({ row: row, col: colMe });
            if (numField === 1)
                break;
            if (target === -1 && numField > 9)
                target = numField;
            if (isTarget(numField) && Math.random() < probability)
                return target;
        }
        // 左下方向
        target = -1;
        for (var dd = 1; (colMe - dd) >= Math.max(0, colMe - range) && (rowMe + dd) <= Math.min(this.row, rowMe + range); dd++) {
            var numField = this.getField({ row: rowMe + dd, col: colMe - dd });
            if (numField === 1)
                break;
            if (target === -1 && numField > 9)
                target = numField;
            if (isTarget(numField) && Math.random() < probability)
                return target;
        }
        return 0;
    };
    SCSField.prototype.show = function () {
        var e_3, _a, e_4, _b;
        var string = "";
        try {
            for (var _c = __values(this.data), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                try {
                    for (var row_1 = (e_4 = void 0, __values(row)), row_1_1 = row_1.next(); !row_1_1.done; row_1_1 = row_1.next()) {
                        var mass = row_1_1.value;
                        if (mass === 0) {
                            string += " ";
                        }
                        else if (mass === 1) {
                            string += "#";
                        }
                        else if (mass < 20) {
                            string += (mass - 10).toString(10);
                        }
                        else {
                            string += "*";
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (row_1_1 && !row_1_1.done && (_b = row_1.return)) _b.call(row_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                string += "\n";
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return string;
    };
    return SCSField;
}());
exports.SCSField = SCSField;

},{}],6:[function(require,module,exports){
"use strict";
// status.ts
// モンスターステータス関連
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var GrowType;
(function (GrowType) {
    GrowType[GrowType["FutsuSojuku"] = 0] = "FutsuSojuku";
    GrowType[GrowType["KogekiSojuku"] = 1] = "KogekiSojuku";
    GrowType[GrowType["BougyoSojuku"] = 2] = "BougyoSojuku";
    GrowType[GrowType["BannoBansei"] = 3] = "BannoBansei";
    GrowType[GrowType["KogekiBansei"] = 4] = "KogekiBansei";
    GrowType[GrowType["BougyoBansei"] = 5] = "BougyoBansei";
    GrowType[GrowType["KogekiTokusyu"] = 6] = "KogekiTokusyu";
    GrowType[GrowType["SyubiTokusyu"] = 7] = "SyubiTokusyu";
})(GrowType || (GrowType = {}));
var getEXP = function (g, lv) {
    switch (g) {
        case GrowType.FutsuSojuku:
            return [0, 3, 10, 30, 50, 100, 150, 200, 300, 500, 800, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 4000, 5000, 6500, 8000, 10000, 13000, 16000, 20000, 25000, 30000, 36000, 42000, 48000, 54000, 60000, 70000, 80000, 90000, 100000, 115000, 130000, 145000, 160000, 175000, 200000, 230000, 260000, 290000, 320000, 350000, 380000, 410000, 440000, 470000, 500000, 530000, 560000, 590000, 620000, 650000, 680000, 710000, 750000, 790000, 830000, 870000, 910000, 950000, 990000, 1030000, 1070000, 1120000, 1170000, 1220000, 1270000, 1320000, 1370000, 1420000, 1470000, 1520000, 1570000, 1620000, 1670000, 1720000, 1770000, 1820000, 1880000, 1940000, 2000000, 2060000, 2120000, 2180000, 2240000, 2300000, 2360000, 2420000, 3000000, 5000000, 7000000, 9000000, 9990000][lv - 1];
        case GrowType.KogekiSojuku:
            return [0, 10, 30, 60, 120, 160, 300, 500, 750, 1000, 1250, 1600, 2000, 2600, 3200, 4000, 5000, 6500, 8000, 9500, 11000, 13000, 16000, 19000, 22000, 25000, 28000, 31000, 36000, 42000, 48000, 54000, 60000, 70000, 80000, 90000, 100000, 115000, 130000, 145000, 160000, 175000, 200000, 230000, 260000, 290000, 320000, 350000, 380000, 410000, 440000, 470000, 500000, 530000, 560000, 590000, 620000, 650000, 680000, 710000, 750000, 790000, 830000, 870000, 910000, 950000, 990000, 1030000, 1070000, 1120000, 1170000, 1220000, 1270000, 1320000, 1370000, 1420000, 1470000, 1520000, 1570000, 1620000, 1670000, 1720000, 1770000, 1820000, 1880000, 1940000, 2000000, 2060000, 2120000, 2180000, 2240000, 2300000, 2360000, 2420000, 3000000, 5000000, 7000000, 9000000, 9990000][lv - 1];
        case GrowType.BougyoSojuku:
            return [0, 35, 100, 300, 600, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 13000, 15000, 17000, 20000, 23000, 26000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 70000, 80000, 90000, 100000, 115000, 130000, 145000, 160000, 175000, 200000, 230000, 260000, 290000, 320000, 350000, 380000, 410000, 440000, 470000, 500000, 530000, 560000, 590000, 620000, 650000, 680000, 710000, 750000, 790000, 830000, 870000, 910000, 950000, 990000, 1030000, 1070000, 1120000, 1170000, 1220000, 1270000, 1320000, 1370000, 1420000, 1470000, 1520000, 1570000, 1620000, 1670000, 1720000, 1770000, 1820000, 1880000, 1940000, 2000000, 2060000, 2120000, 2180000, 2240000, 2300000, 2360000, 2420000, 3000000, 5000000, 7000000, 9000000, 9990000][lv - 1];
        case GrowType.BannoBansei:
            return [0, 150, 500, 1300, 2500, 4000, 8000, 16000, 20000, 30000, 40000, 60000, 80000, 100000, 130000, 160000, 190000, 220000, 250000, 280000, 310000, 340000, 370000, 400000, 440000, 480000, 520000, 560000, 600000, 640000, 680000, 720000, 760000, 800000, 840000, 880000, 920000, 960000, 1000000, 1040000, 1090000, 1140000, 1190000, 1240000, 1290000, 1340000, 1390000, 1440000, 1490000, 1540000, 1590000, 1640000, 1690000, 1740000, 1790000, 1840000, 1890000, 1940000, 1990000, 2040000, 2090000, 2140000, 2190000, 2240000, 2290000, 2340000, 2390000, 2440000, 2490000, 2540000, 2590000, 2640000, 2690000, 2740000, 2790000, 2840000, 2890000, 2940000, 2990000, 3040000, 3100000, 3160000, 3220000, 3400000, 3600000, 3800000, 4000000, 4200000, 4400000, 4600000, 4800000, 5000000, 5500000, 6000000, 6500000, 7000000, 8000000, 9000000, 9990000][lv - 1];
        case GrowType.KogekiBansei:
            return [0, 45, 200, 600, 1000, 1600, 2500, 3500, 4500, 5500, 7000, 8500, 10000, 20000, 30000, 50000, 70000, 90000, 110000, 130000, 150000, 170000, 190000, 210000, 230000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000, 320000, 330000, 340000, 350000, 360000, 370000, 380000, 390000, 400000, 410000, 420000, 430000, 440000, 450000, 460000, 470000, 480000, 490000, 500000, 510000, 520000, 530000, 540000, 550000, 560000, 570000, 580000, 630000, 680000, 730000, 780000, 830000, 880000, 930000, 980000, 1030000, 1090000, 1150000, 1210000, 1270000, 1330000, 1390000, 1450000, 1510000, 1570000, 1630000, 1690000, 1750000, 1810000, 1870000, 1930000, 1990000, 2050000, 2110000, 2170000, 2230000, 2310000, 2390000, 2470000, 2550000, 2630000, 3000000, 5000000, 7000000, 9000000, 9990000][lv - 1];
        case GrowType.BougyoBansei:
            return [0, 55, 300, 900, 1300, 2000, 3500, 5000, 7500, 10000, 12500, 15500, 20000, 30000, 40000, 50000, 70000, 90000, 110000, 130000, 150000, 170000, 190000, 210000, 230000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000, 320000, 330000, 340000, 350000, 360000, 370000, 380000, 390000, 400000, 410000, 420000, 430000, 440000, 450000, 460000, 470000, 480000, 490000, 500000, 510000, 520000, 530000, 540000, 550000, 560000, 570000, 580000, 630000, 680000, 730000, 780000, 830000, 880000, 930000, 980000, 1030000, 1090000, 1150000, 1210000, 1270000, 1330000, 1390000, 1450000, 1510000, 1570000, 1630000, 1690000, 1750000, 1810000, 1870000, 1930000, 1990000, 2050000, 2110000, 2170000, 2230000, 2310000, 2390000, 2470000, 2550000, 2630000, 3000000, 5000000, 7000000, 9000000, 9990000][lv - 1];
        case GrowType.KogekiTokusyu:
            return [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000, 2500000, 2600000, 2700000, 2800000, 2900000, 3000000, 3100000, 3200000, 3300000, 3400000, 3500000, 3600000, 3700000, 3800000, 3900000, 4000000, 4100000, 4200000, 4300000, 4400000, 4500000, 4600000, 4700000, 4800000, 4900000, 5000000, 5100000, 5200000, 5300000, 5400000, 5500000, 5600000, 5700000, 5800000, 5900000, 6000000, 6100000, 6200000, 6300000, 6400000, 6500000, 6600000, 6700000, 6800000, 6900000, 7000000, 7100000, 7200000, 7300000, 7400000, 7500000, 7600000, 7700000, 7800000, 7900000, 8000000, 8100000, 8200000, 8300000, 8400000, 8500000, 8600000, 8700000, 8800000, 8900000, 9000000, 9100000, 9200000, 9300000, 9400000, 9500000, 9600000, 9700000, 9990000][lv - 1];
        case GrowType.SyubiTokusyu:
            return [0, 100, 350, 900, 1300, 2000, 3500, 5000, 7500, 10000, 12500, 15500, 20000, 30000, 40000, 50000, 70000, 90000, 110000, 130000, 150000, 170000, 190000, 210000, 230000, 270000, 300000, 330000, 360000, 380000, 390000, 420000, 470000, 520000, 570000, 620000, 670000, 720000, 770000, 820000, 870000, 920000, 970000, 1020000, 1070000, 1120000, 1170000, 1220000, 1270000, 1320000, 1380000, 1440000, 1500000, 1560000, 1620000, 1680000, 1740000, 1800000, 1860000, 1920000, 1980000, 2040000, 2100000, 2160000, 2220000, 2280000, 2340000, 2400000, 2460000, 2520000, 2580000, 2640000, 2700000, 2760000, 2820000, 2880000, 2940000, 3000000, 3060000, 3120000, 3180000, 3250000, 3320000, 3390000, 3460000, 3530000, 3600000, 3670000, 3740000, 3810000, 3880000, 3950000, 4020000, 4090000, 4160000, 5000000, 7000000, 9000000, 9990000][lv - 1];
    }
};
var getMHPGrow = function (g, lv) {
    switch (g) {
        case GrowType.FutsuSojuku:
            return [0, 8, 15, 21, 26, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 59, 61, 63, 65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146][lv - 1];
        case GrowType.KogekiSojuku:
            return [0, 3, 6, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 47, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67][lv - 1];
        case GrowType.BougyoSojuku:
            return [0, 4, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 60, 61, 61, 62, 62, 63, 63, 64, 64, 65, 65, 66, 66, 67, 67, 68, 68, 69, 69, 70, 70, 71, 71, 72, 72, 73, 73, 74, 74, 75, 75, 76, 76, 77, 77, 78, 78, 79, 79, 80, 80, 81, 81, 82, 82, 83, 83, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84][lv - 1];
        case GrowType.BannoBansei:
            return [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210][lv - 1];
        case GrowType.KogekiBansei:
            return [0, 3, 6, 9, 12, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132][lv - 1];
        case GrowType.BougyoBansei:
            return [0, 8, 15, 21, 26, 30, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86][lv - 1];
        case GrowType.KogekiTokusyu:
            return [0, 10, 15, 20, 25, 30, 35, 40, 45, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55][lv - 1];
        case GrowType.SyubiTokusyu:
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][lv - 1];
    }
};
var getATKGrow = function (g, lv) {
    switch (g) {
        case GrowType.FutsuSojuku:
            return [0, 9, 14, 18, 21, 24, 27, 30, 33, 36, 38, 40, 42, 44, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 71, 71, 72, 72, 73, 73, 74, 74, 75, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76][lv - 1];
        case GrowType.KogekiSojuku:
            return [0, 2, 4, 6, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131][lv - 1];
        case GrowType.BougyoSojuku:
            return [0, 5, 10, 14, 17, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 39, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40][lv - 1];
        case GrowType.BannoBansei:
            return [0, 10, 16, 21, 26, 31, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 107, 108, 108, 109, 109, 110, 110, 111, 111, 112, 112, 113, 113, 114, 114, 115, 115, 116, 116, 117, 117, 118, 118, 119, 119, 120, 120, 121, 121, 122, 122, 123, 123, 124, 124, 125, 125, 126, 126, 127, 127, 128, 128, 129, 129, 130, 130, 131, 131, 132, 132, 133, 133, 134, 134, 135, 135, 136][lv - 1];
        case GrowType.KogekiBansei:
            return [0, 5, 9, 12, 14, 16, 18, 20, 22, 23, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176][lv - 1];
        case GrowType.BougyoBansei:
            return [0, 2, 4, 6, 8, 10, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 30, 31, 31, 32, 32, 33, 33, 34, 34, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35][lv - 1];
        case GrowType.KogekiTokusyu:
            return [0, 70, 140, 200, 260, 310, 360, 410, 460, 510, 515, 519, 522, 524, 526, 528, 530, 532, 534, 536, 538, 540, 542, 544, 546, 548, 550, 552, 554, 556, 558, 560, 562, 564, 566, 568, 570, 572, 574, 576, 578, 580, 582, 584, 586, 588, 590, 592, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644][lv - 1];
        case GrowType.SyubiTokusyu:
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][lv - 1];
    }
};
var getDEFGrow = function (g, lv) {
    switch (g) {
        case GrowType.FutsuSojuku:
            return [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40][lv - 1];
        case GrowType.KogekiSojuku:
            return [0, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33][lv - 1];
        case GrowType.BougyoSojuku:
            return [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 55, 56, 57, 57, 58, 58, 59, 59, 60, 60, 61, 61, 62, 62, 63, 63, 64, 64, 65, 65, 66, 66, 67, 67, 68, 68, 69, 69, 70, 70, 71, 71, 72, 72, 73, 73, 74, 74, 75, 75, 76, 76, 77, 77, 78, 78, 79, 79, 80, 80, 81, 81, 82, 82, 83, 83, 84, 84, 85, 85, 86, 86, 87, 87, 88, 88, 89, 89, 90, 90, 91][lv - 1];
        case GrowType.BannoBansei:
            return [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107][lv - 1];
        case GrowType.KogekiBansei:
            return [0, 1, 2, 3, 4, 5, 6, 9, 12, 15, 18, 21, 24, 25, 26, 27, 28, 29, 30, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31][lv - 1];
        case GrowType.BougyoBansei:
            return [0, 6, 11, 15, 18, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 127, 129, 130, 132, 133, 135, 136, 138, 139, 141, 142, 144, 145, 147, 148, 150, 151, 153, 154, 158][lv - 1];
        case GrowType.KogekiTokusyu:
            return [0, 30, 35, 40, 45, 50, 55, 60, 65, 70, 74, 77, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165][lv - 1];
        case GrowType.SyubiTokusyu:
            return [0, 3, 6, 9, 12, 15, 18, 21, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204][lv - 1];
    }
};
exports.getBasicMonsterStatus = function (name, lv) {
    var basicMonsterStatusDict = {
        "いたずらもぐら": { growType: GrowType.FutsuSojuku, mhp0: 8, atk0: 6, def0: 5, maximumLv: 5, exp: 0, recovery: 50 },
        "がいこつけんし": { growType: GrowType.FutsuSojuku, mhp0: 35, atk0: 20, def0: 10, maximumLv: 9, exp: 0, recovery: 50 },
        "かげのきし": { growType: GrowType.FutsuSojuku, mhp0: 85, atk0: 30, def0: 29, maximumLv: 9, exp: 0, recovery: 50 },
        "キラースター": { growType: GrowType.FutsuSojuku, mhp0: 62, atk0: 19, def0: 18, maximumLv: 99, exp: 0, recovery: 100 },
        "グール": { growType: GrowType.FutsuSojuku, mhp0: 50, atk0: 21, def0: 20, maximumLv: 9, exp: 0, recovery: 50 },
        "くさった死体": { growType: GrowType.FutsuSojuku, mhp0: 45, atk0: 15, def0: 15, maximumLv: 9, exp: 0, recovery: 50 },
        "しりょうのきし": { growType: GrowType.FutsuSojuku, mhp0: 70, atk0: 35, def0: 35, maximumLv: 9, exp: 0, recovery: 50 },
        "スライム": { growType: GrowType.FutsuSojuku, mhp0: 5, atk0: 2, def0: 2, maximumLv: 99, exp: 0, recovery: 50 },
        "スライムベス": { growType: GrowType.FutsuSojuku, mhp0: 6, atk0: 3, def0: 3, maximumLv: 99, exp: 0, recovery: 50 },
        "スライムベホマズン": { growType: GrowType.FutsuSojuku, mhp0: 100, atk0: 50, def0: 50, maximumLv: 9, exp: 0, recovery: 100 },
        "タホドラキー": { growType: GrowType.FutsuSojuku, mhp0: 35, atk0: 16, def0: 15, maximumLv: 3, exp: 0, recovery: 50 },
        "デビルアンカー": { growType: GrowType.FutsuSojuku, mhp0: 45, atk0: 16, def0: 11, maximumLv: 99, exp: 0, recovery: 100 },
        "どくどくゾンビ": { growType: GrowType.FutsuSojuku, mhp0: 100, atk0: 45, def0: 35, maximumLv: 9, exp: 0, recovery: 50 },
        "ドラキー": { growType: GrowType.FutsuSojuku, mhp0: 7, atk0: 5, def0: 2, maximumLv: 99, exp: 0, recovery: 50 },
        "ドラキーマ": { growType: GrowType.FutsuSojuku, mhp0: 42, atk0: 20, def0: 14, maximumLv: 99, exp: 0, recovery: 100 },
        "ハエまどう": { growType: GrowType.FutsuSojuku, mhp0: 50, atk0: 16, def0: 24, maximumLv: 99, exp: 0, recovery: 50 },
        "ファイヤーケロッグ": { growType: GrowType.FutsuSojuku, mhp0: 40, atk0: 11, def0: 10, maximumLv: 9, exp: 0, recovery: 50 },
        "ブラウニー": { growType: GrowType.FutsuSojuku, mhp0: 25, atk0: 14, def0: 17, maximumLv: 99, exp: 0, recovery: 50 },
        "プラチナキング": { growType: GrowType.FutsuSojuku, mhp0: 134, atk0: 52, def0: 52, maximumLv: 99, exp: 0, recovery: 100 },
        "ホイミスライム": { growType: GrowType.FutsuSojuku, mhp0: 28, atk0: 10, def0: 9, maximumLv: 99, exp: 0, recovery: 50 },
        "メイジももんじゃ": { growType: GrowType.FutsuSojuku, mhp0: 45, atk0: 19, def0: 19, maximumLv: 99, exp: 0, recovery: 50 },
        "ももんじゃ": { growType: GrowType.FutsuSojuku, mhp0: 12, atk0: 7, def0: 5, maximumLv: 99, exp: 0, recovery: 50 },
        "リビングデッド": { growType: GrowType.FutsuSojuku, mhp0: 50, atk0: 15, def0: 16, maximumLv: 9, exp: 0, recovery: 50 },
        "リビングハンマー": { growType: GrowType.FutsuSojuku, mhp0: 90, atk0: 44, def0: 30, maximumLv: 99, exp: 0, recovery: 100 },
        "エリミネーター": { growType: GrowType.KogekiSojuku, mhp0: 100, atk0: 30, def0: 35, maximumLv: 99, exp: 0, recovery: 100 },
        "キメラ": { growType: GrowType.KogekiSojuku, mhp0: 48, atk0: 30, def0: 20, maximumLv: 99, exp: 0, recovery: 30 },
        "さつじんき": { growType: GrowType.KogekiSojuku, mhp0: 48, atk0: 16, def0: 18, maximumLv: 99, exp: 0, recovery: 50 },
        "しにがみ": { growType: GrowType.KogekiSojuku, mhp0: 35, atk0: 15, def0: 13, maximumLv: 99, exp: 0, recovery: 50 },
        "スターキメラ": { growType: GrowType.KogekiSojuku, mhp0: 78, atk0: 32, def0: 31, maximumLv: 99, exp: 0, recovery: 30 },
        "スモールグール": { growType: GrowType.KogekiSojuku, mhp0: 55, atk0: 17, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "デスストーカー": { growType: GrowType.KogekiSojuku, mhp0: 150, atk0: 45, def0: 45, maximumLv: 99, exp: 0, recovery: 100 },
        "トロル": { growType: GrowType.KogekiSojuku, mhp0: 50, atk0: 23, def0: 23, maximumLv: 99, exp: 0, recovery: 100 },
        "トロルボンバー": { growType: GrowType.KogekiSojuku, mhp0: 60, atk0: 31, def0: 27, maximumLv: 99, exp: 0, recovery: 100 },
        "ベロベロ": { growType: GrowType.KogekiSojuku, mhp0: 80, atk0: 45, def0: 30, maximumLv: 99, exp: 0, recovery: 50 },
        "マミー": { growType: GrowType.KogekiSojuku, mhp0: 40, atk0: 25, def0: 13, maximumLv: 99, exp: 0, recovery: 50 },
        "ミイラおとこ": { growType: GrowType.KogekiSojuku, mhp0: 42, atk0: 21, def0: 13, maximumLv: 99, exp: 0, recovery: 50 },
        "ゆうれい": { growType: GrowType.KogekiSojuku, mhp0: 23, atk0: 18, def0: 5, maximumLv: 99, exp: 0, recovery: 50 },
        "アイアンタートル": { growType: GrowType.BougyoSojuku, mhp0: 30, atk0: 18, def0: 19, maximumLv: 99, exp: 0, recovery: 50 },
        "あめふらし": { growType: GrowType.BougyoSojuku, mhp0: 31, atk0: 19, def0: 14, maximumLv: 99, exp: 0, recovery: 50 },
        "アローインプ": { growType: GrowType.BougyoSojuku, mhp0: 41, atk0: 11, def0: 14, maximumLv: 99, exp: 0, recovery: 50 },
        "あんこくつむり": { growType: GrowType.BougyoSojuku, mhp0: 30, atk0: 20, def0: 19, maximumLv: 99, exp: 0, recovery: 50 },
        "岩とびあくま": { growType: GrowType.BougyoSojuku, mhp0: 32, atk0: 15, def0: 18, maximumLv: 99, exp: 0, recovery: 50 },
        "エビルポット": { growType: GrowType.BougyoSojuku, mhp0: 26, atk0: 8, def0: 11, maximumLv: 99, exp: 0, recovery: 50 },
        "おおナメクジ": { growType: GrowType.BougyoSojuku, mhp0: 17, atk0: 8, def0: 7, maximumLv: 99, exp: 0, recovery: 50 },
        "おどる宝石": { growType: GrowType.BougyoSojuku, mhp0: 36, atk0: 10, def0: 8, maximumLv: 99, exp: 0, recovery: 50 },
        "ガニラス": { growType: GrowType.BougyoSojuku, mhp0: 33, atk0: 17, def0: 15, maximumLv: 99, exp: 0, recovery: 100 },
        "キラーマンティス": { growType: GrowType.BougyoSojuku, mhp0: 50, atk0: 16, def0: 18, maximumLv: 99, exp: 0, recovery: 100 },
        "ぐんたいガニ": { growType: GrowType.BougyoSojuku, mhp0: 47, atk0: 23, def0: 19, maximumLv: 99, exp: 0, recovery: 100 },
        "ケダモン": { growType: GrowType.BougyoSojuku, mhp0: 33, atk0: 17, def0: 16, maximumLv: 99, exp: 0, recovery: 50 },
        "ゴースト": { growType: GrowType.BougyoSojuku, mhp0: 21, atk0: 9, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "さそりかまきり": { growType: GrowType.BougyoSojuku, mhp0: 15, atk0: 11, def0: 10, maximumLv: 99, exp: 0, recovery: 100 },
        "じごくのハサミ": { growType: GrowType.BougyoSojuku, mhp0: 35, atk0: 17, def0: 18, maximumLv: 99, exp: 0, recovery: 100 },
        "しびれマイマイ": { growType: GrowType.BougyoSojuku, mhp0: 28, atk0: 14, def0: 18, maximumLv: 99, exp: 0, recovery: 50 },
        "ストローマウス": { growType: GrowType.BougyoSojuku, mhp0: 19, atk0: 12, def0: 13, maximumLv: 99, exp: 0, recovery: 50 },
        "スライムブレス": { growType: GrowType.BougyoSojuku, mhp0: 34, atk0: 14, def0: 12, maximumLv: 99, exp: 0, recovery: 50 },
        "タッフペンギー": { growType: GrowType.BougyoSojuku, mhp0: 31, atk0: 13, def0: 15, maximumLv: 99, exp: 0, recovery: 50 },
        "タマゴロン": { growType: GrowType.BougyoSojuku, mhp0: 6, atk0: 10, def0: 3, maximumLv: 99, exp: 0, recovery: 50 },
        "ちゅうまじゅう": { growType: GrowType.BougyoSojuku, mhp0: 25, atk0: 11, def0: 11, maximumLv: 99, exp: 0, recovery: 50 },
        "つかいま": { growType: GrowType.BougyoSojuku, mhp0: 125, atk0: 40, def0: 35, maximumLv: 99, exp: 0, recovery: 50 },
        "つのうしがい": { growType: GrowType.BougyoSojuku, mhp0: 23, atk0: 13, def0: 14, maximumLv: 99, exp: 0, recovery: 50 },
        "ドラゴスライム": { growType: GrowType.BougyoSojuku, mhp0: 37, atk0: 19, def0: 18, maximumLv: 99, exp: 0, recovery: 150 },
        "ドラゴメタル": { growType: GrowType.BougyoSojuku, mhp0: 50, atk0: 25, def0: 50, maximumLv: 99, exp: 0, recovery: 50 },
        "ドルイド": { growType: GrowType.BougyoSojuku, mhp0: 20, atk0: 10, def0: 6, maximumLv: 99, exp: 0, recovery: 50 },
        "どろにんぎょう": { growType: GrowType.BougyoSojuku, mhp0: 35, atk0: 20, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "バブルスライム": { growType: GrowType.BougyoSojuku, mhp0: 21, atk0: 9, def0: 7, maximumLv: 5, exp: 0, recovery: 50 },
        "パペットマン": { growType: GrowType.BougyoSojuku, mhp0: 35, atk0: 16, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "ファーラット": { growType: GrowType.BougyoSojuku, mhp0: 21, atk0: 10, def0: 9, maximumLv: 99, exp: 0, recovery: 50 },
        "ベビーサタン": { growType: GrowType.BougyoSojuku, mhp0: 44, atk0: 10, def0: 15, maximumLv: 99, exp: 0, recovery: 50 },
        "ヘルゴースト": { growType: GrowType.BougyoSojuku, mhp0: 46, atk0: 19, def0: 21, maximumLv: 99, exp: 0, recovery: 50 },
        "マージスター": { growType: GrowType.BougyoSojuku, mhp0: 26, atk0: 15, def0: 13, maximumLv: 99, exp: 0, recovery: 50 },
        "ミニデーモン": { growType: GrowType.BougyoSojuku, mhp0: 49, atk0: 20, def0: 24, maximumLv: 99, exp: 0, recovery: 50 },
        "メイジキメラ": { growType: GrowType.BougyoSojuku, mhp0: 60, atk0: 27, def0: 20, maximumLv: 99, exp: 0, recovery: 50 },
        "メガザルロック": { growType: GrowType.BougyoSojuku, mhp0: 35, atk0: 14, def0: 9, maximumLv: 99, exp: 0, recovery: 50 },
        "メダパニシックル": { growType: GrowType.BougyoSojuku, mhp0: 90, atk0: 19, def0: 25, maximumLv: 99, exp: 0, recovery: 100 },
        "メトロゴースト": { growType: GrowType.BougyoSojuku, mhp0: 41, atk0: 13, def0: 18, maximumLv: 99, exp: 0, recovery: 50 },
        "ランドアーマー": { growType: GrowType.BougyoSojuku, mhp0: 31, atk0: 20, def0: 35, maximumLv: 99, exp: 0, recovery: 50 },
        "リリパット": { growType: GrowType.BougyoSojuku, mhp0: 40, atk0: 11, def0: 12, maximumLv: 99, exp: 0, recovery: 50 },
        "ワンダーエッグ": { growType: GrowType.BougyoSojuku, mhp0: 6, atk0: 10, def0: 3, maximumLv: 99, exp: 0, recovery: 50 },
        "アークデーモン": { growType: GrowType.BannoBansei, mhp0: 60, atk0: 26, def0: 27, maximumLv: 99, exp: 0, recovery: 100 },
        "ギガンテス": { growType: GrowType.BannoBansei, mhp0: 55, atk0: 22, def0: 22, maximumLv: 99, exp: 0, recovery: 50 },
        "キラースコップ": { growType: GrowType.BannoBansei, mhp0: 22, atk0: 10, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "グレイトホーン": { growType: GrowType.BannoBansei, mhp0: 80, atk0: 28, def0: 29, maximumLv: 99, exp: 0, recovery: 100 },
        "ゴーレム": { growType: GrowType.BannoBansei, mhp0: 50, atk0: 20, def0: 20, maximumLv: 99, exp: 0, recovery: 100 },
        "レノファイター": { growType: GrowType.BannoBansei, mhp0: 70, atk0: 21, def0: 27, maximumLv: 99, exp: 0, recovery: 100 },
        "あくましんかん": { growType: GrowType.KogekiBansei, mhp0: 48, atk0: 22, def0: 15, maximumLv: 99, exp: 0, recovery: 50 },
        "うごくせきぞう": { growType: GrowType.KogekiBansei, mhp0: 42, atk0: 20, def0: 22, maximumLv: 99, exp: 0, recovery: 100 },
        "キースドラゴン": { growType: GrowType.KogekiBansei, mhp0: 150, atk0: 50, def0: 40, maximumLv: 99, exp: 0, recovery: 100 },
        "グレイトマーマン": { growType: GrowType.KogekiBansei, mhp0: 39, atk0: 20, def0: 18, maximumLv: 99, exp: 0, recovery: 50 },
        "じごくのつかい": { growType: GrowType.KogekiBansei, mhp0: 44, atk0: 22, def0: 17, maximumLv: 99, exp: 0, recovery: 50 },
        "スカイフロッグ": { growType: GrowType.KogekiBansei, mhp0: 38, atk0: 9, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "ストーンマン": { growType: GrowType.KogekiBansei, mhp0: 75, atk0: 25, def0: 29, maximumLv: 99, exp: 0, recovery: 100 },
        "ダースドラゴン": { growType: GrowType.KogekiBansei, mhp0: 150, atk0: 50, def0: 55, maximumLv: 99, exp: 0, recovery: 100 },
        "デーモントード": { growType: GrowType.KogekiBansei, mhp0: 45, atk0: 21, def0: 19, maximumLv: 99, exp: 0, recovery: 50 },
        "ドラゴン": { growType: GrowType.KogekiBansei, mhp0: 120, atk0: 40, def0: 36, maximumLv: 99, exp: 0, recovery: 100 },
        "バーサーカー": { growType: GrowType.KogekiBansei, mhp0: 30, atk0: 12, def0: 12, maximumLv: 99, exp: 0, recovery: 50 },
        "ひとくいばこ": { growType: GrowType.KogekiBansei, mhp0: 20, atk0: 40, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "ひょうがまじん": { growType: GrowType.KogekiBansei, mhp0: 70, atk0: 30, def0: 20, maximumLv: 99, exp: 0, recovery: 100 },
        "ミミック": { growType: GrowType.KogekiBansei, mhp0: 50, atk0: 10, def0: 15, maximumLv: 99, exp: 0, recovery: 50 },
        "ようがんまじん": { growType: GrowType.KogekiBansei, mhp0: 97, atk0: 31, def0: 36, maximumLv: 99, exp: 0, recovery: 100 },
        "アイアンアント": { growType: GrowType.BougyoBansei, mhp0: 17, atk0: 13, def0: 20, maximumLv: 99, exp: 0, recovery: 50 },
        "イエティ": { growType: GrowType.BougyoBansei, mhp0: 70, atk0: 15, def0: 5, maximumLv: 99, exp: 0, recovery: 150 },
        "いしにんぎょう": { growType: GrowType.BougyoBansei, mhp0: 100, atk0: 45, def0: 45, maximumLv: 99, exp: 0, recovery: 50 },
        "おおきづち": { growType: GrowType.BougyoBansei, mhp0: 15, atk0: 10, def0: 8, maximumLv: 5, exp: 0, recovery: 50 },
        "おおめだま": { growType: GrowType.BougyoBansei, mhp0: 55, atk0: 22, def0: 22, maximumLv: 99, exp: 0, recovery: 50 },
        "おばけキノコ": { growType: GrowType.BougyoBansei, mhp0: 38, atk0: 20, def0: 12, maximumLv: 99, exp: 0, recovery: 50 },
        "おばけヒトデ": { growType: GrowType.BougyoBansei, mhp0: 22, atk0: 12, def0: 12, maximumLv: 5, exp: 0, recovery: 50 },
        "ガーゴイル": { growType: GrowType.BougyoBansei, mhp0: 200, atk0: 180, def0: 150, maximumLv: 99, exp: 0, recovery: 100 },
        "きとうし": { growType: GrowType.BougyoBansei, mhp0: 39, atk0: 8, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "きめんどうし": { growType: GrowType.BougyoBansei, mhp0: 18, atk0: 9, def0: 8, maximumLv: 99, exp: 0, recovery: 50 },
        "キラーアーマー": { growType: GrowType.BougyoBansei, mhp0: 55, atk0: 25, def0: 26, maximumLv: 99, exp: 0, recovery: 100 },
        "キラープラスター": { growType: GrowType.BougyoBansei, mhp0: 135, atk0: 55, def0: 52, maximumLv: 99, exp: 0, recovery: 100 },
        "キラーマシン": { growType: GrowType.BougyoBansei, mhp0: 60, atk0: 20, def0: 25, maximumLv: 99, exp: 0, recovery: 100 },
        "ぐんたいアリ": { growType: GrowType.BougyoBansei, mhp0: 40, atk0: 8, def0: 11, maximumLv: 99, exp: 0, recovery: 50 },
        "げんじゅつし": { growType: GrowType.BougyoBansei, mhp0: 37, atk0: 18, def0: 16, maximumLv: 99, exp: 0, recovery: 50 },
        "コロヒーロー": { growType: GrowType.BougyoBansei, mhp0: 34, atk0: 9, def0: 14, maximumLv: 99, exp: 0, recovery: 50 },
        "コロファイター": { growType: GrowType.BougyoBansei, mhp0: 35, atk0: 10, def0: 15, maximumLv: 99, exp: 0, recovery: 50 },
        "コロプリースト": { growType: GrowType.BougyoBansei, mhp0: 35, atk0: 11, def0: 14, maximumLv: 99, exp: 0, recovery: 50 },
        "コロマージ": { growType: GrowType.BougyoBansei, mhp0: 35, atk0: 10, def0: 16, maximumLv: 99, exp: 0, recovery: 50 },
        "さまようよろい": { growType: GrowType.BougyoBansei, mhp0: 45, atk0: 21, def0: 23, maximumLv: 99, exp: 0, recovery: 100 },
        "じごくのよろい": { growType: GrowType.BougyoBansei, mhp0: 105, atk0: 45, def0: 47, maximumLv: 99, exp: 0, recovery: 100 },
        "しびれくらげ": { growType: GrowType.BougyoBansei, mhp0: 31, atk0: 10, def0: 12, maximumLv: 99, exp: 0, recovery: 50 },
        "シャーマン": { growType: GrowType.BougyoBansei, mhp0: 35, atk0: 20, def0: 17, maximumLv: 99, exp: 0, recovery: 50 },
        "シャドーナイト": { growType: GrowType.BougyoBansei, mhp0: 48, atk0: 19, def0: 14, maximumLv: 99, exp: 0, recovery: 50 },
        "シルバーデビル": { growType: GrowType.BougyoBansei, mhp0: 65, atk0: 20, def0: 20, maximumLv: 99, exp: 0, recovery: 100 },
        "スーパーテンツク": { growType: GrowType.BougyoBansei, mhp0: 38, atk0: 22, def0: 20, maximumLv: 99, exp: 0, recovery: 50 },
        "スペクテット": { growType: GrowType.BougyoBansei, mhp0: 45, atk0: 10, def0: 15, maximumLv: 99, exp: 0, recovery: 50 },
        "ゾンビマスター": { growType: GrowType.BougyoBansei, mhp0: 55, atk0: 23, def0: 18, maximumLv: 99, exp: 0, recovery: 50 },
        "だいまじん": { growType: GrowType.BougyoBansei, mhp0: 105, atk0: 34, def0: 30, maximumLv: 99, exp: 0, recovery: 100 },
        "だいまどう": { growType: GrowType.BougyoBansei, mhp0: 41, atk0: 17, def0: 17, maximumLv: 99, exp: 0, recovery: 50 },
        "ダンスキャロット": { growType: GrowType.BougyoBansei, mhp0: 28, atk0: 18, def0: 13, maximumLv: 99, exp: 0, recovery: 50 },
        "デスマシーン": { growType: GrowType.BougyoBansei, mhp0: 128, atk0: 65, def0: 53, maximumLv: 99, exp: 0, recovery: 100 },
        "デビルロード": { growType: GrowType.BougyoBansei, mhp0: 120, atk0: 25, def0: 35, maximumLv: 99, exp: 0, recovery: 100 },
        "テンツク": { growType: GrowType.BougyoBansei, mhp0: 35, atk0: 17, def0: 19, maximumLv: 99, exp: 0, recovery: 50 },
        "どぐう戦士": { growType: GrowType.BougyoBansei, mhp0: 120, atk0: 39, def0: 50, maximumLv: 99, exp: 0, recovery: 100 },
        "どくやずきん": { growType: GrowType.BougyoBansei, mhp0: 50, atk0: 15, def0: 18, maximumLv: 99, exp: 0, recovery: 50 },
        "ドッグスナイパー": { growType: GrowType.BougyoBansei, mhp0: 50, atk0: 15, def0: 15, maximumLv: 99, exp: 0, recovery: 100 },
        "ドラゴンキッズ": { growType: GrowType.BougyoBansei, mhp0: 55, atk0: 18, def0: 18, maximumLv: 99, exp: 0, recovery: 50 },
        "ばくだん岩": { growType: GrowType.BougyoBansei, mhp0: 100, atk0: 15, def0: 5, maximumLv: 99, exp: 0, recovery: 50 },
        "バズズ": { growType: GrowType.BougyoBansei, mhp0: 135, atk0: 30, def0: 45, maximumLv: 99, exp: 0, recovery: 100 },
        "はねせんにん": { growType: GrowType.BougyoBansei, mhp0: 17, atk0: 9, def0: 13, maximumLv: 99, exp: 0, recovery: 50 },
        "ビッグスロース": { growType: GrowType.BougyoBansei, mhp0: 55, atk0: 8, def0: 5, maximumLv: 99, exp: 0, recovery: 150 },
        "プチヒーロー": { growType: GrowType.BougyoBansei, mhp0: 35, atk0: 10, def0: 15, maximumLv: 99, exp: 0, recovery: 50 },
        "プチファイター": { growType: GrowType.BougyoBansei, mhp0: 35, atk0: 11, def0: 14, maximumLv: 99, exp: 0, recovery: 50 },
        "プチプリースト": { growType: GrowType.BougyoBansei, mhp0: 33, atk0: 10, def0: 14, maximumLv: 99, exp: 0, recovery: 50 },
        "プチマージ": { growType: GrowType.BougyoBansei, mhp0: 20, atk0: 8, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "フライングデビル": { growType: GrowType.BougyoBansei, mhp0: 130, atk0: 40, def0: 40, maximumLv: 99, exp: 0, recovery: 100 },
        "ベビーニュート": { growType: GrowType.BougyoBansei, mhp0: 20, atk0: 13, def0: 14, maximumLv: 99, exp: 0, recovery: 50 },
        "ベホマスライム": { growType: GrowType.BougyoBansei, mhp0: 35, atk0: 20, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "マージマタンゴ": { growType: GrowType.BougyoBansei, mhp0: 110, atk0: 40, def0: 40, maximumLv: 99, exp: 0, recovery: 50 },
        "マタンゴ": { growType: GrowType.BougyoBansei, mhp0: 51, atk0: 22, def0: 21, maximumLv: 99, exp: 0, recovery: 50 },
        "まどうし": { growType: GrowType.BougyoBansei, mhp0: 35, atk0: 14, def0: 13, maximumLv: 99, exp: 0, recovery: 50 },
        "マンドラゴラ": { growType: GrowType.BougyoBansei, mhp0: 75, atk0: 25, def0: 28, maximumLv: 99, exp: 0, recovery: 50 },
        "ミステリドール": { growType: GrowType.BougyoBansei, mhp0: 60, atk0: 23, def0: 17, maximumLv: 99, exp: 0, recovery: 50 },
        "メタルハンター": { growType: GrowType.BougyoBansei, mhp0: 130, atk0: 40, def0: 45, maximumLv: 99, exp: 0, recovery: 100 },
        "メラリザード": { growType: GrowType.BougyoBansei, mhp0: 90, atk0: 29, def0: 27, maximumLv: 99, exp: 0, recovery: 50 },
        "モシャスナイト": { growType: GrowType.BougyoBansei, mhp0: 51, atk0: 20, def0: 22, maximumLv: 99, exp: 0, recovery: 50 },
        "ようじゅつし": { growType: GrowType.BougyoBansei, mhp0: 34, atk0: 12, def0: 15, maximumLv: 99, exp: 0, recovery: 50 },
        "ラストテンツク": { growType: GrowType.BougyoBansei, mhp0: 95, atk0: 28, def0: 26, maximumLv: 99, exp: 0, recovery: 50 },
        "ラリホーアント": { growType: GrowType.BougyoBansei, mhp0: 25, atk0: 11, def0: 10, maximumLv: 99, exp: 0, recovery: 50 },
        "ランガー": { growType: GrowType.BougyoBansei, mhp0: 140, atk0: 51, def0: 45, maximumLv: 99, exp: 0, recovery: 100 },
        "アトラス": { growType: GrowType.KogekiTokusyu, mhp0: 130, atk0: 60, def0: 48, maximumLv: 10, exp: 0, recovery: 100 },
        "エビルエスターク": { growType: GrowType.KogekiTokusyu, mhp0: 145, atk0: 60, def0: 55, maximumLv: 10, exp: 0, recovery: 100 },
        "キングスライム": { growType: GrowType.KogekiTokusyu, mhp0: 100, atk0: 50, def0: 50, maximumLv: 10, exp: 0, recovery: 100 },
        "こうてつまじん": { growType: GrowType.KogekiTokusyu, mhp0: 135, atk0: 60, def0: 55, maximumLv: 10, exp: 0, recovery: 100 },
        "ゴールデンスライム": { growType: GrowType.KogekiTokusyu, mhp0: 132, atk0: 50, def0: 50, maximumLv: 10, exp: 0, recovery: 50 },
        "ゴールドマン": { growType: GrowType.KogekiTokusyu, mhp0: 131, atk0: 51, def0: 55, maximumLv: 99, exp: 0, recovery: 100 },
        "ジャスティス兄": { growType: GrowType.KogekiTokusyu, mhp0: 150, atk0: 80, def0: 80, maximumLv: 99, exp: 0, recovery: 150 },
        "スライムエンペラー": { growType: GrowType.KogekiTokusyu, mhp0: 133, atk0: 51, def0: 51, maximumLv: 10, exp: 0, recovery: 100 },
        "トロルキング": { growType: GrowType.KogekiTokusyu, mhp0: 131, atk0: 66, def0: 53, maximumLv: 99, exp: 0, recovery: 100 },
        "ベリアル": { growType: GrowType.KogekiTokusyu, mhp0: 135, atk0: 65, def0: 55, maximumLv: 10, exp: 0, recovery: 100 },
        "あやしいかげ": { growType: GrowType.SyubiTokusyu, mhp0: 5, atk0: 20, def0: 1, maximumLv: 9, exp: 0, recovery: 50 },
        "オニオーン": { growType: GrowType.SyubiTokusyu, mhp0: 10, atk0: 1, def0: 1, maximumLv: 99, exp: 0, recovery: 50 },
        "サンダーラット": { growType: GrowType.SyubiTokusyu, mhp0: 6, atk0: 12, def0: 4, maximumLv: 9, exp: 0, recovery: 150 },
        "シャドー": { growType: GrowType.SyubiTokusyu, mhp0: 5, atk0: 13, def0: 1, maximumLv: 9, exp: 0, recovery: 50 },
        "たまねぎマン": { growType: GrowType.SyubiTokusyu, mhp0: 10, atk0: 1, def0: 100, maximumLv: 99, exp: 0, recovery: 50 },
        "はぐれメタル": { growType: GrowType.SyubiTokusyu, mhp0: 5, atk0: 10, def0: 200, maximumLv: 99, exp: 0, recovery: 50 },
        "バブリン": { growType: GrowType.SyubiTokusyu, mhp0: 100, atk0: 35, def0: 15, maximumLv: 99, exp: 0, recovery: 100 },
        "はりせんもぐら": { growType: GrowType.SyubiTokusyu, mhp0: 4, atk0: 7, def0: 4, maximumLv: 9, exp: 0, recovery: 50 },
        "プヨンターゲット": { growType: GrowType.SyubiTokusyu, mhp0: 150, atk0: 45, def0: 20, maximumLv: 99, exp: 0, recovery: 100 },
        "プラズママウス": { growType: GrowType.SyubiTokusyu, mhp0: 6, atk0: 40, def0: 4, maximumLv: 9, exp: 0, recovery: 150 },
        "ブラッドハンド": { growType: GrowType.SyubiTokusyu, mhp0: 26, atk0: 17, def0: 15, maximumLv: 99, exp: 0, recovery: 50 },
        "ポムポムボム": { growType: GrowType.SyubiTokusyu, mhp0: 200, atk0: 55, def0: 29, maximumLv: 99, exp: 0, recovery: 100 },
        "マドハンド": { growType: GrowType.SyubiTokusyu, mhp0: 10, atk0: 6, def0: 5, maximumLv: 99, exp: 0, recovery: 30 },
        "メタルキング": { growType: GrowType.SyubiTokusyu, mhp0: 50, atk0: 10, def0: 100, maximumLv: 99, exp: 0, recovery: 100 },
        "メタルスライム": { growType: GrowType.SyubiTokusyu, mhp0: 6, atk0: 10, def0: 100, maximumLv: 99, exp: 0, recovery: 50 },
        "笑いぶくろ": { growType: GrowType.SyubiTokusyu, mhp0: 35, atk0: 0, def0: 5, maximumLv: 99, exp: 0, recovery: 50 },
    };
    var msd = basicMonsterStatusDict[name];
    if (!msd) {
        throw new Error("\u4E0D\u6B63\u306A\u30E2\u30F3\u30B9\u30BF\u30FC\u540D: " + name);
    }
    if (lv < 1 || lv > msd.maximumLv) {
        throw new Error("\u4E0D\u6B63\u306A\u30EC\u30D9\u30EB: " + lv + ", for " + name);
    }
    msd.exp = getEXP(msd.growType, lv);
    msd.mhp0 += getMHPGrow(msd.growType, lv);
    msd.atk0 += getATKGrow(msd.growType, lv);
    msd.def0 += getDEFGrow(msd.growType, lv);
    return __assign({ name: name }, msd);
};
exports.getLvByDexp = function (name, startLv, dexp) {
    var msd0 = exports.getBasicMonsterStatus(name, startLv);
    for (var lv = startLv + 1; lv < 100; lv++) {
        var msd1 = exports.getBasicMonsterStatus(name, lv);
        if (msd1.exp - msd0.exp > dexp) {
            return lv - 1;
        }
    }
    throw new Error("invalid input for getLvByDexp: name:" + name + ", startLv:" + startLv + ", dexp: " + dexp);
};

},{}],7:[function(require,module,exports){
"use strict";
// unit.ts
// モンスター
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var status_1 = require("./status");
var Unit = /** @class */ (function () {
    function Unit(inp, place, pConf) {
        this.mhp = -1;
        this.chp = -1;
        this.atk = -1;
        this.def = -1;
        this.name = inp.name; // モンスター名
        this.lv = inp.lv; // Lv
        this.weakenAtk = inp.weakenAtk ? inp.weakenAtk : 0; // 攻撃力弱化回数
        this.weakenDef = inp.weakenDef ? inp.weakenDef : 0; // 防御力弱化回数
        this.atkDope = inp.atkDope ? inp.atkDope : 0; // 攻撃力ドーピング
        this.hpDope = inp.hpDope ? inp.hpDope : 0; // HPドーピング
        this.isSealed = inp.isSealed !== undefined ? inp.isSealed : false; // 封印状態
        this.place = place; // 位置座標[row, col]
        this.pConf = pConf; // 確率設定
        var status = status_1.getBasicMonsterStatus(inp.name, inp.lv);
        this.recovery = status.recovery; // 回復定数
        this.exp = status.exp; // 現在の経験値
        this.setHP();
        this.setAtk();
        this.setDef();
        this.chp = this.mhp;
    }
    Unit.prototype.setHP = function () {
        var mhp = status_1.getBasicMonsterStatus(this.name, this.lv).mhp0 + this.hpDope;
        this.mhp = mhp;
    };
    Unit.prototype.setAtk = function () {
        // ステータス表示上の攻撃力を取得
        var atk = status_1.getBasicMonsterStatus(this.name, this.lv).atk0 + this.atkDope;
        // 弱化回数に応じて攻撃力を減らす
        if (this.weakenAtk > 0) {
            // 弱化回数分だけ0.5倍する
            atk *= Math.pow(0.5, this.weakenAtk);
        }
        if (this.weakenAtk === 9) {
            // 9回弱化されている場合は攻撃力0
            atk = 0;
        }
        // 小数点以下を切り上げる
        atk = Math.ceil(atk);
        this.atk = atk;
    };
    Unit.prototype.setDef = function () {
        // ステータス表示上の防御力を取得
        var def = status_1.getBasicMonsterStatus(this.name, this.lv).def0;
        // 弱化回数に応じて防御力を減らす
        if (this.weakenDef === 1) {
            def *= 0.8;
        }
        else if (this.weakenDef === 2) {
            def *= 0.7;
        }
        else if (this.weakenDef === 3) {
            def *= 0.5;
        }
        else if (this.weakenDef === 4) {
            def *= 0.4;
        }
        else if (this.weakenDef === 5) {
            def *= 0.2;
        }
        else if (this.weakenDef === 6) {
            def *= 0.001;
        }
        // 小数点以下を切り捨てる
        def = Math.floor(def);
        this.def = def;
    };
    Unit.prototype.attack = function (enemy, fixedDamage) {
        if (fixedDamage === void 0) { fixedDamage = 0; }
        if (this.atk === 0) {
            return false;
        }
        if (Math.random() < this.pConf.attack) {
            var damage = fixedDamage === 0 ? (Math.round(Math.ceil(this.atk) * 1.3 * Math.pow(35 / 36, enemy.def) * (Math.random() / 4 + 7.0 / 8))) : fixedDamage;
            if (damage < 1.0) {
                enemy.chp -= 1.0;
            }
            else {
                enemy.chp -= damage;
            }
            return true;
        }
        else {
            return false;
        }
    };
    Unit.prototype.getMinAndMaxDamage = function (enemy) {
        var minDamage = Math.round(Math.ceil(this.atk) * 1.3 * Math.pow(35 / 36, enemy.def) * 7.0 / 8);
        var maxDamage = Math.round(Math.ceil(this.atk) * 1.3 * Math.pow(35 / 36, enemy.def) * 9.0 / 8);
        minDamage = minDamage === 0 ? 1 : minDamage;
        maxDamage = maxDamage === 0 ? 1 : maxDamage;
        return [minDamage, maxDamage];
    };
    return Unit;
}());
exports.Unit = Unit;
var Friend = /** @class */ (function (_super) {
    __extends(Friend, _super);
    function Friend(inp, place, pConf) {
        var _this = _super.call(this, inp, place, pConf) || this;
        _this.killCount = 0;
        _this.divisionLossCount = 0;
        _this.actionLossCount = 0;
        _this.doubleSpeed = inp.doubleSpeed !== undefined ? inp.doubleSpeed : false;
        _this.isSticked = inp.isSticked !== undefined ? inp.isSticked : true;
        return _this;
    }
    Friend.prototype.getExp = function (exp) {
        if (exp === void 0) { exp = 22; }
        this.killCount += 1;
        this.exp += exp;
        while (status_1.getBasicMonsterStatus(this.name, this.lv + 1).exp < this.exp) {
            var status0 = status_1.getBasicMonsterStatus(this.name, this.lv);
            var status1 = status_1.getBasicMonsterStatus(this.name, this.lv + 1);
            this.lv += 1;
            this.mhp = status1.mhp0 + this.hpDope;
            this.chp += status1.mhp0 - status0.mhp0;
            this.setAtk();
            this.setDef();
        }
    };
    Friend.prototype.getDamage = function (damage) {
        this.chp -= damage;
    };
    Friend.prototype.naturalRecovery = function () {
        this.chp += this.mhp / this.recovery;
        if (this.chp > this.mhp) {
            this.chp = this.mhp;
        }
    };
    return Friend;
}(Unit));
exports.Friend = Friend;
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(place, num, pConf) {
        var _this = _super.call(this, { name: "スモールグール", lv: 1 }, place, pConf) || this;
        _this.num = num;
        return _this;
    }
    return Enemy;
}(Unit));
exports.Enemy = Enemy;

},{"./status":6}],"torneko3":[function(require,module,exports){
"use strict";
// index.ts
//
Object.defineProperty(exports, "__esModule", { value: true });
var status_1 = require("./status");
exports.getBasicMonsterStatus = status_1.getBasicMonsterStatus;
var manager_1 = require("./manager");
exports.Manager = manager_1.Manager;
var sampleInputs_1 = require("./sampleInputs");
exports.sampleSCSInputs = sampleInputs_1.sampleInputs;
var unit_1 = require("./unit");
exports.Friend = unit_1.Friend;
exports.Enemy = unit_1.Enemy;

},{"./manager":3,"./sampleInputs":4,"./status":6,"./unit":7}]},{},[]);
