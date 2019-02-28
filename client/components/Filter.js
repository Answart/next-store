import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import SvgIcon from './SvgIcon';
import { DEPARTMENTS, CATEGORIES, COLORS, SIZES } from '../config';
import { capWord } from '../lib/utils';


const FilterStyles = styled.div`
  text-align: left;
  width: 100%;
  overflow: hidden;
  .filter {
    display: grid;
    text-align: center;
    align-items: stretch;
    justify-content: start;
    align-content: start;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
    margin-bottom: 1rem;
    .filter-banner {
      display: inline-grid;
      grid-template-columns: 10rem 4rem 4rem;
      grid-auto-flow: column;
      padding: 0.25rem 0;
      color: ${props => props.theme.grey};
      button h4 {
        padding: 0;
        margin: 0;
        text-align: left;
        justify-self: start;
        align-self: center;
        color: ${props => props.theme.darkBlue};
      }
      button.filter-clear-btn {
        justify-self: end;
        align-self: end;
        font-style: italic;
        color: ${props => props.theme.grey};
        &:hover {
          text-decoration: none;
          font-weight: normal;
          color: ${props => props.theme.darkGrey};
        }
      }
      button.filter-show-btn {
        justify-self: end;
        color: ${props => props.theme.grey};
      }
    }
    .filter-show {
      display: grid;
      grid-auto-flow: row;
      padding: 0.25rem 1rem;
      text-align: left;
      font-weight: normal;
      text-align: left;
      justify-content: start;
      button {
        text-align: left;
      }
    }
    .filter-show-color {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(3, 1fr);
      padding: 0.75rem 1rem;
      align-items: stretch;
    }
    .filter-show-size {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, 1fr);
      button {
        text-align: center;
      }
    }
    .filter-show-brand {
      padding: 0.5rem 1rem;
    }
  }
`;


const FilterSection = (props) => {
  const { name, currentFilter } = props;
  return (
    <div id={`filter-${name}`} className="filter">
      <div className="filter-banner">
        <button id={`filter-${name}-label`}
          name={props.showName}
          onClick={props.toggleFilter}
        >
          <h4>
            {name.toUpperCase()}
          </h4>
        </button>

        <button id={`filter-clear-${name}-btn`} className='filter-clear-btn'
          disabled={!currentFilter}
          name={name}
          value={null}
          onClick={props.updateFilter}
        >
          {!!currentFilter && 'Clear'}
        </button>

        <button id={`filter-show-${name}-btn`} className='filter-show-btn'
          name={props.showName}
          onClick={props.toggleFilter}
        >
          <SvgIcon width={10} name={props.showFilter ? 'downArrow' : 'upArrow'} />
        </button>
      </div>

      {props.showFilter && (
        <div className={`filter-show filter-show-${name}`}>
          {!!props.list && !!props.list.length && props.list.map((listItem, i) => (
            <button key={i} id={`${name}-${listItem}`} className={`undrln-btn ${!!props.circleHover && (listItem == currentFilter ? 'sample-selected' : 'sample-hover')}`}
              disabled={listItem == currentFilter}
              title={`Refine by ${name}: ${capWord(listItem)}`}
              name={name}
              value={listItem}
              onClick={props.updateFilter}
            >
              {(name == 'color') ? (
                <div className={`${name}-sphere-sample ${listItem}-${name}-sample`}></div>
              ) : (
                capWord(listItem)
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
};

class Filter extends Component {
  static propTypes = {
    pageQuery: PropTypes.object.isRequired,
    products: PropTypes.arrayOf(PropTypes.object)
  };
  state = {
    showCategory: true,
    showColor: true,
    showSize: true,
    showPrice: true,
    showBrand: true
  };
  toggleFilter = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { name } = e.currentTarget;

    this.setState(state => ({ [name]: !state[name] }));
  };
  updateFilter = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { name, value } = e.currentTarget;
    if (!name) return;
    const { pageQuery } = this.props;

    if (!!value && pageQuery[name] !== value) {
      pageQuery[name] = value;
    } else {
      delete pageQuery[name];
    }

    Router.push({
      pathname: "/shop",
      query: { ...pageQuery }
    });
  };
  render() {
    const { pageQuery } = this.props;
    const categoryListType = pageQuery.department
      ? 'category'
      : 'department';
    const categoryList = categoryListType === 'category'
      ? CATEGORIES[pageQuery.department]
      : DEPARTMENTS;
    return (
      <FilterStyles data-test="filter">
        <FilterSection
          name={categoryListType}
          list={categoryList}
          currentFilter={pageQuery[categoryListType]}
          showName='showCategory'
          showFilter={this.state.showCategory}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        />

        <FilterSection
          name='color'
          circleHover={true}
          list={COLORS}
          currentFilter={pageQuery['color']}
          showName='showColor'
          showFilter={this.state.showColor}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        />

        <FilterSection
          name='size'
          circleHover={true}
          list={SIZES}
          currentFilter={pageQuery['size']}
          showName='showSize'
          showFilter={this.state.showSize}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        />

        <FilterSection
          name='price'
          currentFilter={pageQuery['price']}
          showName='showPrice'
          showFilter={this.state.showPrice}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        />

        <FilterSection
          name='brand'
          list={['brand1', 'brand2']}
          currentFilter={pageQuery['brand']}
          pageQuery={pageQuery}
          showName='showBrand'
          showFilter={this.state.showBrand}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        />
      </FilterStyles>
    );
  }
};


export default Filter;
