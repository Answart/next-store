import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { StyledPageTitle } from './styles/PageStyles';


const PageTitle = props => {
  const { page, titles } = props;
  return (
    <StyledPageTitle>
      <Head>
        <title>
          Next Store | {page}
        </title>
      </Head>

      {page}
      {!!titles && titles.map(title =>
        <span key={title.label}> &#8811;
          {!!title.href && (
            <Link href={title.href}><a className="thn-btn">
              {title.label}
            </a></Link>
          )}
          {!!title.click && (
            <button className="thn-btn"
              onClick={e => title.click(e)}
            >{title.label}</button>
          )}
          {!title.href && !title.click && (
            <span style={{ padding: '0 1rem'}}>{title.label}</span>
          )}
        </span>
      )}
    </StyledPageTitle>
  )
};


export default PageTitle;
