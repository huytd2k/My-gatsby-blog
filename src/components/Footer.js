import React from 'react';

import { rhythm } from '../utils/typography';

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <div style={{ float: 'right' }}>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
            rss
          </a>
        </div>
        <a
          href="https://www.facebook.com/m1k3yfromhust/"
          target="_blank"
          rel="noopener noreferrer"
        >
          facebook
        </a>{' '}
        &bull;{' '}
        <a
          href="https://github.com/huytd2k"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>{' '}
      </footer>
    );
  }
}

export default Footer;
