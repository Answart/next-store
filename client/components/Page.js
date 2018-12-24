import React, { Component } from 'react';
import Head from 'next/head';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';


const theme = {
  red: '#e86c52',
  coral: '#fe8b72',
  green: '#b2c94c',
  darkblue: '#47505f',
  beige: '#f9f6f4',
  offWhite: '#EDEDED',
  grey: '#9A9A9A',
  darkGrey: '#6d6c6c',
  black: '#3d3d3d',
  maxWidth: '1050px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: white;
  color: ${theme.black};
  a.undrln-btn, button.undrln-btn {
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    -webkit-font-smoothing: antialiased;
    &:hover {
      color: ${theme.darkblue};
      text-decoration: underline ${theme.coral};
    }
  }
  a.big-btn, button.big-btn {
    width: auto;
    padding: 0.5rem 1.4rem;
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    background-color: ${theme.darkblue};
    &:hover {
      color: white;
      background-color: ${theme.black};
    }
  }
  a.dlt-btn, button.dlt-btn  {
    padding: 0.5rem 1.4rem;
    color: ${theme.red};
    font-size: 1.1rem;
    font-weight: normal;
    &:hover {
      color: ${theme.red};
      font-weight: bold;
    }
  }
  a.thn-btn, button.thn-btn {
    padding: 0 1rem;
    letter-spacing: 0.02rem;
    font-size: 1.1rem;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    font-weight: normal;
    &:hover, &:active, &:focus {
      color: ${theme.darkblue};
      font-weight: normal;
    }
  }
  .line-through {
    text-decoration: line-through ${theme.coral};
  }
  .inner-page {
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
  }
`;

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
    font-size: 1.2rem;
    letter-spacing: 0.02rem;
    font-family: 'Tahoma', 'Geneva', sans-serif;
    color: ${theme.darkGrey};
    -webkit-font-smoothing: antialiased;
  }
  div {
    display: block;
  }
  h1, h2, h3, h4, h5 {
    color: ${theme.darkblue};
    padding: 0;
    margin: 0;
  }
  a {
    font-size: 0.85rem;
    font-weight: bold;
    color: ${theme.darkGrey};
    text-decoration: none;
    &:hover, &:active, &:focus {
      color: ${theme.darkblue};
      outline: 0;
    }
  }
  button {
    font-family: 'Tahoma', 'Geneva', sans-serif;
    text-decoration: none;
    font-weight: normal;
    color: ${theme.darkGrey};
    cursor: pointer;
    border: 0;
    text-decoration: none;
    background-color: inherit;
    &[disabled] {
      opacity: 0.5;
    }
    &:hover, &:active, &:focus {
      outline: 0;
      font-weight: bold;
    }
  }
`;


class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta charSet='utf-8' />
            <link rel="shortcut icon" href="/static/images/favicon.png" />
            <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
            <title>Next Store</title>
          </Head>

          <Header />

          <div className="inner-page">
            {this.props.children}
          </div>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
