import React, { Component } from 'react';


class Logout extends Component {
  logout = e => {
    e.preventDefault();
  };
  render() {
    return (
      <button className="undrln-btn"
        onClick={this.logout}
      >
        Log Out
      </button>
    );
  }
}

export default Logout;
