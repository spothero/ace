---
id: docs-code-splitting
title: Code Splitting
---

ACE provides the ability to include code splitting rather easily. There are different types of code splitting which we'll define as the below for the sake of reference throughout this guide.
1. Defined Chunks
1. Async Chunks
1. Common Chunks

By default, the [`chunkFilename`](settings-webpack#chunkfilename) is set to include a chunk hash in its name. In the [`optimization`](settings-webpack#optimization) settings, a [`splitChunks`](settings-webpack#splitchunks) key can be provided which uses the [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) under the hood. This is a direct passthrough to the equivalent webpack settings and allows you to break up your bundle(s) accordingly.

## Defined Chunks
You can create chunks from groups that you define manually. These allow you to split up and group certain modules that you know may not change very often. Typically, this includes third party modules or a set of utility modules you've created that is not specific to your project (distributed through a private npm registry, for example).

Example settings for creating a separate `vendor` bundle from all packages imported from *node_modules* can be seen below.
```js
optimization: {
    runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
            vendor: {
                name: 'vendor',
                test: /node_modules/,
                chunks: 'all',
            }
        }
    },
},
```

This would produce a file structure similar to the below in the `js` output directory.
```bash
├── js
|   ├── main-7e17729359a25c7030e2.js
|   ├── runtime-876fc1aec0b3a260c138.js
|   └── vendor-fca86a4c0273a6afaa77.js
```

ACE will then add script tags in the necessary order to the `index.html` file to ensure all chunks are loaded properly.

## Async Chunks
These chunks are typically dynamically imported throughout a project. They can provide functionality to your project that is lazy loaded and not necessary to be a part of the main bundle since a user may or may not ever see it. This helps lower the threshold of initial download size/time. They can also include route-based loading strategies where a specific page is only loaded on demand when that route is navigated to by the user.

There are multiple ways to achieve this using third party modules ([react-loadable](https://github.com/jamiebuilds/react-loadable), [react-universal-component](https://github.com/faceyspacey/react-universal-component), etc...) or the built in [Suspense/lazy](https://reactjs.org/docs/code-splitting.html) combination that React provides.

A possible dynamic, route-based loading of chunks using react-loadable can look like the below:
```jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader';
import {
    BrowserRouter,
    Switch,
    NavLink as Link,
    Route
} from 'react-router-dom';
import loadable from 'react-loadable';

const Loader = () => <h1>Loading...</h1>;

const Home = loadable({
    loader: () => import(/* webpackChunkName: 'Home' */'./home'),
    loading: Loader
});

const About = loadable({
    loader: () => import(/* webpackChunkName: 'About' */'./about'),
    loading: Loader
});

const Contact = loadable({
    loader: () => import(/* webpackChunkName: 'Contact' */'./contact'),
    loading: Loader
});

class App extends Component {
    render() {
        return(
            <BrowserRouter>
                <div className="App">
                    <div className="Header-menu">
                        <Link exact to="/" activeClassName="active">Home</Link>
                        <Link to="/about" activeClassName="active">About</Link>
                        <Link to="/contact" activeClassName="active">Contact</Link>
                    </div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/contact" component={Contact} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default hot(module)(App);
```

This would produce a file structure similar to the below in the `js` output directory.
```diff
 ├── js
+|   ├── About-73edc57edc9c212a9b3e.js
+|   ├── Contact-410877a34aa4d9d111f9.js
+|   ├── Home-9eb0a041861e28a43425.js
 |   ├── main-7e17729359a25c7030e2.js
 |   ├── runtime-876fc1aec0b3a260c138.js
 |   └── vendor-fca86a4c0273a6afaa77.js
```

Notice the use of webpack's [magic comments](https://webpack.js.org/api/module-methods/#import-) feature in the import statements. This helps name the dynamic chunks so that the output filename is more user friendly and easier to debug. Without the comments, webpack would generate the name as something like `0-73edc57edc9c212a9b3e.js`, for instance.

### Considerations
There is typically an additional Babel plugin involved when using third party dynamic import modules. Read the documentation for your module of choice for details. You can add extra Babel plugins in ACE by using [special settings](settings-special#babel).

Its also worth noting that at the moment, Suspense is not supported for server side rendering. A future update to React will bring this support with it.

## Common Chunks
Creating common code chunks allows you to import the same chunks on demand into different parts of your code without bloating your bundle with the full benefits of caching.

In the example above, imagine that there is a fourth component, `<Foo />`, that gets imported into each of the three route based components. With the setup above, each route chunk would load the `Foo` component separately within its own bundle which is quite wasteful. Lets separate out the `Foo` component, our common chunk in this scenario, into its own bundle which can be loaded on demand by any component that needs it. Take a look at the [webpack documentation](https://webpack.js.org/plugins/split-chunks-plugin/#splitchunks-chunks) for details on each of the settings.

```diff
optimization: {
    runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
            vendor: {
                name: 'vendor',
                test: /node_modules/,
                chunks: 'all',
            },
+           common: {
+               name: 'common',
+               minChunks: 2,
+               chunks: 'async',
+               reuseExistingChunk: true,
+               enforce: true,
+           }
        }
    },
},
```

Building on the prior file structure, the new structure would look like this:
```diff
 ├── js
 |   ├── About-73edc57edc9c212a9b3e.js
+|   ├── common-908e42d94ae9b01c9992.js
 |   ├── Contact-410877a34aa4d9d111f9.js
 |   ├── Home-9eb0a041861e28a43425.js
 |   ├── main-7e17729359a25c7030e2.js
 |   ├── runtime-876fc1aec0b3a260c138.js
 |   └── vendor-fca86a4c0273a6afaa77.js
```

The `Foo` component is now in its own chunk and loaded separately into each component that its used in.

You can use all three chunk loading strategies at once or on an as needed basis.
