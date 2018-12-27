import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { orderByList, showList } from '../config';
import { capWord } from '../lib/utilFns';


const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  justify-content: start;
  align-content: start;
  & > * {
    margin: 0;
  }
  a[aria-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
  }
  button.sort-btn {
    border: 1px solid ${props => props.theme.lightGrey};
    padding: 9px;
    margin: 0 0.2rem;
    font-weight: bold;
  }
  a.page-btn {
    border: 1px solid ${props => props.theme.lightGrey};
    padding: 9px;
    margin: 0 0.2rem;
  }
  .pagination-padding {
    padding: 9px;
  }
  .sort {
    text-align: center;
    display: inline-grid;
    grid-template-columns: repeat(2, auto);
    align-items: stretch;
    justify-content: start;
    align-content: start;
    .srt-inline {
      position: relative;
      padding: 0;
    }
    .srt-dropdown-content {
      position: absolute;
      display: none;
      padding: 10px 13px;
      background-color: white;
      min-width: 12rem;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
    }
    .srt-dropdown-content a {
      display: block;
      padding: 6px 0;
    }
    .show {
      display: block;
    }
  }
  .pagination {
    text-align: center;
    display: inline-grid;
    grid-template-columns: repeat(6, auto);
    align-items: stretch;
    justify-content: end;
    align-content: start;
    .page-num {
      padding: 9px;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
`;

const getList = function(page, pages) {
  const list = [];
  if (page > pages) page = pages;
  if (page < 1) page = 1;

  const first = (page - 2) >= 1
    ? (page - 2)
    : ((page - 1) >= 1) ? (page - 1) : 1;
  const last = (page + 2) <= pages
    ? (page + 2)
    : ((page + 1) <= pages) ? (page + 1) : pages;
  for (let i = 0; i < 5; i++) {
    const pageNum = (first + i);
    if (pageNum >= first && pageNum <= last) list.push(pageNum)
  }

  return list;
}

class Pagination extends Component {
  static propTypes = {
    pageQuery: PropTypes.object.isRequired,
    currentShow: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    currentOrderBy: PropTypes.string.isRequired,
    results: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired
  };
  state = {
    sortDrpdwn: false,
    showDrpdwn: false
  };
  toggDrpdwn = (e, drpdwn) => {
    if (!!e && e.preventDefault) e.preventDefault();
    let dd = this.state[drpdwn];

    this.setState({ [drpdwn]: !dd });
  };
  render() {
    const {
      pageQuery, currentShow, currentPage, currentOrderBy, results, count, disabled
    } = this.props;
    const orderByKeys = Object.keys(orderByList);

    const pages = Math.ceil(count/currentShow);
    const list = getList(currentPage, pages);
    return (
      <PaginationStyles data-test="pagination">
        <div className="sort">
          <div className="srt-inline">
            <button className="sort-btn"
              disabled={disabled}
              onClick={(e) => this.toggDrpdwn(e, 'sortDrpdwn')}
            >{capWord(currentOrderBy)}</button>

            <div id="myDropdown" className={this.state.sortDrpdwn ? 'srt-dropdown-content show' : 'srt-dropdown-content'}>
              {orderByKeys.map((orderBy, i) => (
                <Link key={i} href={{
                  pathname: 'shop',
                  query: { ...pageQuery, orderBy }
                }}>
                  <a className="undrln-btn" aria-disabled={orderBy == currentOrderBy}>
                    {capWord(orderBy)}
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="srt-inline">
            <button className="sort-btn"
              disabled={disabled}
              onClick={(e) => this.toggDrpdwn(e, 'showDrpdwn')}
            >Show {currentShow}</button>

            <div id="myODropdown" className={this.state.showDrpdwn ? 'srt-dropdown-content show' : 'srt-dropdown-content'}>
              {showList.map((show, i) => (
                <Link key={i} href={{
                  pathname: 'shop',
                  query: { ...pageQuery, show }
                }}>
                  <a className="undrln-btn" aria-disabled={show == currentShow}>
                    Show {show}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pagination">
          <div className="pagination-padding">{count || 0} Items</div>

          <Link prefetch
            href={{
              pathname: 'shop',
              query: { ...pageQuery, page: 1 },
            }}
          >
            <a className="page-btn" aria-disabled={!results || currentPage == 1}>
              &#8810;
            </a>
          </Link>

          <Link prefetch
            href={{
              pathname: 'shop',
              query: { ...pageQuery, page: currentPage - 1 },
            }}
          >
            <a className="page-btn" aria-disabled={!results || currentPage <= 1}>
              &#60;
            </a>
          </Link>

          <div className="pagination-padding">
            {!!list.length && list.map((pageNum, i) => (
              <Link key={i} prefetch
                href={{
                  pathname: 'shop',
                  query: { ...pageQuery, page: pageNum }
                }}
              >
                <a className="page-num" aria-disabled={pageNum == currentPage}>
                  {pageNum}
                </a>
              </Link>
            ))}
          </div>

          <Link prefetch
            href={{
              pathname: 'shop',
              query: { ...pageQuery, page: currentPage + 1 },
            }}
          >
            <a className="page-btn" aria-disabled={!results || currentPage >= pages}>
              &#62;
            </a>
          </Link>

          <Link prefetch
            href={{
              pathname: 'shop',
              query: { ...pageQuery, page: pages },
            }}
          >
            <a className="page-btn" aria-disabled={!results || currentPage == pages}>
              &#8811;
            </a>
          </Link>
        </div>
      </PaginationStyles>
    )
  }
};


export default Pagination;
