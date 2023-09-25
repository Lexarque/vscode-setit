import fs from "fs/promises";
import inquirer from "inquirer";
import os from "os";
import path from "path";
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
    await createConfigFile();
    await createPresetsFile();
  }

  console.log(
    "Successfully created/configured config.json & presets.json files."
  );
}

async function createConfigFile() {
  try {
    const OS = os.platform();
    const extensionsFilesFolderPath = await inquirer.prompt([
      {
        type: "input",
        message: "Enter the path to the extensions file:",
        name: "extensionsFilesFolderPath",
        default:
          OS === "win32"
            ? path.join(
              process.env.USERPROFILE,
              ".vscode",
              "extensions"
            )
            : path.join(
              process.env.HOME,
              ".vscode",
              "extensions"
            ),
      },
    ]);

    const userSettingsFilePath = await inquirer.prompt([
      {
        type: "input",
        message: "Enter the path to the vscode user settings file:",
        name: "userSettingsFilePath",
        default:
          OS === "win32"
            ? path.join(
                process.env.USERPROFILE,
                "AppData",
                "Roaming",
                "Code",
                "User",
                "settings.json"
              )
            : path.join(
                process.env.HOME,
                ".config",
                "Code",
                "User",
                "settings.json"
              ),
      },
    ]);

    const configDefault = {
      EXTENSIONS_FOLDER_PATH: extensionsFilesFolderPath.extensionsFilesFolderPath,
      USER_SETTINGS_FILE_PATH: userSettingsFilePath.userSettingsFilePath,
    };

    await fs.writeFile("config.json", JSON.stringify(configDefault, null, 2));
  } catch (error) {
    console.error("Error creating config.json:", error);
  }
}

async function createPresetsFile() {
  try {
    await fs.writeFile("./lib/presets.json", []);
  } catch (error) {
    console.error("Error creating presets.json:", error);
  }
}

main();
