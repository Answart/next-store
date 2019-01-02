import React, { Component } from 'react';
import Head from 'next/head';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';


const theme = {
  red: '#dc3736',
  redOrange: '#e86c52',
  coral: '#ffc5bc',
  orange: '#ed8e40',
  yellow: '#ffdd52',
  green: '#b2c94c',
  blue: '#497bd3',
  darkBlue: '#47505f',
  purple: '#9083c9',
  pink: '#f498b0',
  brown: '#997151',
  gold: '#e8cc68',
  beige: '#f9f6f4',
  offWhite: '#EDEDED',
  lightGrey: '#cbc9c7',
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
      color: ${theme.darkBlue};
      text-decoration: underline ${theme.coral};
    }
  }
  a.big-btn, button.big-btn {
    width: auto;
    padding: 0.5rem 1.4rem;
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    background-color: ${theme.darkBlue};
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
      color: ${theme.darkBlue};
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
    color: ${theme.darkBlue};
    padding: 0;
    margin: 0;
  }
  a {
    font-size: 0.85rem;
    font-weight: bold;
    color: ${theme.darkGrey};
    text-decoration: none;
    &:hover, &:active, &:focus {
      color: ${theme.darkBlue};
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
  .red-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.red};
    background-color: ${theme.red};
  }
  .orange-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.orange};
    background-color: ${theme.orange};
  }
  .yellow-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.yellow};
    background-color: ${theme.yellow};
  }
  .green-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.green};
    background-color: ${theme.green};
  }
  .blue-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.blue};
    background-color: ${theme.blue};
  }
  .purple-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.purple};
    background-color: ${theme.purple};
  }
  .pink-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.pink};
    background-color: ${theme.pink};
  }
  .brown-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.brown};
    background-color: ${theme.brown};
  }
  .black-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.black};
    background-color: ${theme.black};
  }
  .white-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: white;
    border: 1px solid ${theme.lightGrey};
  }
  .silver-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.lightGrey}; /* Old browsers */
    background: -o-linear-gradient(45deg, ${theme.lightGrey} 20%, white 85%, white 100%); /* For Opera 11.1 to 12.0 */
    background: -moz-linear-gradient(45deg, ${theme.lightGrey} 20%, white 85%, white 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, ${theme.lightGrey} 20%, white 85%, white 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, ${theme.lightGrey} 20%, white 85%, white 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${theme.lightGrey}', endColorstr='white',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .gold-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: gold; /* Old browsers */
    background: -moz-linear-gradient(45deg, ${theme.gold} 20%, white 85%, white 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, ${theme.gold} 20%, white 85%, white 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, ${theme.gold} 20%, white 85%, white 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${theme.gold}', endColorstr='white',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
  .multi-sample {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    background: ${theme.beige}; /* Old browsers */
    background:
      -moz-linear-gradient(circle at 50% 0, ${theme.red}, rgba(255,0,0,0) 50.71%),
      -moz-linear-gradient(circle at 6.7% 75%, ${theme.blue}, rgba(0,0,255,0) 70.71%),
      -moz-linear-gradient(circle at 93.3% 75%, ${theme.yellow}, rgba(0,255,0,0) 100%) beige; /* FF3.6-15 ??? */
    background:
      -webkit-linear-gradient(circle at 50% 0, ${theme.red}, rgba(255,0,0,0) 50.71%),
      -webkit-linear-gradient(circle at 6.7% 75%, ${theme.blue}, rgba(0,0,255,0) 70.71%),
      -webkit-linear-gradient(circle at 93.3% 75%, ${theme.yellow}, rgba(0,255,0,0) 100%) beige; /* Chrome10-25,Safari5.1-6 */
    background:
      radial-gradient(circle at 50% 0, ${theme.red}, rgba(255,0,0,0) 50.71%),
      radial-gradient(circle at 6.7% 75%, ${theme.blue}, rgba(0,0,255,0) 70.71%),
      radial-gradient(circle at 93.3% 75%, ${theme.yellow}, rgba(0,255,0,0) 100%) beige; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${theme.red}', endColorstr='${theme.yellow}',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
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
