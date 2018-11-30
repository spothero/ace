# Application Configuration Extractor (ACE)
The Application Configuration Extractor (ACE for short) is a tool that extracts the front end build process out of your project so you don't have to worry about managing dependencies and build configuration.

By using ACE in all their projects, developers ensure that no matter what project they're working on, the setup will be familiar to them and feel natural/consistent.

## Core Concepts
ACE started as an internal application at [SpotHero](https://spothero.com/) and as such it follows closely with how we develop front end applications.

We use React and Sass. We don't do the whole CSS-in-JS thing (at least not at this time) and compile our Sass separately through Gulp rather than importing the Sass files into Webpack. As such, this is the workflow that ACE supports and if you'd like to contribute so that it can support others, we'd love to [hear from you](https://github.com/spothero/ace/blob/master/CONTRIBUTING.md).

## Documentation
You can see all the details and view the full documentation on the [official site](https://spothero.com/uniform/ace).

## Credits
ACE is inspired by [Blendid](https://github.com/vigetlabs/blendid).
