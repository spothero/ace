---
id: docs-configuration
title: Configuration
---

The scaffolding for configs will create a `/config` directory in your project root by default. You can change this path manually by passing in an environment variable to your ACE tasks in `package.json`.

*package.json*
```json
{
  ...,
  "scripts": {
    "start": "ACE_CONFIG_PATH='./other/config/directory' ace",
    "build": "ACE_CONFIG_PATH='./other/config/directory' ace -- production"
  },
  ...
}
```

**NOTE:** While it's possible to change this directory, it is not recommended. Typically you want to make every project mirror each setup as closely as possible so that developers can jump in and out of the projects running ACE and already be familiar with the setup. At its core, this is the whole problem ACE is trying to solve in the first place.
