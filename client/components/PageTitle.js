import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import { StyledPageTitle } from './styles/PageStyles';


const PageTitle = ({ page, titles }) => (
  <StyledPageTitle>
    <Head>
      <title>
        Next Store | {page}
      </title>
    </Head>

    {!!page && !!page.length && (
      <span style={{ padding: '0 1rem'}}>{page}</span>
    )}

    {!!titles && titles.map((title, i) =>
      <span key={i}>
        {(!!page && !!page.length) && (<>&#8811;</>)}

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
);

PageTitle.defaultProps = {
  page: '',
  titles: []
};

PageTitle.propTypes = {
  page: PropTypes.string,
  titles: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query: PropTypes.object,
    }),
    click: PropTypes.func
  }))
};


export default PageTitle;
