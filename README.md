# VSCode Setit CLI Documentation

## Overview

The **VSCode Setit CLI** is a command-line interface tool designed to manage presets for Visual Studio Code extensions that are already installed on a user's system. It allows users to create, delete, and list presets, as well as view a list of installed extensions. While the project is currently in concept form and lacks the ability to directly activate or deactivate extensions outside of the VSCode Extensions Marketplace, it serves as a starting point for future development.

## Prerequisites

Before using the VSCode Setit CLI, ensure that you have the following prerequisites:

- Node.js 16>
- npm 9> 

## Installation

To initialize the project, follow these steps after cloning the repository:

1. Open a terminal.
2. Navigate to the project's root directory.
3. Run the following commands:

   ```bash
   npm install
   npm run vscode-setit-init
   ```
   
## Usage

The VSCode Setit CLI provides several commands to manage presets and view extensions. To run any of these commands, use the following format:

```bash
npm run vscode-setit (command)
```

### Commands

1. **add-preset \<name\>**

   This command allows you to create a new preset with the specified name. It will prompt you to select extensions from the list of installed extensions that you want to associate with the preset.

   Example:
   ```bash
   npm run vscode-setit add-preset my-preset
   ```

2. **delete-preset**

   This command enables you to delete a preset that you no longer need. It will prompt you to select the preset you want to delete from the list of existing presets.

   Example:
   ```bash
   npm run vscode-setit delete-preset
   ```

3. **list-presets**

   Use this command to list all the presets you have created. It will display a list of preset names that you can reference for activating extensions.

   Example:
   ```bash
   npm run vscode-setit list-presets
   ```

4. **list-extensions**

   This command lists all the extensions that are currently installed on your system, which you can refer to when creating presets.

   Example:
   ```bash
   npm run vscode-setit list-extensions
   ```

## Project Limitations

As of now, the VSCode Setit CLI is a concept project and has some limitations:

- It cannot directly activate or deactivate extensions outside of the VSCode Extensions Marketplace.
- It cannot retrieve the list of enabled or disabled extensions from a user's VSCode instance as discussed in this [PR][] 
- Activation and deactivation of extensions may only be achieved through VSCode's built-in extension management.

Please note that this project serves as a concept and starting point for future development, and it may not fully replicate all desired functionalities related to VSCode extension management. Further enhancements and features may be added in future releases based on VSCode's evolving capabilities.

[PR]: https://github.com/microsoft/vscode/pull/93967.
