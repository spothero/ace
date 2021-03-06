---
id: version-5.0.0-settings-special
title: Specials
original_id: settings-special
---

ACE has a few "special" settings. They are called this because they are settings you may want to retain throughout projects and not have to re-set up for each separate repository. To do this, ACE uses an `.acerc` file in the root of your project. This file can be re-distributed across projects to retain the special settings.

The `.acerc` file is nothing more than a JSON configuration object.

## Supported Settings
The following settings can be set in the `.acerc` file.

### `deploy.staticUrl`
You can define a `deploy` object that contains the `staticUrl` key. This maps to the same value in `settings.js` and is the location where static assets are hosted on Cloudfront (typically something like `https://d111111abcdef8.cloudfront.net`).

*Example*
```json
{
    "deploy": {
        "staticUrl": "https://d111111abcdef8.cloudfront.net"
    }
}
```

### `sentry.organizationSlug` & `sentry.authToken`
These can be defined inside of the `sentry` object and map to `tasks.js`, respectively. For more details, see the [sentry](tasks-other#sentry-production) task.

*Example*
```json
{
    "sentry": {
        "organizationSlug": "your-slug-here",
        "authToken": "your-token-here"
    }
}
```

### `browserslist`
ACE uses [browserl.ist](http://browserl.ist/) to properly verify which vendor prefixes and transpilation features should be added. You can define a custom list of browsers to support by using this object. The defaults will be overwritten if you choose to do so.

*Defaults*
```json
{
    "browserslist": [
        "> 2%",
        "last 3 versions",
        "not ie < 11",
        "not blackberry > 0",
        "not UCAndroid > 0",
        "not Samsung > 0",
        "not baidu > 0",
        "not QQAndroid > 0",
        "not Opera > 0",
        "not OperaMini all",
        "not OperaMobile > 0",
        "not Android > 0"
    ]
}
```

### `babel`
ACE can be given custom Babel settings (make sure that you've installed anything you are using here separately through npm). Any options passed here will be merged with the defaults to ensure that the underlying code runs properly. This is a good way to add on any extra plugins or presets that you need.

*Defaults*
```json
{
    "babel": {
        "presets": [
            ["@babel/preset-env", {
                "targets": {
                    "browsers": "[the browserslist config set above]",
                    "node": "current"
                },
                "useBuiltIns": "entry"
            }],
            "@babel/preset-react"
        ],
        "plugins": [
            "@babel/plugin-transform-runtime",

            // Stage 1
            "@babel/plugin-proposal-export-default-from",
            "@babel/plugin-proposal-logical-assignment-operators",
            "@babel/plugin-proposal-optional-chaining",
            ["@babel/plugin-proposal-pipeline-operator", {"proposal": "minimal"}],
            "@babel/plugin-proposal-nullish-coalescing-operator",
            "@babel/plugin-proposal-do-expressions",

            // Stage 2
            ["@babel/plugin-proposal-decorators", {"legacy": true}],
            "@babel/plugin-proposal-function-sent",
            "@babel/plugin-proposal-export-namespace-from",
            "@babel/plugin-proposal-numeric-separator",
            "@babel/plugin-proposal-throw-expressions",

            // Stage 3
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-syntax-import-meta",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-json-strings",

            // React
            "react-hot-loader/babel"
        ]
    }
}
```
