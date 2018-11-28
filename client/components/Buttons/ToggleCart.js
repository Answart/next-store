import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { TOGGLE_LOCAL_CARTOPEN_MUTATION } from '../../graphql';


class ToggleCart extends Component {
  render() {
    return (
      <Mutation mutation={TOGGLE_LOCAL_CARTOPEN_MUTATION}>
        {(toggleCart) => (
          <button onClick={toggleCart}>
            {this.props.children}
          </button>
        )}
      </Mutation>
    )
  }
}

export default ToggleCart;
