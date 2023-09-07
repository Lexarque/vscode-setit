import fs from "fs/promises";
import path from "path";
import inquirer from "inquirer";
import os from "os";

const presetJson = "./lib/presets.json";

let config;
try {
  // Read the JSON file synchronously to get the config data
  const configFile = await fs.readFile("config.json", "utf8");
  config = JSON.parse(configFile);
} catch (err) {
  console.error("Error reading config file:", err);
  process.exit(1);
}

// Function to add a preset to the presets.json file
async function addPreset(name) {
  const availableExtensions = await getAvailableExtensions();

  let selectedFiles = [];

  const answers = await inquirer.prompt([
    {
      type: "checkbox",
      message: "Select extensions to add:",
      name: "selectedExtensions",
      choices: availableExtensions,
    },
  ]);

  console.log("Selected extensions:", answers.selectedExtensions);
  selectedFiles = answers.selectedExtensions;

  const jsonData = {
    name: name,
    extensions: selectedFiles,
  };

  const jsonString = JSON.stringify(jsonData, null, 2);

  try {
    await fs.writeFile(presetJson, jsonString);
    console.log("Successfully added a new preset.");
  } catch (error) {
    console.error("Error writing JSON data to the file:", error);
  }
}

async function getAvailableExtensions() {
  const userOS = os.platform();
  const extensionsFolderPath = path.join(
    userOS === "win32"
      ? process.env.USERPROFILE
      : process.env.HOME + config.EXTENSION_FOLDER_PATH
  );

  try {
    const files = await fs.readdir(extensionsFolderPath);
    // Filter out extensions.json file
    const filteredFiles = files.filter(
      (file) => file !== "extensions.json" || file.endsWith(".obsolete")
    );
    return filteredFiles;
  } catch (err) {
    console.error("Error reading the extensions folder:", err);
    return [];
  }
}

export { addPreset, getAvailableExtensions };
