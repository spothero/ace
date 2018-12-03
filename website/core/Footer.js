/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return `${baseUrl}docs/${doc}`;
    // return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Usage</h5>
            <a href={this.docUrl('docs-home.html', this.props.language)}>
              Docs
            </a>
            <a href={this.docUrl('settings-home.html', this.props.language)}>
              Settings
            </a>
            <a href={this.docUrl('tasks-home.html', this.props.language)}>
              Tasks
            </a>
          </div>
          <div>
            <h5>OSS @ SpotHero</h5>
            <a
              href={`${this.props.config.url}/uniform`}
              target="_blank"
            >
              Uniform
            </a>
            <a
              href="https://github.com/spothero/commitlint-config"
              target="_blank"
            >
              Commitlint Config
            </a>
            <a
              href="https://github.com/spothero/npm-publisher"
              target="_blank"
            >
              npm Publisher
            </a>
            <a
              href="https://github.com/spothero/eslint-config"
              target="_blank"
            >
              ESLint Config
            </a>
            <a
              href="https://github.com/spothero/eslint-plugin-spothero"
              target="_blank"
            >
              ESLint Plugin
            </a>
            <a
              href="https://github.com/spothero/stylelint-config"
              target="_blank"
            >
              Stylelint Config
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={`${this.props.config.baseUrl}docs/upgrading-home`}>Upgrading</a>
            <a href={this.props.config.repoUrl}>GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/spothero/ace/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
