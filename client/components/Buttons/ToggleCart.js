import React, { Component } from 'react';


class ToggleCart extends Component {
  toggleCart = () => {
    console.log('toggle the cart')
  }
  render() {
    return (
      <button onClick={this.toggleCart}>
        {this.props.children}
      </button>
    )
  }
}

export default ToggleCart;
