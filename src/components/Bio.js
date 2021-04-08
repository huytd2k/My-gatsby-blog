import React from 'react';
import profilePic from '../assets/profile.jpeg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src={profilePic}
          alt={`Dan Abramov`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: 310 }}>
          Một chiếc blog bởi{' '}
          <a href="https://www.facebook.com/m1k3yfromhust/">Huy Tran</a>.{' '}
          <br></br>
          Nghe nói viết blog có nhiều lợi ích
        </p>
      </div>
    );
  }
}

export default Bio;
