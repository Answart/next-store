import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { StyledFilter } from '../styles/FilterStyles';
import FilterSection from './FilterSection';
import { DEPARTMENTS, CATEGORIES, COLORS, SIZES } from '../../config';


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
      <StyledFilter data-test="filter">
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
      </StyledFilter>
    );
  }
};


export default Filter;
