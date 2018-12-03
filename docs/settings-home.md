---
id: settings-home
title: Modifying
---

ACE allows modification of some common settings which help shape the way a project is developed. You can modify things like environment, browserSync, webpack and directory structure (not recommended) settings to fit your workflow. As much as possible, ACE hides away configuration under the hood (after all, that **is** the main goal of ACE), but we realize that every project is different and we want to give users the flexibility to change some of these settings.

## Process
The process of modifying the settings is simplified by the fact that they all live in one central location.

1. If you haven't already, run scaffolding for configs (see the [`scaffoldConfigs`](tasks-extra#scaffoldconfigs) task for details).
1. Open the `config/settings.js` file.
1. After modifying the file, restart your build process for the changes to take effect.

The settings are grouped into categories based on the underlying technologies used.

## Notes
When reading this settings guide, take note of the quick links on the right side. If you don't see a top level link to a setting, click its top level counterpart and you will see additional settings listed below that.
