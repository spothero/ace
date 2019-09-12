---
id: docs-installation
title: Installation
---

Follow the steps below to install and initialize ACE in a new project.

1. Create new project.
    ```bash
    mkdir [project-name]
    cd [project-name]
    npm init
    ```
1. Install ACE.
    ```bash
    npm install @spothero/ace -D
    ```
1. Run ACE's setup.
    ```bash
    npx ace -- setup
    ```
    * Adds necessary `scripts` for working with ACE to `package.json`.
        * Any scripts with name collisions will be backed up (`*-backup`) and replaced.
    * Asks to install ACE's required `peerDependencies` into your project's `dependencies` (typically yes, unless you have a reason not to).
    * Asks to scaffold config files for modifying ACE settings.
    * Asks to scaffold project files to hit the ground running.
1. Begin development.
    ```bash
    npm start
    ```
