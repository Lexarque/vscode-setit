import fs from "fs/promises";
import inquirer from "inquirer";

// Define constants for file paths
const configFile = "config.json";
const presetJson = "./lib/presets.json";

// Read the configuration file
async function readConfigFile() {
  try {
    const configContents = await fs.readFile(configFile, "utf8");
    return JSON.parse(configContents);
  } catch (error) {
    console.error("Error reading config file:", error);
    return null;
  }
}

// Function to add a preset to the presets.json file
async function addPreset(name) {
  // Check for duplicate presets
  const duplicateExists = await checkDuplicatePreset(name);
  if (duplicateExists) {
    console.error("A preset with the same name already exists.");
    return;
  }

  // Get available extensions
  const availableExtensions = await getAvailableExtensions();

  // Prompt the user to select extensions
  const answers = await inquirer.prompt([
    {
      type: "checkbox",
      message: "Select extensions to add:",
      name: "selectedExtensions",
      choices: availableExtensions,
    },
  ]);

  const selectedFiles = answers.selectedExtensions;

  // Read existing presets from presets.json
  let existingData = [];
  try {
    const existingJson = await fs.readFile(presetJson, "utf8");
    existingData = JSON.parse(existingJson) || [];
  } catch (error) {
    console.error("Error reading JSON data from the file:", error);
  }

  // Create a new preset object
  const newPreset = {
    name: name,
    extensions: selectedFiles,
  };

  // Add the new preset to the existing data
  existingData.push(newPreset);

  // Write the updated data back to presets.json
  const jsonString = JSON.stringify(existingData, null, 2);
  try {
    await fs.writeFile(presetJson, jsonString);
    console.log("Successfully added a new preset.");
  } catch (error) {
    console.error("Error writing JSON data to the file:", error);
  }
}

// Check for duplicate presets
async function checkDuplicatePreset(name) {
  const presets = await readPresetsFile();
  return presets.some((preset) => preset.name === name);
}

// Read presets from presets.json
async function readPresetsFile() {
  try {
    const presetsContents = await fs.readFile(presetJson, "utf8");
    return JSON.parse(presetsContents) || [];
  } catch (error) {
    console.error("Error reading presets file:", error);
    return [];
  }
}

// Get available extensions
async function getAvailableExtensions() {
  const config = await readConfigFile();
  if (!config) {
    return [];
  }

  try {
    const files = await fs.readdir(config.EXTENSIONS_FOLDER_PATH);
    // Filter out extensions.json file and obsolete files
    const filteredFiles = files.filter(
      (file) => file !== "extensions.json" && !file.endsWith(".obsolete")
    );
    return filteredFiles;
  } catch (err) {
    console.error("Error reading the extensions folder:", err);
    return [];
  }
}

export { addPreset, getAvailableExtensions };
