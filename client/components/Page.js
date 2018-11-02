import React, { Component } from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';
import Meta from './Meta.js';
import Header from './Header.js';


const theme = {
  red: '#f84248',
  orange: '#fe8b72',
  darkblue: '#47505f',
  beige: '#f9f6f4',
  textGrey: '#5C5C5C',
  lightGrey: '#cbc9c7',
  textBlack: '#3d3d3d',
  offWhite: '#EDEDED',
  grey: '#3A3A3A',
  black: '#393939',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

injectGlobal`
  @font-face {
    font-family: 'guttenbg';
    src: url('/static/fonts/Guttenbg.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'mank_sans_medium';
    src: url('/static/fonts/MankSans-Medium.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'mank_sans';
    src: url('/static/fonts/MankSans.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.50rem;
    line-height: 1.5;
    font-family: 'mank_sans_medium';
    color: ${theme.textGrey};
    -webkit-font-smoothing: antialiased;
    @media (min-width: 1024px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
    @media (min-width: 768px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  div {
    display: block;
  }
  h1, h2, h3, h4, h5 {
    font-family: 'mank_sans';
    color: ${theme.textBlack};
  }
  a {
    text-decoration: none;
    padding: 0.5rem 3.5rem;
    font-size: 1.25rem;
    font-weight: bold;
  }
  button {
    font-family: 'mank_sans_medium';
    text-decoration: none;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Meta />
          <Header />

          <div>
            {this.props.children}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default Page;
