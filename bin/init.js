import fs from "fs/promises";
import inquirer from "inquirer";
import os from "os";
import { fileExists } from "../lib/helper.js";

async function main() {
  if (fileExists("./config.json")) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        message:
          "config.json already exists, do you want to overwrite it? Warning: THIS WILL DELETE YOUR CONFIG. (y/n):",
        name: "answer",
      },
    ]);

    if (answer.answer === "n") {
      return;
    }

    console.log("Overwriting config.json file.");

    await fs.unlink("./config.json");
    await createConfigFile();
  } else {
    // Create config.json & presets.json if it doesn't exist
    await createConfigFile();
    await createPresetsFile([]);
  }

  console.log(
    "Successfully created/configured config.json & presets.json files."
  );
}

async function createConfigFile() {
  try {
    const OS = os.platform();

    const extensionsFilePath = await inquirer.prompt([
      {
        type: "input",
        message: "Enter the path to the extensions file:",
        name: "extensionsFilePath",
        default:
          OS === "win32"
            ? process.env.USERPROFILE + "/.vscode/extensions"
            : process.env.HOME + "/.vscode/extensions",
      },
    ]);

    const configDefault = {
      EXTENSIONS_FOLDER_PATH: extensionsFilePath.extensionsFilePath,
    };

    await fs.writeFile("config.json", JSON.stringify(configDefault, null, 2));
  } catch (error) {
    console.error("Error creating config.json:", error);
  }
}

async function createPresetsFile() {
  try {
    await fs.writeFile("presets.json", []);
  } catch (error) {
    console.error("Error creating presets.json:", error);
  }
}

main();
