import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { PRODUCT_QUERY } from '../graphql';


const SingleItem = ({ variables, children }) => (
  <Query query={PRODUCT_QUERY} variables={{ ...variables }}>
    {payload => children(payload)}
  </Query>
);

SingleItem.propTypes = {
  variables: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  children: PropTypes.func.isRequired
};


export default SingleItem;
