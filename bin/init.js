import fs from "fs/promises";
import inquirer from "inquirer";
import os from "os";

async function main() {
  await fs.writeFile("./lib/presets.json", []);

  const OS = os.platform();

  const extensionsFilePath = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the path to the extensions file:",
      name: "extensionsFilePath",
      default:
        OS === "win32"
          ? process.env.USERPROFILE
          : process.env.HOME + "/.vscode/extensions",
    },
  ]);

  const configDefault = { EXTENSIONS_FOLDER_PATH: extensionsFilePath.extensionsFilePath };

  await fs.writeFile("config.json", JSON.stringify(configDefault, null, 2));

  console.log("Successfully created config.json & presets.json file.");
}

main();
