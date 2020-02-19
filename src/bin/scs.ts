#!/usr/bin/env node
import fs from 'fs';

import readlineSync from 'readline-sync';
import { Command } from 'commander';
import { is, assertType } from 'typescript-is';
import chalk from 'chalk';

import { sampleInputs } from '../lib/sampleInputs';
import { DebugManager } from '../lib/debugManager';
import { Manager } from '../lib/manager';
import { SCSInput, SCSFriendInput, SCSFieldInput, SCSConfigInput } from '../lib/interfaces';

const pjson = require('../../package.json');
const program = new Command();

const scs = (inp: SCSInput, debug: boolean) => {
  if (debug) {
    const m = new DebugManager(inp); // TODO catch error
    m.trial();
  } else {
    const m = new Manager(inp);      // TODO catch error
    m.runAllTrial();
    console.log(m.summarizeOutputs());
  }
}

const validateSCSInput = () => {
  const j = JSON.parse(fs.readFileSync(program.input).toString());
  for(const key of ["friends", "field", "config"]) {
    if (!Object.keys(j).includes(key)) {
      console.log(`- key not found: ${key}`);      
    }
  }
  // friends
  if (!Array.isArray(j.friends)) {
    console.log(`- friends must be array`);
  } else {
    for(const friend of j.friends) {
      if(!is<SCSFriendInput>(friend)) {
        console.log(`- invalid friend input: ${friend}`)
      }
    }
  }

  // field
  if (!is<SCSFieldInput>(j.field)) {
    console.log(`- invalid field input`);
  }

  // config
  if (!is<SCSConfigInput>(j.config)) {
    console.log(`- invalid config input`);
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
  try {
    const text = fs.readFileSync(program.input).toString();
    const j = JSON.parse(text);
    const inp = assertType<SCSInput>(j);
    scs(inp, isDebug);
  } catch(e) {
    if (e.name === "Error") {
      console.log(chalk.bgRed.white(`input file not found: ${program.input}`));
      console.log(e.message);
    } else if (e.name === "SyntaxError") {
      console.log(chalk.bgRed.white(`invalid json`));
      console.log(e.message);
      console.log(chalk.bgRed.white('Please copy and paste in "jsonlint.com"'));
    } else if (e.name === "TypeGuardError") {
      console.log(chalk.bgRed.white(`invalid scs input`));
      validateSCSInput();
    } else {
      console.log(e);
      throw new Error("Unexpected Error !");
    }
    process.exit(1);
  }
}