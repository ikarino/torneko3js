#!/usr/bin/env node
import fs from 'fs';

import readlineSync from 'readline-sync';
import { Command } from 'commander';
import { assertType } from 'typescript-is';
import chalk from 'chalk';

import { sampleInputs } from '../lib/sampleInputs';
import { DebugManager } from '../lib/debugManager';
import { Manager } from '../lib/manager';
import { SCSInput } from '../lib/interfaces';

const pjson = require('../../package.json');
const program = new Command();

const scs = (inp: SCSInput, debug: boolean) => {
  if (debug) {
    const m = new DebugManager(inp);
    m.trial();
  } else {
    const m = new Manager(inp);
    m.runAllTrial();
    console.log(m.summarizeOutputs());
  }
}

program
  .version(pjson.version)
  .option('-d --debug', 'debug mode')
  .option('-i --input <path>', 'specify your json input file')
  .parse(process.argv)

const isDebug = program.debug !== undefined;

if (program.input === undefined) {
  console.log(chalk.bgRed.white("no input."));
  if (!readlineSync.keyInYN('run with template ?')) {
    process.exit();
  }
  const index = readlineSync.keyInSelect(Object.keys(sampleInputs), 'which template ?', 
    { cancel: 'exit' });
  if (index === -1) {
    process.exit();
  }
  const inp = sampleInputs[Object.keys(sampleInputs)[index]];
  scs(inp, isDebug);
} else {
  console.log(program.input)
  const j = JSON.parse(fs.readFileSync(program.input).toString());
  try {
    const inp = assertType<SCSInput>(j);
    scs(inp, isDebug);
  } catch(error) {
    console.log(chalk.bgRed.white("Invalid input."));
  }
}