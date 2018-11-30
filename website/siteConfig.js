/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const url = 'https://spothero.com';
const baseUrl = '/uniform/ace/';

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'ACE', // Title for your website.
  tagline: 'Application Configuration Extractor',
  url, // Your website URL
  baseUrl, // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'ace',
  organizationName: 'spothero',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'docs-home', label: 'Docs'},
    {doc: 'settings-home', label: 'Settings'},
    {doc: 'tasks-home', label: 'Tasks'},
    {doc: 'upgrading-home', label: 'Upgrading'},
    {href: 'https://github.com/spothero/ace', label: 'GitHub', external: true},
    // {doc: 'doc4', label: 'API'},
    // {page: 'help', label: 'Help'},
    // {blog: false, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/spothero.svg',
  footerIcon: 'img/spothero.svg',
  favicon: 'img/favicon.ico',
  // disableHeaderTitle: true,

  /* Colors for website */
  colors: {
    primaryColor: '#0082ff',
    secondaryColor: '#002d5b',
  },

  /* Custom fonts for website */
  fonts: {
    myFont: [
      "Open Sans",
      "Times New Roman",
      "Serif"
    ],
    // myOtherFont: [
    //   "-apple-system",
    //   "system-ui"
    // ]
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} SpotHero`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'github',
  },
  usePrism: true,

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
      defer: true
    },
    {
      src: `${baseUrl}js/code-block-buttons.js`,
      defer: true
    }
  ],
  stylesheets: [
    '//fonts.googleapis.com/css?family=Open+Sans:300,400,600'
    // `${baseUrl}css/code-block-buttons.css`,
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  scrollToTop: true,
  scrollToTopOptions: {
    backgroundColor: '#1dbd71'
  },

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/spothero/ace',
};

module.exports = siteConfig;
