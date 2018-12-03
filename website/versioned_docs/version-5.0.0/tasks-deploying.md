---
id: version-5.0.0-tasks-deploying
title: Deploying
original_id: tasks-deploying
---

ACE uses a specific deploy process to ship the resulting static assets to different environments using [AWS](https://aws.amazon.com/). The files get pushed up to an S3 bucket and the Cloudfront cache is invalidated automatically.

**NOTE: You do *NOT* have to use this deploy process in your own projects. You can define your own custom `deploy` task and add it to your builds. See [Creating New Tasks](tasks-creating) for details on how to do so.**

By default, ACE ships with the necessary `deploy` scripts pre-defined in your `package.json` file. Internally it uses a `deploy` task to properly control environments and publishing of files based on the settings you provide.

## ACE Deploy Settings (required)
Before you are able to deploy to any given environment you'll have to make sure that you've scaffolded the configuration files and updated the settings with the proper deploy information. All top level key/value pairs in the `deploy` object in the `settings.js` file are required (and the specific environment AWS information that you're deploying to). The settings are documented within the file with comments after each explaining its function.

It is also a good idea to add the [`sentry`](tasks-other#sentry-production) task to your deploy pipeline (and fill out the applicable required fields) for a better debugging experience in production environments. If your team doesn't use [Sentry](https://sentry.io/), you can always create a different task specific to your logging service.

## Publishing to Different Environments
ACE supports publishing to `sandbox`, `staging`, and `production` environments. This is a rather specific setup and is best explained by looking at the [source code](https://github.com/spothero/ace/blob/master/config/gulp/tasks/deploy.js). The key takeaway here is that if your setup does not mirror this, you don't have to use it. This is a completely opt-in task and we encourage you to write your own that works for you.

## Deployment Examples
If you've made it this far and want to use the built in `deploy` task, congratulations! You'll need to set up your AWS credentials before you can do so.

*~/.aws/credentials*
```
[default]
aws_access_key_id = YOUR_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

### Sandbox
```
npm install
SANDBOX_NAME=my-sandbox npm run deploy:sandbox
```

### Staging
```
npm install
npm run deploy:staging
```

### Production
```
npm install
npm run deploy:production
```
