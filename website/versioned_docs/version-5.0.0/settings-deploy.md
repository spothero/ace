---
id: version-5.0.0-settings-deploy
title: Deploy
original_id: settings-deploy
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
