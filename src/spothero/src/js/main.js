import '@babel/polyfill';
import 'scrollingelement';
import 'transitionEnd';
import React from 'react';
import {render} from 'react-dom';
// import {hydrate} from 'react-dom'; // Use instead for SSR projects
import App from './App';

render(<App />, document.querySelector('.root'));
// hydrate(<App />, document.querySelector('.root')); // Use instead for SSR projects
