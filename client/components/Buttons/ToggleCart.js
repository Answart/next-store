import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { TOGGLE_LOCAL_CARTOPEN_MUTATION } from '../../graphql';


const ToggleCart = props => (
  <Mutation mutation={TOGGLE_LOCAL_CARTOPEN_MUTATION}>
    {(toggleCart) => (
      <button onClick={toggleCart}>
        {props.children}
      </button>
    )}
  </Mutation>
);

ToggleCart.propTypes = {
  children: PropTypes.object.isRequired
};


export default ToggleCart;
