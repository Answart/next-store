import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { PRODUCT_QUERY } from '../graphql';


const SingleItem = props => (
  <Query
    query={PRODUCT_QUERY}
    {...props}
  >
    {payload => props.children(payload)}
  </Query>
);

SingleItem.propTypes = {
  children: PropTypes.func.isRequired,
};

export default SingleItem;
