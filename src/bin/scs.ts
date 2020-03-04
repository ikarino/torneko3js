#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

import Ajv from 'ajv';
import readlineSync from 'readline-sync';
import { Command } from 'commander';
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
    const m = new Manager(inp); // TODO catch error
    m.runAllTrial();
    console.log(m.summarizeOutputs());
  }
};

const getJSON = (): any => {
  let j: any;
  try {
    const text = fs.readFileSync(program.input).toString();
    const j = JSON.parse(text);
    return j;
  } catch (e) {
    if (e.name === 'Error') {
      console.log(chalk.bgRed.white(`input file not found: ${program.input}`));
      console.log(e.message);
    } else if (e.name === 'SyntaxError') {
      console.log(chalk.bgRed.white(`invalid json`));
      console.log(chalk.bgRed.white('Please copy and paste in "jsonlint.com"'));
      console.log(e.message);
    } else {
      console.log(chalk.bgRed.white('Unexpected Error !'));
      console.log(e);
    }
    process.exit(1);
  }
};

program
  .version(pjson.version)
  .option('-d --debug', 'debug mode')
  .option('-i --input <path>', 'specify your json input file')
  .parse(process.argv);

const isDebug = program.debug !== undefined;

if (program.input === undefined) {
  console.log(chalk.bgRed.white('no input.'));
  if (!readlineSync.keyInYN('run with template ?')) {
    process.exit();
  }
  const index = readlineSync.keyInSelect(Object.keys(sampleInputs), 'which template ?', {
    cancel: 'exit',
  });
  if (index === -1) {
    process.exit();
  }
  const inp = sampleInputs[Object.keys(sampleInputs)[index]];
  scs(inp, isDebug);
} else {
  let j = getJSON();

  const schema = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './SCSInputSchema.json')).toString()
  );

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  if (validate(j)) {
    scs(j as SCSInput, isDebug);
  } else {
    console.log(chalk.bgRed.white(`invalid json: not on schema`));
    console.log(validate.errors);
  }
}
