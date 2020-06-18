---
id: settings-deploy
title: Deploy
---

**key:** `deploy`

## `releaseVersion`
The production release version/tag/revision to use in tasks. Useful if, for instance, you want to add to Sentry for JS file uploads to tag source maps to a specific release.

## `staticUrl`
The location where static assets are hosted on Cloudfront.

**example:**
`'https://d111111abcdef8.cloudfront.net'`

## `path`
The directory path structure for the AWS S3 buckets where assets will be deployed.

**example:**
`'static/path/to/assets'`

## `invalidatePaths`
Additional paths to invalidate in Cloudfront during deployments.

## `sandbox/staging/production`
Information for specific deployment environments.

### `bucket`
AWS bucket to put files in for the given environment.

### `cloudFrontDistributionId`
Cloudfront distribution ID or array of IDs to invalidate.

### `uploadToSentry`
A Boolean indicating whether minified JS files and source maps should be uploaded to Sentry. The source maps also allow Sentry to display non-uglified JS code in the UI for easier debugging.

Sentry project settings can be configured in a .sentryclirc file.
See https://docs.sentry.io/cli/configuration/#configuration-file for official documentation.