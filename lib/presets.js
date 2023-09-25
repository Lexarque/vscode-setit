import fs from "fs/promises";
import inquirer from "inquirer";

const configFile = "config.json";
const presetJson = "./lib/presets.json";

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

  const availableExtensions = await getAvailableExtensions();
  const answers = await inquirer.prompt([
    {
      type: "checkbox",
      message: "Select extensions to add:",
      name: "selectedExtensions",
      choices: availableExtensions,
    },
  ]);

  let existingData = [];
  try {
    const existingJson = await fs.readFile(presetJson, "utf8");
    existingData = JSON.parse(existingJson) || [];
  } catch (error) {
    console.error("Error reading JSON data from the file:", error);
  }

  existingData.push({
    name: name,
    extensions: answers.selectedExtensions,
  });

  try {
    await fs.writeFile(presetJson, JSON.stringify(existingData, null, 2));
    console.log("Successfully added a new preset.");
  } catch (error) {
    console.error("Error writing JSON data to the file:", error);
  }
}

async function deletePreset() {
  const availablePresets = await readPresetsFile();
  const presetToDelete = await inquirer.prompt([
    {
      type: "list",
      message: "Select preset to delete:",
      name: "name",
      choices: availablePresets,
    },
  ]);

  const deletedItemIndex = availablePresets.findIndex(
    (preset) => preset.name === presetToDelete.name
  );

  const deleteConfirmation = await inquirer.prompt([
    {
      type: "confirm",
      message: "Are you sure you want to delete this preset?",
      name: "confirmation",
    },
  ]);

  if (!deleteConfirmation.confirmation) {
    console.log("Aborted!");
    return;
  }

  availablePresets.splice(deletedItemIndex, 1);
  await fs.writeFile(presetJson, JSON.stringify(availablePresets, null, 2));

  console.log(`Successfully deleted "${presetToDelete.name}" preset.`);
}

// Function to check for duplicate presets
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
    const filteredFiles = files.filter(
      (file) => file !== "extensions.json" && !file.endsWith(".obsolete")
    );
    return filteredFiles;
  } catch (error) {
    console.error("Error reading the extensions folder:", error);
    return [];
  }
}

export { addPreset, deletePreset, getAvailableExtensions };
