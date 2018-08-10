# Contributing
Follow the steps below to contribute to this project. It is best to use `npm link` to work on the project locally so you don't have to publish every change.

## Local Development - Usage
1. Fork this repository.
1. Run the following inside of the root directory.
    ```
    npm install
    npm link
    ```
1. Create a new project (it can be named anything you like) on your machine for testing purposes.
1. In your new project, run the following:
    ```
    npm link @spothero/ace
    npm init
    ```
1. Run `ace -- contrib` to get the proper contribution assets installed.
    * Follow the on screen prompts to get everything set up.
1. `npm start` will run the development environment.

You can now test any changes you make to the package locally inside of your test project by running different ACE commands.

## Local Development - Cleanup
When finished with development, be sure to clean up after yourself:

1. Run `npm unlink` in this directory.
1. Run `npm unlink @spothero/ace` in your test project's directory. You can also remove the project from your filesystem if you'd like.

## Committing Changes
ACE uses [@spothero/config-commitlint](https://github.com/spothero/commitlint-config). Please see the [commit conventions](https://github.com/spothero/commitlint-config#commit-conventions) for information regarding proper commit messages.

## Pull Requests
When you're done with your changes, please open a pull request against the master repository for review.
