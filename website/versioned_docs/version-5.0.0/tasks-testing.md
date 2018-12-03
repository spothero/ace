---
id: version-5.0.0-tasks-testing
title: Testing
original_id: tasks-testing
---

ACE uses [Cypress](https://www.cypress.io/) for unit/integration/end-to-end testing. By default when your project is scaffolded, ACE will also set up the necessary files for testing.

When you first run `npm test` in a project, Cypress will present you with the initial run and project setup. Once complete it will scaffold its own setup files on top of the ones ACE already has to show you usage examples.

The most important file that is scaffolded by ACE is the `/cypress/plugins/index.js` file. This file ensures that the project files are run through webpack correctly so that no errors arise when running tests. You *can* edit this file if you need to add additional functionality but please do **NOT** remove what gets scaffolded by default or you run the risk of your tests failing with little to no explanation.

## How It Works
Cypress comes with certain limitations that can be overcome with some crafty setup. One of those limitations is that, before your tests are loaded into Cypress, there is no way to process the setup files if they are written in something other than ES5 or if they contain some dynamic settings. Because ACE extracts the webpack configuration files away from your project, Cypress has no way of reading them.

Upon running tests in your project, a file will be generated in the `/cypress` directory named `generated-webpack-settings.json`. This file should be added to `.gitignore` (it already is by default when scaffolding projects) and is only there to facilitate exposing some crucial webpack configuration to Cypress so that tests can be executed. You should not edit this file by hand (it will be overwritten the next time you run your test script) and you will typically just want to ignore it.

The rest of Cypress usage follows the documentation within Cypress itself.

## Usage
General usage of Cypress is untouched through ACE. That is, to say, Cypress will load up its own application and function just as any normal Cypress installation would.

### Local Testing
Running the Cypress tests locally uses the npm `test` script by default.
```
npm test
```

You can optionally run just the app.
```
npm run cypress:open
```

This allows you to run your Cypress tests side by side with your local development environment. In one terminal window you can run `npm start` and in another `npm run cypress:open`. Now you can do local development separately from Cypress and optionally run your tests using the app against your updates.

### Continuous Integration Testing
Since Cypress requires running tests against an active environment (be it localhost, staging, production, or whatever other URL), testing headlessly is a bit trickier. You must pass the variable `CYPRESS_BASE_URL` in to Cypress so that it can pick it up and replace the `baseUrl` in the configuration file.

This may look like the following:

In *package.json* `scripts`:
```
...,
"cypress:run": "CYPRESS_BASE_URL=http://www.spothero.com ace -- generateWebpackSettings && cypress run",
...
```

OR

In a shell deployment script:
```
export CYPRESS_BASE_URL=http://www.spothero.com
npm run cypress:run
```

Cypress will now run the test suite against the `CYPRESS_BASE_URL` defined.

**You will need to set this up in your project as ACE will not provide the URL to test against for you for obvious reasons.**
