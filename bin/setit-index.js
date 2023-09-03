#!/usr/bin/env node

const { program } = require('commander');
const presets = require('../lib/presets.js');

program.version('1.0.0')
  .description('CLI for managing presets of VSCode extensions');

// Define a command to add a new preset
program
  .command('add-preset <name>')
  .description('Add a new preset')
  .action((name) => {
    console.log(`Adding a new preset: ${name}`);
     presets.addPreset(name);
  });

// Define a command to list presets
program
  .command('list-presets')
  .description('List available presets')
  .action(() => {
    console.log('Listing available presets:');
    // Implement your logic to list presets here
  });

// Define other commands for managing presets as needed

program.parse(process.argv);
