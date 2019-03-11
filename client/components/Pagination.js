import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import SvgIcon from './SvgIcon';
import styled from 'styled-components';
import { orderByList, showList } from '../config';
import { capWord } from '../lib/utils';


const StyledPagination = styled.div`
  width: 100%;
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
    color: ${props => props.theme.darkGrey};
    pointer-events: none;
    opacity: 0.5;
  }
  button.sort-btn {
    color: ${props => props.theme.darkGrey};
    border: 1px solid ${props => props.theme.lightGrey};
    padding: 9px;
    margin: 0 0.2rem;
    font-weight: bold;
    &:hover {
      color: ${props => props.theme.darkBlue};
    }
  }
  .page-btn {
    color: ${props => props.theme.darkGrey};
    border: 1px solid ${props => props.theme.lightGrey};
    height: 100%;
    padding: 0.9rem;
    margin: 0 0.2rem;
    &:hover {
      color: ${props => props.theme.darkBlue};
    }
  }
  .pagination-padding {
    padding: 9px;
  }
  .sort {
    float: left;
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
      box-shadow: ${props => props.theme.headerShadow};
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
    float: right;
    text-align: center;
    display: inline-grid;
    grid-template-columns: repeat(6, auto);
    align-items: stretch;
    justify-content: end;
    align-content: start;
    .page-num {
      padding: 9px;
      color: ${props => props.theme.darkGrey};
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
`;

const getSamplePaginPages = function(page, pages) {
  const list = [];
  if (page > pages) page = pages;
  if (page < 1) page = 1;
  let pageNum;

  const first = (page - 2) >= 1
    ? (page - 2)
    : (page - 1) >= 1
      ? (page - 1)
      : 1;
  const last = (page + 2) <= pages
    ? (page + 2)
    : (page + 1) <= pages
      ? (page + 1)
      : pages;

  for (let i = 0; i < 5; i++) {
    pageNum = (first + i);

    if (pageNum >= first && pageNum <= last) {
      list.push(pageNum);
    }
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
    disabled: PropTypes.bool.isRequired,
  };
  state = {
    sortDrpdwn: false,
    showDrpdwn: false,
  };
  toggDrpdwn = (e, drpdwn) => {
    if (!!e && !!e.preventDefault) e.preventDefault();

    this.setState(state => ({ [drpdwn]: !state[drpdwn] }));
  };
  render() {
    const {
      pageQuery, currentShow, currentPage, currentOrderBy, results, count, disabled
    } = this.props;
    const orderByKeys = Object.keys(orderByList);

    const pages = Math.ceil(count/currentShow);
    const list = getSamplePaginPages(currentPage, pages);
    const sortDropdownClasses = this.state.sortDrpdwn
      ? 'srt-dropdown-content show'
      : 'srt-dropdown-content';
    const showDropdownClasses = this.state.showDrpdwn
      ? 'srt-dropdown-content show'
      : 'srt-dropdown-content';
    return (
      <StyledPagination data-test="pagination">
        <div className="sort">
          <div className="srt-inline">
            <button id="sortBtn" className="sort-btn"
              disabled={disabled}
              onClick={(e) => this.toggDrpdwn(e, 'sortDrpdwn')}
            >
              {capWord(currentOrderBy)}
            </button>

            <div id="sortDropdown" className={sortDropdownClasses}>
              {orderByKeys.map((orderBy, i) => (
                <Link key={i} href={{
                  pathname: 'shop',
                  query: {
                    ...pageQuery,
                    orderBy,
                  },
                }}>
                  <a className="undrln-btn" aria-disabled={orderBy == currentOrderBy}>
                    {capWord(orderBy)}
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="srt-inline">
            <button id="showBtn" className="sort-btn"
              disabled={disabled}
              onClick={(e) => this.toggDrpdwn(e, 'showDrpdwn')}
            >
              Show {currentShow}
            </button>

            <div id="showDropdown" className={showDropdownClasses}>
              {showList.map((show, i) => (
                <Link key={i} href={{
                  pathname: 'shop',
                  query: {
                    ...pageQuery,
                    show,
                  },
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
          <div id='pagin-item-count' className="pagination-padding">
            {count || 0} Items
          </div>

          <div id="pagin-d-l-arrow" className="page-btn">
            <Link prefetch href={{
              pathname: 'shop',
              query: {
                ...pageQuery,
                page: 1,
              },
            }}>
              <a aria-disabled={!results || currentPage == 1}>
                <SvgIcon width={10} name='doubleLeftArrow' />
              </a>
            </Link>
          </div>

          <div id="pagin-l-arrow" className="page-btn">
            <Link prefetch href={{
              pathname: 'shop',
              query: {
                ...pageQuery,
                page: currentPage - 1,
              },
            }}>
              <a aria-disabled={!results || currentPage <= 1}>
                <SvgIcon width={10} name='leftArrow' />
              </a>
            </Link>
          </div>

          <div id="pagin-preview-pages" className="pagination-padding">
            {!!list.length && list.map((pageNum, i) => (
              <Link key={i} prefetch href={{
                pathname: 'shop',
                query: {
                  ...pageQuery,
                  page: pageNum,
                },
              }}>
                <a className="page-num" aria-disabled={pageNum == currentPage}>
                  {pageNum}
                </a>
              </Link>
            ))}
          </div>

          <div id="pagin-r-arrow" className="page-btn">
            <Link prefetch href={{
              pathname: 'shop',
              query: {
                ...pageQuery,
                page: currentPage + 1,
              },
            }}>
              <a aria-disabled={!results || currentPage >= pages}>
                <SvgIcon width={10} name='rightArrow' />
              </a>
            </Link>
          </div>

          <div id="pagin-d-r-arrow" className="page-btn">
            <Link prefetch href={{
              pathname: 'shop',
              query: {
                ...pageQuery,
                page: pages,
              },
            }}>
              <a aria-disabled={!results || currentPage == pages}>
                <SvgIcon width={10} name='doubleRightArrow' />
              </a>
            </Link>
          </div>
        </div>
      </StyledPagination>
    )
  }
};


export default Pagination;
