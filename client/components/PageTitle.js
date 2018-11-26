import React, { Component } from 'react';
import Link from 'next/link';


const PageTitle = props => {
  const { page, titles } = props;
  return (
    <div className="page-title edt-prdct-title">
      {page}
      {titles.map(title =>
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
    </div>
  )
};


export default PageTitle;
