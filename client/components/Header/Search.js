import React, { Component } from 'react';
import Router from 'next/router';


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
    return (
      <div className="hdr-search">
        <img className='search-img' src="/static/images/search.svg" alt="Search" width="18" />

        <input className='search-input'
          type='search'
          id='search'
          name="title"
          onChange={this.saveToState}
        />

        <button className="hdr-search-btn"
          disabled={!this.state.title.length}
          type="submit"
          onClick={this.search}
        >GO</button>
      </div>
    )
  }
};


export default Search;
