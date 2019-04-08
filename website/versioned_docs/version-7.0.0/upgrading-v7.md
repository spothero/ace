---
id: version-7.0.0-upgrading-v7
title: 6.x.x to 7.x.x
original_id: upgrading-v7
---

ACE v7 is a small breaking change around Babel's handling of CoreJS@3.

## Breaking Changes
### CoreJS@3
The newest version of Babel deprecates `@babel/polyfill` when used with `core-js` >= 3. To support this change, do the following:

#### Update Dependencies
```
npm uninstall @babel/polyfill
npm install -S core-js regenerator-runtime
```

#### Update Entry Point
In your `main.js` (or other entry point files), change the following imports:

```diff
- import '@babel/polyfill';
+ import 'core-js/stable';
+ import 'regenerator-runtime/runtime';
```

You should be all set from here.
