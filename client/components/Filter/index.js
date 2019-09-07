import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { StyledFilter } from '../styles/FilterStyles';
import FilterSection from './FilterSection';
import FilterList from './FilterList';
import FilterRange from './FilterRange';
import { DEPARTMENTS, CATEGORIES, COLORS, SIZES } from '../../config';
import { capWord } from '../../lib/utils';


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
    const {
      showCategory, showColor, showSize, showPrice, showBrand
    } = this.state;
    const categoryListType = pageQuery.department
      ? 'category'
      : 'department';
    const categoryList = categoryListType === 'category'
      ? CATEGORIES[pageQuery.department]
      : DEPARTMENTS;
    return (
      <StyledFilter data-test="filter">
        <FilterSection
          showName='showCategory'
          name={categoryListType}
          currentFilter={pageQuery[categoryListType]}
          showFilter={showCategory}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        >
          {showCategory && (
            <FilterList
              name={categoryListType}
              list={categoryList}
              currentFilter={pageQuery[categoryListType]}
              updateFilter={this.updateFilter}
            />
          )}
        </FilterSection>

        <FilterSection
          showName='showColor'
          name='color'
          circleHover={true}
          currentFilter={pageQuery['color']}
          showFilter={showColor}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        >
          {showColor && (
            <FilterList
              name='color'
              circleHover={true}
              list={COLORS}
              currentFilter={pageQuery['color']}
              updateFilter={this.updateFilter}
            />
          )}
        </FilterSection>

        <FilterSection
          showName='showSize'
          name='size'
          circleHover={true}
          currentFilter={pageQuery['size']}
          showFilter={showSize}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        >
          {showSize && (
            <FilterList
              name='size'
              circleHover={true}
              list={SIZES}
              currentFilter={pageQuery['size']}
              updateFilter={this.updateFilter}
            />
          )}
        </FilterSection>

        <FilterSection
          showName='showPrice'
          name='price'
          circleHover={true}
          currentFilter={pageQuery['price']}
          showFilter={showPrice}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        >
          {showPrice && (
            <FilterRange
              price_gte={pageQuery['price_gte']}
              price_lte={pageQuery['price_lte']}
              updateFilter={this.updateFilter}
            />
          )}
        </FilterSection>

        <FilterSection
          showName='showBrand'
          name='brand'
          circleHover={true}
          currentFilter={pageQuery['brand']}
          showFilter={showBrand}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        >
          {showBrand && (
            <div className={`filter-show filter-show-brand`}>
              {['Converse', 'brand2'].map((listItem, i) => (
                <div key={`brand-${listItem}`} className="filter-brand">
                  <label htmlFor={`brand-${listItem}`}>
                    <input id={`brand-${listItem}`}
                      type="radio"
                      name="brand"
                      key={name}
                      value={listItem}
                      onChange={this.updateFilter}
                      checked={!!pageQuery['brand'] && pageQuery['brand'] == listItem}
                    /><span className='brand-label'>{capWord(listItem)}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </FilterSection>
      </StyledFilter>
    );
  }
};


export default Filter;
