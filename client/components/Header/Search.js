import React, { Component } from 'react';
import Router from 'next/router';
import SvgIcon from '../SvgIcon';


class Search extends Component {
  state = { title: '' };
  saveToState = e => this.setState({ [e.target.name]: e.target.value });
  search = (e) => {
    if (!!e && e.preventDefault) e.preventDefault();
    if (!this.state.title.length) return;

    Router.push({
      pathname: "/shop",
      query: { ...this.state }
    });
  };
  render() {
    const disabled = this.state.title
      ? !this.state.title.length
      : true;
    return (
      <div className="hdr-search">
        <SvgIcon className='search-img' width={18} name="search" />

        <input className='search-input'
          type='search'
          id='search'
          name="title"
          onChange={this.saveToState}
        />

        <button className="hdr-search-btn"
          disabled={disabled}
          type="submit"
          onClick={this.search}
        >GO</button>
      </div>
    )
  }
};


export default Search;
