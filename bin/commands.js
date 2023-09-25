#!/usr/bin/env node

import { program } from "commander";
import * as presets from "../lib/presets.js";

program
  .version("1.0.0")
  .description("CLI for managing presets of VSCode extensions");

// Define a command to add a new preset
program
  .command("add-preset <name>")
  .description("Add a new preset")
  .action((name) => {
    console.log(`Adding a new preset: ${name}`);
    presets.addPreset(name);
  });

// Define a command to delete a preset
program
  .command("delete-preset")
  .description("Delete a preset")
  .action(() => {
    presets.deletePreset();
  });

// Define a command to list existing extensions
program
  .command("list-extensions")
  .description("List installed extensions")
  .action(async () => {
    console.log("Listing installed extensions: \n");
    const availableExtensions = await presets.getAvailableExtensions()
    availableExtensions.forEach((extension) => {
      console.log("- " + extension);
    });
    console.log("\n");
  });

program.parse(process.argv);
