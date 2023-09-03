const fs = require("fs");
const presetJson = "./lib/presets.json";

// Function to add a preset to the presets.json file
function addPreset(name) {
  const jsonData = {
    name: name,
    extensions: ["test1", "test2"],
  };
  const jsonString = JSON.stringify(jsonData, null, 2);
  try {
    fs.writeFileSync(presetJson, jsonString);
    console.log("Successfully added a new preset.");
  } catch (error) {
    console.error("Error writing JSON data to the file:", error);
  }
}

module.exports = {
    addPreset,
}
