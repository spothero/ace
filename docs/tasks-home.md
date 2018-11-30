---
id: tasks-home
title: Modifying
---

Under the hood, ACE uses Gulp to perform its task running duties. With great power comes great responsibility. As such, great care is taken to abstract away all things Gulp. The downside to this is that [creating](tasks-creating) new Gulp tasks is a bit... wonky.

## Process
The process of modifying the tasks is simplified by the fact that they all live in one central location.

1. If you haven't already, run scaffolding for configs (see the [`scaffoldConfigs`](tasks-extra#scaffoldconfigs) task for details).
1. Open the `config/tasks.js` file.
1. After modifying the file, restart your build process for the changes to take effect.

## Notes
The following pages will explain all there is to know about tasks in ACE.
