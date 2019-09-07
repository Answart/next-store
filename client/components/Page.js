import React, { Component } from 'react';
import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { StyledPage } from './styles/PageStyles';
import Header from './Header';
import { theme } from '../config';

const GlobalStyle = createGlobalStyle`
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
    color: ${props => props.theme.darkGrey};
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1rem;
    letter-spacing: 0.02rem;
    font-family: 'Tahoma', 'Geneva', sans-serif;
    color: ${props => props.theme.darkGrey};
    -webkit-font-smoothing: antialiased;
  }
  div {
    display: block;
  }
  h1, h2, h3, h4, h5 {
    color: ${props => props.theme.darkBlue};
    padding: 0;
    margin: 0;
  }
  a {
    font-size: 0.85rem;
    font-weight: bold;
    color: ${props => props.theme.darkGrey};
    text-decoration: none;
    &:hover, &:active, &:focus {
      color: ${props => props.theme.darkBlue};
      outline: 0;
    }
  }
  button {
    font-family: 'Tahoma', 'Geneva', sans-serif;
    text-decoration: none;
    font-weight: normal;
    color: ${props => props.theme.darkGrey};
    cursor: pointer;
    border: 0;
    text-decoration: none;
    background-color: inherit;
    &:disabled {
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
        <>
          <GlobalStyle />
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
        </>
      </ThemeProvider>
    );
  }
}

export default Page;
