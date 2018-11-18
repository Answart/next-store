import React, { Component } from 'react';


class AddToCart extends Component {
  addToCart = e => {
    e.preventDefault();
  };
  render() {
    const { variant, disabled } = this.props;
    console.log('this.PROPS', this.props);
    console.log('THIS', this);
    return (
      <button className="big-btn"
        disabled={disabled}
        onClick={this.addToCart}
      >
        Add To Cart
      </button>
    );
  }
}

export default AddToCart;
