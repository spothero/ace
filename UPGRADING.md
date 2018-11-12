As ACE evolves, there is and will be changes to the way that project setup is structured and options are passed. New features are added in a regular cadence and the underlying technologies behind ACE are updated frequently.

This document lists noteworthy new features and breaking changes to help ease the transition when upgrading from older versions of ACE.

# <5.0.0 to 5.0.0

## Breaking Changes
### New Required Environment Variables
ACE previously parsed the `npm_lifecycle_event` to try and figure out what a user was running for them. This proved to be brittle as more and more scripts were added on and was no longer a reliable way of managing what the true intention of a script was.

*package.json*
```diff
- "start": "ace",
- "test": "concurrently --kill-others \"ace -- test\" \"npm run cypress:open\"",
- "build": "ace -- production",
- "deploy:sandbox": "npm run build && ace -- deploy",
- "deploy:staging": "npm run build && ace -- deploy",
- "deploy:production": "npm run build && ace -- deploy",
+ "start": "ACE_NPM_EVENT=start ace",
+ "test": "ACE_NPM_EVENT=test ace -- test & wait-on http://localhost:3000 && npm run cypress:open",
+ "build": "ACE_NPM_EVENT=build ace -- production",
+ "deploy:sandbox": "ACE_DEPLOY_TYPE=sandbox npm run build && ace -- deploy",
+ "deploy:staging": "ACE_DEPLOY_TYPE=staging npm run build && ace -- deploy",
+ "deploy:production": "ACE_DEPLOY_TYPE=production npm run build && ace -- deploy",
```

These changes provide an easier way to identify intentions and give developers additional environment variables to check for in their own processes.

### Removed Internal Cypress Commands
The `cypressOpen` and `cypressRun` commands that package scripts previously used have been removed in favor of calling Cypress directly. Not calling the scripts directly through `package.json` was causing improper exit codes to be reported to tasks that depended on failing tests to stop further execution.

*package.json*
```diff
- "cypress:open": "ace -- cypressOpen",
- "cypress:run": "ace -- cypressRun",
+ "cypress:open": "ace -- generateWebpackSettings && cypress open",
+ "cypress:run": "ace -- generateWebpackSettings && cypress run",
```

### Removed `concurrently` Package Usage
In prior versions when running Cypress through `npm test`, the Cypress UI would show a warning that the server `baseUrl` could not be verified. The `concurrently` package has been replaced with `wait-on` so that Cypress is not run until the webpack server has spun up to avoid that warning.

This renders the use of the `concurrently` package obsolete and it is no longer installed as part of ACE's dependencies. If your project depended on it being installed, you must now install it yourself directly as a `devDependency`.
