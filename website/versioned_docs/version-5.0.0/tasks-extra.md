---
id: version-5.0.0-tasks-extra
title: Extras
original_id: tasks-extra
---

ACE comes with a few tasks to help you do things outside of what would normally happen in a build process. These tasks are designed to make things like project setup, dependency installation, scaffolding, and others easy and abstract repetitive boilerplate away from the user.

You can execute the tasks with the following command from the root of your project:
```
npm start -- [taskName]
```
### `generateBabelrc`
If for whatever reason your project needs to have a `.babelrc` file (e.g., an external tool needs it), this task will generate the file for you in the root of your project. The settings inside of it will be based on what ACE uses internally for Babel transpiling. If using this task, it should be added as part of your deployment workflow to ensure your project is always using the latest settings from ACE.

### `generateWebpackSettings`
Creates a JSON file in the Cypress directory so that Cypress can pull in custom webpack settings using `@cypress/webpack-preprocessor` (because Cypress runs Browserify by default). This task typically does not need to be run directly and gets executed during the `cypress:open` and `cypress:run` npm scripts. See [Testing](tasks-testing) for more details.

### `installContribDeps`
Installs ACE's `contributionDependencies` when contributing to the project. This task should **NOT** be run directly and gets executed from the `contrib` task.

### `installPeerDeps`
If you didn't install ACE's `peerDependencies` during initial setup, this task allows you to do so at any time.

### `scaffoldConfigs`
If you didn't scaffold the configuration files during initial setup, this task allows you to do so at any time. This will create the necessary `/config` directory with the settings and tasks files you can modify.

### `scaffoldProject`
If you didn't scaffold the project files during initial setup, this task allows you to do so at any time. This will create the initial files and folder structure for your project and initiate any required dotfiles.

### `updateConfigs`
Provides instructions for differences in ACE configs versus project configs. This task is typically run during an update cycle. See [Upgrading](upgrading-home).

### `updatePackageScripts`
Checks `package.json` `scripts` field to determine if any new scripts have been added to ACE since last install. If so and the names collide, existing scripts will get backed up as `[script]-backup` and the new ACE scripts will overwrite them. If not, ACE scripts will be added.

### `updatePeerDeps`
Runs a prompt to help you select which of ACE's `peerDependencies` should be updated.
