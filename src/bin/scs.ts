#!/usr/bin/env node
import fs from 'fs';

import readlineSync from 'readline-sync';
import { Command } from 'commander';
import { PathReporter } from 'io-ts/lib/PathReporter';

import { sampleInputs } from '../lib/sampleInputs';
import { DebugManager } from '../lib/debugManager';
import { Manager } from '../lib/manager';
import { SCSInput } from '../lib/interfaces';

import { JSCSInput } from './jsonValidation';

const pjson = require('../../package.json');
const program = new Command();

const scs = (inp: SCSInput, debug=false) => {
  if (debug) {
    const m = new DebugManager(inp);
    m.trial();
  } else {
    const m = new Manager(inp);
    m.runAllTrial();
  }
}

program
  .version(pjson.version)
  .option('-d --debug', 'debug mode')
  .option('-i --input <path>', 'specify your json input file')
  .parse(process.argv)

if (program.input === undefined) {
  // TODO
  // readline => select sampleinputs
} else {
  console.log(program.input)
  const j = JSON.parse(fs.readFileSync(program.input).toString());
  if(JSCSInput.is(j)) {
    const inp = JSCSInput.encode(j);
    scs(inp);
  } else {
    console.log("wrong input")
  }
}